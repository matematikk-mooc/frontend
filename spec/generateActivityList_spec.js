describe('menu', function() {
  describe('generateActivitiesList', function() {
    var activities;

    beforeEach(function() {
      activities = [];
      activities.push({
        title: 'Activity 1',
        read_state: false,
        type: 'Submission',
        course_id: 1,
        html_url: 'http://myDummyPage'
      });
    });

    it('should generate a unread activity', function() {
      var toTest = mmooc.util.renderTemplateWithData('activitystream', {
        activities: activities
      });
      expect(toTest).toMatch(/class=\"unread\"/);
    });

    it('should generate a activity that have already been read', function() {
      activities[0].read_state = true;
      var toTest = mmooc.util.renderTemplateWithData('activitystream', {
        activities: activities
      });
      expect(toTest).not.toMatch(/class=\"unread\"/);
    });
  });
});
