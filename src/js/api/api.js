this.mmooc=this.mmooc||{};


this.mmooc.api = function() {
    return {
        uri_prefix: "/api/v1",

        default_error: function (event, jqxhr, settings, thrownError) {
            console.log(event, jqxhr, settings, thrownError);
        },

        getEnrolledCourses: function(callback, error) {
            error = error || this.default_error;
            var uri = this.uri_prefix + "/courses";
            var params = { "include": ["syllabus_body" , "course_progress"] };
            $.get(uri, params, callback).fail(error);
        },

        getModulesForCurrentCourse: function(callback, error) {
            error = error || this.default_error;
            var course_id = ENV.COURSE_ID;
            var uri = this.uri_prefix + "/courses/" + course_id + "/modules";
            var params = { "include": ["items"] };
            /* FIXME
             * Regarding include items:
             * This parameter suggests that Canvas return module items
             * directly in the Module object JSON, to avoid having to
             * make separate API requests for each module when
             * enumerating modules and items. Canvas is free to omit
             * 'items' for any particular module if it deems them too
             * numerous to return inline. Callers must be prepared to
             * use the List Module Items API if items are not
             * returned.
             */
            $.get(uri, params, callback).fail(error);
        }
    };
}();
