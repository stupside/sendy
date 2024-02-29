'use server'

const dictionary = {
  en: () => import('./assets/en.json').then((m) => m.default),
}

export type Locale = keyof typeof dictionary

const defaultLocale: Locale = 'en'

export const locales = async (): Promise<{
  keys: Locale[]
  fallback: Locale
}> => {
  return {
    keys: Object.keys(dictionary) as Locale[],
    fallback: defaultLocale,
  }
}

type Dictionary = Awaited<ReturnType<typeof dictionary.en>>

export const _dict = async (locale: Locale): Promise<Dictionary> => {
  return dictionary[locale]()
}

type Translator = (predicate: (dic: Dictionary) => string) => Promise<string>

export const _translator = async (locale: Locale): Promise<Translator> => {
  const dict = await _dict(locale)

  return async (predicate) => {
    const translation = predicate(dict)

    if (translation) {
      return translation
    }

    const defaults = await _dict(defaultLocale)

    const fallback = predicate(defaults)

    if (fallback) {
      return fallback
    }

    throw new Error('Translation not found from predicate')
  }
}
