"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[59],{"./src/vue/components/icon-button/IconButton.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CloseButton:()=>CloseButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>IconButton_stories});var IconButton=__webpack_require__("./src/vue/components/icon-button/IconButton.vue"),v4=__webpack_require__("./node_modules/uuid/dist/esm-browser/v4.js"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),preview_errors=__webpack_require__("./node_modules/@storybook/core-events/dist/errors/preview-errors.mjs"),ADDON_ID="storybook/actions",EVENT_ID=`${ADDON_ID}/action-event`,config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a};function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new preview_errors.is({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id="object"==typeof crypto&&"function"==typeof crypto.getRandomValues?(0,v4.Z)():Date.now().toString(36)+Math.random().toString(36).substring(2),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit(EVENT_ID,actionDisplayToEmit)};return handler.isAction=!0,handler}const IconButton_stories={title:"components/IconButton",component:IconButton.Z};var CloseButton=function Template(args,_ref){_ref.argTypes;return{components:{IconButton:IconButton.Z},template:'\n    <IconButton @handleClick="handleClick" v-bind="$props"/>\n  ',methods:{handleClick:action("handleClick")}}}.bind({});CloseButton.parameters={...CloseButton.parameters,docs:{...CloseButton.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    IconButton\n  },\n  template: `\n    <IconButton @handleClick="handleClick" v-bind="$props"/>\n  `,\n  methods: {\n    handleClick: action(\'handleClick\')\n  }\n})',...CloseButton.parameters?.docs?.source}}},CloseButton.parameters={...CloseButton.parameters,docs:{...CloseButton.parameters?.docs,source:{originalSource:'(args, {\n  argTypes\n}) => ({\n  components: {\n    IconButton\n  },\n  template: `\n    <IconButton @handleClick="handleClick" v-bind="$props"/>\n  `,\n  methods: {\n    handleClick: action(\'handleClick\')\n  }\n})',...CloseButton.parameters?.docs?.source}}};const __namedExportsOrder=["CloseButton"]},"./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js":(__unused_webpack_module,exports)=>{exports.Z=(sfc,props)=>{const target=sfc.__vccOpts||sfc;for(const[key,val]of props)target[key]=val;return target}},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/icon-button/IconButton.vue?vue&type=style&index=0&id=3b5451a3&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".icon-button{background-color:#eed0c3;color:#1a1a1a;border:none;z-index:1020;padding:.125rem;font-size:2rem;height:2.5rem;width:2.5rem;cursor:pointer;transition:all .2s ease;border-radius:70%}.icon-button:hover{background-color:#dc9e83}.icon-button:focus{background-color:#dc9e83}","",{version:3,sources:["webpack://./src/vue/components/icon-button/IconButton.vue","webpack://./src/vue/design/colors.scss"],names:[],mappings:"AAGA,aACE,wBAAA,CACA,aCMY,CDLZ,WAAA,CACA,YAAA,CACA,eAAA,CACA,cAAA,CACA,aAAA,CACA,YAAA,CACA,cAAA,CACA,uBAAA,CACA,iBAAA,CAEA,mBACE,wBAAA,CAGF,mBACE,wBAAA",sourcesContent:['\n@import "../../design/colors.scss";\n\n.icon-button {\n  background-color: map-get($color-palette-peach, background, 400);\n  color: $color-black;\n  border: none;\n  z-index: 1020;\n  padding: 0.125rem;\n  font-size: 2rem;\n  height: 2.5rem;\n  width: 2.5rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border-radius: 70%;\n\n  &:hover {\n    background-color: map-get($color-palette-peach, background, 500);\n  }\n\n  &:focus {\n    background-color: map-get($color-palette-peach, background, 500);\n  }\n}\n',"// support colors\n$color-grey-100: #f9f9f9; \n$color-grey-200: #f1f1f1;\n$color-grey-300: #eaeaea;\n$color-grey-400: #e6e6e6;\n$color-grey-500: #bfbfbf;\n$color-grey-600: #999999;\n$colorgrey-700: #737373;\n$color-grey-800: #666666;\n$color-grey-900: #303030;\n\n$color-black: #1a1a1a;\n$color-white: #ffffff;\n$primary-hover-color:#00468e;\n\n\n// Color palettes\n$color-palette-green: (\n  background: (\n    200: #e3f2eb,\n    300: #94caae,\n    400: #7dbf9d,\n    500: #3b7858,\n    600: #254b38\n  ),\n  foreground: (\n    200: $color-black,\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n$color-palette-eggshell: (\n  background: (\n    300: #f6efe4,\n    400: #f2e8da,\n    500: #d6b689,\n    600: #8c6631,\n    700: #5e4521\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-white,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-peach: (\n  background: (\n    300: #f8ece6,\n    400: #eed0c3,\n    500: #dc9e83,\n    600: #a7532f,\n    700: #63321c\n  ),\n  foreground: (\n    300: $color-black,\n    400: $color-black,\n    500: $color-black,\n    600: $color-white,\n    700: $color-grey-200\n  )\n);\n\n$color-palette-azur: (\n  background: (\n    300: #eaeaf5,\n    400: #e2e3f1,\n    500: #c7c9e3,\n    600: #999cbf,\n    700: #666883\n  ),\n  foreground: (\n    300: #303030,\n    400: #303030,\n    500: #303030,\n    600: #303030,\n    700: #ffffff\n  )\n);\n\n$color-palette-steel: (\n  background: (\n    200: #f5f7f9,\n    300: #ebeef3,\n    400: #bac6d8,\n    500: #99abc5,\n    600: #51698f,\n    700: #2e3c51\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white,\n    700: $color-white\n  )\n);\n\n$color-palette-slate: (\n  background: (\n    200: #eceff2,\n    300: #a0b1bf,\n    400: #6d889d,\n    500: #546b7d,\n    600: #191d24\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-grey-900,\n    400: $color-grey-900,\n    500: $color-white,\n    600: $color-white\n  )\n);\n\n// extra colors\n$color-palette-red: (\n  background: (\n    200: #ffebee,\n    300: #ffcdd2,\n    400: #ef9a9a,\n    500: #ef5350,\n    600: #c62828\n  ),\n  foreground: (#E2E3F1\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-white\n  )\n);\n\n$color-palette-orange: (\n  background: (\n    200: #fff3e0,\n    300: #ffcc80,\n    400: #ffa726,\n    500: #fb8c00,\n    600: #EF6C00\n  ),\n  foreground: (\n    200: $color-grey-900,\n    300: $color-black,\n    400: $color-grey-900,\n    500: $color-grey-900,\n    600: $color-black\n  )\n);\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/icon/Icon.vue?vue&type=style&index=0&id=90c4211a&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".material-icon{color:inherit}.material-icon__icon .custom-size-1em{font-size:1em}.material-icon__icon .custom-size-2em{font-size:2em}.material-icon__icon .custom-size-3em{font-size:3em}","",{version:3,sources:["webpack://./src/vue/components/icon/Icon.vue"],names:[],mappings:"AACA,eACE,aAAA,CAII,sCACE,aAAA,CADF,sCACE,aAAA,CADF,sCACE,aAAA",sourcesContent:["\n.material-icon {\n  color: inherit;\n\n  &__icon {\n    @each $size in (1em, 2em, 3em) {\n      .custom-size-#{$size} {\n        font-size: #{$size};\n      }\n    }\n  }\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/runtime/api.js":module=>{module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}},"./src/vue/components/icon-button/IconButton.vue":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>IconButton});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js"),Icon=__webpack_require__("./src/vue/components/icon/Icon.vue");const IconButtonvue_type_script_setup_true_lang_js={__name:"IconButton",emits:["handleClick"],setup:function setup(__props,_ref){var emits=_ref.emit,handleClick=function handleClick(){emits("handleClick")};return function(_ctx,_cache){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("button",{"aria-label":"Gå tilbake til kursoversikten",onClick:handleClick,class:"icon-button"},[(0,vue_esm_bundler.Wm)(Icon.Z,{name:"close"})])}}};var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),IconButtonvue_type_style_index_0_id_3b5451a3_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/icon-button/IconButton.vue?vue&type=style&index=0&id=3b5451a3&lang=scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(IconButtonvue_type_style_index_0_id_3b5451a3_lang_scss.Z,options);IconButtonvue_type_style_index_0_id_3b5451a3_lang_scss.Z&&IconButtonvue_type_style_index_0_id_3b5451a3_lang_scss.Z.locals&&IconButtonvue_type_style_index_0_id_3b5451a3_lang_scss.Z.locals;const IconButton=IconButtonvue_type_script_setup_true_lang_js;IconButtonvue_type_script_setup_true_lang_js.__docgenInfo={exportName:"default",displayName:"IconButton",description:"",tags:{},events:[{name:"handleClick"}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/icon-button/IconButton.vue"]}},"./src/vue/components/icon/Icon.vue":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Icon});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js"),_hoisted_1=["innerHTML"];var IconPaths={alarm:"M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z",article:"M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z",campaign:"M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z",chat:"M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z",check_circle_filled:"m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z",chevron_left:"M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z",chevron_right:"M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z",cancel:"m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",close:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",description:"M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5-56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z",devices:"M80-160v-120h80v-440q0-33 23.5-56.5T240-800h600v80H240v440h240v120H80Zm520 0q-17 0-28.5-11.5T560-200v-400q0-17 11.5-28.5T600-640h240q17 0 28.5 11.5T880-600v400q0 17-11.5 28.5T840-160H600Zm40-120h160v-280H640v280Zm0 0h160-160Z",edit_document:"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z",error:"M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5-28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",expand_more:"M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z",face:"M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z",feedback:"M480-360q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm-40-160h80v-240h-80v240ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z",flag:"M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z",format_list_numbered:"M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z",grade:"m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z",info:"M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z",light_bulb:"M440-80v-120h80v120h-80ZM80-440v-80h120v80H80Zm680 0v-80h120v80H760Zm-40 276-84-84 56-56 84 84-56 56Zm-480 0-56-56 84-84 56 56-84 84Zm240-116q-83 0-141.5-58.5T280-480q0-48 21.5-89.5T360-640v-200h240v200q37 29 58.5 70.5T680-480q0 83-58.5 141.5T480-280Zm-40-396q10-2 20-3t20-1q10 0 20 1t20 3v-84h-80v84Zm40 316q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-120Z",link:"M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z",notification_important:"M440-440h80v-200h-80v200Zm40 120q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z",open_in_new:"M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z",star:"m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z",question_mark:"M424-320q0-81 14.5-116.5T500-514q41-36 62.5-62.5T584-637q0-41-27.5-68T480-732q-51 0-77.5 31T365-638l-103-44q21-64 77-111t141-47q105 0 161.5 58.5T698-641q0 50-21.5 85.5T609-475q-49 47-59.5 71.5T539-320H424Zm56 240q-33 0-56.5-23.5T400-160q0-33 23.5-56.5T480-240q33 0 56.5 23.5T560-160q0 33-23.5 56.5T480-80Z",quote:"m228-240 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T458-480L320-240h-92Zm360 0 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T818-480L680-240h-92Z",video_camera:"M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z",warning:"m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240q0 17-11.5 28.5T440-200Zm-40-120h80v-200h-80v200Zm40-100Z"};const Iconvue_type_script_lang_js={props:{name:{type:String,required:!0},size:{type:[String,Number],default:"1em"},color:{type:String,default:"currentColor"}},setup:function setup(props){var iconPath=(0,vue_esm_bundler.Fl)((function(){var selected=IconPaths[props.name];if(selected)return selected}));return{iconClasses:(0,vue_esm_bundler.Fl)((function(){return["material-icon","custom-size-".concat("string"==typeof props.size&&props.size.includes("em")?props.size:"1em")]})),iconContent:(0,vue_esm_bundler.Fl)((function(){return'<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="'.concat(props.size,'" viewBox="0 -960 960 960" width="').concat(props.size,'"><path d="').concat(IconPaths[props.name],'"/></svg>')})),iconPath}}};var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Iconvue_type_style_index_0_id_90c4211a_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/icon/Icon.vue?vue&type=style&index=0&id=90c4211a&lang=scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Iconvue_type_style_index_0_id_90c4211a_lang_scss.Z,options);Iconvue_type_style_index_0_id_90c4211a_lang_scss.Z&&Iconvue_type_style_index_0_id_90c4211a_lang_scss.Z.locals&&Iconvue_type_style_index_0_id_90c4211a_lang_scss.Z.locals;const __exports__=(0,__webpack_require__("./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js").Z)(Iconvue_type_script_lang_js,[["render",function render(_ctx,_cache,$props,$setup,$data,$options){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("span",{class:(0,vue_esm_bundler.C_)($setup.iconClasses),innerHTML:$setup.iconContent},null,10,_hoisted_1)}]]),Icon=__exports__;__exports__.__docgenInfo={exportName:"default",displayName:"Icon",description:"",tags:{},props:[{name:"name",type:{name:"string"},required:!0},{name:"size",type:{name:"string|number"},defaultValue:{func:!1,value:"'1em'"}},{name:"color",type:{name:"string"},defaultValue:{func:!1,value:"'currentColor'"}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/icon/Icon.vue"]}}}]);