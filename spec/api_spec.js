var api = require("../src/js/api/api.js");

describe("api", function() {

    describe("getEnrolledCourses", function() {

        it("", function() {
            var ajax = {
                get: function(){}
            };
            api._ajax = ajax;
            spyOn(ajax, 'get').andCallFake(function(){
                return {fail: function(){}};
            });
            api.getEnrolledCourses();
            expect(ajax.get).toHaveBeenCalledWith('/api/v1/courses', { include : [ 'syllabus_body', 'course_progress' ] }, undefined);
        });
    });
});
