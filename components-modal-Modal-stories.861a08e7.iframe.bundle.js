"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[707],{"./src/vue/components/modal/Modal.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithoutActions:()=>WithoutActions,WithoutHeader:()=>WithoutHeader,WithoutMainContent:()=>WithoutMainContent,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Modal_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/vue/components/modal/Modal.vue"),_Button_vue__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/vue/components/Button.vue");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Modal",component:_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z};var Default=function Template(args){return{components:{Modal:_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,Button:_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z},setup:function setup(){return function(){return React.createElement(_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,args,{header:function header(){return React.createElement("h2",null,"This is the header content")},main:function main(){return React.createElement("div",null,"This is the main content")},actions:function actions(){return React.createElement(React.Fragment,null,React.createElement(_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z,{type:"filled"},"Hello"),React.createElement(_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z,{type:"outlined"},"Goodbye"))}})}}}}.bind({});Default.args={isOpen:!0};var WithoutHeader=function TemplateWithoutHeader(args){return{components:{Modal:_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,Button:_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z},setup:function setup(){return function(){return React.createElement(_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,args,{main:function main(){return React.createElement("div",null,"This is the main content")},actions:function actions(){return React.createElement(React.Fragment,null,React.createElement(_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z,{type:"filled"},"Hello"),React.createElement(_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z,{type:"outlined"},"Goodbye"))}})}}}}.bind({});WithoutHeader.args={isOpen:!0};var WithoutActions=function TemplateWithoutActions(args){return{components:{Modal:_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,Button:_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z},setup:function setup(){return function(){return React.createElement(_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,args,{header:function header(){return React.createElement("h2",null,"This is the header content")},main:function main(){return React.createElement("div",null,"This is the main content")}})}}}}.bind({});WithoutActions.args={isOpen:!0};var WithoutMainContent=function TemplateWithoutMainContent(args){return{components:{Modal:_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,Button:_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z},setup:function setup(){return function(){return React.createElement(_Modal_vue__WEBPACK_IMPORTED_MODULE_0__.Z,args,{header:function header(){return React.createElement("h2",null,"This is the header content")},actions:function actions(){return React.createElement(React.Fragment,null,React.createElement(_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z,{type:"filled"},"Hello"),React.createElement(_Button_vue__WEBPACK_IMPORTED_MODULE_1__.Z,{type:"outlined"},"Goodbye"))}})}}}}.bind({});WithoutMainContent.args={isOpen:!0},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        header: () => <h2>This is the header content</h2>,\n        main: () => <div>This is the main content</div>,\n        actions: () => <>\n              <Button type="filled">Hello</Button>\n              <Button type="outlined">Goodbye</Button>\n            </>\n      }}\n      </Modal>;\n  }\n})',...Default.parameters?.docs?.source}}},WithoutHeader.parameters={...WithoutHeader.parameters,docs:{...WithoutHeader.parameters?.docs,source:{originalSource:'args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        main: () => <div>This is the main content</div>,\n        actions: () => <>\n              <Button type="filled">Hello</Button>\n              <Button type="outlined">Goodbye</Button>\n            </>\n      }}\n      </Modal>;\n  }\n})',...WithoutHeader.parameters?.docs?.source}}},WithoutActions.parameters={...WithoutActions.parameters,docs:{...WithoutActions.parameters?.docs,source:{originalSource:"args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        header: () => <h2>This is the header content</h2>,\n        main: () => <div>This is the main content</div>\n      }}\n      </Modal>;\n  }\n})",...WithoutActions.parameters?.docs?.source}}},WithoutMainContent.parameters={...WithoutMainContent.parameters,docs:{...WithoutMainContent.parameters?.docs,source:{originalSource:'args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        header: () => <h2>This is the header content</h2>,\n        actions: () => <>\n              <Button type="filled">Hello</Button>\n              <Button type="outlined">Goodbye</Button>\n            </>\n      }}\n      </Modal>;\n  }\n})',...WithoutMainContent.parameters?.docs?.source}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        header: () => <h2>This is the header content</h2>,\n        main: () => <div>This is the main content</div>,\n        actions: () => <>\n              <Button type="filled">Hello</Button>\n              <Button type="outlined">Goodbye</Button>\n            </>\n      }}\n      </Modal>;\n  }\n})',...Default.parameters?.docs?.source}}},WithoutHeader.parameters={...WithoutHeader.parameters,docs:{...WithoutHeader.parameters?.docs,source:{originalSource:'args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        main: () => <div>This is the main content</div>,\n        actions: () => <>\n              <Button type="filled">Hello</Button>\n              <Button type="outlined">Goodbye</Button>\n            </>\n      }}\n      </Modal>;\n  }\n})',...WithoutHeader.parameters?.docs?.source}}},WithoutActions.parameters={...WithoutActions.parameters,docs:{...WithoutActions.parameters?.docs,source:{originalSource:"args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        header: () => <h2>This is the header content</h2>,\n        main: () => <div>This is the main content</div>\n      }}\n      </Modal>;\n  }\n})",...WithoutActions.parameters?.docs?.source}}},WithoutMainContent.parameters={...WithoutMainContent.parameters,docs:{...WithoutMainContent.parameters?.docs,source:{originalSource:'args => ({\n  components: {\n    Modal,\n    Button\n  },\n  setup() {\n    return () => <Modal {...args}>\n        {{\n        header: () => <h2>This is the header content</h2>,\n        actions: () => <>\n              <Button type="filled">Hello</Button>\n              <Button type="outlined">Goodbye</Button>\n            </>\n      }}\n      </Modal>;\n  }\n})',...WithoutMainContent.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithoutHeader","WithoutActions","WithoutMainContent"]}}]);