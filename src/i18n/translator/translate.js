// Turns an English -> target-language dictionary into a translate() function.
//
// Lookup order for a piece of text:
//   1. exact match (whitespace-normalised, then case-insensitive)
//   2. numeric template ("1g in 2L ... 3–5 days" covers "1g in 4L ... 4–5 days")
//   3. the same without trailing punctuation, with the punctuation re-added
//   4. dates ("Apr 14, 2026")
//   5. sentence by sentence, for long paragraphs
//   6. product names: Latin brand + translated dosage form ("Tylokam-10 Oral Powder")

const NUMBER = /\d[\d,.]*(?:\s?[–-]\s?\d[\d,.]*)?/g;

const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// Descriptor suffixes on product names; each must also be a dictionary key.
const NAME_SUFFIXES = [
  'Water Soluble Powder', 'Soluble Powder', 'Oral Powder', 'Oral Solution', 'Oral Liquid',
  'SC-Liquid', 'Solution', 'Suspension', 'Powder', 'Liquid', 'Drench',
];

// Unicode first-strong isolate / pop directional isolate: keeps a Latin brand
// name in one piece inside right-to-left text.
const FSI = String.fromCodePoint(0x2068);
const PDI = String.fromCodePoint(0x2069);

function normalise(text) {
  return String(text).replace(/\s+/g, ' ').trim();
}

/**
 * @param {Record<string, string>} dictionary English -> translation
 * @param {{ months: string[], fullStop?: string }} options
 *   months: January..December in the target language.
 *   fullStop: sentence terminator in the target language ('۔' for Urdu).
 */
export function createTranslator(dictionary, { months, fullStop = '.' }) {
  const EXACT = new Map();
  const LOWER = new Map();
  const MONTHS = Object.fromEntries(MONTH_KEYS.map((key, i) => [key, months[i]]));
  const PUNCT = { '?': '؟', ',': '،', ';': '؛', '.': fullStop };

  const register = (key, value) => {
    if (!EXACT.has(key)) EXACT.set(key, value);
    if (!LOWER.has(key.toLowerCase())) LOWER.set(key.toLowerCase(), value);
  };

  Object.entries(dictionary).forEach(([en, tr]) => register(normalise(en), tr));

  // An entry containing numbers also registers a numeric template, provided
  // every number in the English also appears in the translation.
  Object.entries(dictionary).forEach(([en, tr]) => {
    const numbers = normalise(en).match(NUMBER);
    if (!numbers) return;

    const used = new Set();
    const value = tr.replace(NUMBER, match => {
      const index = numbers.findIndex((n, i) => n === match && !used.has(i));
      if (index === -1) return match;
      used.add(index);
      return `{${index}}`;
    });
    if (used.size !== numbers.length) return;

    let i = 0;
    register(normalise(en).replace(NUMBER, () => `{${i++}}`), value);
  });

  const exact = text => EXACT.get(text) ?? LOWER.get(text.toLowerCase());

  const template = text => {
    const values = [];
    const key = text.replace(NUMBER, match => `{${values.push(match) - 1}}`);
    if (!values.length) return undefined;
    return exact(key)?.replace(/\{(\d+)\}/g, (_, i) => values[i]);
  };

  const direct = text => {
    const found = exact(text) ?? template(text);
    if (found !== undefined) return found;

    const match = text.match(/^(.*?)\s*([.:!?…,;]+)$/);
    if (match && match[1]) {
      const inner = exact(match[1]) ?? template(match[1]);
      if (inner !== undefined) {
        return inner + match[2].split('').map(c => PUNCT[c] || c).join('');
      }
    }

    // Many strings are stored with a trailing full stop but rendered without it.
    return (exact(`${text}.`) ?? template(`${text}.`))?.replace(/[.۔]$/, '');
  };

  const date = text => {
    let m = text.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}),? (\d{4})$/);
    if (m && MONTHS[m[1].toLowerCase()]) return `${m[2]} ${MONTHS[m[1].toLowerCase()]} ${m[3]}`;

    m = text.match(/^(\d{1,2}) ([A-Za-z]{3})[a-z]* (\d{4})$/);
    if (m && MONTHS[m[2].toLowerCase()]) return `${m[1]} ${MONTHS[m[2].toLowerCase()]} ${m[3]}`;

    return undefined;
  };

  const productName = text => {
    for (const suffix of NAME_SUFFIXES) {
      if (text.length > suffix.length && text.toLowerCase().endsWith(` ${suffix.toLowerCase()}`)) {
        const form = exact(suffix);
        if (form === undefined) return undefined;
        const brand = text.slice(0, -suffix.length).trim();
        return `${FSI}${brand}${PDI} ${form}`;
      }
    }
    return undefined;
  };

  // Long paragraphs are translated sentence by sentence so shared sentences
  // (product benefits, dosage steps) only need one dictionary entry.
  const sentences = text => {
    const parts = text.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/);
    if (parts.length < 2) return undefined;

    let changed = false;
    const out = parts.map(part => {
      const translated = direct(part);
      if (translated !== undefined) changed = true;
      return translated ?? part;
    });

    return changed ? out.join(' ') : undefined;
  };

  /**
   * Translate an English UI string. Returns null when no translation is
   * known, so callers can keep the original. Surrounding whitespace is kept
   * (it matters between inline text nodes).
   */
  return function translate(raw) {
    if (raw == null) return null;
    const value = String(raw);
    const text = normalise(value);
    if (!text || !/[A-Za-z]/.test(text)) return null;

    const result = direct(text) ?? date(text) ?? sentences(text) ?? productName(text);
    if (result === undefined) return null;

    const lead = /^\s/.test(value) ? ' ' : '';
    const trail = /\s$/.test(value) ? ' ' : '';
    return lead + result + trail;
  };
}
