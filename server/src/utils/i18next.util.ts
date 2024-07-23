import i18next from 'i18next'

export const translate = (key: string, ...parameters: any) => {
  i18next.t(key, parameters)
}
