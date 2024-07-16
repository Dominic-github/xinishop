import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationVI from '~/lang/vi/translation.vi.json'
import translationEN from '~/lang/en/translation.en.json'
import LanguageDetector from 'i18next-browser-languagedetector'
import { LANGUAGE } from '~/constants/language'
import XHR from 'i18next-http-backend'

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  }
}

i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: ['translation'],
    defaultNS: 'translation',
    supportedLngs: [LANGUAGE.EN, LANGUAGE.VI],
    fallbackLng: LANGUAGE.VI,
    interpolation: { escapeValue: false },
    debug: true
  })

export const initLanguage = (language: string) => {
  i18next.changeLanguage(language)
}
export default i18next
