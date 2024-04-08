(self.webpackChunkmooc=self.webpackChunkmooc||[]).push([[831],{"./src/js/api/api.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>api});var settings=__webpack_require__("./src/js/settings.js"),settings_default=__webpack_require__.n(settings),util=__webpack_require__("./src/js/modules/util.js"),settingsRoot=__webpack_require__("./src/js/settingsRoot.js"),settingsRoot_default=__webpack_require__.n(settingsRoot);const utilRoot={_env:"undefined"!=typeof ENV?ENV:{},getRoles:function getRoles(){return this._env.current_user_roles},isAuthenticated:function isAuthenticated(){return null!==this.getRoles()},getLinkToMyCourses:function getLinkToMyCourses(){return"/courses"+settingsRoot.hrefQueryString},parse_query_string:function parse_query_string(query){for(var vars=query.split("&"),query_string={},i=0;i<vars.length;i++){var pair=vars[i].split("="),key=decodeURIComponent(pair[0]),value=decodeURIComponent(pair[1]);if(void 0===query_string[key])query_string[key]=decodeURIComponent(value);else if("string"==typeof query_string[key]){var arr=[query_string[key],decodeURIComponent(value)];query_string[key]=arr}else query_string[key].push(decodeURIComponent(value))}return query_string},urlParamsToObject:function urlParamsToObject(){if(""===document.location.search)return{};var search=location.search.substring(1);return this.parse_query_string(search)},checkReferrer:function checkReferrer(ref){return document.referrer.includes(ref)},isEnrollReferrer:function isEnrollReferrer(){var hasPermittedRefferer=settingsRoot_default().feideEnrollRefferers.some(this.checkReferrer);return!(this.isAuthenticated()||!hasPermittedRefferer)},redirectFeideAuthIfEnrollReferrer:function redirectFeideAuthIfEnrollReferrer(){if(this.isEnrollReferrer()){if(!document.location.search.includes("normalLogin=1"))return window.location.href="/login/saml/2",!0;$("#content > div > div > div > div > div.ic-Login-header > div.ic-Login-header__links").hide()}return!1},isEnrollCodeParamPassed:function isEnrollCodeParamPassed(urlParamsObj){var enrollCode=urlParamsObj&&urlParamsObj.enroll_code;return void 0!==enrollCode?enrollCode:null},isLoginParamPassed:function isLoginParamPassed(urlParamsObj){return void 0!==(urlParamsObj&&urlParamsObj.login)},triggerForgotPasswordIfParamPassed:function triggerForgotPasswordIfParamPassed(){void 0!==this.urlParamsToObject().gp&&$("#login_forgot_password").click()},redirectToEnrollIfCodeParamPassed:function redirectToEnrollIfCodeParamPassed(){if(""!==document.location.search){var urlParamsObj=this.urlParamsToObject(),design=urlParamsObj&&urlParamsObj.design,newHref=null,enrollCode=this.isEnrollCodeParamPassed(urlParamsObj);enrollCode&&(newHref="/enroll/"+enrollCode,design&&(newHref+="?design="+design));var forwardTo=urlParamsObj&&urlParamsObj.forwardTo;if(forwardTo&&(newHref+=design?"&":"?",newHref+="forwardTo="+encodeURIComponent(forwardTo)),newHref)return window.location.href=newHref,!0;if(this.isLoginParamPassed(urlParamsObj)){var linkToMyCourses=this.getLinkToMyCourses();return window.location.href=linkToMyCourses,!0}}return!1},redirectToSamlIfUdirCourse:function redirectToSamlIfUdirCourse(kpasApiUrl){try{if(!this.isAuthenticated()){var currentUrl=""+window.location.pathname,currentCourseId=this.getCourseIdFromUrl(currentUrl);this.isDeepLinkToUdirCourse(currentCourseId,kpasApiUrl).then((function(result){return!!result&&(window.location="/login/saml/2",!0)}))}}catch(e){console.log(e)}},getCourseIdFromUrl:function getCourseIdFromUrl(currentUrl){var matches=currentUrl.match(/\/courses\/(\d+)/);if(null!=matches)return parseInt(matches[1],10);if(this._env.group)return this._env.group.context_id;if($("#discussion_container").size()>0){var tmp=$("#discussion_topic div.entry-content header div div.pull-left span a");if(tmp.length){var tmpHref=tmp.attr("href");if(tmpHref.length){var tmpHrefArr=tmpHref.split("/");if(3==tmpHrefArr.length)return parseInt(tmpHrefArr[2],10)}}}return null}};function _typeof(o){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=_typeof(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==_typeof(i)?i:String(i)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _readOnlyError(name){throw new TypeError('"'+name+'" is read-only')}const api=((_urlToTypeMapping=[]).quizzes="Quiz",_urlToTypeMapping.assignments="Assignment",_urlToTypeMapping.discussion_topics="Discussion",_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({_ajax:"undefined"!=typeof $?$:{},_env:"undefined"!=typeof ENV?ENV:{},_location:"undefined"!=typeof document?document.location:{search:"",href:""},_uriPrefix:"/api/v1",_defaultError:function _defaultError(event,jqxhr,settings,thrownError){console.log(event,jqxhr,settings,thrownError)},_sendRequest:function _sendRequest(method){var options=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},error=options.error||this._defaultError;method(this._uriPrefix+options.uri,options.params||{},options.callback).fail(error)},_get:function _get(options){var uri=this._uriPrefix+options.uri,params=options.params||{},callback=options.callback,customError=options.error;$.ajax({url:uri,type:"GET",data:params,success:function success(response){if("student_id"in params&&(response=response.map((function(el){return el.student_id=params.student_id,el}))),uri.includes("/groups/")&&uri.includes("/users")){var groupId=uri.split("/groups/");groupId[1].split("/users"),_readOnlyError("groupId"),parseInt(groupId[0]),_readOnlyError("groupId"),response=response.map((function(el){return el.group_id=groupId,el}))}callback(response)},error:function error(XMLHttpRequest,textStatus,errorThrown){console.log("Error during GET"),customError&&customError(XMLHttpRequest.responseText)}})},_post:function _post(options){this._sendRequest(this._ajax.post,options)},_put:function _put(options){var uri=this._uriPrefix+options.uri,params=options.params||{},callback=options.callback;$.ajax({url:uri,type:"PUT",data:params,success:function success(response){callback(response)},error:function error(XMLHttpRequest,textStatus,errorThrown){console.log("Error during PUT")}})},_delete:function _delete(options){var uri=this._uriPrefix+options.uri,params=options.params||{},callback=options.callback;$.ajax({url:uri,type:"DELETE",data:params,success:function success(response){callback(response)},error:function error(XMLHttpRequest,textStatus,errorThrown){console.log("Error during DELETE")}})},listModulesForCourse:function listModulesForCourse(callback,error,cid){var href="/api/v1/courses/".concat(cid,"/modules?per_page=100");$.getJSON(href,(function(modules){var noOfModules=modules.length,asyncsDone=0;modules.forEach((function(module,index){var j,href="/api/v1/courses/".concat(cid,"/modules/").concat(module.id,"/items?per_page=100");$.getJSON(href,(j=index,function(items){modules[j].items=items,++asyncsDone===noOfModules&&callback(modules)}))}))}))},getCurrentModuleItemId:function getCurrentModuleItemId(){var moduleId,relativeUrl=location.pathname;if(/\/courses\/\d+\/modules\/items\/\d+$/.test(relativeUrl)){var n=relativeUrl.lastIndexOf("/");moduleId=relativeUrl.substring(n+1)}else{var q=""+this._location.search;if(void 0===q||-1==q.indexOf("module_item_id"))return null;-1!=(moduleId=q.substring(q.indexOf("module_item_id")+14+1,q.length)).indexOf("&")&&(moduleId=moduleId.substring(0,moduleId.indexOf("&")))}return parseInt(moduleId,10)},getCurrentTypeAndContentId:function getCurrentTypeAndContentId(){var type=null,contentId=null;if(/\/courses\/\d+\/\w+\/\.*/.test(""+this._location.pathname)){var tmp=this._location.pathname.split("/");tmp.length>=4&&(type=_urlToTypeMapping[tmp[3]])}if(/\/courses\/\d+\/\w+\/\d+/.test(""+this._location.pathname)){var _tmp=this._location.pathname.split("/");_tmp.length>=5&&(contentId=parseInt(_tmp[4],10))}return{contentId,type}},getAllCourses:function getAllCourses(_callback,error){this._get({callback:function callback(courses){var filteredCourses=courses.filter(util.Z.filterSearchAllCourse);_callback(filteredCourses)},error,uri:"/search/all_courses",params:{per_page:999}})},getAllPublicCourses:function getAllPublicCourses(_callback2,error){this._get({callback:function callback(courses){var filteredCourses=courses.filter(util.Z.filterSearchAllCourse);_callback2(filteredCourses)},error,uri:"/search/all_courses?open_enrollment_only=true",params:{per_page:999}})},getEnrolledCourses:function getEnrolledCourses(_callback3,error){if(!util.Z.isAuthenticated())return _callback3([]),!1;this._get({callback:function callback(courses){if(settings_default().filterCourses){var filteredCourses=courses.filter(util.Z.filterCourse);_callback3(filteredCourses)}else _callback3(courses)},error,uri:"/courses?include[]=public_description",params:{include:["syllabus_body","course_progress"],per_page:"100"}})},getModulesForCurrentCourse:function getModulesForCurrentCourse(callback,error){var courseId=this.getCurrentCourseId();this.listModulesForCourse(callback,error,courseId)},getModulesForCourseId:function getModulesForCourseId(callback,error,courseId){this._get({callback,error,uri:"/courses/".concat(courseId,"/modules"),params:{per_page:999}})},getModulesForCourseIdIncludeItems:function getModulesForCourseIdIncludeItems(courseId,callback,error){this._get({callback,error,uri:"/courses/".concat(courseId,"/modules?include[]=items"),params:{per_page:999}})},getItemsForModuleId:function getItemsForModuleId(callback,error,courseId,moduleId,params){this._get({callback,error,uri:"/courses/".concat(courseId,"/modules/").concat(moduleId,"/items"),params})},getCurrentCourseId:function getCurrentCourseId(){var currentUrl=""+this._location.pathname;return utilRoot.getCourseIdFromUrl(currentUrl)},getModuleItemSequence:function getModuleItemSequence(courseId,moduleItemId,_callback4,error){this._get({callback:function callback(moduleItemSequence){_callback4(courseId,moduleItemSequence)},error,uri:"/courses/".concat(courseId,"/module_item_sequence"),params:{asset_id:moduleItemId,asset_type:"ModuleItem"}})},getCourse:function getCourse(courseId,callback,error){this._get({callback,error,uri:"/courses/".concat(courseId,"?include[]=self_enrollment_code"),params:{}})},isGroupDiscussion:function isGroupDiscussion(courseId,contentId,callback){void 0!==ENV.DISCUSSION.IS_GROUP?callback(ENV.DISCUSSION.IS_GROUP):this.getDiscussionTopic(courseId,contentId,(function(discussion){callback(!!discussion.group_category_id)}))},getCurrentGroupId:function getCurrentGroupId(){var matches=(""+this._location.pathname).match(/\/groups\/(\d+)/);return null!=matches?parseInt(matches[1],10):null},getGroup:function getGroup(groupId,callback,error){this._get({callback,error,uri:"/groups/".concat(groupId),params:{}})},getGroupMembers:function getGroupMembers(groupId,callback,error){this._get({callback,error,uri:"/groups/".concat(groupId,"/users"),params:{include:["avatar_url"],per_page:999}})},getCurrentModuleForItemOrTypeAndContentId:function getCurrentModuleForItemOrTypeAndContentId(moduleItemId,typeAndContentId,callback,error){this.getModulesForCurrentCourse((function(modules){for(var bCurrentItemFound=!1,currentHeaderItem=null,i=0;i<modules.length;i++){for(var module=modules[i],items=module.items,noOfItemsBelongingToThisHeaderDone=0,noOfItemsBelongingToThisHeader=0,j=0;j<items.length;j++){var item=items[j];(item.id==moduleItemId||null!=typeAndContentId&&typeAndContentId.contentId==item.content_id&&typeAndContentId.type==item.type)&&(item.isCurrent=!0,bCurrentItemFound=!0,currentHeaderItem&&(currentHeaderItem.isCurrentHeader=!0)),"SubHeader"==item.type?(currentHeaderItem&&noOfItemsBelongingToThisHeader==noOfItemsBelongingToThisHeaderDone&&(currentHeaderItem.done=!0),currentHeaderItem=item,noOfItemsBelongingToThisHeaderDone=0,noOfItemsBelongingToThisHeader=0):noOfItemsBelongingToThisHeader++,item.completion_requirement&&item.completion_requirement.completed&&noOfItemsBelongingToThisHeaderDone++}if(currentHeaderItem&&noOfItemsBelongingToThisHeader==noOfItemsBelongingToThisHeaderDone&&(currentHeaderItem.passed=!0),bCurrentItemFound)return void callback(module)}}),error)},getCurrentModuleItemForGroupDiscussion:function getCurrentModuleItemForGroupDiscussion(callback,error){var tmp,groupId,groupTopicId;if(/\/groups\/\d+\/discussion_topics\/\d+/.test(""+this._location.pathname)&&(tmp=this._location.pathname.split("/")).length>=5&&(groupTopicId=tmp[4],groupId=tmp[2]),null!=groupTopicId){var _this=this;this.getSpecificGroupDiscussionTopic(groupId,groupTopicId,(function(groupDiscussion){_this.getUserGroups((function(groups){for(var i=0;i<groups.length;i++)if(groups[i].id==groupId){var currentTypeAndContentId={contentId:groupDiscussion.root_topic_id,type:"Discussion"};_this.getCurrentModuleForItemOrTypeAndContentId(null,currentTypeAndContentId,callback,error);break}}))}))}},getCurrentModule:function getCurrentModule(callback,error){var currentModuleItemId=this.getCurrentModuleItemId(),currentTypeAndContentId=null,bFound=!0;null==currentModuleItemId&&null==(currentTypeAndContentId=this.getCurrentTypeAndContentId())&&(bFound=!1,this.getCurrentModuleItemForGroupDiscussion(callback,error)),bFound&&this.getCurrentModuleForItemOrTypeAndContentId(currentModuleItemId,currentTypeAndContentId,callback,error)},getLocale:function getLocale(){return this._env.LOCALE},usesFrontPage:function usesFrontPage(){return"wiki"==this._env.COURSE.default_view},getRoles:function getRoles(){return this._env.current_user_roles},getUser:function getUser(){return this._env.current_user},getUserProfile:function getUserProfile(callback,error){this._get({callback,error,uri:"/users/self/profile",params:{}})},getActivityStreamForUser:function getActivityStreamForUser(callback,error){this._get({callback,error,uri:"/users/self/activity_stream",params:{}})},currentPageIsAnnouncement:function currentPageIsAnnouncement(){return 1==$("#section-tabs").find("a.announcements.active").size()},currentPageIsModuleItem:function currentPageIsModuleItem(){return null!=this.getCurrentModuleItemId()||null!=this.getCurrentTypeAndContentId()},getUnreadMessageSize:function getUnreadMessageSize(callback,error){this._get({callback,error,uri:"/conversations/unread_count",params:{}})},getSectionRecipients:function getSectionRecipients(courseId,callback,error){var recipientsContext="course_".concat(courseId,"_sections");this._get({callback,error,uri:"/search/recipients",params:{permissions:["send_messages_all"],messageable_only:!0,synthetic_contexts:!0,context:recipientsContext,per_page:999}})},postMessageToConversation:function postMessageToConversation(courseId,recipient,subject,body,callback,error){var courseContext="course_".concat(courseId);this._post({callback,error,uri:"/conversations",params:{course:courseContext,recipients:[recipient],subject,body}})},getAccounts:function getAccounts(callback,error){this._get({callback,error,uri:"/accounts",params:{}})},getUsersForAccount:function getUsersForAccount(account,callback,error){this._get({callback,error,uri:"/accounts/".concat(account,"/users"),params:{}})},getCoursesForAccount:function getCoursesForAccount(account,callback,error){this._get({callback,error,uri:"/accounts/".concat(account,"/courses"),params:{per_page:999}})},getCoursesForUser:function getCoursesForUser(callback,error){this._get({callback,error,uri:"/courses",params:{per_page:999}})},getGroupCategoriesForAccount:function getGroupCategoriesForAccount(account,callback,error){this._get({callback,error,uri:"/accounts/".concat(account,"/group_categories"),params:{}})},getGroupCategoriesForCourse:function getGroupCategoriesForCourse(course,callback,error){this._get({callback,error,uri:"/courses/".concat(course,"/group_categories"),params:{per_page:999}})},_getGroupsForAccountHelper:function _getGroupsForAccountHelper(accumulatedGroups,callback,error){var that=this;return function(groups,status,xhr){Array.prototype.push.apply(accumulatedGroups,groups);var next=xhr.getResponseHeader("Link").split(",").find((function(e){return e.match('rel="next"')}));if(void 0===next)callback(accumulatedGroups);else{var fullURI=next.match("<([^>]+)>")[1];that._get({callback:that._getGroupsForAccountHelper(accumulatedGroups,callback,error),error,uri:fullURI.split("api/v1")[1],params:{}})}}},getGroupsForAccount:function getGroupsForAccount(account,callback,error){this._get({callback:this._getGroupsForAccountHelper([],callback,error),error,uri:"/accounts/".concat(account,"/groups"),params:{per_page:999}})},getGroupCategory:function getGroupCategory(categoryID,callback,error){this._get({callback,error,uri:"/group_categories/".concat(categoryID),params:{}})},getGroupsInCategory:function getGroupsInCategory(categoryID,callback,error){this._get({callback,error,uri:"/group_categories/".concat(categoryID,"/groups"),params:{per_page:999}})},getGroupsInCourse:function getGroupsInCourse(courseID,callback,error){this._get({callback,error,uri:"/courses/".concat(courseID,"/groups"),params:{per_page:999}})},getUserGroups:function getUserGroups(callback,error){this._get({callback,error,uri:"/users/self/groups",params:{per_page:999}})},getUserGroupsForCourse:function getUserGroupsForCourse(courseId,callback,error){this.getUserGroups((function(groups){for(var usersGroups=[],i=0;i<groups.length;i++){var group=groups[i];group.course_id==courseId&&usersGroups.push(group)}callback(usersGroups)}))},getSectionsForCourse:function getSectionsForCourse(courseID,params,callback,error){this._get({callback,error,uri:"/courses/".concat(courseID,"/sections"),params})},getSingleSection:function getSingleSection(sectionID,callback,error){this._get({callback,error,uri:"/sections/".concat(sectionID),params:{}})},getSingleAssignment:function getSingleAssignment(courseId,assignmentId,callback,error){this._get({callback,error,uri:"/courses/".concat(courseId,"/assignments/").concat(assignmentId),params:{}})},getAssignmentsForCourse:function getAssignmentsForCourse(courseId,callback,error){this._get({callback,error,uri:"/courses/".concat(courseId,"/assignments"),params:{per_page:999}})},getPagesForCourse:function getPagesForCourse(courseId,callback){this._get({callback,uri:"/courses/".concat(courseId,"/pages"),params:{per_page:999}})},getDiscussionTopicsForCourse:function getDiscussionTopicsForCourse(courseId,callback){this._get({callback,uri:"/courses/".concat(courseId,"/discussion_topics"),params:{per_page:999}})},getQuizzesForCourse:function getQuizzesForCourse(courseId,callback){this._get({callback,uri:"/courses/".concat(courseId,"/quizzes"),params:{per_page:999}})},getSingleSubmissionForUser:function getSingleSubmissionForUser(courseId,assignmentId,user_id,callback,error){this._get({callback,error,uri:"/courses/".concat(courseId,"/assignments/").concat(assignmentId,"/submissions/").concat(user_id),params:{include:["submission_history","submission_comments","rubric_assessment","visibility","course","user"]}})},getPeerReviewsForSubmissionId:function getPeerReviewsForSubmissionId(courseId,assignmentId,submission_id,callback,error){this._get({callback,error,uri:"/courses/".concat(courseId,"/assignments/").concat(assignmentId,"/submissions/").concat(submission_id,"/peer_reviews"),params:{include:["user"]}})},getPeerReviewsForAssignment:function getPeerReviewsForAssignment(courseId,assignmentId,callback,error){this._get({callback,error,uri:"/courses/".concat(courseId,"/assignments/").concat(assignmentId,"/peer_reviews"),params:{include:["user"]}})},createPeerReview:function createPeerReview(courseID,assignmentID,submissionID,userID,callback,error){this._post({callback,error,uri:"/courses/".concat(courseID,"/assignments/").concat(assignmentID,"/submissions/").concat(submissionID,"/peer_reviews"),params:{user_id:userID}})},enrollUser:function enrollUser(enrollAction,callback){$.post(enrollAction,(function(data){callback(data)}))},enrollUserIdInSection:function enrollUserIdInSection(userId,sectionId,etype,callback,error){return this._post({callback,error,uri:"/sections/".concat(sectionId,"/enrollments/"),params:{"enrollment[user_id]":userId,"enrollment[type]":etype,"enrollment[enrollment_state]":"active","enrollment[limit_privileges_to_course_section]":!0}}),!0},createGroup:function createGroup(categoryId,groupName,callback,error){this._post({callback,error,uri:"/group_categories/".concat(categoryId,"/groups"),params:{name:groupName}})},createSection:function createSection(courseId,sectionName,callback,error){this._post({callback,error,uri:"/courses/".concat(courseId,"/sections"),params:{"course_section[name]":sectionName}})},createGroupMembership:function createGroupMembership(gid,uid,callback,error){this._post({callback,error,uri:"/groups/".concat(gid,"/memberships"),params:{user_id:uid}})},createUserLogin:function createUserLogin(params,callback,error){var account_id=params.account_id;delete params.account_id,this._post({callback,error,uri:"/accounts/".concat(account_id,"/logins"),params})},getDiscussionTopic:function getDiscussionTopic(courseId,contentId,callback){this._get({callback,uri:"/courses/".concat(courseId,"/discussion_topics/").concat(contentId),params:{per_page:999}})},getQuiz:function getQuiz(courseId,contentId,callback){this._get({callback,uri:"/courses/".concat(courseId,"/quizzes/").concat(contentId),params:{per_page:999}})},getSpecificGroupDiscussionTopic:function getSpecificGroupDiscussionTopic(groupId,contentId,callback){this._get({callback,uri:"/groups/".concat(groupId,"/discussion_topics/").concat(contentId),params:{per_page:999}})},getGroupDiscussionTopics:function getGroupDiscussionTopics(contentId,callback){this._get({callback,uri:"/groups/".concat(contentId,"/discussion_topics/"),params:{per_page:999}})},getAnnouncementsForCourse:function getAnnouncementsForCourse(courseId,callback){this._get({callback,uri:"/courses/".concat(courseId,"/discussion_topics"),params:{only_announcements:!0,per_page:999}})},getEnrollmentsForCourse:function getEnrollmentsForCourse(courseId,params,callback){this._get({callback,uri:"/courses/".concat(courseId,"/enrollments"),params})},getEnrollmentsForSection:function getEnrollmentsForSection(sectionId,params,callback){this._get({callback,uri:"/sections/".concat(sectionId,"/enrollments"),params})},getUsersEnrollmentsForCourse:function getUsersEnrollmentsForCourse(courseId,_callback5){this._get({callback:function callback(courses){var filteredCourses=courses.filter((function(course){return course.course_id==courseId}));_callback5(filteredCourses)},uri:"/users/self/enrollments",params:{per_page:999}})}},"getEnrollmentsForSection",(function getEnrollmentsForSection(sectionId,params,callback){this._get({callback,uri:"/sections/".concat(sectionId,"/enrollments"),params})})),"deleteUserCustomData",(function deleteUserCustomData(callback){this._delete({callback,uri:"/users/self/custom_data",params:{ns:"no.udir.kompetanse"}})})),"saveUserCustomData",(function saveUserCustomData(privacyPolicyVersion,callback){this._put({callback,uri:"/users/self/custom_data",params:{ns:"no.udir.kompetanse",data:{privacyPolicyVersion}}})})),"saveUserPrivacyPolicyVersion",(function saveUserPrivacyPolicyVersion(privacyPolicyVersion,callback){this.saveUserCustomData(privacyPolicyVersion,callback)})),"loadUserCustomData",(function loadUserCustomData(callback,error){this._get({callback,error,uri:"/users/self/custom_data",params:{ns:"no.udir.kompetanse"}})})),"loadUserPrivacyPolicyVersion",(function loadUserPrivacyPolicyVersion(callback,error){this.loadUserCustomData(callback,error)})),"getCaledarEvents",(function getCaledarEvents(params,callback){this._get({callback,uri:"/calendar_events/",params})})),"markDiscussionTopicAsRead",(function markDiscussionTopicAsRead(courseId,contentId,callback){this._put({callback,uri:"/courses/".concat(courseId,"/discussion_topics/").concat(contentId,"/read_all"),params:{forced_read_state:"false"}})})));var _urlToTypeMapping},"./src/js/modules/util.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _settingsRoot__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/js/settingsRoot.js"),_api_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/js/api/api.js"),_settings__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/js/settings.js"),_settings__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_settings__WEBPACK_IMPORTED_MODULE_2__);const __WEBPACK_DEFAULT_EXPORT__={courseListEnum:{normalCourse:1,allCoursesList:2,myCoursesList:3,dataportenCallback:4,uidpCallback:5},mapCourseSettings:function mapCourseSettings(courses,courseSettings){return courses.forEach((function(course){var cc=courseSettings.find((function(x){return x.course_id===course.id}));cc&&(course.course_settings=cc)})),courses},mmoocLoadScript:function mmoocLoadScript(mmoocScript){var mmoocScriptElement=document.createElement("script");mmoocScriptElement.setAttribute("charset","UTF-8"),mmoocScriptElement.setAttribute("src",mmoocScript),document.body.appendChild(mmoocScriptElement)},isMobileOrTablet:function isMobileOrTablet(){return!!(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))},getPageTitleBeforeColon:function getPageTitleBeforeColon(){var title=document.title;return title.indexOf(":")&&(title=title.substring(0,title.indexOf(":"))),title},getPageTitleAfterColon:function getPageTitleAfterColon(){var title=document.title;return title.indexOf(":")&&(title=title.substring(title.indexOf(":")+1,title.length)),title},filterCourse:function filterCourse(course){return!_settings__WEBPACK_IMPORTED_MODULE_2___default().filterCourses||_settings__WEBPACK_IMPORTED_MODULE_2___default().filterCoursesOnAccountId.includes(course.account_id)},filterSearchAllCourse:function filterSearchAllCourse(course){return!_settings__WEBPACK_IMPORTED_MODULE_2___default().filterCourses||_settings__WEBPACK_IMPORTED_MODULE_2___default().filterCoursesOnAccountId.includes(course.course.account_id)},callWhenElementIsPresent:function callWhenElementIsPresent(classId,callback){var checkExist=setInterval((function(){$(classId).length&&(clearInterval(checkExist),callback())}),100)},arraySorted:function arraySorted(array,elementToSort){return"[object Array]"===Object.prototype.toString.call(array)&&elementToSort?array.sort((function(a,b){if(a.hasOwnProperty(elementToSort)&&b.hasOwnProperty(elementToSort)){var field1=a[elementToSort].toLocaleLowerCase(),field2=b[elementToSort].toLocaleLowerCase();return field1.localeCompare(field2,"nb",{usage:"sort"})}return 0})):array},goBack:function goBack(e){var oldHash=window.location.hash;return history.back(),window.location.hash!==oldHash||"string"==typeof document.referrer&&""!==document.referrer||window.setTimeout((function(){window.location.href="/frontend/"}),1e3),e&&(e.preventDefault&&e.preventDefault(),e.preventPropagation&&e.preventPropagation()),!1},adaptHeightToIframeContentForId:function adaptHeightToIframeContentForId(containerId,frameId){var scrollHeight=Number(document.getElementById(frameId).contentWindow.document.body.scrollHeight)+20;document.getElementsByClassName(containerId)[0].style.height=scrollHeight+"px"},isEnrolledAsStudent:function isEnrolledAsStudent(enrollments){for(var i=0;i<enrollments.length;i++)if("StudentEnrollment"==enrollments[i].role)return!0;return!1},isEnrolledAsObserver:function isEnrolledAsObserver(enrollments){for(var i=0;i<enrollments.length;i++)if("ObserverEnrollment"==enrollments[i].role)return!0;return!1},enrollmentsHasRoleInCourse:function enrollmentsHasRoleInCourse(enrollments,role){for(var i=0;i<enrollments.length;i++)if(enrollments[i].role==role)return!0;return!1},hasRoleInCourse:function hasRoleInCourse(courseId,role,callback){var self=this;return function(callback,role){_api_api_js__WEBPACK_IMPORTED_MODULE_1__.Z.getUsersEnrollmentsForCourse(courseId,(function(enrollments){callback(self.enrollmentsHasRoleInCourse(enrollments,role))}))}(callback,role)},isTeacherOrAdmin:function isTeacherOrAdmin(){var roles=_api_api_js__WEBPACK_IMPORTED_MODULE_1__.Z.getRoles();return null!=roles&&(-1!=roles.indexOf("teacher")||-1!=roles.indexOf("admin"))},isAdmin:function isAdmin(){var roles=_api_api_js__WEBPACK_IMPORTED_MODULE_1__.Z.getRoles();return null!=roles&&-1!=roles.indexOf("admin")},isObserver:function isObserver(course){if(course&&course.enrollments)return this.isEnrolledAsObserver(course.enrollments)},isEnrolledWithRole:function isEnrolledWithRole(course,role){if(course&&course.enrollments)for(var i=0;i<course.enrollments.length;i++)if(course.enrollments[i].role==role)return!0;return!1},isMultilangCourse:function isMultilangCourse(){return"NONE"!=this.course.kpas.multilang},isNynorskCourse:function isNynorskCourse(){return"NN"==this.course.kpas.multilang},isSamiskCourse:function isSamiskCourse(){return"SE"==this.course.kpas.multilang},isPrincipal:function isPrincipal(){return this.isTeacherOrAdmin()||this.isEnrolledWithRole(this.course,_settings__WEBPACK_IMPORTED_MODULE_2___default().principalRoleType)},isRoleBasedCourse:function isRoleBasedCourse(){return 1==this.course.kpas.role_support},isMMOOCLicense:function isMMOOCLicense(){return 1==this.course.kpas.licence},postModuleProcessing:function postModuleProcessing(){try{$("#wrapper").append('<div class="login-box" style="position: fixed">Laster diskusjonen</div>'),setInterval((function(){console.log("postModuleProcessing intervall timer called"),$(".login-box").append(".")}),1e3)}catch(e){console.log(e)}},getBannerType:function getBannerType(){return console.log(this.course),this.course&&this.course.kpas&&this.course.kpas.banner_type?this.course.kpas.banner_type:"NONE"},getAlertMsg:function getAlertMsg(){return this.course&&"ALERT"==this.course.kpas.banner_type?this.course.kpas.banner_text:""},getUnmaintainedMsg:function getUnmaintainedMsg(){return this.course&&"UNMAINTAINED"==this.course.kpas.banner_type?this.course.kpas.banner_text:""},getUnmaintainedSinceDate:function getUnmaintainedSinceDate(){return this.course&&"UNMAINTAINED"==this.course.kpas.banner_type?this.course.kpas.unmaintained_since:null},getNotificationMsg:function getNotificationMsg(){return this.course&&"NOTIFICATION"==this.course.kpas.banner_type?this.course.kpas.banner_text:""},getFeedbackMsg:function getFeedbackMsg(){return this.course&&"FEEDBACK"==this.course.kpas.banner_type?this.course.kpas.banner_text:""},getCountyOrCommunityNumber:function getCountyOrCommunityNumber(groupDescription){for(var arr=groupDescription.split(":"),i=0;i<arr.length;i++)if("community"==arr[i]||"county"==arr[i])return parseInt(arr[i+1],10);return 0},onEnrollPage:function onEnrollPage(){return window.location.href.includes("/enroll/")},isMemberOfExpiredCommunity:function isMemberOfExpiredCommunity(course,callback){var self=this;course&&_api_api_js__WEBPACK_IMPORTED_MODULE_1__.Z.getUserGroupsForCourse(course.id,(function(groups){var memberOfUtgaattKommune=!1;if(groups.length)for(var i=0;i<groups.length;i++){var group=groups[i],countyOrCommunityNumber=self.getCountyOrCommunityNumber(group.description);if(countyOrCommunityNumber&&fknr.utgaatteKommuneNr.indexOf(countyOrCommunityNumber)>-1){memberOfUtgaattKommune=!0;break}}callback(memberOfUtgaattKommune)}))},isActiveCourseRoleBased:function isActiveCourseRoleBased(){return this.isRoleBasedCourse(this.course)},isAuthenticated:function isAuthenticated(){return null!==_api_api_js__WEBPACK_IMPORTED_MODULE_1__.Z.getRoles()},getGroupsInfo:function getGroupsInfo(groups){for(var groupsInfo={},i=0;i<groups.length;i++)if(groups[i].description){var s=groups[i].description.split(":");"community"==s[2]?groupsInfo.municipalityId=s[3]:"county"==s[2]&&(groupsInfo.countyId=s[3])}return groupsInfo},formattedDate:function formattedDate(date){date=new Date(date);var month=getMonthShortName(date);return date.getDate()+" "+month+", "+date.getFullYear()+" - "+date.getHours()+":"+(date.getMinutes()<10?"0":"")+date.getMinutes()},getWeekdayShortName:function getWeekdayShortName(date){return["sø","ma","ti","on","to","fr","lø"][date.getDay()]},getMonthShortName:function getMonthShortName(date){return["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des"][date.getMonth()]},getCourseCategories:function getCourseCategories(courses){for(var categorys=[],hasOther=!1,i=0;i<courses.length;i++){var category=this.getCourseCategory(courses[i].course_code);-1==categorys.indexOf(category)&&("Andre"==category?hasOther=!0:categorys.push(category))}return hasOther&&categorys.push("Andre"),categorys},sortCourses:function sortCourses(courses){return courses.sort((function(a,b){var aParams=a.course_code.split("::");if(aParams.length<2)return 1;var aCourseCode=aParams[aParams.length-1],bParams=b.course_code.split("::");return bParams.length<2||aCourseCode<bParams[bParams.length-1]?-1:1}))},getCourseCategory:function getCourseCategory(courseCode){var category="Andre";return courseCode&&courseCode.indexOf("::")>-1&&(category=courseCode.substring(0,courseCode.indexOf("::"))),category},debounce:function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments,callNow=immediate&&!timeout;clearTimeout(timeout),timeout=setTimeout((function later(){timeout=null,immediate||func.apply(context,args)}),wait),callNow&&func.apply(context,args)}},filter:function filter(arr,fun){var len=arr.length;if("function"!=typeof fun)throw new TypeError;for(var res=new Array,thisp=arguments[1],i=0;i<len;i++)if(i in arr){var val=arr[i];fun.call(thisp,val,i,arr)&&res.push(val)}return res},urlHashToObject:function urlHashToObject(){if(""===document.location.hash)return{};var hash=location.hash.substring(1);return JSON.parse('{"'+hash.replace(/&/g,'","').replace(/=/g,'":"')+'"}',(function(key,value){return""===key?value:decodeURIComponent(value)}))},updateRightMenuButtons:function updateRightMenuButtons(){$("#course_show_secondary > a").each((function(){var $this=$(this),_href=$this.attr("href");_href.includes("/calendar?")?$this.remove():$this.attr("href",_href+_settingsRoot__WEBPACK_IMPORTED_MODULE_0__.hrefAmpQueryString)}))},removeRecentFeedback:function removeRecentFeedback(){$(".recent_feedback").each((function(){$(this).remove()}))},getLinkToAvailableCourses:function getLinkToAvailableCourses(){return"/search/all_courses"+_settingsRoot__WEBPACK_IMPORTED_MODULE_0__.hrefQueryString},isCourseFrontpageForAllCoursesList:function isCourseFrontpageForAllCoursesList(){return!1},tinyMceEditorIsInDOM:function tinyMceEditorIsInDOM(callback){this.executeCallbackWhenObjectExists((function(){tinyMCE.activeEditor}),callback)},executeCallbackWhenObjectExists:function executeCallbackWhenObjectExists(functionWithObjectReference,callback){var counter=0,success=!1,objectExistInterval=setInterval((function(){try{success||(functionWithObjectReference(),clearInterval(objectExistInterval),callback(),success=!0)}catch(e){(counter+=1)>=10&&clearInterval(objectExistInterval)}}),1e3)}}},"./src/js/settings.js":(module,__unused_webpack_exports,__webpack_require__)=>{module=__webpack_require__.nmd(module);var settings={CanvaBadgeProtocolAndHost:"https://canvabadges-beta-iktsenteret.bibsys.no",useCanvaBadge:!1,defaultNumberOfReviews:1,useDataportenGroups:!1,filterCourses:!0,filterCoursesOnAccountId:ACCOUNTID,disablePeerReviewButton:!1,principalRoleType:"Skoleleder",removeGlobalGradesLink:!0,removeGroupsLink:!0,displayProfileLeftMenu:!1,displayUserMergeButton:!0,userMergeLtiToolId:KPAS_MERGE_LTI_ID,displayGroupsTab:!1,displayDiscussionsTab:!1,displayAlertsMenuItem:!1,displayCallForAssistanceButtonInGroupDisccussions:!1,displayInboxMenu:!1,privacyPolicyLink:"https://kompetanseudirno.azureedge.net/udirdesign/privacypolicy.html?v=1_0",contactPoint:"kompetansesupport@udir.no",platformName:"UDIR - kompetanseplattform",homeOrganization:"Udir.no",aboutThePlatform:"https://kompetanseudirno.azureedge.net/udirdesign/omkompetanseudirno.html",uuStatusNb:"https://uustatus.no/nb/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431",uuStatusNn:"https://uustatus.no/nn/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431"};null!==module&&(module.exports=settings)},"./src/js/settingsRoot.js":(module,__unused_webpack_exports,__webpack_require__)=>{module=__webpack_require__.nmd(module);var settingsRoot={hrefQueryString:"?design=udir",hrefAmpQueryString:"&design=udir",feideEnrollRefferers:["design=udir","enroll_code","kslaring.no"],kpasApiUrl:KPASAPIURL};null!==module&&(module.exports=settingsRoot)}}]);