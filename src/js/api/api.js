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
            debugger;
            $.get(uri, params, callback).fail(error);
        },

    getModulesForCurrentCourse: function(callback, error) {
      var data = {};
      callback(data);
    }
  };
}();
