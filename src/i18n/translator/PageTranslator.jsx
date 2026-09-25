import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslator } from './loader';

// Almost all copy on the site is hardcoded English in JSX and data arrays.
// Rather than threading t() through every string, this component translates
// the rendered DOM while a non-English language is active, and keeps doing so
// as React re-renders. Switching back restores the original English text.

const ATTRIBUTES = ['placeholder', 'title', 'alt', 'aria-label'];
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE']);

// node -> { original, translated } for text nodes we have changed.
const textState = new WeakMap();
// element -> { [attr]: { original, translated } }
const attrState = new WeakMap();

function isSkipped(el) {
  return !el || SKIP_TAGS.has(el.tagName) || !!el.closest('[translate="no"], [data-no-translate]');
}

function translateText(node, translate) {
  const state = textState.get(node);
  const current = node.nodeValue;
  if (state && current === state.translated) return;
  if (isSkipped(node.parentElement)) return;

  const translated = translate(current);
  if (translated === null || translated === current) return;

  textState.set(node, { original: current, translated });
  node.nodeValue = translated;
}

function translateAttribute(el, name, translate) {
  const current = el.getAttribute(name);
  if (current === null) return;

  const states = attrState.get(el) || {};
  if (states[name] && states[name].translated === current) return;
  if (isSkipped(el)) return;

  const translated = translate(current);
  if (translated === null || translated === current) return;

  states[name] = { original: current, translated };
  attrState.set(el, states);
  el.setAttribute(name, translated);
}

function translateTree(root, translate) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateText(root, translate);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE || isSkipped(root)) return;

  ATTRIBUTES.forEach(name => translateAttribute(root, name, translate));
  root.querySelectorAll(ATTRIBUTES.map(a => `[${a}]`).join(',')).forEach(el => {
    ATTRIBUTES.forEach(name => translateAttribute(el, name, translate));
  });

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => translateText(node, translate));
}

function restoreTree(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  let node = walker.currentNode;

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const state = textState.get(node);
      if (state && node.nodeValue === state.translated) node.nodeValue = state.original;
      textState.delete(node);
    } else {
      const states = attrState.get(node);
      if (states) {
        Object.entries(states).forEach(([name, state]) => {
          if (node.getAttribute(name) === state.translated) node.setAttribute(name, state.original);
        });
        attrState.delete(node);
      }
    }
    node = walker.nextNode();
  }
}

export default function PageTranslator() {
  const { i18n } = useTranslation();
  const translate = useTranslator(i18n.language);

  // Layout effect: translate before the browser paints, so there is no
  // flash of English when a page loads in another language.
  useLayoutEffect(() => {
    if (!translate) return undefined;

    // documentElement, not body, so the <title> in <head> is covered too.
    const root = document.documentElement;
    translateTree(root, translate);
    // Content was hidden while the dictionary loaded (see i18n/config.js).
    delete root.dataset.translating;

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData') {
          translateText(mutation.target, translate);
        } else if (mutation.type === 'attributes') {
          translateAttribute(mutation.target, mutation.attributeName, translate);
        } else {
          mutation.addedNodes.forEach(node => translateTree(node, translate));
        }
      });
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTES,
    });

    return () => {
      observer.disconnect();
      restoreTree(root);
    };
  }, [translate]);

  return null;
}
