'use strict';

// Utility class to keep utility functions out of global scope
class MultilangUtils {
    static languages() {
        return [
            { code: 'nb', name: "Norsk" },
            { code: 'se', name: "Sápmi" },
        ];
    }

    static languagesExcept(language) {
        return MultilangUtils.languages().filter(lang => lang.code !== language);
    }

    static languagesMap() {
        return MultilangUtils.languages().reduce((obj, lang) => {
            obj[lang.code] = lang;
            return obj;
        }, {});
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

    static makeSpansOf(element) {
        // If there are child nodes that are not text nodes, abort. It should already be translated
        if (!Array.from(element.childNodes).every(childNode => childNode.nodeType === 3)) {
            return null;
        }

        //Split the elements content with '|', then check each segment for language code and make <span>-elements.
        const splitArray = element.textContent.split("|");
        let newContent = '';
        for (let i = 0; i < splitArray.length; i++) {
            let match = /^\s*(\w\w)\s*:(.*)/.exec(splitArray[i]); //match language codes formed with two letters and a colon (no:, en: etc)
            if (match) {
                newContent += `<span class="language" lang="${match[1]}">${match[2]}</span>`;
            } else {
                newContent += splitArray[i];
            }
        }

        return newContent; //HTML-string with span-tags
    }

    static getLanguageParameter() {
        const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
        const langCode = urlParamsObj && urlParamsObj['lang'];
        if (langCode !== undefined) {
            return urlParamsObj['lang'];
        }
        return null;
    }

    static getLanguageCookie() {
        return document.cookie.replace(/(?:(?:^|.*;\s*)courselanguage\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    static setLanguageCookie(languageCode) {
        document.cookie = `courselanguage=${languageCode}; SameSite=Strict`;
    }

    static getLanguageCode() {
        const langCode = MultilangUtils.getLanguageParameter();
        if (langCode) {
            return langCode;
        } else if (document.cookie.split(';').some((item) => item.trim().startsWith('courselanguage='))) {
            return MultilangUtils.getLanguageCookie();
        } else {
            return 'nb';
        }
    }

    static createCss(activeLang) {
        return MultilangUtils.languages().map(l => {
            const displayValue = activeLang.toLowerCase() === l.code ? 'unset' : 'none';
            return `.language:lang(${l.code}) {display:${displayValue};}`
        }).join(" ");
    }

    static setActiveLanguage(activeLang) {
        MultilangUtils.setLanguageCookie(activeLang);
        const styleElement = document.getElementById('language-style');
        styleElement.innerHTML = MultilangUtils.createCss(activeLang);
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
                                    }`;
                doc.head.appendChild(editorCss);
            } else {
                setTimeout(MultilangUtils.applyColorCodingInEditor, 500);
            }
        }
        doApply();
    }

    static insertCss() {
        const langCode = MultilangUtils.getLanguageCode();
        const styleElement = document.createElement('style');
        styleElement.id = 'language-style';

        styleElement.innerHTML = MultilangUtils.createCss(langCode);
        document.head.appendChild(styleElement);
    }

    static makeSpansOnPage() {
        const selectors = [
            '.translate',
            'div.tooltiptext',
            '.show-content.user_content h1.page-title',
            'a.mmooc-module-name',
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

this.mmooc = this.mmooc || {};

this.mmooc.multilanguage = (function () {
    return {
        perform: () => {
            if (!this.mmooc.util.isMultilangCourse(mmooc.util.course)) {
                return;
            }

            if (location.pathname.endsWith('/edit')) {
                MultilangUtils.applyColorCodingInEditor();
            } else {
                MultilangUtils.makeSpansOnPage();
            }
        },
        insertCss: () => {
            if (!location.pathname.endsWith('/edit')) {
                MultilangUtils.insertCss();
            }
        }
    }
})();