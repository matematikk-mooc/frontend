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

        api._env = {
            "COURSE_ID": 1
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


    describe("getModulesForCurrentCourse", function() {
        it("Calls ajax.get() with correct parameters", function() {
            api.getModulesForCurrentCourse(callback);
            expect(ajax.get).toHaveBeenCalledWith(
                '/api/v1/courses/1/modules',
                {include: [ 'items' ] },
                callback
            );
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
