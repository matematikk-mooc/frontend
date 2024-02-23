"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[240],{"./src/vue/components/modal/ModalExample.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ModalExample_stories});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js"),Modal=__webpack_require__("./src/vue/components/modal/Modal.vue"),Button=__webpack_require__("./src/vue/components/Button.vue"),_hoisted_1={class:"background"},_hoisted_2=(0,vue_esm_bundler._)("h2",null,"This is the header content",-1),_hoisted_3=(0,vue_esm_bundler._)("div",null,"This is the main content",-1);const ModalExamplevue_type_script_setup_true_lang_js={__name:"ModalExample",setup:function setup(__props){var modalOpen=(0,vue_esm_bundler.iH)(!1),openModal=function openModal(){modalOpen.value=!0},closeModal=function closeModal(){modalOpen.value=!1};return function(_ctx,_cache){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("div",_hoisted_1,[(0,vue_esm_bundler.Wm)(Button.Z,{onClick:openModal},{default:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Uk)("Open Modal")]})),_:1}),(0,vue_esm_bundler.Wm)(Modal.Z,{"is-open":modalOpen.value,onClose:closeModal},{header:(0,vue_esm_bundler.w5)((function(){return[_hoisted_2]})),main:(0,vue_esm_bundler.w5)((function(){return[_hoisted_3]})),actions:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Wm)(Button.Z,{type:"filled"},{default:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Uk)("Hello")]})),_:1}),(0,vue_esm_bundler.Wm)(Button.Z,{type:"outlined",onClick:closeModal},{default:(0,vue_esm_bundler.w5)((function(){return[(0,vue_esm_bundler.Uk)("Goodbye")]})),_:1})]})),_:1},8,["is-open"])])}}};var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),ModalExamplevue_type_style_index_0_id_3eb793f8_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/modal/ModalExample.vue?vue&type=style&index=0&id=3eb793f8&lang=scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(ModalExamplevue_type_style_index_0_id_3eb793f8_lang_scss.Z,options);ModalExamplevue_type_style_index_0_id_3eb793f8_lang_scss.Z&&ModalExamplevue_type_style_index_0_id_3eb793f8_lang_scss.Z.locals&&ModalExamplevue_type_style_index_0_id_3eb793f8_lang_scss.Z.locals;const ModalExample=ModalExamplevue_type_script_setup_true_lang_js;ModalExamplevue_type_script_setup_true_lang_js.__docgenInfo={exportName:"default",displayName:"ModalExample",description:"",tags:{},sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/modal/ModalExample.vue"]};const ModalExample_stories={title:"Example/ModalExample",component:ModalExample};var Default=function Template(args){return(0,vue_esm_bundler.aZ)({components:{ModalExample},setup:function setup(){var modalOpen=(0,vue_esm_bundler.iH)(!1);return{modalOpen,openModal:function openModal(){modalOpen.value=!0},closeModal:function closeModal(){modalOpen.value=!1}}},template:"\n      <ModalExample />\n    "})}.bind({});Default.args={},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => defineComponent({\n  components: {\n    ModalExample\n  },\n  setup() {\n    const modalOpen = ref(false);\n    const openModal = () => {\n      modalOpen.value = true;\n    };\n    const closeModal = () => {\n      modalOpen.value = false;\n    };\n    return {\n      modalOpen,\n      openModal,\n      closeModal\n    };\n  },\n  template: `\n      <ModalExample />\n    `\n})",...Default.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => defineComponent({\n  components: {\n    ModalExample\n  },\n  setup() {\n    const modalOpen = ref(false);\n    const openModal = () => {\n      modalOpen.value = true;\n    };\n    const closeModal = () => {\n      modalOpen.value = false;\n    };\n    return {\n      modalOpen,\n      openModal,\n      closeModal\n    };\n  },\n  template: `\n      <ModalExample />\n    `\n})",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/modal/ModalExample.vue?vue&type=style&index=0&id=3eb793f8&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".background{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#f9f9f9;display:flex;justify-content:center;align-items:center}","",{version:3,sources:["webpack://./src/vue/components/modal/ModalExample.vue","webpack://./src/vue/design/colors.scss"],names:[],mappings:"AAEE,YACE,cAAA,CACA,KAAA,CACA,MAAA,CACA,UAAA,CACA,WAAA,CACA,wBCPa,CDQb,YAAA,CACA,sBAAA,CACA,kBAAA",sourcesContent:['\n@import "../../design/colors.scss";\n  .background{\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color:  $color-grey-100;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n  }\n',"// support colors\n$color-grey-100: #f9f9f9; \n$color-grey-200: #f1f1f1;\n$color-grey-300: #eaeaea;\n$color-grey-400: #e6e6e6;\n$color-grey-500: #bfbfbf;\n$color-grey-600: #999999;\n$colorgrey-700: #737373;\n$color-grey-800: #666666;\n$color-grey-900: #303030;\n\n$color-black: #1a1a1a;\n$color-white: #ffffff;\n$primary-hover-color:#00468e;\n\n\n// Color palettes\n$color-palette-green: (\n  background: (\n    200: #e3f2eb,\n    300: #94caae,\n    400: #7dbf9d,\n    500: #3b7858,\n    600: #254b38\n  ),\n  foreground: (\n    200: $color-black,\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n$color-palette-eggshell: (\n  background: (\n    300: #f6efe4,\n    400: #f2e8da,\n    500: #d6b689,\n    600: #8c6631,\n    700: #5e4521\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-peach: (\n  background: (\n    300: #f8ece6,\n    400: #eed0c3,\n    500: #dc9e83,\n    600: #a7532f,\n    700: #63321c\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-black,\n    600: $color-white,\n    700: $color-grey-200\n  )\n);\n\n$color-palette-azur: (\n  background: (\n    300: #eaeaf5,\n    400: #e2e3f1,\n    500: #c7c9e3,\n    600: #999cbf,\n    700: #666883\n  ),\n  foreground: (\n    300: #303030,\n    400: #303030,\n    500: #303030,\n    600: #303030,\n    700: #ffffff\n  )\n);\n\n$color-palette-steel: (\n  background: (\n    200: #f5f7f9,\n    300: #ebeef3,\n    400: #bac6d8,\n    500: #99abc5,\n    600: #51698f,\n    700: #2e3c51\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-slate: (\n  background: (\n    200: #eceff2,\n    300: #a0b1bf,\n    400: #6d889d,\n    500: #546b7d,\n    600: #191d24\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n// extra colors\n$color-palette-red: (\n  background: (\n    200: #ffebee,\n    300: #ffcdd2,\n    400: #ef9a9a,\n    500: #ef5350,\n    600: #c62828\n  ),\n  foreground: (#E2E3F1\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white\n  )\n);\n\n$color-palette-orange: (\n  background: (\n    200: #fff3e0,\n    300: #ffcc80,\n    400: #ffa726,\n    500: #fb8c00,\n    600: #EF6C00\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-black\n  )\n);\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___}}]);