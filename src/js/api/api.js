this.mmooc=this.mmooc||{};

this.mmooc.api = function() {
    return {
        _ajax: typeof $   !== "undefined" ? $   : {},

        _env:  typeof ENV !== "undefined" ? ENV : {},

        _location: typeof document !== "undefined" ? document.location : {},

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
            var courseId = this._env.COURSE_ID;
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/courses/" + courseId + "/modules",
                "params":   { "include": ["items"] }
            });
        },

        getCurrentModule: function(callback, error) {
            var currentModuleItemId = this.getCurrentModuleItemId()
            if (currentModuleItemId == null) {
                return;
            }

            this.getModulesForCurrentCourse(function(modules) {
                for (var i = 0; i < modules.length; i++) {
                    var module = modules[i];
                    var items = module.items;
                    for (var j = 0; j < items.length; j++) {
                        var item = items[j];
                        if (item.id == currentModuleItemId) {
                            item.isCurrent = true;
                            callback(module);
                            return;
                        }
                    }
                }

            }, error);
        }
    };
}();

if (typeof module !== "undefined" && module !== null) {
    module.exports = this.mmooc.api;
}
