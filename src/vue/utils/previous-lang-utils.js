
// Utility class to keep utility functions out of global scope
class MultilangUtils {

  static get LANGUAGES() {
    return [
      { code: 'nb', name: "Bokmål" },
      { code: 'se', name: "Sápmi" },
      { code: 'nn', name: "Nynorsk" }
    ]
  }

  static get COOKIE_NAME() {
    return 'lang'
  }

  static languagesExcept(language) {
    if (util.isSamiskCourse(util.course)) {
      var languages = [
        { code: 'nb', name: "Bokmål" },
        { code: 'se', name: "Sápmi" },
      ]
      return languages.filter(lang => lang.code !== language)
    }
    else if (util.isNynorskCourse(util.course)) {
      var languages = [
        { code: 'nb', name: "Bokmål" },
        { code: 'nn', name: "Nynorsk" }
      ]
      return languages.filter(lang => lang.code !== language)
    }
    return MultilangUtils.LANGUAGES.filter(lang => lang.code !== language)
  }

  static getLanguageParameter() {
    const params = new URLSearchParams(location.search)
    return params.get(this.COOKIE_NAME)
  }

  static setLanguageParameter(languageCode) {
    if (!this.isValidLanguage(languageCode)) {
      return
    }

    const params = new URLSearchParams(location.search)
    params.set(this.COOKIE_NAME, languageCode)
    window.history.replaceState({}, '', `${location.pathname}?${params}`)
  }

  static getLanguageCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)courselanguage\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  }

  static setLanguageCookie(languageCode) {
    if (!this.isValidLanguage(languageCode)) {
      return
    }

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
    if (!util.isMultilangCourse) {
      return api.getLocale()
    }
    if (MultilangUtils.getLanguageCode == "nb") {
      return api.getLocale()
    }
    return MultilangUtils.getLanguageCode()
  }

  static setActiveLanguage(activeLang) {
    if (!this.isValidLanguage(activeLang)) {
      return
    }

    MultilangUtils.setLanguageCookie(activeLang)
    MultilangUtils.setLanguageParameter(activeLang)
    const styleElement = document.getElementById('language-style')
    styleElement.innerHTML = MultilangUtils.createCss(activeLang)
  }

  static isValidLanguage(languageCode) {
    if (util.isSamiskCourse(util.course)) {
      var languages = [
        { code: 'nb', name: "Bokmål" },
        { code: 'se', name: "Sápmi" },
      ]
    }
    else if (util.isNynorskCourse(util.course)) {
      var languages = [
        { code: 'nb', name: "Bokmål" },
        { code: 'nn', name: "Nynorsk" }
      ]
    }
    else {
      var languages = this.LANGUAGES
    }
    return languages.some(lang => lang.code === languageCode)
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
        isValidLanguage: (language) => {
            return MultilangUtils.isValidLanguage(language)
        },
        languagesMap: () => {
            return MultilangUtils.languagesMap()
        },
        getPreferredLanguage: () => {
            return MultilangUtils.getPreferredLanguage()
        }
    }
})();
