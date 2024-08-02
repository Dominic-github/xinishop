import i18next from 'i18next'

export const translate = (text: string) => {
  return i18next.t(text)
}

export const changeLanguage = (lang: string) => {
  i18next.changeLanguage(lang)
}
