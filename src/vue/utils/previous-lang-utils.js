
// Utility class to keep utility functions out of global scope
class MultilangUtils {

  static get LANGUAGES() {
    return [
      { key: 'nb', name: "Bokmål" },
      { key: 'se', name: "Sápmi" },
      { key: 'nn', name: "Nynorsk" }
    ]
  }

  static get COOKIE_NAME() {
    return 'lang'
  }


  static getLanguageParameter() {
    const params = new URLSearchParams(location.search)
    return params.get(this.COOKIE_NAME)
  }

  static setLanguageParameter(languageCode) {
    const params = new URLSearchParams(location.search)
    params.set(this.COOKIE_NAME, languageCode)
    window.history.replaceState({}, '', `${location.pathname}?${params}`)
  }

  static getLanguageCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)courselanguage\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  }

  static setLanguageCookie(languageCode) {
    document.cookie = `courselanguage=${languageCode}; SameSite=Strict; path=/`
  }

  static getLanguageCode() {
    const langCode = MultilangUtils.getLanguageParameter()
    const langCookie = MultilangUtils.getLanguageCookie()
    if (langCode) {
      return langCode
    } else if (langCookie) {
      return langCookie
    }
    else {
      return 'nb'
    }
  }
  static getPreferredLanguage() {
    if (MultilangUtils.getLanguageCode == "nb") {
      return _env.LOCALE;
    }
    return MultilangUtils.getLanguageCode()
  }

  static setActiveLanguage(activeLang) {
    MultilangUtils.setLanguageCookie(activeLang)
    MultilangUtils.setLanguageParameter(activeLang)
  }

}

export default (function () {
    return {
        getLanguageCode: () => {
            return MultilangUtils.getLanguageCode()
        },
        setActiveLanguage: (langCode) => {
            MultilangUtils.setActiveLanguage(langCode)
        },
        languagesMap: () => {
            return MultilangUtils.languagesMap()
        },
        languagesExcept: (selectedLang) => {
            return MultilangUtils.languagesExcept(selectedLang)
        },
        getLanguageParameter: () => {
            return MultilangUtils.getLanguageParameter()
        },
        languagesMap: () => {
            return MultilangUtils.languagesMap()
        },
        getPreferredLanguage: () => {
            return MultilangUtils.getPreferredLanguage()
        }
    }
})();
