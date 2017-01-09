this.mmooc=this.mmooc||{};


this.mmooc.coursePage = function() {

    return {

        listModulesAndShowProgressBar: function() {
            mmooc.api.getModulesForCurrentCourse(function(modules) {
                var progressHTML = mmooc.util.renderTemplateWithData("courseprogress", {title: mmooc.i18n.CourseProgressionTitle, modules: modules});
                document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', progressHTML);

                var modulesHTML = mmooc.util.renderTemplateWithData("modules", {navname: mmooc.i18n.GoToModule, coursemodules: mmooc.i18n.ModulePlural, modules: modules});
                document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', modulesHTML);
                
                mmooc.discussionTopics.printDiscussionUnreadCount(modules, "coursepage");
            });
        },
        hideCourseInvitationsForAllUsers: function() {
            
            var acceptanceTextToSearchFor = 'invitert til å delta';
            //If .ic-notification__message contains 'Invitert til å delta' så skjul nærmeste parent .ic-notification  
            $(".ic-notification__message.notification_message:contains('" + acceptanceTextToSearchFor + "')")
                .closest('.ic-notification.ic-notification--success')
                .hide();
            
            var acceptanceFlashTextToSearchFor = 'delta i dette kurset';
            
             $("ul#flash_message_holder li:contains('" + acceptanceFlashTextToSearchFor + "')")
                .hide();
        },
        replaceUpcomingInSidebar: function() {
            $("body.home .coming_up").replaceWith(
                "<div class='deadlines-container'>" +
                "<h2>Frister</h2>" +
                "<div class='deadlines-shadow-before'></div>" +
                "<div class='deadlines-list'></div>" +
                "<div class='deadlines-shadow-after'></div>" +
                "</div>"
            );
        },
        printDeadlinesForCourse: function() {
            var courseId = mmooc.api.getCurrentCourseId();
            var allDeadlines = [];
            var params = { all_events: 1, type: "event", "context_codes": ["course_" + courseId] };
            mmooc.api.getCaledarEvents(params, function(events) {
                for (var i = 0; i < events.length; i++) {
                    if (events[i].end_at) {
                        var date = new Date(events[i].end_at);
                        var deadlineObj = {
                            date: date,
                            title: events[i].title
                        };
                        allDeadlines.push(deadlineObj);
                    }
                }
                var params = { all_events: 1, type: "assignment", "context_codes": ["course_" + courseId] };
                mmooc.api.getCaledarEvents(params, function(assignments) {
                    console.log(assignments);
                    for (var i = 0; i < assignments.length; i++) {
                        if(assignments[i].all_day_date) {
                            var date = new Date(assignments[i].all_day_date);
                            var deadlineObj = {
                                date: date,
                                title: assignments[i].title,
                                url: assignments[i].html_url
                            };
                            allDeadlines.push(deadlineObj);
                        }
                    }
                    allDeadlines.sort(function(a,b){
                        return a.date - b.date;
                    });
                    var weekday = [];
                    var month = [];
                    var html = "<ul>";
                    for (var i = 0; i < allDeadlines.length; i++) {
                        var weekdayName = mmooc.util.getWeekdayShortName(allDeadlines[i].date);
                        var monthName = mmooc.util.getMonthShortName(allDeadlines[i].date);
                        if ("url" in allDeadlines[i]) {
                            html += "<li id='deadline-" + i + "'><a href='" + allDeadlines[i].url + "'>" + weekdayName + " " + allDeadlines[i].date.getDate() + " " + monthName + " " + allDeadlines[i].title + "</a></li>";
                        }
                        else {
                            html += "<li id='deadline-" + i + "'>" + weekdayName + " " + allDeadlines[i].date.getDate() + " " + monthName + " " + allDeadlines[i].title + "</li>";
                        }
                    }
                    html += "</ul>";
                    $("body.home .deadlines-list").html(html);
                    var upcoming = mmooc.coursePage.findUpcomingDate(allDeadlines);
                    $("#deadline-" + upcoming).addClass("upcoming");
                    $("body.home .deadlines-list").scrollTop($("body.home .deadlines-list").scrollTop() + $("#deadline-" + upcoming).position().top - 87);
                });
            });
        },
        findUpcomingDate: function(dates) {
            var today = Date.now();
            var nearestDate, nearestDiff = Infinity;
            var noMoreDeadlines = true;
            for (var i = 0; i < dates.length; i++) {
                var diff = +dates[i].date - today;
                if (diff > 0  &&  diff < nearestDiff) {
                    nearestDiff = diff;
                    nearestDate = i;
                    noMoreDeadlines = false;
                }
            }
            if (noMoreDeadlines) {
                return dates.length - 1;
            }
            else {
                return nearestDate;
            }            
        }       
    };
}();
