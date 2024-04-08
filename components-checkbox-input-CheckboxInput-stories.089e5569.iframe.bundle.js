"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[805],{"./src/vue/components/checkbox-input/CheckboxInput.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _CheckboxInput_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/vue/components/checkbox-input/CheckboxInput.vue");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/CheckboxInput",component:_CheckboxInput_vue__WEBPACK_IMPORTED_MODULE_0__.Z,argTypes:{label:{control:"text"},name:{control:"text"}}};var Default=function Template(args){return{components:{CheckboxInput:_CheckboxInput_vue__WEBPACK_IMPORTED_MODULE_0__.Z},setup:function setup(){return{args}},template:'<CheckboxInput v-bind="args"></CheckboxInput>'}}.bind({});Default.args={label:"Checkbox label",name:"staySignedIn"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => ({\n  components: {\n    CheckboxInput\n  },\n  setup() {\n    return {\n      args\n    };\n  },\n  template: '<CheckboxInput v-bind=\"args\"></CheckboxInput>'\n})",...Default.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => ({\n  components: {\n    CheckboxInput\n  },\n  setup() {\n    return {\n      args\n    };\n  },\n  template: '<CheckboxInput v-bind=\"args\"></CheckboxInput>'\n})",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/checkbox-input/CheckboxInput.vue?vue&type=style&index=0&id=ba8bc640&lang=scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'.checkbox-input{display:flex;justify-content:flex-start;margin-bottom:.5rem;margin-top:.5rem}.checkbox-input__label{font-size:.85rem}.checkbox-input__label input[type=checkbox]{position:absolute;opacity:0}.checkbox-input__label input[type=checkbox]~.checkmark{position:relative;width:1rem;height:1rem;background-color:#fff;border-radius:.25rem;border:.0625rem solid #bfbfbf}.checkbox-input__label input[type=checkbox]~.checkmark:after{content:"";position:absolute;display:none}.checkbox-input__label input[type=checkbox]:checked~.checkmark:after{display:block}.checkbox-input__label input[type=checkbox]~.checkmark:after{content:"";position:absolute;left:.5rem;top:.9rem;width:.5rem;height:1rem;border:solid #fff;border-width:0 .25rem .25rem 0;transform:rotate(45deg)}',"",{version:3,sources:["webpack://./src/vue/components/checkbox-input/CheckboxInput.vue"],names:[],mappings:"AACA,gBACE,YAAA,CACA,0BAAA,CACA,mBAAA,CACA,gBAAA,CAEA,uBACE,gBAAA,CAGA,4CAEE,iBAAA,CACA,SAAA,CAGA,uDACE,iBAAA,CACA,UAAA,CAEA,WAAA,CAEA,qBAAA,CACA,oBAAA,CACA,6BAAA,CAGA,6DACE,UAAA,CACA,iBAAA,CACA,YAAA,CAKJ,qEACE,aAAA,CAKJ,6DACE,UAAA,CACA,iBAAA,CACA,UAAA,CAEA,SAAA,CAEA,WAAA,CACA,WAAA,CACA,iBAAA,CACA,8BAAA,CAEA,uBAAA",sourcesContent:['\n.checkbox-input {\n  display: flex;\n  justify-content: flex-start;\n  margin-bottom: 0.5rem;\n  margin-top: 0.5rem;\n\n  &__label {\n    font-size: 0.85rem;\n\n    /* Custom checkbox styling */\n    input[type="checkbox"] {\n      /* Hide the default checkbox input */\n      position: absolute;\n      opacity: 0;\n\n      /* Style the checkmark container */\n      &~.checkmark {\n        position: relative;\n        width: 1rem;\n        /* Increase the width for a larger checkbox */\n        height: 1rem;\n        /* Increase the height for a larger checkbox */\n        background-color: #ffffff;\n        border-radius: 0.25rem;\n        border: 0.0625rem solid #bfbfbf;\n\n        /* Style the checkmark indicator (hidden when unchecked) */\n        &:after {\n          content: "";\n          position: absolute;\n          display: none;\n        }\n      }\n\n      /* Show the checkmark when checked */\n      &:checked~.checkmark:after {\n        display: block;\n      }\n    }\n\n    /* Style the checkmark/indicator */\n    input[type="checkbox"]~.checkmark:after {\n      content: "";\n      position: absolute;\n      left: 0.5rem;\n      /* Adjust the position of the checkmark */\n      top: 0.9rem;\n      /* Adjust the position of the checkmark */\n      width: .5rem;\n      height: 1rem;\n      border: solid white;\n      border-width: 0 0.25rem 0.25rem 0;\n      /* Adjust the size of the checkmark */\n      transform: rotate(45deg);\n    }\n  }\n}\n'],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./src/vue/components/checkbox-input/CheckboxInput.vue":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CheckboxInput});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js"),_hoisted_1=["for"],_hoisted_2=["id"],_hoisted_3={class:"checkbox-input__label"};var vee_validate_esm=__webpack_require__("./node_modules/vee-validate/dist/vee-validate.esm.js");const CheckboxInputvue_type_script_lang_js={name:"CheckboxInput",props:{name:String,label:String},setup:function setup(){var modelValue=(0,vue_esm_bundler.iH)(!1),fieldValue=(0,vee_validate_esm.U$)(props.name).value;return(0,vue_esm_bundler.YP)(modelValue,(function(newValue){fieldValue.value=newValue})),{modelValue}}};var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),CheckboxInputvue_type_style_index_0_id_ba8bc640_lang_scss=__webpack_require__("./node_modules/css-loader/dist/cjs.js??clonedRuleSet-17.use[1]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-17.use[3]!./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/vue/components/checkbox-input/CheckboxInput.vue?vue&type=style&index=0&id=ba8bc640&lang=scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(CheckboxInputvue_type_style_index_0_id_ba8bc640_lang_scss.Z,options);CheckboxInputvue_type_style_index_0_id_ba8bc640_lang_scss.Z&&CheckboxInputvue_type_style_index_0_id_ba8bc640_lang_scss.Z.locals&&CheckboxInputvue_type_style_index_0_id_ba8bc640_lang_scss.Z.locals;const __exports__=(0,__webpack_require__("./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js").Z)(CheckboxInputvue_type_script_lang_js,[["render",function render(_ctx,_cache,$props,$setup,$data,$options){return(0,vue_esm_bundler.wg)(),(0,vue_esm_bundler.iD)("label",{class:"checkbox-input",for:$props.name},[(0,vue_esm_bundler.wy)((0,vue_esm_bundler._)("input",{id:$props.name,"onUpdate:modelValue":_cache[0]||(_cache[0]=function($event){return $setup.modelValue=$event}),type:"checkbox",class:"checkbox-input__checkbox"},null,8,_hoisted_2),[[vue_esm_bundler.e8,$setup.modelValue]]),(0,vue_esm_bundler._)("span",_hoisted_3,(0,vue_esm_bundler.zw)($props.label),1)],8,_hoisted_1)}]]),CheckboxInput=__exports__;__exports__.__docgenInfo={displayName:"CheckboxInput",exportName:"default",description:"",tags:{},props:[{name:"name",type:{name:"string"}},{name:"label",type:{name:"string"}}],sourceFiles:["/home/runner/work/frontend/frontend/src/vue/components/checkbox-input/CheckboxInput.vue"]}}}]);