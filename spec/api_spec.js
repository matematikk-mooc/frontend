var api = require("../src/js/api/api.js");

describe("api", function() {
    var ajax;

    beforeEach(function() {
        ajax = {
            get: function(){}
        };
        api._ajax = ajax;
        spyOn(ajax, 'get').andCallFake(function(){
            return {fail: function(){}};
        });

        api._env = {
            "COURSE_ID": 1
        };
    });

    describe("getEnrolledCourses", function() {
        it(function() {
            api.getEnrolledCourses();
            expect(ajax.get).toHaveBeenCalledWith(
                '/api/v1/courses',
                {include: ['syllabus_body', 'course_progress']},
                undefined
            );
        });
    });


    describe("getModulesForCurrentCourse", function() {
        it(function() {
            api.getModulesForCurrentCourse();
            expect(ajax.get).toHaveBeenCalledWith(
                '/api/v1/courses/1/modules',
                {include: [ 'items' ] },
                undefined
            );
        });
    });
});
