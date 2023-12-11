"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[189],{"./src/vue/stories/Navbar.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Nav:()=>Nav,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Navbar_stories});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js"),_hoisted_1=(0,vue_esm_bundler._)("h1",null,"Logg inn på kompetanseportalen",-1),_hoisted_2=(0,vue_esm_bundler._)("p",null," Dersom du har Feide-bruker kan du logge inn med denne, dersom du ikke har en Feide-bruker, kan du opprette en bruker ved hjelp av en annen e-postadresse og logge inn med denne ",-1);var Modal=__webpack_require__("./src/vue/components/modal/Modal.vue"),Button=__webpack_require__("./src/vue/components/Button.vue");const LoginChoicevue_type_script_lang_js={name:"LoginChoice",components:{Modal:Modal.Z,Button:Button.Z},data:function data(){return{modalOpen:!1}},methods:{openModal:function openModal(){this.modalOpen=!0},closeModal:function closeModal(){this.modalOpen=!1},goToFeide:function goToFeide(){window.location.href=window.location.origin+"/courses?login=1&design=udir"},goToCanvas:function goToCanvas(){window.location.href=window.location.origin+"/login/canvas?normalLogin=1&design=udir"}}};const __exports__=(0,__webpack_require__("./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js").Z)(LoginChoicevue_type_script_lang_js,[["render",function render(_ctx,_cache,$props,$setup,$data,$options){var _component_Button=(0,vue_esm_bundler.up)("Button"),_component_Modal=(0,vue_esm_bundler.up)("Modal");return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)(vue_esm_bundler.HY,null,[(0,vue_esm_bundler._)("a",{class:"header__link",onClick:_cache[0]||(_cache[0]=function(){return $options.openModal&&$options.openModal.apply($options,arguments)})},"Logg inn"),(0,vue_esm_bundler.Wm)(_component_Modal,{"is-open":$data.modalOpen,onClose:$options.closeModal},{header:(0,vue_esm_bundler.w5)((function(){return[_hoisted_1]})),main:(0,vue_esm_bundler.w5)((function(){return[_hoisted_2]})),actions:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Wm)(_component_Button,{class:"btn--lg",type:"feideLogin",onClick:$options.goToFeide},{default:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Uk)("LOGG INN MED FEIDE")]})),_:1},8,["onClick"]),(0,vue_esm_bundler.Wm)(_component_Button,{class:"btn--lg",type:"outlined",onClick:$options.goToCanvas},{default:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Uk)("LOGG INN UTEN FEIDE")]})),_:1},8,["onClick"])]})),_:1},8,["is-open","onClose"])],64)}]]),LoginChoice=__exports__;__exports__.__docgenInfo={displayName:"LoginChoice",exportName:"default",description:"",tags:{},sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/login-choice/LoginChoice.vue"]};var PageHeadervue_type_script_setup_true_lang_js_hoisted_1={class:"header__content"},PageHeadervue_type_script_setup_true_lang_js_hoisted_2=(0,vue_esm_bundler._)("div",{class:"header-brand"},"Kompetanseportalen",-1),_hoisted_3={class:"header__link-list"},_hoisted_4={key:0,class:"header__list-item"},_hoisted_5={key:1,class:"header__list-item"},_hoisted_6={key:2,class:"header__list-item"},_hoisted_7={key:3,class:"header__list-item"};const PageHeadervue_type_script_setup_true_lang_js={__name:"PageHeader",props:["logged_in","admin"],setup:function setup(__props){__props.logged_in,__props.admin;var domain=window.location.origin,settingsLink=domain+"/profile/settings?design=udir",logoutLink=domain+"/logout?design=udir",adminLink=domain+"/accounts?design=udir";return function(_ctx,_cache){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("header",PageHeadervue_type_script_setup_true_lang_js_hoisted_1,[PageHeadervue_type_script_setup_true_lang_js_hoisted_2,(0,vue_esm_bundler._)("ul",_hoisted_3,[__props.admin?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("li",_hoisted_4,[(0,vue_esm_bundler._)("span",null,[(0,vue_esm_bundler._)("a",{class:"header__link",href:adminLink},"Administrator")])])):(0,vue_esm_bundler.kq)("",!0),__props.logged_in?(0,vue_esm_bundler.kq)("",!0):((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("li",_hoisted_5,[(0,vue_esm_bundler._)("span",null,[(0,vue_esm_bundler.Wm)(LoginChoice)])])),__props.logged_in?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("li",_hoisted_6,[(0,vue_esm_bundler._)("span",null,[(0,vue_esm_bundler._)("a",{class:"header__link",href:settingsLink},"Innstillinger")])])):(0,vue_esm_bundler.kq)("",!0),__props.logged_in?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("li",_hoisted_7,[(0,vue_esm_bundler._)("span",null,[(0,vue_esm_bundler._)("a",{class:"header__link",href:logoutLink},"Logg ut")])])):(0,vue_esm_bundler.kq)("",!0)])])}}};var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),PageHeadervue_type_style_index_0_id_2ca42333_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/header/PageHeader.vue?vue&type=style&index=0&id=2ca42333&lang=scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(PageHeadervue_type_style_index_0_id_2ca42333_lang_scss.Z,options);PageHeadervue_type_style_index_0_id_2ca42333_lang_scss.Z&&PageHeadervue_type_style_index_0_id_2ca42333_lang_scss.Z.locals&&PageHeadervue_type_style_index_0_id_2ca42333_lang_scss.Z.locals;const PageHeader=PageHeadervue_type_script_setup_true_lang_js;PageHeadervue_type_script_setup_true_lang_js.__docgenInfo={exportName:"default",displayName:"PageHeader",description:"",tags:{},props:[{name:"logged_in",type:{name:"undefined"}},{name:"admin",type:{name:"undefined"}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/header/PageHeader.vue"]};var NavBarLinksvue_type_script_setup_true_lang_js_hoisted_1={class:"nav-bar__link-list-container"},NavBarLinksvue_type_script_setup_true_lang_js_hoisted_2={class:"nav-bar__link-list"},NavBarLinksvue_type_script_setup_true_lang_js_hoisted_3={key:0,class:"nav-bar__list-item"},NavBarLinksvue_type_script_setup_true_lang_js_hoisted_4={key:1,class:"nav-bar__list-item"};const NavBarLinksvue_type_script_setup_true_lang_js={__name:"NavBarLinks",props:["logged_in"],setup:function setup(__props){var logged_in=__props.logged_in;console.log("LOGGED",logged_in);var domain=window.location.origin,myCourses=domain+"/courses?design=udir",allCourses=domain+"/search/all_courses?design=udir";return function(_ctx,_cache){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("div",NavBarLinksvue_type_script_setup_true_lang_js_hoisted_1,[(0,vue_esm_bundler._)("ul",NavBarLinksvue_type_script_setup_true_lang_js_hoisted_2,[__props.logged_in?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("li",NavBarLinksvue_type_script_setup_true_lang_js_hoisted_3,[(0,vue_esm_bundler._)("span",null,[(0,vue_esm_bundler._)("a",{class:"nav-bar__link",href:myCourses},"Mine kompetansepakker")])])):(0,vue_esm_bundler.kq)("",!0),__props.logged_in?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("li",NavBarLinksvue_type_script_setup_true_lang_js_hoisted_4,[(0,vue_esm_bundler._)("span",null,[(0,vue_esm_bundler._)("a",{class:"nav-bar__link",href:allCourses},"Alle tilgjengelige kompetansepakker")])])):(0,vue_esm_bundler.kq)("",!0)])])}}};var NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/header/NavBarLinks.vue?vue&type=style&index=0&id=43ef3506&lang=scss"),NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss_options={};NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss_options.styleTagTransform=styleTagTransform_default(),NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss_options.setAttributes=setAttributesWithoutAttributes_default(),NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss_options.insert=insertBySelector_default().bind(null,"head"),NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss_options.domAPI=styleDomAPI_default(),NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss.Z,NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss_options);NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss.Z&&NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss.Z.locals&&NavBarLinksvue_type_style_index_0_id_43ef3506_lang_scss.Z.locals;const NavBarLinks=NavBarLinksvue_type_script_setup_true_lang_js;NavBarLinksvue_type_script_setup_true_lang_js.__docgenInfo={exportName:"default",displayName:"NavBarLinks",description:"",tags:{},props:[{name:"logged_in",type:{name:"undefined"}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/header/NavBarLinks.vue"]};var NavBarvue_type_script_setup_true_lang_js_hoisted_1={class:"header--nav-container"},NavBarvue_type_script_setup_true_lang_js_hoisted_2=(0,vue_esm_bundler._)("a",{class:"skip-to-content-link",href:"#wiki_page_show"}," Gå til hovedinnhold ",-1),NavBarvue_type_script_setup_true_lang_js_hoisted_3={class:"page--nav-bar"};const NavBarvue_type_script_setup_true_lang_js={__name:"NavBar",props:["logged_in","admin"],setup:function setup(__props){__props.logged_in,__props.admin;return function(_ctx,_cache){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("div",NavBarvue_type_script_setup_true_lang_js_hoisted_1,[NavBarvue_type_script_setup_true_lang_js_hoisted_2,(0,vue_esm_bundler.Wm)(PageHeader,{logged_in:__props.logged_in,admin:__props.admin},null,8,["logged_in","admin"]),(0,vue_esm_bundler._)("nav",NavBarvue_type_script_setup_true_lang_js_hoisted_3,[(0,vue_esm_bundler.Wm)(NavBarLinks,{logged_in:__props.logged_in},null,8,["logged_in"])])])}}};var NavBarvue_type_style_index_0_id_7193f93b_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/header/NavBar.vue?vue&type=style&index=0&id=7193f93b&lang=scss"),NavBarvue_type_style_index_0_id_7193f93b_lang_scss_options={};NavBarvue_type_style_index_0_id_7193f93b_lang_scss_options.styleTagTransform=styleTagTransform_default(),NavBarvue_type_style_index_0_id_7193f93b_lang_scss_options.setAttributes=setAttributesWithoutAttributes_default(),NavBarvue_type_style_index_0_id_7193f93b_lang_scss_options.insert=insertBySelector_default().bind(null,"head"),NavBarvue_type_style_index_0_id_7193f93b_lang_scss_options.domAPI=styleDomAPI_default(),NavBarvue_type_style_index_0_id_7193f93b_lang_scss_options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(NavBarvue_type_style_index_0_id_7193f93b_lang_scss.Z,NavBarvue_type_style_index_0_id_7193f93b_lang_scss_options);NavBarvue_type_style_index_0_id_7193f93b_lang_scss.Z&&NavBarvue_type_style_index_0_id_7193f93b_lang_scss.Z.locals&&NavBarvue_type_style_index_0_id_7193f93b_lang_scss.Z.locals;const NavBar=NavBarvue_type_script_setup_true_lang_js;var _Nav$parameters,_Nav$parameters2;function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}NavBarvue_type_script_setup_true_lang_js.__docgenInfo={exportName:"default",displayName:"NavBar",description:"",tags:{},props:[{name:"logged_in",type:{name:"undefined"}},{name:"admin",type:{name:"undefined"}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/header/NavBar.vue"]};const Navbar_stories={component:NavBar};var Nav={render:function render(args){return{components:{NavBar},setup:function setup(){return{args}},template:"<NavBar/>"}},tags:["autodocs"]};Nav.parameters=_objectSpread(_objectSpread({},Nav.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Nav$parameters=Nav.parameters)||void 0===_Nav$parameters?void 0:_Nav$parameters.docs),{},{source:_objectSpread({originalSource:'{\n  render: args => ({\n    components: {\n      NavBar\n    },\n    setup() {\n      return {\n        args\n      };\n    },\n    template: "<NavBar/>"\n  }),\n  tags: ["autodocs"]\n}'},null===(_Nav$parameters2=Nav.parameters)||void 0===_Nav$parameters2||null===(_Nav$parameters2=_Nav$parameters2.docs)||void 0===_Nav$parameters2?void 0:_Nav$parameters2.source)})});var __namedExportsOrder=["Nav"]},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/header/NavBar.vue?vue&type=style&index=0&id=7193f93b&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".header--nav-container{width:100%;flex-grow:0;display:flex;flex-direction:column;justify-content:flex-start;align-items:flex-start;padding:0}.header--nav-container .skip-to-content-link{left:50%;position:absolute;transform:translateY(-100%)}.page--nav-bar{width:100%;height:4rem;display:flex;justify-content:center;align-items:center;padding:.75rem 0;background-color:#303030}.header--links{display:flex;flex-direction:row;justify-content:flex-start;text-align:center;min-width:40rem;cursor:pointer}","",{version:3,sources:["webpack://./src/vue/components/header/NavBar.vue","webpack://./src/vue/design/colors.scss"],names:[],mappings:"AAGA,uBACE,UAAA,CACA,WAAA,CACA,YAAA,CACA,qBAAA,CACA,0BAAA,CACA,sBAAA,CACA,SAAA,CACA,6CACA,QAAA,CACA,iBAAA,CACA,2BAAA,CAIF,eACE,UAAA,CACA,WAAA,CACA,YAAA,CACA,sBAAA,CACA,kBAAA,CACA,gBAAA,CACA,wBChBe,CDmBjB,eACE,YAAA,CACA,kBAAA,CACA,0BAAA,CACA,iBAAA,CACA,eAAA,CACA,cAAA",sourcesContent:["\n@import '../../design/colors.scss';\n\n.header--nav-container {\n  width: 100%;\n  flex-grow: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  padding: 0;\n  .skip-to-content-link {\n  left: 50%;\n  position: absolute;\n  transform: translateY(-100%);\n}\n}\n\n.page--nav-bar {\n  width: 100%;\n  height: 4rem;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 0.75rem 0;\n  background-color: $color-grey-900;\n}\n\n.header--links {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  text-align: center;\n  min-width: 40rem;\n  cursor: pointer;\n}\n","// support colors\n$color-grey-100: #f9f9f9; \n$color-grey-200: #f1f1f1;\n$color-grey-300: #eaeaea;\n$color-grey-400: #e6e6e6;\n$color-grey-500: #bfbfbf;\n$color-grey-600: #999999;\n$colorgrey-700: #737373;\n$color-grey-800: #666666;\n$color-grey-900: #303030;\n\n$color-black: #1a1a1a;\n$color-white: #ffffff;\n$primary-hover-color:#00468e;\n\n\n// Color palettes\n$color-palette-green: (\n  background: (\n    200: #e3f2eb,\n    300: #94caae,\n    400: #7dbf9d,\n    500: #3b7858,\n    600: #254b38\n  ),\n  foreground: (\n    200: $color-black,\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n$color-palette-eggshell: (\n  background: (\n    300: #f6efe4,\n    400: #f2e8da,\n    500: #d6b689,\n    600: #8c6631,\n    700: #5e4521\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-peach: (\n  background: (\n    300: #f8ece6,\n    400: #eed0c3,\n    500: #dc9e83,\n    600: #a7532f,\n    700: #63321c\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-black,\n    600: $color-white,\n    700: $color-grey-200\n  )\n);\n\n$color-palette-azur: (\n  background: (\n    300: #eaeaf5,\n    400: #e2e3f1,\n    500: #c7c9e3,\n    600: #999cbf,\n    700: #666883\n  ),\n  foreground: (\n    300: #303030,\n    400: #303030,\n    500: #303030,\n    600: #303030,\n    700: #ffffff\n  )\n);\n\n$color-palette-steel: (\n  background: (\n    200: #f5f7f9,\n    300: #ebeef3,\n    400: #bac6d8,\n    500: #99abc5,\n    600: #51698f,\n    700: #2e3c51\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-slate: (\n  background: (\n    200: #eceff2,\n    300: #a0b1bf,\n    400: #6d889d,\n    500: #546b7d,\n    600: #191d24\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n// extra colors\n$color-palette-red: (\n  background: (\n    200: #ffebee,\n    300: #ffcdd2,\n    400: #ef9a9a,\n    500: #ef5350,\n    600: #c62828\n  ),\n  foreground: (#E2E3F1\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white\n  )\n);\n\n$color-palette-orange: (\n  background: (\n    200: #fff3e0,\n    300: #ffcc80,\n    400: #ffa726,\n    500: #fb8c00,\n    600: #EF6C00\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-black\n  )\n);\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/header/NavBarLinks.vue?vue&type=style&index=0&id=43ef3506&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'.nav-bar__link-list-container{display:block}.nav-bar__link-list{display:flex;position:relative;justify-content:flex-start;align-items:center;padding:.25rem;margin-left:1.7rem;margin-top:.875rem;width:100%;height:100%}.nav-bar__list-item{display:block;margin:0 1.5rem .25rem .5rem;position:relative;font-weight:500;color:#fff}.nav-bar__list-item:before{height:0;width:0}.nav-bar__list-item:not(:last-child):after{background-color:#7dbf9d;content:"";display:block;height:1.25rem;text-decoration:none;word-break:break-word;position:absolute;top:50%;right:-1rem;transform:translateY(-50%);width:.063rem}.nav-bar__link{display:block;color:#fff;text-decoration:none;font-size:1.125rem;font-weight:500}.nav-bar__link:hover{color:#7dbf9d}',"",{version:3,sources:["webpack://./src/vue/components/header/NavBarLinks.vue","webpack://./src/vue/design/colors.scss"],names:[],mappings:"AAGA,8BACE,aAAA,CAEF,oBACE,YAAA,CACA,iBAAA,CACA,0BAAA,CACA,kBAAA,CACA,cAAA,CACA,kBAAA,CACA,kBAAA,CACA,UAAA,CACA,WAAA,CAGF,oBACE,aAAA,CACA,4BAAA,CACA,iBAAA,CACA,eAAA,CACA,UCXY,CDYZ,2BACE,QAAA,CACA,OAAA,CAEF,2CACE,wBAAA,CACA,UAAA,CACA,aAAA,CACA,cAAA,CACA,oBAAA,CACA,qBAAA,CACA,iBAAA,CACA,OAAA,CACA,WAAA,CACA,0BAAA,CACA,aAAA,CAIJ,eACE,aAAA,CACA,UCjCY,CDkCZ,oBAAA,CACA,kBAAA,CACA,eAAA,CACA,qBACE,aAAA",sourcesContent:["\n@import '../../design/colors.scss';\n\n.nav-bar__link-list-container {\n  display: block;\n}\n.nav-bar__link-list {\n  display: flex;\n  position: relative;\n  justify-content: flex-start;\n  align-items: center;\n  padding: 0.25rem;\n  margin-left: 1.7rem;\n  margin-top: 0.875rem;\n  width: 100%;\n  height: 100%;\n}\n\n.nav-bar__list-item {\n  display: block;\n  margin: 0 1.5rem 0.25rem 0.5rem;\n  position: relative;\n  font-weight: 500;\n  color: $color-white;\n  &:before {\n    height: 0;\n    width: 0;\n  }\n  &:not(:last-child):after {\n    background-color: map-get($color-palette-green, background, 400);\n    content: '';\n    display: block;\n    height: 1.25rem;\n    text-decoration: none;\n    word-break: break-word;\n    position: absolute;\n    top: 50%;\n    right: -1rem;\n    transform: translateY(-50%);\n    width: 0.063rem;\n  }\n}\n\n.nav-bar__link {\n  display: block;\n  color: $color-white;\n  text-decoration: none;\n  font-size: 1.125rem;\n  font-weight: 500;\n  &:hover {\n    color: map-get($color-palette-green, background, 400);\n  }\n}\n","// support colors\n$color-grey-100: #f9f9f9; \n$color-grey-200: #f1f1f1;\n$color-grey-300: #eaeaea;\n$color-grey-400: #e6e6e6;\n$color-grey-500: #bfbfbf;\n$color-grey-600: #999999;\n$colorgrey-700: #737373;\n$color-grey-800: #666666;\n$color-grey-900: #303030;\n\n$color-black: #1a1a1a;\n$color-white: #ffffff;\n$primary-hover-color:#00468e;\n\n\n// Color palettes\n$color-palette-green: (\n  background: (\n    200: #e3f2eb,\n    300: #94caae,\n    400: #7dbf9d,\n    500: #3b7858,\n    600: #254b38\n  ),\n  foreground: (\n    200: $color-black,\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n$color-palette-eggshell: (\n  background: (\n    300: #f6efe4,\n    400: #f2e8da,\n    500: #d6b689,\n    600: #8c6631,\n    700: #5e4521\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-peach: (\n  background: (\n    300: #f8ece6,\n    400: #eed0c3,\n    500: #dc9e83,\n    600: #a7532f,\n    700: #63321c\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-black,\n    600: $color-white,\n    700: $color-grey-200\n  )\n);\n\n$color-palette-azur: (\n  background: (\n    300: #eaeaf5,\n    400: #e2e3f1,\n    500: #c7c9e3,\n    600: #999cbf,\n    700: #666883\n  ),\n  foreground: (\n    300: #303030,\n    400: #303030,\n    500: #303030,\n    600: #303030,\n    700: #ffffff\n  )\n);\n\n$color-palette-steel: (\n  background: (\n    200: #f5f7f9,\n    300: #ebeef3,\n    400: #bac6d8,\n    500: #99abc5,\n    600: #51698f,\n    700: #2e3c51\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-slate: (\n  background: (\n    200: #eceff2,\n    300: #a0b1bf,\n    400: #6d889d,\n    500: #546b7d,\n    600: #191d24\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n// extra colors\n$color-palette-red: (\n  background: (\n    200: #ffebee,\n    300: #ffcdd2,\n    400: #ef9a9a,\n    500: #ef5350,\n    600: #c62828\n  ),\n  foreground: (#E2E3F1\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white\n  )\n);\n\n$color-palette-orange: (\n  background: (\n    200: #fff3e0,\n    300: #ffcc80,\n    400: #ffa726,\n    500: #fb8c00,\n    600: #EF6C00\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-black\n  )\n);\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/header/PageHeader.vue?vue&type=style&index=0&id=2ca42333&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'.header__content{display:flex;align-items:center;justify-content:space-between;flex-grow:1;font-family:"Montserrat","Helvetica Neue","sans-serif";padding:1.25rem 0 1.25rem 0;width:100%}.header-brand{height:1.813rem;flex-grow:0;font-family:"montserrat";font-size:1.5rem;font-weight:500;font-stretch:normal;font-style:normal;line-height:normal;letter-spacing:normal;text-align:left;color:#1a1a1a;margin-left:.75rem}.header__link-list{display:flex;position:relative;justify-content:flex-start;align-items:center;margin-left:1.7rem;margin-top:.875rem}.header__list-item{display:block;margin:.25rem 1.5rem .25rem 0;position:relative;font-weight:500}.header__list-item:before{height:0;width:0}.header__list-item:not(:last-child):after{background-color:#eaeaea;content:"";display:block;height:1.25rem;text-decoration:none;word-break:break-word;position:absolute;top:50%;right:-0.875rem;transform:translateY(-50%);width:.125rem}.header__link{display:block;font-size:1.125rem;color:#303030;text-decoration:none;border-bottom:.125rem solid #fff}.header__link:hover{color:#00468e;border-bottom:.125rem solid #00468e}.header__link::after{display:block;content:"";position:absolute;right:.75rem;top:.5rem;width:.125rem}',"",{version:3,sources:["webpack://./src/vue/components/header/PageHeader.vue","webpack://./src/vue/design/colors.scss"],names:[],mappings:"AAGA,iBACE,YAAA,CACA,kBAAA,CACA,6BAAA,CACA,WAAA,CACA,sDAAA,CACA,2BAAA,CACA,UAAA,CAGF,cACE,eAAA,CACA,WAAA,CACA,wBAAA,CACA,gBAAA,CACA,eAAA,CACA,mBAAA,CACA,iBAAA,CACA,kBAAA,CACA,qBAAA,CACA,eAAA,CACA,aCbY,CDcZ,kBAAA,CAGF,mBACE,YAAA,CACA,iBAAA,CACA,0BAAA,CACA,kBAAA,CACA,kBAAA,CACA,kBAAA,CAGF,mBACE,aAAA,CACA,6BAAA,CACA,iBAAA,CACA,eAAA,CACA,0BACE,QAAA,CACA,OAAA,CAEF,0CACE,wBC5Ca,CD6Cb,UAAA,CACA,aAAA,CACA,cAAA,CACA,oBAAA,CACA,qBAAA,CACA,iBAAA,CACA,OAAA,CACA,eAAA,CACA,0BAAA,CACA,aAAA,CAIJ,cACE,aAAA,CACA,kBAAA,CACA,aCvDe,CDwDf,oBAAA,CACA,gCAAA,CACA,oBACE,aAAA,CACA,mCAAA,CAEF,qBACE,aAAA,CACA,UAAA,CACA,iBAAA,CACA,YAAA,CACA,SAAA,CACA,aAAA",sourcesContent:["\n@import '../../design/colors.scss';\n\n.header__content {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-grow: 1;\n  font-family: 'Montserrat', 'Helvetica Neue', 'sans-serif';\n  padding: 1.25rem 0 1.25rem 0;\n  width: 100%;\n}\n\n.header-brand {\n  height: 1.813rem;\n  flex-grow: 0;\n  font-family: 'montserrat';\n  font-size: 1.5rem;\n  font-weight: 500;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  text-align: left;\n  color: $color-black;\n  margin-left: .75rem;\n}\n\n.header__link-list {\n  display: flex;\n  position: relative;\n  justify-content: flex-start;\n  align-items: center;\n  margin-left: 1.7rem;\n  margin-top: 0.875rem;\n}\n\n.header__list-item {\n  display: block;\n  margin: 0.25rem 1.5rem 0.25rem 0;\n  position: relative;\n  font-weight: 500;\n  &:before {\n    height: 0;\n    width: 0;\n  }\n  &:not(:last-child):after {\n    background-color: $color-grey-300;\n    content: '';\n    display: block;\n    height: 1.25rem;\n    text-decoration: none;\n    word-break: break-word;\n    position: absolute;\n    top: 50%;\n    right: -0.875rem;\n    transform: translateY(-50%);\n    width: 0.125rem;\n  }\n}\n\n.header__link {\n  display: block;\n  font-size: 1.125rem;\n  color: $color-grey-900;\n  text-decoration: none;\n  border-bottom: 0.125rem solid $color-white;\n  &:hover {\n    color: #00468e;\n    border-bottom: 0.125rem solid #00468e;\n  }\n  &::after {\n    display: block;\n    content: '';\n    position: absolute;\n    right: 0.75rem;\n    top: 0.5rem;\n    width: 0.125rem;\n  }\n}\n","// support colors\n$color-grey-100: #f9f9f9; \n$color-grey-200: #f1f1f1;\n$color-grey-300: #eaeaea;\n$color-grey-400: #e6e6e6;\n$color-grey-500: #bfbfbf;\n$color-grey-600: #999999;\n$colorgrey-700: #737373;\n$color-grey-800: #666666;\n$color-grey-900: #303030;\n\n$color-black: #1a1a1a;\n$color-white: #ffffff;\n$primary-hover-color:#00468e;\n\n\n// Color palettes\n$color-palette-green: (\n  background: (\n    200: #e3f2eb,\n    300: #94caae,\n    400: #7dbf9d,\n    500: #3b7858,\n    600: #254b38\n  ),\n  foreground: (\n    200: $color-black,\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n$color-palette-eggshell: (\n  background: (\n    300: #f6efe4,\n    400: #f2e8da,\n    500: #d6b689,\n    600: #8c6631,\n    700: #5e4521\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-peach: (\n  background: (\n    300: #f8ece6,\n    400: #eed0c3,\n    500: #dc9e83,\n    600: #a7532f,\n    700: #63321c\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-black,\n    600: $color-white,\n    700: $color-grey-200\n  )\n);\n\n$color-palette-azur: (\n  background: (\n    300: #eaeaf5,\n    400: #e2e3f1,\n    500: #c7c9e3,\n    600: #999cbf,\n    700: #666883\n  ),\n  foreground: (\n    300: #303030,\n    400: #303030,\n    500: #303030,\n    600: #303030,\n    700: #ffffff\n  )\n);\n\n$color-palette-steel: (\n  background: (\n    200: #f5f7f9,\n    300: #ebeef3,\n    400: #bac6d8,\n    500: #99abc5,\n    600: #51698f,\n    700: #2e3c51\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-slate: (\n  background: (\n    200: #eceff2,\n    300: #a0b1bf,\n    400: #6d889d,\n    500: #546b7d,\n    600: #191d24\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n// extra colors\n$color-palette-red: (\n  background: (\n    200: #ffebee,\n    300: #ffcdd2,\n    400: #ef9a9a,\n    500: #ef5350,\n    600: #c62828\n  ),\n  foreground: (#E2E3F1\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white\n  )\n);\n\n$color-palette-orange: (\n  background: (\n    200: #fff3e0,\n    300: #ffcc80,\n    400: #ffa726,\n    500: #fb8c00,\n    600: #EF6C00\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-black\n  )\n);\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);