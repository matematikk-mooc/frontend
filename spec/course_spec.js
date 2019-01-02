describe('course', function() {
  describe('isCourseCompleted', function() {
    var moduleNotCompleted,
      moduleCompleted,
      itemCompleted,
      itemNotCompleted,
      itemEmpty;

    beforeEach(function() {
      itemCompleted = { completion_requirement: { completed: true } };
      itemNotCompleted = { completion_requirement: { completed: false } };
      itemEmpty = {};

      function BuildModule(moduleItems) {
        return {
          items: moduleItems
        };
      }

      moduleNotCompleted = BuildModule([
        itemCompleted,
        itemNotCompleted,
        itemEmpty
      ]);
      moduleCompleted = BuildModule([itemCompleted, itemCompleted, itemEmpty]);
    });

    it('course is not complete if all his modules are not completed', function() {
      var modules = [moduleCompleted, moduleCompleted, moduleNotCompleted];
      var courseCompleted = mmooc.courseList.isCourseCompleted(modules);
      expect(courseCompleted).toBe(false);
    });

    it('one not completed item is enough for course not to be completed', function() {
      var modules = [moduleCompleted, moduleCompleted, moduleCompleted];
      modules[2].items.push(itemNotCompleted);
      var courseCompleted = mmooc.courseList.isCourseCompleted(modules);
      expect(courseCompleted).toBe(false);
    });

    it('one empty item are ignored and course should be complete', function() {
      var modules = [moduleCompleted, moduleCompleted, moduleCompleted];
      modules[2].items.push(itemEmpty);
      var courseCompleted = mmooc.courseList.isCourseCompleted(modules);
      expect(courseCompleted).toBe(true);
    });

    it('all items complete', function() {
      var modules = [moduleCompleted, moduleCompleted, moduleCompleted];
      var courseCompleted = mmooc.courseList.isCourseCompleted(modules);
      expect(courseCompleted).toBe(true);
    });
  });
});
