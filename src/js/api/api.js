this.mmooc=this.mmooc||{};

this.mmooc.api = function() {
    var _urlToTypeMapping = [];

    _urlToTypeMapping['quizzes'] = 'Quiz';
    _urlToTypeMapping['assignments'] = 'Assignment';
    _urlToTypeMapping['discussion_topics'] = 'Discussion';


    return {
        _ajax: typeof $   !== "undefined" ? $   : {},

        _env:  typeof ENV !== "undefined" ? ENV : {},

        _location: typeof document !== "undefined" ? document.location : {search:"", href:""},

        _uriPrefix: "/api/v1",

        _defaultError: function (event, jqxhr, settings, thrownError) {
            console.log(event, jqxhr, settings, thrownError);
        },

        _get: function(options) {
            var error    = options.error || this._defaultError;
            var uri      = this._uriPrefix + options.uri;
            var params   = options.params || {};
            var callback = options.callback;
            this._ajax.get(uri, params, callback).fail(error);
        },

        getCurrentModuleItemId : function() {
            var paramName = "module_item_id";
            var q = "" + this._location.search;
            if (typeof q === "undefined" || q.indexOf(paramName) == -1) {
                return null;
            }

            var moduleId = q.substring(q.indexOf(paramName) + paramName.length + 1, q.length);
            if (moduleId.indexOf("&") != -1) {
                moduleId = moduleId.substring(0, moduleId.indexOf("&"));
            }

            return parseInt(moduleId, 10);
        },

        getCurrentContentId : function() {
            var q = "" + this._location.pathname;

            var moduleId = q.substring(q.indexOf(paramName) + paramName.length + 1, q.length);
            if (moduleId.indexOf("&") != -1) {
                moduleId = moduleId.substring(0, moduleId.indexOf("&"));
            }

            return parseInt(moduleId, 10);
        },

        getCurrentTypeAndContentId: function() {
            var regexp = /\/courses\/\d\/\w+\/\d/;

            if (regexp.test("" + this._location.pathname)) {
                var tmp = this._location.pathname.split("/");
                if (tmp.length >= 5) {
                    var type = _urlToTypeMapping[tmp[3]];
                    var contentId = parseInt(tmp[4], 10);
                    return { contentId: contentId, type: type};
                }
            }
            return null;
        },


        getEnrolledCourses: function(callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/courses",
                "params":   { "include": ["syllabus_body" , "course_progress"] }
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
        getModulesForCurrentCourse: function(callback, error) {
            var courseId = this.getCurrentCourseId();
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/courses/" + courseId + "/modules",
                "params":   { "include": ["items"] }
            });
        },

        getCurrentCourseId: function() {
            var currentUrl = "" + this._location.pathname;
            var matches = currentUrl.match(/\/courses\/(\d+)/);
            if (matches != null) {
                return parseInt(matches[1], 10);
            } else if (this._env.group) {
                // Group pages does not contain course id in URL, but is available via JavaScript variable
                return this._env.group.context_id;
            } else if ($("#section-tabs-header-subtitle").size() > 0) {
                // Group subpages contains course id only in a link
                var tmp = $("#section-tabs-header-subtitle").attr("href").split("/");
                if (tmp.length == 3) {
                    return parseInt(tmp[2], 10);
                }
            }

            return null;
        },

        getCourse: function(courseId, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/courses/" + courseId,
                "params":   {  }
            });
        },

        getCurrentGroupId: function() {
            var currentUrl = "" + this._location.pathname;
            var matches = currentUrl.match(/\/groups\/(\d+)/);
            if (matches != null) {
                return parseInt(matches[1], 10);
            }
            return null;
        },

        getGroup: function(groupId, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/groups/" + groupId,
                "params":   {}
            });
        },

        getGroupMembers: function(groupId, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/groups/" + groupId + "/users",
                "params":   {"include": ["avatar_url"] }
            });
        },

        getCurrentModule: function(callback, error) {
            var currentModuleItemId = this.getCurrentModuleItemId();
            var currentTypeAndContentId = null;
            if (currentModuleItemId == null) {
                currentTypeAndContentId = this.getCurrentTypeAndContentId();
                if (currentTypeAndContentId == null) {
                    return;
                }
            }

            this.getModulesForCurrentCourse(function(modules) {
                for (var i = 0; i < modules.length; i++) {
                    var module = modules[i];
                    var items = module.items;
                    for (var j = 0; j < items.length; j++) {
                        var item = items[j];
                        if (item.id == currentModuleItemId || (currentTypeAndContentId != null && currentTypeAndContentId.contentId == item.content_id && currentTypeAndContentId.type == item.type)) {
                            item.isCurrent = true;
                            callback(module);
                            return;
                        }
                    }
                }

            }, error);
        },

        getRoles : function() {
            return this._env.current_user_roles;
        },

        getUser : function() {
            return this._env.current_user;
        },

        getActivityStreamForUser: function(callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/users/self/activity_stream",
                "params":   { }
            });
        },

        currentPageIsAnnouncement: function() {
            return ($("#section-tabs").find("a.announcements.active").size() == 1);
        },

        currentPageIsModuleItem: function() {
            if (this.getCurrentModuleItemId() != null || this.getCurrentTypeAndContentId() != null) {
                return true;
            } else {
                return false;
            }
        },
        getUnreadMessageSize: function() {
          return parseInt(document.getElementsByClassName('unread-messages-count')[0].innerHTML);
        }
    };
}();

if (typeof module !== "undefined" && module !== null) {
    module.exports = this.mmooc.api;
}
