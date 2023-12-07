// MultilangUtils class for managing multilingual functionality
import util from '../../js/modules/util';
class MultilangUtils {

  // Array of supported languages with keys and names
  static get LANGUAGES() {
    return [
      { key: 'nb', name: "Bokmål" },
      { key: 'se', name: "Sápmi" },
      { key: 'nn', name: "Nynorsk" }
    ];
  }

  static isValidLanguage(languageCode) {
    if(util.isSamiskCourse(util.course)){
        var languages = [
            { key: 'nb', name: "Bokmål" },
            { key: 'se', name: "Sápmi" },
        ];
    }
    else if(util.isNynorskCourse(util.course)){
        var languages = [
            { key: 'nb', name: "Bokmål" },
            { key: 'nn', name: "Nynorsk" }
        ];
    }
    else {
        var languages = this.LANGUAGES;
    }
    return languages.some(lang => lang.key === languageCode);
  }


  // Name of the cookie used to store the language preference
  static get COOKIE_NAME() {
    return 'lang';
  }

  // Get the language parameter from the URL
  static getLanguageParameter() {
    const params = new URLSearchParams(location.search);
    return params.get(this.COOKIE_NAME);
  }

  // Set the language parameter in the URL
  static setLanguageParameter(languageCode) {
    if(!this.isValidLanguage(languageCode)){
      const params = new URLSearchParams(location.search);
      params.set(this.COOKIE_NAME, 'nb');
      window.history.replaceState({}, '', `${location.pathname}?${params}`);
      return;
    }
    const params = new URLSearchParams(location.search);
    params.set(this.COOKIE_NAME, languageCode);
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
  }

  // Get the language code from the cookie
  static getLanguageCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)courselanguage\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }

  // Set the language code in the cookie
  static setLanguageCookie(languageCode) {
    if(!this.isValidLanguage(languageCode)){
      document.cookie = `courselanguage=nb; SameSite=Strict; path=/`;
      return;
    }
    document.cookie = `courselanguage=${languageCode}; SameSite=Strict; path=/`;
  }

  // Get the active language code from either the URL parameter or cookie
  static getLanguageCode() {
    const langCode = MultilangUtils.getLanguageParameter();
    const langCookie = MultilangUtils.getLanguageCookie();
    if (langCode) {
      return langCode;
    } else if (langCookie) {
      return langCookie;
    } else {
      return 'nb'; // Default to Bokmål if no language preference is set
    }
  }

  // Get the preferred language code, falling back to the default if not set
  static getPreferredLanguage() {
    if (MultilangUtils.getLanguageCode() === "nb") {
      return ENV.LOCALE; // Return the locale if the language code is Bokmål
    }
    return MultilangUtils.getLanguageCode(); // Return the active language code
  }

  // Apply color coding in the editor based on language
  static applyColorCodingInEditor() {
    function doApply() {
      const iframe = document.getElementById('wiki_page_body_ifr');
      if (iframe !== null) {
        const doc = iframe.contentWindow.document;
        const editorCss = doc.createElement('style');
        // Define background colors for different languages
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

  // Initialize CSS styles based on language. This is used to hide elements based on language,
  //using a language-style tag in the document head.
  static initializeCss(language) {
    const styleElement = document.createElement('style');
    styleElement.id = 'language-style';
    styleElement.innerHTML = MultilangUtils.createCss(language);
    document.head.appendChild(styleElement);
  }

  // Create CSS rules for each language. Change display to 'unset' for the active language, and 'none' for the others.
  static createCss(activeLang) {
    return MultilangUtils.LANGUAGES.map(language => {
      var displayValue = "none";
      if (activeLang == "all") {
        displayValue = "unset";
      } else {
        displayValue = activeLang === language.key ? 'unset' : 'none';
      }
      return `.language:lang(${language.key}) {display:${displayValue};}`;
    }).join(" ");
  }

  // Add spans to specific elements on the page for translation. The user has added the codes |nb:, |nn: or |se: to the text content,
  //this is replaced with a span tag with the language code as the lang attribute, in the function getSpannedText.
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

  // Add spans to specified elements on the page
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

  // Get HTML with span tags for language codes in text content
  static getSpannedText(textContent) {
    const splitArray = textContent.split("|");
    let newContent = '';
    for (let i = 0; i < splitArray.length; i++) {
      let match = /^\s*(\w\w)\s*:(.*)/.exec(splitArray[i]); // Match language codes formed with two letters and a colon (no:, en: etc)
      if (match) {
        newContent += `<span class='language' lang='${match[1]}'>${match[2]}</span>`;
      } else {
        newContent += splitArray[i];
      }
    }
    return newContent; // HTML string with span tags
  }

  // Replace text content of an element with spanned text
  static makeSpansOf(element) {
    // If there are child nodes that are not text nodes, abort. It should already be translated
    if (!Array.from(element.childNodes).every(childNode => childNode.nodeType === 3)) {
      return null;
    }
    return MultilangUtils.getSpannedText(element.textContent);
  }

  // Set the active language, update cookies, and apply styling
  static setActiveLanguage(activeLang) {
    MultilangUtils.setLanguageCookie(activeLang);
    MultilangUtils.setLanguageParameter(activeLang);
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
