import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { readStorageValue, writeStorageValue } from '../lib/storage';
import { translateCopy } from './es';

export type Language = 'en' | 'es';
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: <T>(value: T) => T;
};

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en', setLanguage: () => {}, t: (value) => value,
});

export function LanguageProvider({ children, defaultLanguage = 'en', storageKey = 'qta-language' }: {
  children: ReactNode; defaultLanguage?: Language; storageKey?: string;
}) {
  const [choice, setChoice] = useState<Language | null>(() => {
    const saved = readStorageValue(storageKey);
    return saved === 'es' || saved === 'en' ? saved : null;
  });
  const language = choice ?? defaultLanguage;
  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage(next) {
      setChoice(next);
      writeStorageValue(storageKey, next);
    },
    t: <T,>(text: T): T => typeof text === 'string' ? translateCopy(text, language) as T : text,
  }), [language, storageKey]);
  return <LanguageContext.Provider value={value}><div lang={language} className="contents">{children}</div></LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return <div role="group" aria-label="English / Español" className="inline-flex shrink-0 flex-wrap gap-1 rounded-lg border border-slate-400 bg-white p-1 text-xs text-slate-900">
    {(['en', 'es'] as const).map((value) => <button key={value} type="button" lang={value} aria-pressed={language === value} onClick={() => setLanguage(value)} className={`rounded px-2 py-1.5 font-semibold ${language === value ? 'bg-green-700 text-white' : 'hover:bg-slate-100'}`}>{value === 'es' ? 'Español' : 'English'}</button>)}
  </div>;
}
