import api from '../api/api.js';
import menu from '../modules/menu.js';
import util from '../modules/util.js'
// Utility class to keep utility functions out of global scope
class MultilangUtils {
    static get LANGUAGES() {
        return [
            { code: 'nb', name: "Bokmål" },
            { code: 'se', name: "Sápmi" },
            { code: 'nn', name: "Nynorsk" }
        ];
    }

    static get COOKIE_NAME() {
        return 'lang';
    }

    static languagesExcept(language) {
        if (util.isSamiskCourse(util.course)){
            var languages = [
                { code: 'nb', name: "Bokmål" },
                { code: 'se', name: "Sápmi" },
            ];
            return languages.filter(lang => lang.code !== language);
        }
        else if(util.isNynorskCourse(util.course)){
            var languages =  [
                { code: 'nb', name: "Bokmål" },
                { code: 'nn', name: "Nynorsk" }
            ];
            return languages.filter(lang => lang.code !== language);
        }
        return MultilangUtils.LANGUAGES.filter(lang => lang.code !== language);
    }

    static languagesMap() {

        if(util.isSamiskCourse(util.course)){
            var languages = [
                { code: 'nb', name: "Bokmål" },
                { code: 'se', name: "Sápmi" },
            ];
            return languages.reduce((obj, lang) => {
                obj[lang.code] = lang;
                return obj;
            }, {});
        }
        else if(util.isNynorskCourse(util.course)){
            var languages = [
                { code: 'nb', name: "Bokmål" },
                { code: 'nn', name: "Nynorsk" }
            ];
            return languages.reduce((obj, lang) => {
                obj[lang.code] = lang;
                return obj;
            }, {});
        }
        else{
            return MultilangUtils.LANGUAGES.reduce((obj, lang) => {
                obj[lang.code] = lang;
                return obj;
            }, {});
        }

    }

    static getParsedTooltipText(tooltipText) {
        return menu.tooltipRegexpPattern.exec(tooltipText);
    }

    static makeSpansForTooltip(attrSelector) {
        var node = document.querySelector(attrSelector);
        var tooltip = node && node.getAttribute("data-html-tooltip-title");
        if(tooltip) {
            var tooltipParsedResult = MultilangUtils.getParsedTooltipText(tooltip);
            if(tooltipParsedResult && tooltipParsedResult[1] && tooltipParsedResult[2]) {
                const spanned = MultilangUtils.getSpannedText(tooltipParsedResult[2]);
                if (spanned !== null) {
                    var newTooltipText = menu.createNewTooltipText(tooltip, tooltipParsedResult[1], spanned);
                    node.setAttribute("data-html-tooltip-title", newTooltipText);
                }
            }
        }
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

    static getLanguageParameter() {
        const params = new URLSearchParams(location.search);
        return params.get(this.COOKIE_NAME);
    }

    static setLanguageParameter(languageCode) {
        if (!this.isValidLanguage(languageCode)) {
            return;
        }

        const params = new URLSearchParams(location.search);
        params.set(this.COOKIE_NAME, languageCode);
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }

    static getLanguageCookie() {
        return document.cookie.replace(/(?:(?:^|.*;\s*)courselanguage\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    static setLanguageCookie(languageCode) {
        if (!this.isValidLanguage(languageCode)) {
            return;
        }

        document.cookie = `courselanguage=${languageCode}; SameSite=Strict; path=/`;
    }

    static getLanguageCode() {
        const langCode = MultilangUtils.getLanguageParameter();
        const langCookie = MultilangUtils.getLanguageCookie();
        if (langCode) {
            return langCode;
        } else if (langCookie) {
            return langCookie;
        }
        else {
            return 'nb';
        }
    }
    static getPreferredLanguage() {
        if(!util.isMultilangCourse) {
            return api.getLocale();
        }
        if(MultilangUtils.getLanguageCode == "nb") {
            return api.getLocale();
        }
        return MultilangUtils.getLanguageCode();
    }

    static setActiveLanguage(activeLang) {
        if (!this.isValidLanguage(activeLang)) {
            return;
        }

        MultilangUtils.setLanguageCookie(activeLang);
        MultilangUtils.setLanguageParameter(activeLang);
        const styleElement = document.getElementById('language-style');
        styleElement.innerHTML = MultilangUtils.createCss(activeLang);
    }

    static isValidLanguage(languageCode) {
        if(util.isSamiskCourse(util.course)){
            var languages = [
                { code: 'nb', name: "Bokmål" },
                { code: 'se', name: "Sápmi" },
            ];
        }
        else if(util.isNynorskCourse(util.course)){
            var languages = [
                { code: 'nb', name: "Bokmål" },
                { code: 'nn', name: "Nynorsk" }
            ];
        }
        else {
            var languages = this.LANGUAGES;
        }
        return languages.some(lang => lang.code === languageCode);
    }

    static createCss(activeLang) {
        return MultilangUtils.LANGUAGES.map(l => {
            var displayValue = "none";
            if(activeLang == "all") {
                displayValue = "unset";
            } else {
                displayValue = activeLang.toLowerCase() === l.code ? 'unset' : 'none';
            }
            return `.language:lang(${l.code}) {display:${displayValue};}`
        }).join(" ");
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

    static makeSpansOnPage() {
        const selectors = [
            '.translate',
            'div.tooltiptext',
            '.show-content.user_content h1.page-title',
            'a.mmooc-module-name',
            '.discussion-title',

        ];

        if (location.pathname.endsWith('/modules')) {
            selectors.push(
                'a.title',
                'span.name',
                'span.title',
                );
            }

            MultilangUtils.makeSpansForSelectors(selectors);
        }
    }

    export default (function () {
        return {
        perform: () => {
            if (!util.isMultilangCourse(util.course)) {
                return;
            }
            //KURSP-293-RCE-mister-farge-for-redigering
            //Apply color to editor moved to separate route in main.js
            //This perform function will only be called by content that is not edited.
            MultilangUtils.makeSpansOnPage();
        },
        performPrevNextTooltip: () => {
            MultilangUtils.makeSpansForTooltip('.module-sequence-footer-button--previous');
            MultilangUtils.makeSpansForTooltip('.module-sequence-footer-button--next');
        },

        performNextTooltip: () => {
            MultilangUtils.makeSpansForTooltip('.module-sequence-footer-button--next');
        },
        performPrevTooltip: () => {
            MultilangUtils.makeSpansForTooltip('.module-sequence-footer-button--previous');
        },
        //KURSP-293-RCE-mister-farge-for-redigering
        //Pages in edit mode should also have css inserted.
        initializeCss: () => {
            MultilangUtils.initializeCss("all");
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
        isValidLanguage: (language) => {
            return MultilangUtils.isValidLanguage(language)
        },
        languagesMap: () => {
            return MultilangUtils.languagesMap()
        }
    }
    })();
