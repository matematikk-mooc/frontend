this.mmooc = this.mmooc || {};

this.mmooc.api = (function() {
  let _urlToTypeMapping = [];

  _urlToTypeMapping['quizzes'] = 'Quiz';
  _urlToTypeMapping['assignments'] = 'Assignment';
  _urlToTypeMapping['discussion_topics'] = 'Discussion';

  return {
    _ajax: typeof $ !== 'undefined' ? $ : {},
    _env: typeof ENV !== 'undefined' ? ENV : {},
    _location:
      typeof document !== 'undefined'
        ? document.location
        : { search: '', href: '' },
    _uriPrefix: '/api/v1',
    _defaultError(event, jqxhr, settings, thrownError) {
      console.log(event, jqxhr, settings, thrownError);
    },

    _sendRequest(method, options = {}) {
      const error = options.error || this._defaultError;
      const uri = this._uriPrefix + options.uri;
      const params = options.params || {};
      const callback = options.callback;
      method(uri, params, callback).fail(error);
    },

    _get(options) {
      //this._sendRequest(this._ajax.get, options);

      /*  Fix for returning student_id in response.
       *   Needed for powerfunction _printStudentProgressForSection to list progress for correct student.
       */

      const uri = this._uriPrefix + options.uri;
      const params = options.params || {};
      const callback = options.callback;

      $.ajax({
        url: uri,
        type: 'GET',
        data: params,
        success(response) {
          if ('student_id' in params) {
            response = response.map(el => {
              el.student_id = params.student_id;
              return el;
            });
          }
          if (uri.includes('/groups/') && uri.includes('/users')) {
            const groupId = uri.split('/groups/');
            groupId = groupId[1].split('/users');
            groupId = parseInt(groupId[0]);
            response = response.map(el => {
              el.group_id = groupId;
              return el;
            });
          }
          callback(response);
        },
        error(XMLHttpRequest, textStatus, errorThrown) {
          console.log('Error during GET');
        }
      });
    },

    _post(options) {
      this._sendRequest(this._ajax.post, options);
    },

    _put(options) {
      const uri = this._uriPrefix + options.uri;
      const params = options.params || {};
      const callback = options.callback;

      $.ajax({
        url: uri,
        type: 'PUT',
        data: params,
        success(response) {
          callback(response);
        },
        error(XMLHttpRequest, textStatus, errorThrown) {
          console.log('Error during PUT');
        }
      });
    },

    /*  FIXME for listModulesForCourse()
     *  This function loads data in a blocking manner no matter how many items and modules are present.
     *  This could potentially pose problems in the future, as page load time increases rapidly when
     *  the number of requests are numerous. This function should be updated to use non-blocking loading
     *  if Canvas is not updated to allow for better data loading through their API.
     */
    listModulesForCourse(callback, error, cid) {
      let href = `/api/v1/courses/${cid}/modules?per_page=100`;
      $.getJSON(href, modules => {
        const noOfModules = modules.length;
        let asyncsDone = 0;
        modules.forEach((module, index) => {
          const href = `/api/v1/courses/${cid}/modules/${
            module.id
          }/items?per_page=100`;
          $.getJSON(
            href,
            (function(j) {
              return function(items) {
                modules[j].items = items;
                asyncsDone++;

                asyncsDone === noOfModules && callback(modules);
              };
            })(index) // calling the function with the current value
          );
        });
      });
    },
    getCurrentModuleItemId() {
      let moduleId;
      const relativeUrl = location.pathname;
      const patt = /\/courses\/\d+\/modules\/items\/\d+$/;
      const isRelativeUrlMatching = patt.test(relativeUrl);
      if (isRelativeUrlMatching) {
        const n = relativeUrl.lastIndexOf('/');
        moduleId = relativeUrl.substring(n + 1);
      } else {
        const paramName = 'module_item_id';
        const q = '' + this._location.search;
        if (typeof q === 'undefined' || q.indexOf(paramName) == -1) return null;

        moduleId = q.substring(
          q.indexOf(paramName) + paramName.length + 1,
          q.length
        );
        if (moduleId.indexOf('&') != -1)
          moduleId = moduleId.substring(0, moduleId.indexOf('&'));
      }
      return parseInt(moduleId, 10);
    },

    getCurrentTypeAndContentId() {
      const contentElementRegexp = /\/courses\/\d+\/\w+\/\d+/;
      const isContentRegexp = /\/courses\/\d+\/\w+\/\.*/;

      var type = null;
      var contentId = null;

      if (isContentRegexp.test('' + this._location.pathname)) {
        const tmp = this._location.pathname.split('/');
        if (tmp.length >= 4) {
          type = _urlToTypeMapping[tmp[3]];
        }
      }

      if (contentElementRegexp.test('' + this._location.pathname)) {
        const tmp = this._location.pathname.split('/');
        if (tmp.length >= 5) {
          contentId = parseInt(tmp[4], 10);
        }
      }

      return { contentId: contentId, type: type };
    },

    getAllCourses(callback, error) {
      this._get({
        callback: function(courses) {
          const filteredCourses = courses.filter(
            mmooc.util.filterSearchAllCourse
          );
          callback(filteredCourses);
        },
        error: error,
        uri: '/search/all_courses',
        params: { per_page: 999 }
      });
    },

    getAllPublicCourses: function(callback, error) {
      this._get({
        callback: function(courses) {
          var filteredCourses = courses.filter(
            mmooc.util.filterSearchAllCourse
          );
          callback(filteredCourses);
        },
        error: error,
        // if not authenticated, it displays only courses with Open Enrollment enabled
        uri: '/search/all_courses?open_enrollment_only=true',
        params: { per_page: 999 }
      });
    },

    getEnrolledCourses: function(callback, error) {
      // returns empty set if a user is not authenticated
      if (!mmooc.util.isAuthenticated()) {
        callback([]);
        return false;
      }

      this._get({
        callback: function(courses) {
          if(mmooc.settings.filterCourses) { 
            const filteredCourses = courses.filter(mmooc.util.filterCourse);
            callback(filteredCourses);
          } else {
            callback(courses);
          }
        },
        error: error,
        uri: '/courses',
        params: {
          include: ['syllabus_body', 'course_progress'],
          per_page: '100'
        }
      });
    },

    /* FIXME Regarding include items: This parameter suggests that
     * Canvas return module items directly in the Module object
     * JSON, to avoid having to make separate API requests for
     * each module when enumerating modules and items. Canvas is
     * free to omit 'items' for any particular module if it deems
     * them too numerous to return inline. Callers must be
     * prepared to use the List Module Items API if items are not
     * returned.
     */
    getModulesForCurrentCourse(callback, error) {
      const courseId = this.getCurrentCourseId();
      this.listModulesForCourse(callback, error, courseId);
    },

    getModulesForCourseId(callback, error, courseId) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/modules`,
        params: { per_page: 999 }
      });
    },

    getItemsForModuleId(callback, error, courseId, moduleId, params) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/modules/${moduleId}/items`,
        params: params
      });
    },

    getCurrentCourseId() {
      const currentUrl = '' + this._location.pathname;
      return mmooc.utilRoot.getCourseIdFromUrl(currentUrl);
    },
    getModuleItemSequence(courseId, moduleItemId, callback, error) {
      this._get({
        callback: function(moduleItemSequence) {callback(courseId, moduleItemSequence)},
        error: error,
        uri: `/courses/${courseId}/module_item_sequence`,
        params: { asset_id: moduleItemId, asset_type: "ModuleItem" }
      });
    },

    getCourse(courseId, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}`,
        params: {}
      });
    },
    //Note that in newer versions of Canvas, worked on 8.2.2019.
    //we can use ENV to check this.
    isGroupDiscussion: function(courseId, contentId, callback) {
        if (typeof ENV.DISCUSSION.IS_GROUP !== 'undefined') callback(ENV.DISCUSSION.IS_GROUP);

        //Fallback for older versions.            
        this.getDiscussionTopic(courseId, contentId, function(discussion) {
            callback(discussion.group_category_id ? true : false);
        });
    },

    getCurrentGroupId() {
      const currentUrl = '' + this._location.pathname;
      const matches = currentUrl.match(/\/groups\/(\d+)/);
      if (matches != null) {
        return parseInt(matches[1], 10);
      }
      return null;
    },

    getGroup(groupId, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/groups/${groupId}`,
        params: {}
      });
    },

    getGroupMembers(groupId, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/groups/${groupId}/users`,
        params: { include: ['avatar_url'], per_page: 999 }
      });
    },

    getCurrentModuleForItemOrTypeAndContentId(
      moduleItemId,
      typeAndContentId,
      callback,
      error
    ) {
      this.getModulesForCurrentCourse(modules => {
        let bCurrentItemFound = false;
        let currentHeaderItem = null;
        for (let i = 0; i < modules.length; i++) {
          const module = modules[i];
          const items = module.items;
          let noOfItemsBelongingToThisHeaderDone = 0;
          let noOfItemsBelongingToThisHeader = 0;
          for (let j = 0; j < items.length; j++) {
            const item = items[j];
            //Need to check type and id for quiz and assignment items
            const isCurrentModuleItem =
              item.id == moduleItemId ||
              (typeAndContentId != null &&
                typeAndContentId.contentId == item.content_id &&
                typeAndContentId.type == item.type);
            if (isCurrentModuleItem) {
              item.isCurrent = true;
              bCurrentItemFound = true;
              if (currentHeaderItem) {
                currentHeaderItem.isCurrentHeader = true;
              }
            }
            //Need to check for subheaders to support collapsible elements in the menu.
            if (item.type == 'SubHeader') {
              //Need to know if headeritem icon should be green.
              if (
                currentHeaderItem &&
                noOfItemsBelongingToThisHeader ==
                  noOfItemsBelongingToThisHeaderDone
              ) {
                currentHeaderItem.done = true;
              }
              currentHeaderItem = item;
              noOfItemsBelongingToThisHeaderDone = 0;
              noOfItemsBelongingToThisHeader = 0;
            } else {
              noOfItemsBelongingToThisHeader++;
            }

            //Keep track of number of items passed.
            if (item.completion_requirement) {
              if (item.completion_requirement.completed) {
                noOfItemsBelongingToThisHeaderDone++;
              }
            }
          }
          //Have to check if the last header item is passed.
          if (
            currentHeaderItem &&
            noOfItemsBelongingToThisHeader == noOfItemsBelongingToThisHeaderDone
          ) {
            currentHeaderItem.passed = true;
          }

          //Callback and return when we've found the current item.
          if (bCurrentItemFound) {
            callback(module);
            return;
          }
        }
      }, error);
    },

    //To find which module a group discussion belongs to, we need to
    //1. Get the group discussion
    //2. Get the group category
    //3. Get the root discussion
    //4. Get the module
    //A group discussion has a location like this:
    //https://beta.matematikk.mooc.no/groups/361/discussion_topics/79006
    getCurrentModuleItemForGroupDiscussion(callback, error) {
      const regexp = /\/groups\/\d+\/discussion_topics\/\d+/;
      let tmp;
      let groupId;
      let groupTopicId;

      //Extract groupId and groupTopicId
      if (regexp.test('' + this._location.pathname)) {
        tmp = this._location.pathname.split('/');
        if (tmp.length >= 5) {
          groupTopicId = tmp[4];
          groupId = tmp[2];
        }
      }
      if (groupTopicId == null) return;

      //https://beta.matematikk.mooc.no/api/v1/groups/361/discussion_topics/79006
      //Need to keep track of this to access it inside the inline functions below.
      const _this = this;
      this.getSpecificGroupDiscussionTopic(
        groupId,
        groupTopicId,
        groupDiscussion => {
          _this.getUserGroups(groups => {
            for (let i = 0; i < groups.length; i++) {
              if (groups[i].id == groupId) {
                const moduleItemId = null;
                const currentTypeAndContentId = {
                  contentId: groupDiscussion.root_topic_id,
                  type: 'Discussion'
                };
                _this.getCurrentModuleForItemOrTypeAndContentId(
                  moduleItemId,
                  currentTypeAndContentId,
                  callback,
                  error
                );
                break; //We found the correct group, no need to check the rest.
              }
            } //end for all the groups
          }); //getUserGroups
        }
      ); //getSpecificGroupDiscussionTopic
    },

    getCurrentModule(callback, error) {
      const currentModuleItemId = this.getCurrentModuleItemId();
      let currentTypeAndContentId = null;
      let bFound = true;
      //Quizzes and assignments does not have module item id in URL
      if (currentModuleItemId == null) {
        currentTypeAndContentId = this.getCurrentTypeAndContentId();

        //If we haven't found what we want by now, it must be a group discussion
        if (currentTypeAndContentId == null) {
          bFound = false;
          this.getCurrentModuleItemForGroupDiscussion(callback, error);
        }
      }

      if (bFound) {
        this.getCurrentModuleForItemOrTypeAndContentId(
          currentModuleItemId,
          currentTypeAndContentId,
          callback,
          error
        );
      }
    },

    getLocale() {
      return this._env.LOCALE;
    },

    usesFrontPage() {
      return this._env.COURSE.default_view == 'wiki';
    },

    getRoles() {
      return this._env.current_user_roles;
    },

    getUser() {
      return this._env.current_user;
    },

    getUserProfile(callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: '/users/self/profile',
        params: {}
      });
    },
    getActivityStreamForUser(callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: '/users/self/activity_stream',
        params: {}
      });
    },

    currentPageIsAnnouncement() {
      return (
        $('#section-tabs')
          .find('a.announcements.active')
          .size() == 1
      );
    },

    currentPageIsModuleItem() {
      if (
        this.getCurrentModuleItemId() != null ||
        this.getCurrentTypeAndContentId() != null
      ) {
        return true;
      } else {
        return false;
      }
    },

    //20180914ETH Inbox unread count used the DOM, but Canvas updates the DOM asynchronously, causing
    //            the value to be 0 if our code ran to early. Use the API instead.
    getUnreadMessageSize(callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: '/conversations/unread_count',
        params: {}
      });
    },
    //api/v1/search/recipients?search=&per_page=20&permissions[]=send_messages_all&messageable_only=true&synthetic_contexts=true&context=course_1_sections
    //[{"id":"section_4","name":"Test 1","avatar_url":"http://localhost/images/messages/avatar-group-50.png","type":"context","user_count":2,"permissions":{"send_messages_all":true,"send_messages":true}}]
    getSectionRecipients(courseId, callback, error) {
      const recipientsContext = `course_${courseId}_sections`;
      this._get({
        callback: callback,
        error: error,
        uri: '/search/recipients',
        params: {
          permissions: ['send_messages_all'],
          messageable_only: true,
          synthetic_contexts: true,
          context: recipientsContext,
          per_page: 999
        }
      });
    },

    /*
        from_conversation_id:
mode: async
scope:
filter:
group_conversation: true
course: course_1
context_code: course_1
recipients[]: section_6
subject: Test
bulk_message: 0
user_note: 0
media_comment_id:
media_comment_type:
body: test
*/

    postMessageToConversation(
      courseId,
      recipient,
      subject,
      body,
      callback,
      error
    ) {
      const courseContext = `course_${courseId}`;
      this._post({
        callback: callback,
        error: error,
        uri: '/conversations',
        params: {
          course: courseContext,
          recipients: [recipient],
          subject: subject,
          body: body
        }
      });
    },

    getAccounts(callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: '/accounts',
        params: {}
      });
    },

    getUsersForAccount(account, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/accounts/${account}/users`,
        params: {}
      });
    },
    getCoursesForAccount(account, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/accounts/${account}/courses`,
        params: { per_page: 999 }
      });
    },

    getCoursesForUser(callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: '/courses',
        params: { per_page: 999 }
      });
    },

    getGroupCategoriesForAccount(account, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/accounts/${account}/group_categories`,
        params: {}
      });
    },

    getGroupCategoriesForCourse(course, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${course}/group_categories`,
        params: { per_page: 999 }
      });
    },

    // Recursively fetch all groups by following the next links
    // found in the Links response header:
    // https://canvas.instructure.com/doc/api/file.pagination.html
    _getGroupsForAccountHelper(accumulatedGroups, callback, error) {
      const that = this;
      return (groups, status, xhr) => {
        Array.prototype.push.apply(accumulatedGroups, groups);
        const next = xhr
          .getResponseHeader('Link')
          .split(',')
          .find(e => {
            return e.match('rel="next"');
          });
        if (next === undefined) {
          callback(accumulatedGroups);
        } else {
          const fullURI = next.match('<([^>]+)>')[1];
          that._get({
            callback: that._getGroupsForAccountHelper(
              accumulatedGroups,
              callback,
              error
            ),
            error: error,
            uri: fullURI.split('api/v1')[1],
            params: {}
          });
        }
      };
    },

    getGroupsForAccount(account, callback, error) {
      this._get({
        callback: this._getGroupsForAccountHelper([], callback, error),
        error: error,
        uri: `/accounts/${account}/groups`,
        params: { per_page: 999 }
      });
    },

    // /api/v1/group_categories/:group_category_id
    getGroupCategory(categoryID, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/group_categories/${categoryID}`,
        params: {}
      });
    },

    // /api/v1/group_categories/:group_category_id/groups
    getGroupsInCategory(categoryID, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/group_categories/${categoryID}/groups`,
        params: { per_page: 999 }
      });
    },

    // /api/v1/courses/:course_id/groups
    getGroupsInCourse(courseID, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseID}/groups`,
        params: { per_page: 999 }
      });
    },

    getUserGroups(callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: '/users/self/groups',
        params: { per_page: 999 }
      });
    },
    getUserGroupsForCourse(courseId, callback, error) {
      this.getUserGroups(groups => {
          let usersGroups = [];
          for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            if (group.course_id == courseId) {
              usersGroups.push(group);
            }
          }
          callback(usersGroups);
        }
      );
    },

    // /api/v1/courses/:course_id/sections
    getSectionsForCourse(courseID, params, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseID}/sections`,
        params: params
      });
    },

    // /api/v1/sections/:section_id
    getSingleSection(sectionID, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/sections/${sectionID}`,
        params: {}
      });
    },

    // /api/v1/courses/54/assignments/369
    getSingleAssignment(courseId, assignmentId, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/assignments/${assignmentId}`,
        // "params": {"include": ["submission", "assignment_visibility", "overrides", "observed_users"]},
        params: {}
      });
    },

    // /api/v1/courses/:course_id/assignments
    getAssignmentsForCourse(courseId, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/assignments`,
        params: { per_page: 999 }
      });
    },
    getPagesForCourse(courseId, callback) {
      this._get({
        callback: callback,
        uri: `/courses/${courseId}/pages`,
        params: { per_page: 999 }
      });
    },

    getDiscussionTopicsForCourse(courseId, callback) {
      this._get({
        callback: callback,
        uri: `/courses/${courseId}/discussion_topics`,
        params: { per_page: 999 }
      });
    },
    getQuizzesForCourse(courseId, callback) {
      this._get({
        callback: callback,
        uri: `/courses/${courseId}/quizzes`,
        params: { per_page: 999 }
      });
    },

    // /api/v1/courses/54/assignments/369/submissions/1725
    getSingleSubmissionForUser(
      courseId,
      assignmentId,
      user_id,
      callback,
      error
    ) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/assignments/${assignmentId}/submissions/${user_id}`,
        params: {
          include: [
            'submission_history',
            'submission_comments',
            'rubric_assessment',
            'visibility',
            'course',
            'user'
          ]
        }
        // "params": {"include": ["rubric_assessment", "visibility"]},
      });
    },

    // /api/v1/courses/7/assignments/11/submissions/4/peer_reviews
    // This API displays info about who has the peer review for a specific submissionID which is the id property on the submission object (different from user id)
    getPeerReviewsForSubmissionId(
      courseId,
      assignmentId,
      submission_id,
      callback,
      error
    ) {
      // Returns only the student's peer reviews if you are a student. Returns all peer reviews if you are a teacher or admin
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/assignments/${assignmentId}/submissions/${submission_id}/peer_reviews`,
        // "params": {"include": ["submission_comments", "user"]},
        params: { include: ['user'] }
      });
    },

    // /api/v1/courses/:course_id/assignments/:assignment_id/peer_reviews
    getPeerReviewsForAssignment(courseId, assignmentId, callback, error) {
      this._get({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/assignments/${assignmentId}/peer_reviews`,
        params: { include: ['user'] }
      });
    },

    createPeerReview(
      courseID,
      assignmentID,
      submissionID,
      userID,
      callback,
      error
    ) {
      this._post({
        callback: callback,
        error: error,
        uri: `/courses/${courseID}/assignments/${assignmentID}/submissions/${submissionID}/peer_reviews`,
        params: { user_id: userID }
      });
    },

    //https://kurs.iktsenteret.no/api/v1/courses/41/enrollments?enrollment%5Bself_enrollment_code%5D=WJTLML&enrollment%5Buser_id%5D=self
    enrollUser(enrollAction, callback) {
      const jqxhr = $.post(enrollAction, data => {
        callback(data);
      });
    },
    /*
uri = sprintf("/api/v1/courses/%d/enrollments", cid)
dbg(uri)
$canvas.post(uri, {'enrollment[user_id]' => user_id, 'enrollment[type]' => etype,
	'enrollment[enrollment_state]' => "active"})
*/
    enrollUserIdInSection(userId, sectionId, etype, callback, error) {
      this._post({
        callback: callback,
        error: error,
        uri: `/sections/${sectionId}/enrollments/`,
        params: {
          'enrollment[user_id]': userId,
          'enrollment[type]': etype,
          'enrollment[enrollment_state]': 'active',
          'enrollment[limit_privileges_to_course_section]': true
        }
      });
      return true;
    },
    createGroup(categoryId, groupName, callback, error) {
      this._post({
        callback: callback,
        error: error,
        uri: `/group_categories/${categoryId}/groups`,
        params: {
          name: groupName
        }
      });
    },
    createSection(courseId, sectionName, callback, error) {
      this._post({
        callback: callback,
        error: error,
        uri: `/courses/${courseId}/sections`,
        params: {
          'course_section[name]': sectionName
        }
      });
    },

    createGroupMembership(gid, uid, callback, error) {
      this._post({
        callback: callback,
        error: error,
        uri: `/groups/${gid}/memberships`,
        params: { user_id: uid }
      });
    },

    createUserLogin(params, callback, error) {
      const account_id = params.account_id;
      delete params.account_id;
      this._post({
        callback: callback,
        error: error,
        uri: `/accounts/${account_id}/logins`,
        params: params
      });
    },

    getDiscussionTopic(courseId, contentId, callback) {
      this._get({
        callback: callback,
        uri: `/courses/${courseId}/discussion_topics/${contentId}`,
        params: { per_page: 999 }
      });
    },

    getQuiz(courseId, contentId, callback) {
      this._get({
        callback: callback,
        uri: `/courses/${courseId}/quizzes/${contentId}`,
        params: { per_page: 999 }
      });
    },

    getSpecificGroupDiscussionTopic(groupId, contentId, callback) {
      this._get({
        callback: callback,
        uri: `/groups/${groupId}/discussion_topics/${contentId}`,
        params: { per_page: 999 }
      });
    },

    getGroupDiscussionTopics(contentId, callback) {
      this._get({
        callback: callback,
        uri: `/groups/${contentId}/discussion_topics/`,
        params: { per_page: 999 }
      });
    },

    getAnnouncementsForCourse(courseId, callback) {
      this._get({
        callback: callback,
        uri: `/courses/${courseId}/discussion_topics`,
        params: { only_announcements: true, per_page: 999 }
      });
    },

    getEnrollmentsForCourse(courseId, params, callback) {
      this._get({
        callback: callback,
        uri: `/courses/${courseId}/enrollments`,
        params: params
      });
    },
    getEnrollmentsForSection(sectionId, params, callback) {
      this._get({
        callback: callback,
        uri: `/sections/${sectionId}/enrollments`,
        params: params
      });
    },
    getUsersEnrollmentsForCourse(courseId, callback) {
      this._get({
        callback: courses => {
          const filteredCourses = courses.filter(
            course => course.course_id == courseId
          );
          callback(filteredCourses);
        },
        uri: `/users/self/enrollments`,
        params: {per_page: 999}
      });
    },
    getEnrollmentsForSection(sectionId, params, callback) {
      this._get({
        callback: callback,
        uri: `/sections/${sectionId}/enrollments`,
        params: params
      });
    },


    getCaledarEvents(params, callback) {
      this._get({
        callback: callback,
        uri: '/calendar_events/',
        params: params
      });
    },

    //To be used later when displaying info about unread discussion comments.
    // getDiscussionTopics(courseId, callback) {
    //     this._get({
    //         "callback": callback,
    //         "uri": `/courses/${courseId}/discussion_topics`,
    //         "params": { per_page: 999 },
    //     });
    // },

    markDiscussionTopicAsRead(courseId, contentId, callback) {
      this._put({
        callback: callback,
        uri: `/courses/${courseId}/discussion_topics/${contentId}/read_all`,
        params: { forced_read_state: 'false' }
      });
    }
  };
})();

if (typeof module !== 'undefined' && module !== null) {
  module.exports = this.mmooc.api;
}
