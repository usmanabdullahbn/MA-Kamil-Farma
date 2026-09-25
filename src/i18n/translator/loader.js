import { useEffect, useSyncExternalStore } from 'react';
import { createTranslator } from './translate';

// Each dictionary is its own chunk, fetched only when that language is used.
const LOADERS = {
  ur: () => import('../dictionaries/ur/index.js'),
  sd: () => import('../dictionaries/sd/index.js'),
  pa: () => import('../dictionaries/pa/index.js'),
  ps: () => import('../dictionaries/ps/index.js'),
};

const translators = new Map();
const pending = new Map();
const listeners = new Set();

function notify() {
  listeners.forEach(listener => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function hasDictionary(code) {
  return code in LOADERS;
}

export function getTranslator(code) {
  return translators.get(code) ?? null;
}

/** Load (once) and return the translate function for a language. */
export function loadTranslator(code) {
  if (!hasDictionary(code)) return Promise.resolve(null);
  if (translators.has(code)) return Promise.resolve(translators.get(code));
  if (pending.has(code)) return pending.get(code);

  const promise = LOADERS[code]()
    .then(({ default: { dictionary, ...options } }) => {
      const translate = createTranslator(dictionary, options);
      translators.set(code, translate);
      notify();
      return translate;
    })
    .finally(() => pending.delete(code));

  pending.set(code, promise);
  return promise;
}

/** The translate function for a language, or null until it has loaded. */
export function useTranslator(code) {
  const translate = useSyncExternalStore(subscribe, () => getTranslator(code));

  useEffect(() => {
    loadTranslator(code);
  }, [code]);

  return translate;
}
