var api = require("../src/js/api/api.js");

describe("api", function() {
    var ajax, callback;

    beforeEach(function() {
        ajax = {
            get: function(){}
        };
        api._ajax = ajax;

        spyOn(ajax, 'get').andCallFake(function(){
            return {fail: function(){}};
        });


        api._location = {
            pathname:  "/courses/2",
            search: "?module_item_id=99"
        };

        callback = "The callback";
    });

    describe("getEnrolledCourses", function() {
        it("Calls ajax.get() with correct parameters", function() {
            api.getEnrolledCourses(callback);
            expect(ajax.get).toHaveBeenCalledWith(
                '/api/v1/courses',
                {include: ['syllabus_body', 'course_progress']},
                callback
            );
        });
    });

    describe("getCurrentCourseId", function() {
        it("Extracts current course id from url on course page", function() {
            api._location = {
                pathname:  "/courses/2"
            };

            var courseId = api.getCurrentCourseId();
            expect(courseId).toBe(2);
        });
    });

    describe("getCurrentCourseId", function() {
        it("Extracts current course id from url on sub page", function() {
            api._location = {
                pathname:  "/courses/3/page"
            };

            var courseId = api.getCurrentCourseId();
            expect(courseId).toBe(3);
        });
    });


    describe("getModulesForCurrentCourse", function() {
        it("Calls ajax.get() with correct parameters", function() {
            api.getModulesForCurrentCourse(callback);
            expect(ajax.get).toHaveBeenCalled();
        });
    });

    describe("getCurrentModule", function() {
        it("Calls ajax.get() with correct parameters", function() {
            api._location = {
                search: "?module_item_id=99"
            };

            api.getCurrentModule(callback);
            expect(ajax.get).toHaveBeenCalled();
        });
    });

    describe("getCurrentModuleItemId", function() {
        it("Should return correct value based on URL", function() {
            api._location = {
                search: "?module_item_id=99"
            };

            var moduleId = api.getCurrentModuleItemId();
            expect(moduleId).toBe(99);
        });
    });

});
