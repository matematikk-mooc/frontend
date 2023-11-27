
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

  static applyColorCodingInEditor() {
    function doApply() {
        const iframe = document.getElementById('wiki_page_body_ifr');
        if (iframe !== null) {
            const doc = iframe.contentWindow.document;
            const editorCss = doc.createElement('style');
            editorCss.innerHTML = `
            .language:lang(se) {
                background-color: LIGHTCYAN;
            }
            .language:lang(nb) {
                background-color: MISTYROSE;
            }
            .language:lang(nn) {
                background-color: LIGHTGREEN;
            }`;
            doc.head.appendChild(editorCss);
        } else {
            setTimeout(MultilangUtils.applyColorCodingInEditor, 500);
        }
    }
    doApply();
}

  static initializeCss(language) {
    const styleElement = document.createElement('style');
    styleElement.id = 'language-style';

    styleElement.innerHTML = MultilangUtils.createCss(language);
    document.head.appendChild(styleElement);
  }
  static createCss(activeLang) {
    return MultilangUtils.LANGUAGES.map(language => {
        var displayValue = "none";
        if(activeLang == "all") {
            displayValue = "unset";
        } else {
            displayValue = activeLang === language.key ? 'unset' : 'none';
        }
        return `.language:lang(${language.key}) {display:${displayValue};}`
    }).join(" ");
  }

  static makeSpansOnPage() {
    var selectors = [
        '.translate',
        '.show-content.user_content h1.page-title',
        '.discussion-title',
    ];
    const urlSearchParams = new URLSearchParams(window.location.href);
    if (urlSearchParams.has('lang')) {
        selectors.push(
            'a.title',
            'span.name',
            'span.title',
        );
    }

    MultilangUtils.makeSpansForSelectors(selectors);
  }

  static makeSpansForSelectors(selectors) {
    selectors.map(selector => document.querySelectorAll(selector))
    .flatMap(nodeList => Array.from(nodeList))
    .forEach(node => {
        const spanned = MultilangUtils.makeSpansOf(node);
        if (spanned !== null) {
            node.innerHTML = spanned;
        }
    });
}

  static getSpannedText(textContent) {
      //Split the elements content with '|', then check each segment for language code and make <span>-elements.
      const splitArray = textContent.split("|");
      let newContent = '';
      for (let i = 0; i < splitArray.length; i++) {
          let match = /^\s*(\w\w)\s*:(.*)/.exec(splitArray[i]); //match language codes formed with two letters and a colon (no:, en: etc)
          if (match) {
              newContent += `<span class='language' lang='${match[1]}'>${match[2]}</span>`;
          } else {
              newContent += splitArray[i];
          }
      }
      return newContent; //HTML-string with span-tags
  }

  static makeSpansOf(element) {
      // If there are child nodes that are not text nodes, abort. It should already be translated
      if (!Array.from(element.childNodes).every(childNode => childNode.nodeType === 3)) {
          return null;
      }
      return MultilangUtils.getSpannedText(element.textContent);
  }

  static setActiveLanguage(activeLang) {
    MultilangUtils.setLanguageCookie(activeLang)
    MultilangUtils.setLanguageParameter(activeLang)
    MultilangUtils.makeSpansOnPage();
    const styleElement = document.getElementById('language-style');
    styleElement.innerHTML = MultilangUtils.createCss(activeLang);
  }

}



export default (function () {
    return {
        initializeCss: (language) => {
            MultilangUtils.initializeCss(language)
        },
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
        },
        applyColorCodingInEditor: () => {
            return MultilangUtils.applyColorCodingInEditor()
        }
    }
})();
