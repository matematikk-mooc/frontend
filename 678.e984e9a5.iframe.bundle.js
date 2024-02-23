/*! For license information please see 678.e984e9a5.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[678],{"./node_modules/@storybook/preset-vue3-webpack/node_modules/vue-loader/dist/exportHelper.js":(__unused_webpack_module,exports)=>{exports.Z=(sfc,props)=>{const target=sfc.__vccOpts||sfc;for(const[key,val]of props)target[key]=val;return target}},"./node_modules/css-loader/dist/runtime/api.js":module=>{module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}},"./node_modules/vuex/dist/vuex.esm-bundler.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{MT:()=>createStore,oR:()=>useStore});var vue_esm_bundler=__webpack_require__("./node_modules/vue/dist/vue.esm-bundler.js");function getTarget(){return"undefined"!=typeof navigator&&"undefined"!=typeof window?window:void 0!==__webpack_require__.g?__webpack_require__.g:{}}const isProxyAvailable="function"==typeof Proxy,HOOK_SETUP="devtools-plugin:setup";let supported,perf;function now(){return function isPerformanceSupported(){var _a;return void 0!==supported||("undefined"!=typeof window&&window.performance?(supported=!0,perf=window.performance):void 0!==__webpack_require__.g&&(null===(_a=__webpack_require__.g.perf_hooks)||void 0===_a?void 0:_a.performance)?(supported=!0,perf=__webpack_require__.g.perf_hooks.performance):supported=!1),supported}()?perf.now():Date.now()}class ApiProxy{constructor(plugin,hook){this.target=null,this.targetQueue=[],this.onQueue=[],this.plugin=plugin,this.hook=hook;const defaultSettings={};if(plugin.settings)for(const id in plugin.settings){const item=plugin.settings[id];defaultSettings[id]=item.defaultValue}const localSettingsSaveId=`__vue-devtools-plugin-settings__${plugin.id}`;let currentSettings=Object.assign({},defaultSettings);try{const raw=localStorage.getItem(localSettingsSaveId),data=JSON.parse(raw);Object.assign(currentSettings,data)}catch(e){}this.fallbacks={getSettings:()=>currentSettings,setSettings(value){try{localStorage.setItem(localSettingsSaveId,JSON.stringify(value))}catch(e){}currentSettings=value},now:()=>now()},hook&&hook.on("plugin:settings:set",((pluginId,value)=>{pluginId===this.plugin.id&&this.fallbacks.setSettings(value)})),this.proxiedOn=new Proxy({},{get:(_target,prop)=>this.target?this.target.on[prop]:(...args)=>{this.onQueue.push({method:prop,args})}}),this.proxiedTarget=new Proxy({},{get:(_target,prop)=>this.target?this.target[prop]:"on"===prop?this.proxiedOn:Object.keys(this.fallbacks).includes(prop)?(...args)=>(this.targetQueue.push({method:prop,args,resolve:()=>{}}),this.fallbacks[prop](...args)):(...args)=>new Promise((resolve=>{this.targetQueue.push({method:prop,args,resolve})}))})}async setRealTarget(target){this.target=target;for(const item of this.onQueue)this.target.on[item.method](...item.args);for(const item of this.targetQueue)item.resolve(await this.target[item.method](...item.args))}}function setupDevtoolsPlugin(pluginDescriptor,setupFn){const descriptor=pluginDescriptor,target=getTarget(),hook=function getDevtoolsGlobalHook(){return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__}(),enableProxy=isProxyAvailable&&descriptor.enableEarlyProxy;if(!hook||!target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__&&enableProxy){const proxy=enableProxy?new ApiProxy(descriptor,hook):null;(target.__VUE_DEVTOOLS_PLUGINS__=target.__VUE_DEVTOOLS_PLUGINS__||[]).push({pluginDescriptor:descriptor,setupFn,proxy}),proxy&&setupFn(proxy.proxiedTarget)}else hook.emit(HOOK_SETUP,pluginDescriptor,setupFn)}var storeKey="store";function useStore(key){return void 0===key&&(key=null),(0,vue_esm_bundler.f3)(null!==key?key:storeKey)}function forEachValue(obj,fn){Object.keys(obj).forEach((function(key){return fn(obj[key],key)}))}function isObject(obj){return null!==obj&&"object"==typeof obj}function genericSubscribe(fn,subs,options){return subs.indexOf(fn)<0&&(options&&options.prepend?subs.unshift(fn):subs.push(fn)),function(){var i=subs.indexOf(fn);i>-1&&subs.splice(i,1)}}function resetStore(store,hot){store._actions=Object.create(null),store._mutations=Object.create(null),store._wrappedGetters=Object.create(null),store._modulesNamespaceMap=Object.create(null);var state=store.state;installModule(store,state,[],store._modules.root,!0),resetStoreState(store,state,hot)}function resetStoreState(store,state,hot){var oldState=store._state,oldScope=store._scope;store.getters={},store._makeLocalGettersCache=Object.create(null);var wrappedGetters=store._wrappedGetters,computedObj={},computedCache={},scope=(0,vue_esm_bundler.B)(!0);scope.run((function(){forEachValue(wrappedGetters,(function(fn,key){computedObj[key]=function partial(fn,arg){return function(){return fn(arg)}}(fn,store),computedCache[key]=(0,vue_esm_bundler.Fl)((function(){return computedObj[key]()})),Object.defineProperty(store.getters,key,{get:function(){return computedCache[key].value},enumerable:!0})}))})),store._state=(0,vue_esm_bundler.qj)({data:state}),store._scope=scope,store.strict&&function enableStrictMode(store){(0,vue_esm_bundler.YP)((function(){return store._state.data}),(function(){0}),{deep:!0,flush:"sync"})}(store),oldState&&hot&&store._withCommit((function(){oldState.data=null})),oldScope&&oldScope.stop()}function installModule(store,rootState,path,module,hot){var isRoot=!path.length,namespace=store._modules.getNamespace(path);if(module.namespaced&&(store._modulesNamespaceMap[namespace],store._modulesNamespaceMap[namespace]=module),!isRoot&&!hot){var parentState=getNestedState(rootState,path.slice(0,-1)),moduleName=path[path.length-1];store._withCommit((function(){parentState[moduleName]=module.state}))}var local=module.context=function makeLocalContext(store,namespace,path){var noNamespace=""===namespace,local={dispatch:noNamespace?store.dispatch:function(_type,_payload,_options){var args=unifyObjectStyle(_type,_payload,_options),payload=args.payload,options=args.options,type=args.type;return options&&options.root||(type=namespace+type),store.dispatch(type,payload)},commit:noNamespace?store.commit:function(_type,_payload,_options){var args=unifyObjectStyle(_type,_payload,_options),payload=args.payload,options=args.options,type=args.type;options&&options.root||(type=namespace+type),store.commit(type,payload,options)}};return Object.defineProperties(local,{getters:{get:noNamespace?function(){return store.getters}:function(){return makeLocalGetters(store,namespace)}},state:{get:function(){return getNestedState(store.state,path)}}}),local}(store,namespace,path);module.forEachMutation((function(mutation,key){!function registerMutation(store,type,handler,local){var entry=store._mutations[type]||(store._mutations[type]=[]);entry.push((function wrappedMutationHandler(payload){handler.call(store,local.state,payload)}))}(store,namespace+key,mutation,local)})),module.forEachAction((function(action,key){var type=action.root?key:namespace+key,handler=action.handler||action;!function registerAction(store,type,handler,local){var entry=store._actions[type]||(store._actions[type]=[]);entry.push((function wrappedActionHandler(payload){var res=handler.call(store,{dispatch:local.dispatch,commit:local.commit,getters:local.getters,state:local.state,rootGetters:store.getters,rootState:store.state},payload);return function isPromise(val){return val&&"function"==typeof val.then}(res)||(res=Promise.resolve(res)),store._devtoolHook?res.catch((function(err){throw store._devtoolHook.emit("vuex:error",err),err})):res}))}(store,type,handler,local)})),module.forEachGetter((function(getter,key){!function registerGetter(store,type,rawGetter,local){if(store._wrappedGetters[type])return void 0;store._wrappedGetters[type]=function wrappedGetter(store){return rawGetter(local.state,local.getters,store.state,store.getters)}}(store,namespace+key,getter,local)})),module.forEachChild((function(child,key){installModule(store,rootState,path.concat(key),child,hot)}))}function makeLocalGetters(store,namespace){if(!store._makeLocalGettersCache[namespace]){var gettersProxy={},splitPos=namespace.length;Object.keys(store.getters).forEach((function(type){if(type.slice(0,splitPos)===namespace){var localType=type.slice(splitPos);Object.defineProperty(gettersProxy,localType,{get:function(){return store.getters[type]},enumerable:!0})}})),store._makeLocalGettersCache[namespace]=gettersProxy}return store._makeLocalGettersCache[namespace]}function getNestedState(state,path){return path.reduce((function(state,key){return state[key]}),state)}function unifyObjectStyle(type,payload,options){return isObject(type)&&type.type&&(options=payload,payload=type,type=type.type),{type,payload,options}}var actionId=0;function addDevtools(app,store){setupDevtoolsPlugin({id:"org.vuejs.vuex",app,label:"Vuex",homepage:"https://next.vuex.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",packageName:"vuex",componentStateTypes:["vuex bindings"]},(function(api){api.addTimelineLayer({id:"vuex:mutations",label:"Vuex Mutations",color:COLOR_LIME_500}),api.addTimelineLayer({id:"vuex:actions",label:"Vuex Actions",color:COLOR_LIME_500}),api.addInspector({id:"vuex",label:"Vuex",icon:"storage",treeFilterPlaceholder:"Filter stores..."}),api.on.getInspectorTree((function(payload){if(payload.app===app&&"vuex"===payload.inspectorId)if(payload.filter){var nodes=[];flattenStoreForInspectorTree(nodes,store._modules.root,payload.filter,""),payload.rootNodes=nodes}else payload.rootNodes=[formatStoreForInspectorTree(store._modules.root,"")]})),api.on.getInspectorState((function(payload){if(payload.app===app&&"vuex"===payload.inspectorId){var modulePath=payload.nodeId;makeLocalGetters(store,modulePath),payload.state=function formatStoreForInspectorState(module,getters,path){getters="root"===path?getters:getters[path];var gettersKeys=Object.keys(getters),storeState={state:Object.keys(module.state).map((function(key){return{key,editable:!0,value:module.state[key]}}))};if(gettersKeys.length){var tree=function transformPathsToObjectTree(getters){var result={};return Object.keys(getters).forEach((function(key){var path=key.split("/");if(path.length>1){var target=result,leafKey=path.pop();path.forEach((function(p){target[p]||(target[p]={_custom:{value:{},display:p,tooltip:"Module",abstract:!0}}),target=target[p]._custom.value})),target[leafKey]=canThrow((function(){return getters[key]}))}else result[key]=canThrow((function(){return getters[key]}))})),result}(getters);storeState.getters=Object.keys(tree).map((function(key){return{key:key.endsWith("/")?extractNameFromPath(key):key,editable:!1,value:canThrow((function(){return tree[key]}))}}))}return storeState}(function getStoreModule(moduleMap,path){var names=path.split("/").filter((function(n){return n}));return names.reduce((function(module,moduleName,i){var child=module[moduleName];if(!child)throw new Error('Missing module "'+moduleName+'" for path "'+path+'".');return i===names.length-1?child:child._children}),"root"===path?moduleMap:moduleMap.root._children)}(store._modules,modulePath),"root"===modulePath?store.getters:store._makeLocalGettersCache,modulePath)}})),api.on.editInspectorState((function(payload){if(payload.app===app&&"vuex"===payload.inspectorId){var modulePath=payload.nodeId,path=payload.path;"root"!==modulePath&&(path=modulePath.split("/").filter(Boolean).concat(path)),store._withCommit((function(){payload.set(store._state.data,path,payload.state.value)}))}})),store.subscribe((function(mutation,state){var data={};mutation.payload&&(data.payload=mutation.payload),data.state=state,api.notifyComponentUpdate(),api.sendInspectorTree("vuex"),api.sendInspectorState("vuex"),api.addTimelineEvent({layerId:"vuex:mutations",event:{time:Date.now(),title:mutation.type,data}})})),store.subscribeAction({before:function(action,state){var data={};action.payload&&(data.payload=action.payload),action._id=actionId++,action._time=Date.now(),data.state=state,api.addTimelineEvent({layerId:"vuex:actions",event:{time:action._time,title:action.type,groupId:action._id,subtitle:"start",data}})},after:function(action,state){var data={},duration=Date.now()-action._time;data.duration={_custom:{type:"duration",display:duration+"ms",tooltip:"Action duration",value:duration}},action.payload&&(data.payload=action.payload),data.state=state,api.addTimelineEvent({layerId:"vuex:actions",event:{time:Date.now(),title:action.type,groupId:action._id,subtitle:"end",data}})}})}))}var COLOR_LIME_500=8702998,TAG_NAMESPACED={label:"namespaced",textColor:16777215,backgroundColor:6710886};function extractNameFromPath(path){return path&&"root"!==path?path.split("/").slice(-2,-1)[0]:"Root"}function formatStoreForInspectorTree(module,path){return{id:path||"root",label:extractNameFromPath(path),tags:module.namespaced?[TAG_NAMESPACED]:[],children:Object.keys(module._children).map((function(moduleName){return formatStoreForInspectorTree(module._children[moduleName],path+moduleName+"/")}))}}function flattenStoreForInspectorTree(result,module,filter,path){path.includes(filter)&&result.push({id:path||"root",label:path.endsWith("/")?path.slice(0,path.length-1):path||"Root",tags:module.namespaced?[TAG_NAMESPACED]:[]}),Object.keys(module._children).forEach((function(moduleName){flattenStoreForInspectorTree(result,module._children[moduleName],filter,path+moduleName+"/")}))}function canThrow(cb){try{return cb()}catch(e){return e}}var Module=function Module(rawModule,runtime){this.runtime=runtime,this._children=Object.create(null),this._rawModule=rawModule;var rawState=rawModule.state;this.state=("function"==typeof rawState?rawState():rawState)||{}},prototypeAccessors$1={namespaced:{configurable:!0}};prototypeAccessors$1.namespaced.get=function(){return!!this._rawModule.namespaced},Module.prototype.addChild=function addChild(key,module){this._children[key]=module},Module.prototype.removeChild=function removeChild(key){delete this._children[key]},Module.prototype.getChild=function getChild(key){return this._children[key]},Module.prototype.hasChild=function hasChild(key){return key in this._children},Module.prototype.update=function update(rawModule){this._rawModule.namespaced=rawModule.namespaced,rawModule.actions&&(this._rawModule.actions=rawModule.actions),rawModule.mutations&&(this._rawModule.mutations=rawModule.mutations),rawModule.getters&&(this._rawModule.getters=rawModule.getters)},Module.prototype.forEachChild=function forEachChild(fn){forEachValue(this._children,fn)},Module.prototype.forEachGetter=function forEachGetter(fn){this._rawModule.getters&&forEachValue(this._rawModule.getters,fn)},Module.prototype.forEachAction=function forEachAction(fn){this._rawModule.actions&&forEachValue(this._rawModule.actions,fn)},Module.prototype.forEachMutation=function forEachMutation(fn){this._rawModule.mutations&&forEachValue(this._rawModule.mutations,fn)},Object.defineProperties(Module.prototype,prototypeAccessors$1);var ModuleCollection=function ModuleCollection(rawRootModule){this.register([],rawRootModule,!1)};function update(path,targetModule,newModule){if(targetModule.update(newModule),newModule.modules)for(var key in newModule.modules){if(!targetModule.getChild(key))return void 0;update(path.concat(key),targetModule.getChild(key),newModule.modules[key])}}ModuleCollection.prototype.get=function get(path){return path.reduce((function(module,key){return module.getChild(key)}),this.root)},ModuleCollection.prototype.getNamespace=function getNamespace(path){var module=this.root;return path.reduce((function(namespace,key){return namespace+((module=module.getChild(key)).namespaced?key+"/":"")}),"")},ModuleCollection.prototype.update=function update$1(rawRootModule){update([],this.root,rawRootModule)},ModuleCollection.prototype.register=function register(path,rawModule,runtime){var this$1$1=this;void 0===runtime&&(runtime=!0);var newModule=new Module(rawModule,runtime);0===path.length?this.root=newModule:this.get(path.slice(0,-1)).addChild(path[path.length-1],newModule);rawModule.modules&&forEachValue(rawModule.modules,(function(rawChildModule,key){this$1$1.register(path.concat(key),rawChildModule,runtime)}))},ModuleCollection.prototype.unregister=function unregister(path){var parent=this.get(path.slice(0,-1)),key=path[path.length-1],child=parent.getChild(key);child&&child.runtime&&parent.removeChild(key)},ModuleCollection.prototype.isRegistered=function isRegistered(path){var parent=this.get(path.slice(0,-1)),key=path[path.length-1];return!!parent&&parent.hasChild(key)};function createStore(options){return new Store(options)}var Store=function Store(options){var this$1$1=this;void 0===options&&(options={});var plugins=options.plugins;void 0===plugins&&(plugins=[]);var strict=options.strict;void 0===strict&&(strict=!1);var devtools=options.devtools;this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new ModuleCollection(options),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._makeLocalGettersCache=Object.create(null),this._scope=null,this._devtools=devtools;var store=this,dispatch=this.dispatch,commit=this.commit;this.dispatch=function boundDispatch(type,payload){return dispatch.call(store,type,payload)},this.commit=function boundCommit(type,payload,options){return commit.call(store,type,payload,options)},this.strict=strict;var state=this._modules.root.state;installModule(this,state,[],this._modules.root),resetStoreState(this,state),plugins.forEach((function(plugin){return plugin(this$1$1)}))},prototypeAccessors={state:{configurable:!0}};Store.prototype.install=function install(app,injectKey){app.provide(injectKey||storeKey,this),app.config.globalProperties.$store=this,(void 0===this._devtools||this._devtools)&&addDevtools(app,this)},prototypeAccessors.state.get=function(){return this._state.data},prototypeAccessors.state.set=function(v){0},Store.prototype.commit=function commit(_type,_payload,_options){var this$1$1=this,ref=unifyObjectStyle(_type,_payload,_options),type=ref.type,payload=ref.payload,mutation=(ref.options,{type,payload}),entry=this._mutations[type];entry&&(this._withCommit((function(){entry.forEach((function commitIterator(handler){handler(payload)}))})),this._subscribers.slice().forEach((function(sub){return sub(mutation,this$1$1.state)})))},Store.prototype.dispatch=function dispatch(_type,_payload){var this$1$1=this,ref=unifyObjectStyle(_type,_payload),type=ref.type,payload=ref.payload,action={type,payload},entry=this._actions[type];if(entry){try{this._actionSubscribers.slice().filter((function(sub){return sub.before})).forEach((function(sub){return sub.before(action,this$1$1.state)}))}catch(e){0}var result=entry.length>1?Promise.all(entry.map((function(handler){return handler(payload)}))):entry[0](payload);return new Promise((function(resolve,reject){result.then((function(res){try{this$1$1._actionSubscribers.filter((function(sub){return sub.after})).forEach((function(sub){return sub.after(action,this$1$1.state)}))}catch(e){0}resolve(res)}),(function(error){try{this$1$1._actionSubscribers.filter((function(sub){return sub.error})).forEach((function(sub){return sub.error(action,this$1$1.state,error)}))}catch(e){0}reject(error)}))}))}},Store.prototype.subscribe=function subscribe(fn,options){return genericSubscribe(fn,this._subscribers,options)},Store.prototype.subscribeAction=function subscribeAction(fn,options){return genericSubscribe("function"==typeof fn?{before:fn}:fn,this._actionSubscribers,options)},Store.prototype.watch=function watch$1(getter,cb,options){var this$1$1=this;return(0,vue_esm_bundler.YP)((function(){return getter(this$1$1.state,this$1$1.getters)}),cb,Object.assign({},options))},Store.prototype.replaceState=function replaceState(state){var this$1$1=this;this._withCommit((function(){this$1$1._state.data=state}))},Store.prototype.registerModule=function registerModule(path,rawModule,options){void 0===options&&(options={}),"string"==typeof path&&(path=[path]),this._modules.register(path,rawModule),installModule(this,this.state,path,this._modules.get(path),options.preserveState),resetStoreState(this,this.state)},Store.prototype.unregisterModule=function unregisterModule(path){var this$1$1=this;"string"==typeof path&&(path=[path]),this._modules.unregister(path),this._withCommit((function(){delete getNestedState(this$1$1.state,path.slice(0,-1))[path[path.length-1]]})),resetStore(this)},Store.prototype.hasModule=function hasModule(path){return"string"==typeof path&&(path=[path]),this._modules.isRegistered(path)},Store.prototype.hotUpdate=function hotUpdate(newOptions){this._modules.update(newOptions),resetStore(this,!0)},Store.prototype._withCommit=function _withCommit(fn){var committing=this._committing;this._committing=!0,fn(),this._committing=committing},Object.defineProperties(Store.prototype,prototypeAccessors);normalizeNamespace((function(namespace,states){var res={};return normalizeMap(states).forEach((function(ref){var key=ref.key,val=ref.val;res[key]=function mappedState(){var state=this.$store.state,getters=this.$store.getters;if(namespace){var module=getModuleByNamespace(this.$store,"mapState",namespace);if(!module)return;state=module.context.state,getters=module.context.getters}return"function"==typeof val?val.call(this,state,getters):state[val]},res[key].vuex=!0})),res})),normalizeNamespace((function(namespace,mutations){var res={};return normalizeMap(mutations).forEach((function(ref){var key=ref.key,val=ref.val;res[key]=function mappedMutation(){for(var args=[],len=arguments.length;len--;)args[len]=arguments[len];var commit=this.$store.commit;if(namespace){var module=getModuleByNamespace(this.$store,"mapMutations",namespace);if(!module)return;commit=module.context.commit}return"function"==typeof val?val.apply(this,[commit].concat(args)):commit.apply(this.$store,[val].concat(args))}})),res})),normalizeNamespace((function(namespace,getters){var res={};return normalizeMap(getters).forEach((function(ref){var key=ref.key,val=ref.val;val=namespace+val,res[key]=function mappedGetter(){if(!namespace||getModuleByNamespace(this.$store,"mapGetters",namespace))return this.$store.getters[val]},res[key].vuex=!0})),res})),normalizeNamespace((function(namespace,actions){var res={};return normalizeMap(actions).forEach((function(ref){var key=ref.key,val=ref.val;res[key]=function mappedAction(){for(var args=[],len=arguments.length;len--;)args[len]=arguments[len];var dispatch=this.$store.dispatch;if(namespace){var module=getModuleByNamespace(this.$store,"mapActions",namespace);if(!module)return;dispatch=module.context.dispatch}return"function"==typeof val?val.apply(this,[dispatch].concat(args)):dispatch.apply(this.$store,[val].concat(args))}})),res}));function normalizeMap(map){return function isValidMap(map){return Array.isArray(map)||isObject(map)}(map)?Array.isArray(map)?map.map((function(key){return{key,val:key}})):Object.keys(map).map((function(key){return{key,val:map[key]}})):[]}function normalizeNamespace(fn){return function(namespace,map){return"string"!=typeof namespace?(map=namespace,namespace=""):"/"!==namespace.charAt(namespace.length-1)&&(namespace+="/"),fn(namespace,map)}}function getModuleByNamespace(store,helper,namespace){return store._modulesNamespaceMap[namespace]}}}]);