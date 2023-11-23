"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[297],{"./src/vue/components/course-page-banner/CoursePageBanner.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CoursePageBannerComponent:()=>CoursePageBannerComponent,__namedExportsOrder:()=>__namedExportsOrder,default:()=>CoursePageBanner_stories});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js"),_hoisted_1={class:"course-page__banner__illustration"},_hoisted_2=["src"],_hoisted_3={class:"course-page__banner__title"},_hoisted_4={class:"course-page__banner__actions"};var Button=__webpack_require__("./src/vue/components/Button.vue");var DropdownButton=__webpack_require__("./src/vue/components/dropdown-button/DropdownButton.vue");function getLanguageOptions(lang){return"none"===lang?null:"all"===lang?[{key:"nb",value:"Bokmål"},{key:"nn",value:"Nynorsk"},{key:"se",value:"Sápmi"}]:"nn"===lang?[{key:"nb",value:"Bokmål"},{key:"nn",value:"Nynorsk"}]:"se"===lang?[{key:"nb",value:"Bokmål"},{key:"se",value:"Sápmi"}]:void 0}var lang_utils=__webpack_require__("./src/vue/utils/lang-utils.js");const LanguageSelectorContainervue_type_script_lang_js={name:"LanguageSelectorContainer",components:{DropdownButton:DropdownButton.Z},props:{languages:String},setup:function setup(props){var languageOptions=(0,vue_esm_bundler.iH)(getLanguageOptions(props.languages)),initialLanguage=(0,vue_esm_bundler.iH)(null);(0,vue_esm_bundler.bv)((function(){var _getLanguageCode;languageOptions.value=getLanguageOptions(props.languages),initialLanguage.value=null!==(_getLanguageCode=(0,lang_utils.ht)())&&void 0!==_getLanguageCode?_getLanguageCode:"nb"}));return{languageOptions,initialLanguage,handleSelectedLanguage:function handleSelectedLanguage(key){(0,lang_utils.t3)(key)}}}};var exportHelper=__webpack_require__("./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js");const __exports__=(0,exportHelper.Z)(LanguageSelectorContainervue_type_script_lang_js,[["render",function LanguageSelectorContainervue_type_template_id_1fdf5b63_render(_ctx,_cache,$props,$setup,$data,$options){var _component_DropdownButton=(0,vue_esm_bundler.up)("DropdownButton");return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("div",null,[null!==$setup.languageOptions?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.j4)(_component_DropdownButton,{key:0,options:$setup.languageOptions,preselect:$setup.initialLanguage,onSelected:$setup.handleSelectedLanguage},null,8,["options","preselect","onSelected"])):(0,vue_esm_bundler.kq)("",!0)])}]]),LanguageSelectorContainer=__exports__;__exports__.__docgenInfo={displayName:"LanguageSelectorContainer",exportName:"default",description:"",tags:{},props:[{name:"languages",type:{name:"string"}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/language-selector-container/LanguageSelectorContainer.vue"]};const CoursePageBannervue_type_script_lang_js={props:{imageUrl:String,theme:String,title:String,isEnrolled:Boolean,isFrontPage:Boolean,languages:String},setup:function setup(props){return{imageUrl:props.imageUrl,theme:props.theme,title:props.title,isEnrolled:props.isEnrolled,isFrontPage:props.isFrontPage,languages:props.languages}},components:{Button:Button.Z,LanguageSelectorContainer}};var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),CoursePageBannervue_type_style_index_0_id_5b64720a_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/course-page-banner/CoursePageBanner.vue?vue&type=style&index=0&id=5b64720a&lang=scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(CoursePageBannervue_type_style_index_0_id_5b64720a_lang_scss.Z,options);CoursePageBannervue_type_style_index_0_id_5b64720a_lang_scss.Z&&CoursePageBannervue_type_style_index_0_id_5b64720a_lang_scss.Z.locals&&CoursePageBannervue_type_style_index_0_id_5b64720a_lang_scss.Z.locals;const CoursePageBanner_exports_=(0,exportHelper.Z)(CoursePageBannervue_type_script_lang_js,[["render",function render(_ctx,_cache,$props,$setup,$data,$options){var _component_Button=(0,vue_esm_bundler.up)("Button"),_component_LanguageSelectorContainer=(0,vue_esm_bundler.up)("LanguageSelectorContainer");return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("div",{class:(0,vue_esm_bundler.C_)(["course-page__banner",$setup.theme])},[(0,vue_esm_bundler._)("div",_hoisted_1,[(0,vue_esm_bundler._)("img",{src:$setup.imageUrl},null,8,_hoisted_2)]),(0,vue_esm_bundler._)("h1",_hoisted_3,(0,vue_esm_bundler.zw)($setup.title),1),(0,vue_esm_bundler._)("div",_hoisted_4,[$setup.isEnrolled&&$setup.isFrontPage?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.j4)(_component_Button,{key:0,type:"outlined",class:"self_unenrollment_link"},{default:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Uk)("Meld deg av")]})),_:1})):(0,vue_esm_bundler.kq)("",!0),(0,vue_esm_bundler.Wm)(_component_LanguageSelectorContainer,{languages:$setup.languages},null,8,["languages"])])],2)}]]),CoursePageBanner=CoursePageBanner_exports_;var _CoursePageBannerComp,_CoursePageBannerComp2;function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}CoursePageBanner_exports_.__docgenInfo={exportName:"default",displayName:"CoursePageBanner",description:"",tags:{},props:[{name:"imageUrl",type:{name:"string"}},{name:"theme",type:{name:"string"}},{name:"title",type:{name:"string"}},{name:"isEnrolled",type:{name:"boolean"}},{name:"isFrontPage",type:{name:"boolean"}},{name:"languages",type:{name:"string"}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/course-page-banner/CoursePageBanner.vue"]};var server="/frontend/",CoursePageBanner_stories_images=[server+"IllustrasjonerKompetansepakker/Barnehage/DigitaldoemmekraftIBarnehagenMedLederstoette/digital-dommekraft-i-barnehagen-med-lederstotte-liten.svg",server+"IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/DigitalUndervisningPaaSkolenOgHjemme/digital-undervisning-på-skolen-og-hjemme-liten.svg",server+"IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/InkluderingOgUniversellUtformingIDigitalPraksis/inkludering-og-universell-utforming-i-digital-praksis-liten.svg",server+"IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/PersonvernILaeringsTeknologiForEiereOgLedere/personvern-i-laeringsteknologi-for-eiere-og-ledere-liten.svg",server+"/IllustrasjonerKompetansepakker/DigitalKompetanseISkolen/TeknologiOgDigitaleFerdigheter/teknologi-og-digitale-ferdigheter-liten.svg",server+"IllustrasjonerKompetansepakker/EksamensOgProvesystemet/eksamens-og-provesystemet-liten.svg",server+"IllustrasjonerKompetansepakker/Inkludering/EleverMedStorLaeringspotensial/elever-med-stor-laeringspotensial-liten.svg",server+"IllustrasjonerKompetansepakker/Inkludering/InkluderendePraksis/inkluderende-praksis-liten.svg",server+"IllustrasjonerKompetansepakker/InnforingAvNyeLaereplanerForLaerebedrifterOgProevenemder/NyeLaereplanerForLaerebedrifter/nye-laereplaner-for-laerebedrifter-liten.svg",server+"IllustrasjonerKompetansepakker/ProgrammeringOgValgfagForUngdomstrinnet/programmering-valgfag-for-laerere-liten.svg",server+"IllustrasjonerKompetansepakker/SFO/TrygtOgGodtMiljoISfo/trygt-og-godt-miljo-i-SFO-liten.svg",server+"IllustrasjonerKompetansepakker/Skolemiljo/TrygtOgGodtSkolemiljo/trygt-og-godt-skolemiljo-liten.svg",server+"IllustrasjonerKompetansepakker/StotteTilArbeidMedLaereplanverket/InnforingAvNyttLaereplanverk/innfoering-av-nytt-laereplanverk(fagfornyelsen)-liten.svg",server+"IllustrasjonerKompetansepakker/StotteTilArbeidMedLaereplanverket/ProgrammeringOgAlgoritmiskTenkning/programmering-og-algoritmisk-tenkning-liten.svg",server+"IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/PersonvernISkolen/personvern-i-skolen-liten.svg",server+"IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/RegelverkIFagOgYrkesopplaering/regelverk-i-fag-og-yrkesopplaering-liten.svg",server+"IllustrasjonerKompetansepakker/StotteTilArbeidMedRegelverket/TospraakligFagopplaering/tospraaaklig-fagopplaering-liten.svg"];const CoursePageBanner_stories={title:"Components/CoursePageBanner",component:CoursePageBanner};var CoursePageBannerComponent={render:function render(args){return{components:{CoursePageBanner},setup:function setup(){return{args}},template:'<CoursePageBanner v-bind="args"/>'}},args:{theme:"theme_0",imageUrl:CoursePageBanner_stories_images[1],title:"Inkludering og universell utforming i praksis.",languages:"all"},tags:["autodocs"],argTypes:{theme:{control:{type:"select"},options:["theme_0","theme_1","theme_2","theme_3","theme_4","theme_5","theme_6","theme_7","theme_8"]},imageUrl:{control:{type:"select"},options:CoursePageBanner_stories_images}}};CoursePageBannerComponent.parameters=_objectSpread(_objectSpread({},CoursePageBannerComponent.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_CoursePageBannerComp=CoursePageBannerComponent.parameters)||void 0===_CoursePageBannerComp?void 0:_CoursePageBannerComp.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => ({\n    components: {\n      CoursePageBanner\n    },\n    setup() {\n      return {\n        args\n      };\n    },\n    template: \'<CoursePageBanner v-bind="args"/>\'\n  }),\n  args: {\n    theme: "theme_0",\n    imageUrl: images[1],\n    title: \'Inkludering og universell utforming i praksis.\',\n    languages: \'all\'\n  },\n  tags: ["autodocs"],\n  argTypes: {\n    theme: {\n      control: {\n        type: "select"\n      },\n      options: ["theme_0", "theme_1", "theme_2", "theme_3", "theme_4", "theme_5", "theme_6", "theme_7", "theme_8"]\n    },\n    imageUrl: {\n      control: {\n        type: "select"\n      },\n      options: images\n    }\n  }\n}'},null===(_CoursePageBannerComp2=CoursePageBannerComponent.parameters)||void 0===_CoursePageBannerComp2||null===(_CoursePageBannerComp2=_CoursePageBannerComp2.docs)||void 0===_CoursePageBannerComp2?void 0:_CoursePageBannerComp2.source)})});var __namedExportsOrder=["CoursePageBannerComponent"]},"./src/vue/utils/lang-utils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor)}}function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}__webpack_require__.d(__webpack_exports__,{cN:()=>extractLabelForSelectedLanguage,ht:()=>getLanguageCode,YI:()=>getSelectedLanguage,t3:()=>setLanguageParameter});var MultilangUtils=function(){function MultilangUtils(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,MultilangUtils)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(MultilangUtils,null,[{key:"LANGUAGES",get:function get(){return[{key:"nb",name:"Bokmål"},{key:"se",name:"Sápmi"},{key:"nn",name:"Nynorsk"}]}},{key:"COOKIE_NAME",get:function get(){return"lang"}},{key:"getLanguageParameter",value:function getLanguageParameter(){return new URLSearchParams(location.search).get(this.COOKIE_NAME)}},{key:"setLanguageParameter",value:function setLanguageParameter(languageCode){var params=new URLSearchParams(location.search);params.set(this.COOKIE_NAME,languageCode),window.history.replaceState({},"","".concat(location.pathname,"?").concat(params))}},{key:"getLanguageCookie",value:function getLanguageCookie(){return document.cookie.replace(/(?:(?:^|.*;\s*)courselanguage\s*\=\s*([^;]*).*$)|^.*$/,"$1")}},{key:"setLanguageCookie",value:function setLanguageCookie(languageCode){document.cookie="courselanguage=".concat(languageCode,"; SameSite=Strict; path=/")}},{key:"getLanguageCode",value:function getLanguageCode(){var langCode=MultilangUtils.getLanguageParameter(),langCookie=MultilangUtils.getLanguageCookie();return langCode||(langCookie||"nb")}},{key:"getPreferredLanguage",value:function getPreferredLanguage(){return"nb"==MultilangUtils.getLanguageCode?_env.LOCALE:MultilangUtils.getLanguageCode()}},{key:"setActiveLanguage",value:function setActiveLanguage(activeLang){MultilangUtils.setLanguageCookie(activeLang),MultilangUtils.setLanguageParameter(activeLang)}}]),MultilangUtils}();const previous_lang_utils=(_defineProperty(_ref={getLanguageCode:function getLanguageCode(){return MultilangUtils.getLanguageCode()},setActiveLanguage:function setActiveLanguage(langCode){MultilangUtils.setActiveLanguage(langCode)},languagesMap:function languagesMap(){return MultilangUtils.languagesMap()},languagesExcept:function languagesExcept(selectedLang){return MultilangUtils.languagesExcept(selectedLang)},getLanguageParameter:function getLanguageParameter(){return MultilangUtils.getLanguageParameter()}},"languagesMap",(function languagesMap(){return MultilangUtils.languagesMap()})),_defineProperty(_ref,"getPreferredLanguage",(function getPreferredLanguage(){return MultilangUtils.getPreferredLanguage()})),_ref);var _ref;function extractLabelForSelectedLanguage(label,param){if(/\w\w:/.test(label)){var match=new RegExp("".concat(param,": (.+?)(?:\\||$)")).exec(label);if(match)return match[1];var alternatives=label.split("|");if(alternatives.length>1)return alternatives[0].trim().replace(/^\w\w:/,"").trim()}return label}function getSelectedLanguage(){return previous_lang_utils.getLanguageParameter()}function getLanguageCode(){previous_lang_utils.getLanguageCode()}function setLanguageParameter(lang){previous_lang_utils.setActiveLanguage(lang)}},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/course-page-banner/CoursePageBanner.vue?vue&type=style&index=0&id=5b64720a&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".course-page__banner{width:100%;height:12rem;padding:0 1rem 0 1rem;margin:2.5rem 0 2.5rem 0;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box}.course-page__banner__illustration{height:100%;width:auto;display:flex;justify-content:center;align-items:center}.course-page__banner__illustration img{width:100%}.course-page__banner__title{font-family:Montserrat;font-size:36px;font-style:normal;font-weight:500;line-height:normal;margin:0 1rem 0 1rem}.course-page__banner__actions{display:flex;flex-direction:column;gap:1rem;justify-content:center;align-items:flex-end;margin-right:1rem}.course-page__banner.theme_0{background:#e3f2eb}.course-page__banner.theme_1{background:#ef9a9a}.course-page__banner.theme_2{background:#eaeaf5}.course-page__banner.theme_3{background:#f5f7f9}.course-page__banner.theme_4{background:#a0b1bf}.course-page__banner.theme_5{background:#ffebee}.course-page__banner.theme_6{background:#ffcdd2}.course-page__banner.theme_7{background:#ffcc80}.course-page__banner.theme_8{background:#fff3e0}","",{version:3,sources:["webpack://./src/vue/components/course-page-banner/CoursePageBanner.vue"],names:[],mappings:"AAGA,qBACE,UAAA,CACA,YAAA,CACA,qBAAA,CACA,wBAAA,CACA,YAAA,CACA,kBAAA,CACA,6BAAA,CACA,qBAAA,CAEA,mCACE,WAAA,CACA,UAAA,CACA,YAAA,CACA,sBAAA,CACA,kBAAA,CAEA,uCACE,UAAA,CAIJ,4BACE,sBAAA,CACA,cAAA,CACA,iBAAA,CACA,eAAA,CACA,kBAAA,CACA,oBAAA,CAGF,8BACE,YAAA,CACA,qBAAA,CACA,QAAA,CACA,sBAAA,CACA,oBAAA,CACA,iBAAA,CAGF,6BACE,kBAAA,CAEF,6BACE,kBAAA,CAEF,6BACE,kBAAA,CAEF,6BACE,kBAAA,CAEF,6BACE,kBAAA,CAEF,6BACE,kBAAA,CAEF,6BACE,kBAAA,CAEF,6BACE,kBAAA,CAEF,6BACE,kBAAA",sourcesContent:["\n@import '../../design/card-themes';\n\n.course-page__banner {\n  width: 100%;\n  height: 12rem;\n  padding: 0 1rem 0 1rem;\n  margin: 2.5rem 0 2.5rem 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  box-sizing: border-box;\n\n  &__illustration {\n    height: 100%;\n    width: auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    img {\n      width: 100%;\n    }\n  }\n\n  &__title {\n    font-family: Montserrat;\n    font-size: 36px;\n    font-style: normal;\n    font-weight: 500;\n    line-height: normal;\n    margin: 0 1rem 0 1rem;\n  }\n\n  &__actions {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    justify-content: center;\n    align-items: flex-end;\n    margin-right: 1rem;\n  }\n\n  &.theme_0 {\n    background: map-get($theme_0, background);\n  }\n  &.theme_1 {\n    background: map-get($theme_1, background);\n  }\n  &.theme_2 {\n    background: map-get($theme_2, background);\n  }\n  &.theme_3 {\n    background: map-get($theme_3, background);\n  }\n  &.theme_4 {\n    background: map-get($theme_4, background);\n  }\n  &.theme_5 {\n    background: map-get($theme_5, background);\n  }\n  &.theme_6 {\n    background: map-get($theme_6, background);\n  }\n  &.theme_7 {\n    background: map-get($theme_7, background);\n  }\n  &.theme_8 {\n    background: map-get($theme_8, background);\n  }\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);