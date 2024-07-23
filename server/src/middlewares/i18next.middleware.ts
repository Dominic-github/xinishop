import i18next from 'i18next'
import middleware from 'i18next-http-middleware'
import translationVI from '~/lang/vi/vi.json'
import translationEN from '~/lang/en/en.json'
import { LANGUAGE } from '~/constants/language'

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  }
}

i18next.use(middleware.LanguageDetector).init({
  resources,
  ns: ['translation'],
  defaultNS: 'translation',
  preload: [LANGUAGE.EN, LANGUAGE.VI],
  supportedLngs: [LANGUAGE.EN, LANGUAGE.VI],
  fallbackLng: LANGUAGE.VI,
  interpolation: { escapeValue: false }
})

export default i18next
