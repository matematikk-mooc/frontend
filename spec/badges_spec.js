describe("badges", function () {
    const name = "Jasmine test",
        type = "Course",
        imgSrc ='https://animg.png',
        courseId = '1',
        completedText = 'You have completed the modules required to achieve this badge.',
        mozilla = {
            url: "https://beta.matematikk.mooc.no/badgesafe/badge/40/4/299-znegva@reyraqguhar.pbz-assertion.json",
            name: "Mozilla export",
            earner: "martin@erlendthune.com",
            awardId: "11"
        };
    var generateTemplate;

    beforeEach(function () {


        generateTemplate = function (name, type, imgSrc, courseId, completedText, backpackEnabled) {

            function addBackPackButton(backpackEnabled) {
                if (backpackEnabled) {
                    return '<a href="javascript: void(0);" class="claimbadge btn"' +
                        'badge-url="' + mozilla.url + '"' +
                        'badge-name="' + mozilla.name + '" badge-earner="' + mozilla.earner +
                        '" award-id="' + mozilla.awardId + '">Export</a>';
                }
                return '';
            }

            var template = '<div class="span4">' +
                '<div class="thumbnail text-center">' +
                    '<a href="javascript:void(0)" onclick="openmypage(299,40,' + courseId + ',4); return false">' +
                        '<img src="' + imgSrc + '" style="max-width: 125px">' +
                    '</a>' +
                    '<h3>' + name + '</h3>' +
                    '<p>Some text here</p>' +
                    '<p>' + completedText + ' </p>' +
                    '<div class="progress active">' +
                        '<div class="bar bar-success" style="width: 100%;"></div>' +
                    '</div>' +
                    '<p id="badge-btn-22">' + addBackPackButton(backpackEnabled) + '</p>' +
                    '<p>' + type + '</p>' +
                '</div></div>';

            return template;
        };
    });



    describe("initialize", function() {

        it("should return the right ids", function() {
            var stringToParse = "openmypage(300,40,21,4); return false";
            var parsed = mmooc.iframe.badges.extractIdsFromString(stringToParse);
            expect(parsed.badgeId).toBe('300');
            expect(parsed.clickey).toBe('40');
            expect(parsed.courseId).toBe('21');
            expect(parsed.userId).toBe('4');
        });
    });

    describe("applyNewDesign", function() {

        var parsed, template;

        beforeEach(function () {
            template = generateTemplate(name, type, imgSrc, courseId, completedText, false);
            parsed = mmooc.iframe.badges.applyNewDesign(jQuery(template));
        });

        it("should mark as complete", function() {
            expect(parsed.complete).toBeTruthy();
        });

        it("should use the right url", function() {
            expect(parsed.badgeImage).toBe(jQuery(template).find('.thumbnail a img').attr("src"));
        });

        it("should render the correct name", function() {
            expect(parsed.name).toBe(name);
        });
        it("should use the default image if not complete", function() {
            var template = generateTemplate(name, type, imgSrc, courseId, "not finished yet");
            parsed = mmooc.iframe.badges.applyNewDesign(jQuery(template));
            expect(parsed.complete).toBeFalsy();
            expect(parsed.badgeImage).toBe(mmooc.constants.BADGE_LOCKED_IMAGE_URL);
        });

        it("criteria is the first p element", function() {
            expect(parsed.criteria).toBe(jQuery(template).find('p:first').html());
        });

        it("should give the right course Id", function() {
            expect(parsed.courseId).toBe(courseId);
        });
    });


    describe("backpack", function () {
        var template;

        beforeEach(function () {
            template = jQuery(generateTemplate(name, type, imgSrc, courseId, completedText, true));
        });

        it("should generate bacpack in case completed", function(){
            var backpack = mmooc.iframe.badges.backpack(true, template);
            expect(backpack.active).toBe(true);
            expect(backpack.button).toExist();
            expect(backpack.awardId).toBe(mozilla.awardId);
        });

        it("should not generate bacpack when is not completed", function(){
            var backpack = mmooc.iframe.badges.backpack(false, template);
            expect(backpack.active).toBe(false);
            expect(backpack.button).not.toExist();
            expect(backpack.awardId).not.toExist();
        });

        it("not all completed modules have a backpack", function() {
            template = jQuery(generateTemplate(name, type, imgSrc, courseId, completedText, false));
            var backpack = mmooc.iframe.badges.backpack(true, template);
            expect(backpack.active).toBe(false);
            expect(backpack.button).not.toExist();
            expect(backpack.awardId).not.toExist();
        });
    });
});