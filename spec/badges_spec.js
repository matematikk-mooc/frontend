describe("badges", function () {

    describe("initialize", function() {
        beforeEach(function () {

        });

        it("should return the right ids", function() {
            var stringToParse = "openmypage(300,40,21,4); return false";
            var parsed = mmooc.iframe.badges.extractIdsFromString(stringToParse);
            expect(parsed.badgeId).toBe('300');
            expect(parsed.clickey).toBe('40');
            expect(parsed.courseId).toBe('21');
            expect(parsed.userId).toBe('4');
        });
    });
});