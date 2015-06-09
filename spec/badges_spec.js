describe("badges", function () {

    describe("initialize", function() {

        it("should return the right ids", function() {
            var stringToParse = "openmypage(300,40,21,4); return false";
            var parsed = mmooc.iframe.badges.extractIdsFromString(stringToParse);
            expect(parsed.badgeId).toBe('300');
            expect(parsed.clickey).toBe('40');
            expect(parsed.courseId).toBe('21');
            expect(parsed.userId).toBe('4');
        });


        describe("applyNewDesign", function() {
            const name = "Jasmine test",
                type = "Course",
                imgSrc ='https://animg.png',
                courseId = '1',
                completedText = 'You have completed the modules required to achieve this badge.';
            var parsed, generateTemplate, template;

            beforeEach(function () {

                generateTemplate = function (name, type, imgSrc, courseId, completedText) {
                    return '<div class="span4">' +
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
                            '<p>' + type + '</p>' +
                        '</div></div>';
                };

                template = generateTemplate(name, type, imgSrc, courseId, completedText);
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

            it("should set the right type", function() {
                expect(parsed.type).toBe(mmooc.i18n[type]);
            });

            it("should generate the right label", function() {
                expect(parsed.badgeFooter).toBe(mmooc.i18n[type] + mmooc.constants.BADGE_LABEL);
            });

            it("criteria is the first p element", function() {
                expect(parsed.criteria).toBe(jQuery(template).find('p:first').html());
            });

            it("should give the right course Id", function() {
                expect(parsed.courseId).toBe(courseId);
            })
        });

    });
});