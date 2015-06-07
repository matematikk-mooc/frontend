this.mmooc=this.mmooc||{};


this.mmooc.iframe = {
    badges : function() {


        var getRightType = function ($element) {
            var type = $element.find('.thumbnail p:last').html();
            return mmooc.i18n[type] ? mmooc.i18n[type] : type;
        };

        return {
            initPage: function() {
                var $badges = $(document).find('#badge-wrap .row-fluid .span4');

                var redesignedBadges = [];
                $badges.each(function (){
                    $(this).hide();

                    redesignedBadges.push(mmooc.iframe.badges.applyNewDesign($(this)));
                });

                mmooc.iframe.badges.displayElements(redesignedBadges);
            },

            applyNewDesign: function($element) {

                var complete = $element.find(":contains('You have completed the modules required to achieve this badge.')").size() > 0;
                var badgeIds = mmooc.iframe.badges.extractIdsFromString($element.find('.thumbnail a').attr('onclick'));
                var type = getRightType($element);
                var criteria = $element.find('p:first').html();

                var badgeModel = {
                    complete: complete,
                    badgeImage: complete ?
                        $element.find('.thumbnail a img').attr("src") :
                        mmooc.constants.BADGE_LOCKED_IMAGE_URL,
                    name: $element.find('.thumbnail h3').html(),
                    badgeFooter: type  + ' utmerkelse',
                    type: type,
                    criteria: criteria,
                    link: "badge-details.php?badge_id=" +
                    badgeIds.badgeId + "&CLIKEY=" +
                    badgeIds.clickey + "&course_id=" +
                    badgeIds.courseId + "&user_id=" +
                    badgeIds.userId
                };
                return badgeModel;
            },

            displayElements: function(elements) {

                var templates = mmooc.util.renderTemplateWithData("badgeView", {badges: elements});
                var vel = 200;

                $('#badge-wrap').after(templates);
                function toggleSelected($element ) {
                    $element.siblings().removeClass('selected');
                    $element.addClass('selected');
                }
                $('.show-all').click(function () {
                    toggleSelected($(this));
                    $('.badge-list .badge-view').show(vel);
                });

                $('.show-unlocked').click(function () {
                    toggleSelected($(this));
                    $('.badge-list .badge-view.locked').hide(vel);
                    $('.badge-list .badge-view:not(.locked)').show(vel);
                });

                $('.show-locked').click(function () {
                    toggleSelected($(this));
                    $('.badge-list .badge-view:not(.locked)').hide(vel);
                    $('.badge-list .badge-view.locked').show(vel);
                });
            },

            extractIdsFromString: function(string) {

                var args = string.match(/(\d+)/g);
                if (args.length === 4) {
                    return {
                        badgeId: args[0],
                        clickey: args[1],
                        courseId: args[2],
                        userId: args[3]
                    };
                }
                else {
                    return {
                        badgeId: "",
                        clickey: "",
                        userId: "",
                        courseId: ""
                    };
                }
            }
        }
    }()
};
