
import { ptTranslations } from './pt';
import { enTranslations } from './en';
import { esTranslations } from './es';

export const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
};

export type TranslationKey = keyof typeof ptTranslations;
export type Language = keyof typeof translations;
