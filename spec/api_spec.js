import api from "../src/js/api/api";

describe('api', function() {
  var ajax, callback;

  beforeEach(function() {
    ajax = {
      get: function() {}
    };
    api._ajax = ajax;

    spyOn(ajax, 'get').and.callFake(function() {
      return { fail: function() {} };
    });

    api._location = {
      pathname: '/courses/2',
      search: '?module_item_id=99'
    };

    callback = 'The callback';
  });

  describe('getEnrolledCourses', function() {
    it('Calls ajax.get() with correct parameters', function() {
      api.getEnrolledCourses(callback);
      expect(ajax.get).toHaveBeenCalledWith(
        '/api/v1/courses',
        { include: ['syllabus_body'] },
        callback
      );
    });
  });

  describe('getEnrolledCoursesProgress', function() {
    it('Calls ajax.get() with correct parameters', function() {
      api.getEnrolledCourses(callback);
      expect(ajax.get).toHaveBeenCalledWith(
        '/api/v1/courses',
        { include: ['course_progress'] },
        callback
      );
    });
  });

  describe('getCurrentCourseIdFromUrl', function() {
    it('Extracts current course id from url on course page', function() {
      api._location = {
        pathname: '/courses/2'
      };

      var courseId = api.getCurrentCourseId();
      expect(courseId).toBe(2);
    });
  });

  describe('getCurrentCourseIdFromGroup', function() {
    it('Extracts current course id from ENV.group on group page', function() {
      api._location = {
        pathname: '/groups/2'
      };

      api._env = {
        group: {
          context_id: 3
        }
      };

      var courseId = api.getCurrentCourseId();
      expect(courseId).toBe(3);
    });
  });

  describe('getCurrentCourseId', function() {
    it('Extracts current course id from url on sub page', function() {
      api._location = {
        pathname: '/courses/3/page'
      };

      var courseId = api.getCurrentCourseId();
      expect(courseId).toBe(3);
    });
  });

  describe('getModulesForCurrentCourse', function() {
    it('Calls ajax.get() with correct parameters', function() {
      api.getModulesForCurrentCourse(callback);
      expect(ajax.get).toHaveBeenCalled();
    });
  });

  describe('getCurrentModule', function() {
    it('Calls ajax.get() with correct parameters', function() {
      api._location = {
        search: '?module_item_id=99'
      };

      api.getCurrentModule(callback);
      expect(ajax.get).toHaveBeenCalled();
    });
  });

  describe('getCurrentModuleItemId', function() {
    it('Should return correct value based on URL', function() {
      api._location = {
        search: '?module_item_id=99'
      };

      var moduleId = api.getCurrentModuleItemId();
      expect(moduleId).toBe(99);
    });
  });

  describe('getCurrentTypeAndContentId', function() {
    it('Should return correct type and contentid based on URL', function() {
      api._location = {
        pathname: '/courses/1/assignments/2'
      };

      var typeAndContentId = api.getCurrentTypeAndContentId();
      expect(typeAndContentId.contentId).toBe(2);
      expect(typeAndContentId.type).toBe('Assignment');
    });
  });
});
