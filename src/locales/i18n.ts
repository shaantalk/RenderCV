import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { storageService } from '@/services/storage'

import en from './en.json'
import bn from './bn.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      bn: {
        translation: bn,
      },
    },
    lng: (function () {
      const storageValue = storageService.getLanguage()
      if (storageValue === 'en' || storageValue === 'bn') return storageValue
      return navigator.language?.startsWith('bn-') ? 'bn' : 'en'
    })(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    applyLanguageToDocument(i18n.language)
  })

export function setLanguage(lang: 'en' | 'bn') {
  i18n.changeLanguage(lang).then(() => {
    applyLanguageToDocument(lang)
    storageService.setLanguage(lang)
  })
}

function applyLanguageToDocument(lang: string) {
  if (lang === 'bn') {
    document.documentElement.lang = 'bn-BD'
    document.title = 'অনলাইন জীবনবৃত্তান্ত নির্মাতা'
  } else {
    document.documentElement.lang = 'en-US'
    document.title = 'Resume Builder'
  }
}

export function isBengaliLanguage() {
  return i18n.language === 'bn'
}
