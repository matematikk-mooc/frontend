"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[973],{"./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js":(__unused_webpack_module,exports)=>{exports.Z=(sfc,props)=>{const target=sfc.__vccOpts||sfc;for(const[key,val]of props)target[key]=val;return target}},"./src/vue/components/dropdown-button/DropdownButton.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DropdownButtonComponent:()=>DropdownButtonComponent,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _DropdownButtonCompon,_DropdownButtonCompon2,_DropdownButton_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/vue/components/dropdown-button/DropdownButton.vue");function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}const __WEBPACK_DEFAULT_EXPORT__={title:"Components/DropdownButton",component:_DropdownButton_vue__WEBPACK_IMPORTED_MODULE_0__.Z};var DropdownButtonComponent=function DropdownButtonComponent(args){return{components:{DropdownButton:_DropdownButton_vue__WEBPACK_IMPORTED_MODULE_0__.Z},setup:function setup(){return{args}},template:'<DropdownButton v-bind="args" />'}};DropdownButtonComponent.argTypes={options:{control:"object"}},DropdownButtonComponent.args={options:[{key:"nb",value:"Bokmål"},{key:"nn",value:"Nynorsk"},{key:"se",value:"Sápmi"}],preselect:"se"},DropdownButtonComponent.parameters=_objectSpread(_objectSpread({},DropdownButtonComponent.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_DropdownButtonCompon=DropdownButtonComponent.parameters)||void 0===_DropdownButtonCompon?void 0:_DropdownButtonCompon.docs),{},{source:_objectSpread({originalSource:"args => ({\n  components: {\n    DropdownButton\n  },\n  setup() {\n    return {\n      args\n    };\n  },\n  template: '<DropdownButton v-bind=\"args\" />'\n})"},null===(_DropdownButtonCompon2=DropdownButtonComponent.parameters)||void 0===_DropdownButtonCompon2||null===(_DropdownButtonCompon2=_DropdownButtonCompon2.docs)||void 0===_DropdownButtonCompon2?void 0:_DropdownButtonCompon2.source)})});var __namedExportsOrder=["DropdownButtonComponent"]},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/dropdown-button/DropdownButton.vue?vue&type=style&index=0&id=10261518&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".dropdown{position:relative;width:9rem}.dropdown .dropdown-button__content{display:flex;justify-content:flex-start;align-items:center;position:relative}.dropdown .dropdown-button__content .toggle-icon{position:relative;bottom:-0.15rem;margin-left:.15rem;transition:transform .3s ease}.dropdown .dropdown-button__content--open .toggle-icon{transform:rotateX(-180deg);bottom:0}.dropdown__content{width:100%;position:absolute;top:3rem;list-style:none;padding:0;margin:0;overflow:hidden;background-color:#fff;border-top:none;border-radius:.25rem;display:hidden;box-shadow:0 .2rem .3rem rgba(19,19,19,.35);animation-name:hideshow;animation-duration:.7s;animation-iteration-count:1;animation-direction:alternate}@keyframes hideshow{0%{opacity:0}100%{opacity:1}}.dropdown__content.show{display:block}.dropdown__item{padding:.75rem;cursor:pointer;min-width:6rem}.dropdown__item:hover{background-color:#303030;color:#fff}","",{version:3,sources:["webpack://./src/vue/components/dropdown-button/DropdownButton.vue","webpack://./src/vue/design/colors.scss","webpack://./src/vue/design/_box-shadow.scss","webpack://./src/vue/design/_hide-show-effect.scss"],names:[],mappings:"AAKA,UACE,iBAAA,CACA,UAAA,CACA,oCACE,YAAA,CACA,0BAAA,CACA,kBAAA,CACA,iBAAA,CACA,iDACE,iBAAA,CACA,eAAA,CACA,kBAAA,CACA,6BAAA,CAIA,uDACE,0BAAA,CACA,QAAA,CAKN,mBACE,UAAA,CACA,iBAAA,CACA,QAAA,CACA,eAAA,CACA,SAAA,CACA,QAAA,CACA,eAAA,CACA,qBCxBU,CDyBV,eAAA,CACA,oBAAA,CACA,cAAA,CEhCA,2CANgB,CAAA,uBAAA,CCClB,sBAAA,CACA,2BAAA,CACA,6BAAA,CAEA,oBACE,GACE,SAAA,CAEF,KACE,SAAA,CAAA,CHgCF,wBACE,aAAA,CAIJ,gBACE,cAAA,CACA,cAAA,CACA,cAAA,CAEA,sBACE,wBC7CW,CD8CX,UC3CQ",sourcesContent:['\n@import "../../design/hide-show-effect";\n@import "../../design/box-shadow";\n@import "../../design/colors.scss";\n\n.dropdown {\n  position: relative;\n  width: 9rem;\n  .dropdown-button__content {\n    display: flex;\n    justify-content: flex-start;\n    align-items: center;\n    position: relative;\n    .toggle-icon {\n      position: relative;\n      bottom: -0.15rem;\n      margin-left: 0.15rem;\n      transition: transform 0.3s ease;\n    }\n\n    &--open {\n      .toggle-icon {\n        transform: rotateX(-180deg);\n        bottom: 0;\n      }\n    }\n  }\n\n  &__content {\n    width: 100%;\n    position: absolute;\n    top: 3rem;\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    overflow: hidden;\n    background-color:$color-white;\n    border-top: none;\n    border-radius: 0.25rem;\n    display: hidden;\n    @include box-shadow(medium);\n    @include hide-show-effect;\n\n    &.show {\n      display: block;\n    }\n  }\n\n  &__item {\n    padding: 0.75rem;\n    cursor: pointer;\n    min-width: 6rem;\n\n    &:hover {\n      background-color: $color-grey-900;\n      color:$color-white;\n    }\n  }\n}\n',"// support colors\n$color-grey-100: #f9f9f9; \n$color-grey-200: #f1f1f1;\n$color-grey-300: #eaeaea;\n$color-grey-400: #e6e6e6;\n$color-grey-500: #bfbfbf;\n$color-grey-600: #999999;\n$colorgrey-700: #737373;\n$color-grey-800: #666666;\n$color-grey-900: #303030;\n\n$color-black: #1a1a1a;\n$color-white: #ffffff;\n$primary-hover-color:#00468e;\n\n\n// Color palettes\n$color-palette-green: (\n  background: (\n    200: #e3f2eb,\n    300: #94caae,\n    400: #7dbf9d,\n    500: #3b7858,\n    600: #254b38\n  ),\n  foreground: (\n    200: $color-black,\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n$color-palette-eggshell: (\n  background: (\n    300: #f6efe4,\n    400: #f2e8da,\n    500: #d6b689,\n    600: #8c6631,\n    700: #5e4521\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-peach: (\n  background: (\n    300: #f8ece6,\n    400: #eed0c3,\n    500: #dc9e83,\n    600: #a7532f,\n    700: #63321c\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-black,\n    600: $color-white,\n    700: $color-grey-200\n  )\n);\n\n$color-palette-azur: (\n  background: (\n    300: #eaeaf5,\n    400: #e2e3f1,\n    500: #c7c9e3,\n    600: #999cbf,\n    700: #666883\n  ),\n  foreground: (\n    300: #303030,\n    400: #303030,\n    500: #303030,\n    600: #303030,\n    700: #ffffff\n  )\n);\n\n$color-palette-steel: (\n  background: (\n    200: #f5f7f9,\n    300: #ebeef3,\n    400: #bac6d8,\n    500: #99abc5,\n    600: #51698f,\n    700: #2e3c51\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-slate: (\n  background: (\n    200: #eceff2,\n    300: #a0b1bf,\n    400: #6d889d,\n    500: #546b7d,\n    600: #191d24\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n// extra colors\n$color-palette-red: (\n  background: (\n    200: #ffebee,\n    300: #ffcdd2,\n    400: #ef9a9a,\n    500: #ef5350,\n    600: #c62828\n  ),\n  foreground: (#E2E3F1\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white\n  )\n);\n\n$color-palette-orange: (\n  background: (\n    200: #fff3e0,\n    300: #ffcc80,\n    400: #ffa726,\n    500: #fb8c00,\n    600: #EF6C00\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-black\n  )\n);\n","$box-shadow-small: 0 0.1rem 0.2rem rgba(19, 19, 19, 0.15);\n$box-shadow-medium: 0 0.2rem 0.3rem rgba(19, 19, 19, 0.35);\n\n@mixin box-shadow($size: small) {\n  @if $size == small {\n    box-shadow: $box-shadow-small;\n  } @else if $size == medium {\n    box-shadow: $box-shadow-medium;\n  } @else {\n    box-shadow: 0;\n  }\n}\n","@mixin hide-show-effect() {\n  animation-name: hideshow;\n  animation-duration: 0.7s;\n  animation-iteration-count: 1;\n  animation-direction: alternate;\n\n  @keyframes hideshow {\n    0% {\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/runtime/api.js":module=>{module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}},"./src/vue/components/dropdown-button/DropdownButton.vue":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DropdownButton});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js"),_hoisted_1={class:"dropdown"},_hoisted_2={key:0,class:"dropdown__content"},_hoisted_3=["onClick"];var Button=__webpack_require__("./src/vue/components/Button.vue"),Icon=__webpack_require__("./src/vue/components/icon/Icon.vue");const DropdownButtonvue_type_script_lang_js={props:{options:Array,preselect:String},data:function data(){var _this=this;return{isOpen:!1,selectedOption:this.preselect?this.options.find((function(item){return item.key===_this.preselect})):this.options[0]}},emits:["selected"],methods:{toggleDropdown:function toggleDropdown(){this.isOpen=!this.isOpen},selectOption:function selectOption(option){this.selectedOption=option,this.isOpen=!1,this.$emit("selected",option.key)}},computed:{filteredOptions:function filteredOptions(){var _this2=this;return this.options.filter((function(option){return option.key!==_this2.selectedOption.key}))}},components:{Button:Button.Z,Icon:Icon.Z}};var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),DropdownButtonvue_type_style_index_0_id_10261518_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-16.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-16.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/dropdown-button/DropdownButton.vue?vue&type=style&index=0&id=10261518&lang=scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(DropdownButtonvue_type_style_index_0_id_10261518_lang_scss.Z,options);DropdownButtonvue_type_style_index_0_id_10261518_lang_scss.Z&&DropdownButtonvue_type_style_index_0_id_10261518_lang_scss.Z.locals&&DropdownButtonvue_type_style_index_0_id_10261518_lang_scss.Z.locals;const __exports__=(0,__webpack_require__("./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js").Z)(DropdownButtonvue_type_script_lang_js,[["render",function render(_ctx,_cache,$props,$setup,$data,$options){var _component_Icon=(0,vue_esm_bundler.up)("Icon"),_component_Button=(0,vue_esm_bundler.up)("Button");return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("div",_hoisted_1,[(0,vue_esm_bundler.Wm)(_component_Button,{type:"dropdown",size:"lg",onClick:$options.toggleDropdown},{default:(0,vue_esm_bundler.w5)((function(){var _$data$selectedOption;return[(0,vue_esm_bundler._)("span",{class:(0,vue_esm_bundler.C_)(["dropdown-button__content",{"dropdown-button__content--open":$data.isOpen}])},[(0,vue_esm_bundler.Uk)((0,vue_esm_bundler.zw)(null!==(_$data$selectedOption=$data.selectedOption)&&void 0!==_$data$selectedOption&&_$data$selectedOption.value?$data.selectedOption.value:"Bokmål")+" ",1),(0,vue_esm_bundler.Wm)(_component_Icon,{class:"toggle-icon",size:"1.5em",name:"expand_more"})],2)]})),_:1},8,["onClick"]),$data.isOpen?((0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("ul",_hoisted_2,[((0,vue_esm_bundler.wg)(!0),(0,vue_esm_bundler.iD)(vue_esm_bundler.HY,null,(0,vue_esm_bundler.Ko)($options.filteredOptions,(function(option){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("li",{key:option.key,onClick:function onClick($event){return $options.selectOption(option)},class:"dropdown__item"},(0,vue_esm_bundler.zw)(option.value),9,_hoisted_3)})),128))])):(0,vue_esm_bundler.kq)("",!0)])}]]),DropdownButton=__exports__;__exports__.__docgenInfo={exportName:"default",displayName:"DropdownButton",description:"",tags:{},props:[{name:"options",type:{name:"array"}},{name:"preselect",type:{name:"string"}}],events:[{name:"selected",type:{names:["undefined"]}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/dropdown-button/DropdownButton.vue"]}}}]);