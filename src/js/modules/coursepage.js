import api from "../api/api.js";
import courseprogress from '../../templates/modules/courseprogress.hbs';
import courseprogressforstudent from '../../templates/modules/courseprogressforstudent.hbs';
import discussionTopics from "./discussion-topics.js";
import footer from "./footer.js";
import { hrefQueryString } from "../settingsRoot.js";
import i18n from '../i18n';
import modulesprincipal from '../../templates/modules/modulesprincipal.hbs';
import modulesstudent from '../../templates/modules/modulesstudent.hbs';
import multilanguage from "../3party/multilanguage.js";
import util from "./util.js";

export default (function() {
  return {
    showCourseInvitation: function () {
      if (!util.isAuthenticated()) {
        var enrollButton = $(".course_enrollment_link");
        var linkToSelectedCourse = window.location.href.split('/');
        var selectedCourseId = linkToSelectedCourse[linkToSelectedCourse.length - 1];

        if (enrollButton) {
          enrollButton.text(i18n.EnrollButton);
          enrollButton.click(function (e) {
            e.preventDefault();
                  window.location.href = '/search/all_courses' + hrefQueryString + '#' + selectedCourseId;
          })
        }
      }
    },
    listModulesAndShowProgressBar: function() {
      api.getModulesForCurrentCourse(function(modules) {
        var progressHTML = "";
        var modulesHTML = "";

        if(util.isActiveCourseRoleBased() && util.isPrincipal()) {
          progressHTML = util.renderTemplateWithData(courseprogress, {
            title: i18n.CourseProgressionTitle,
            modules: modules
          });
          modulesHTML = util.renderTemplateWithData(modulesprincipal, {
            navname: i18n.GoToModule,
            coursemodules: i18n.ModulePlural,
            modules: modules,
            course: util.course
          });
        }
        else {
          progressHTML = util.renderTemplateWithData(courseprogressforstudent, {
            title: i18n.CourseProgressionTitle,
            modules: modules
          });

          modulesHTML = util.renderTemplateWithData(modulesstudent, {
            navname: i18n.GoToModule,
            coursemodules: i18n.ModulePlural,
            modules: modules,
            course: util.course
          });
        }

        if(util.isMMOOCLicense()) {
          footer.addLicenseInFooter();
        }

        document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', progressHTML);

        document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', modulesHTML);

        multilanguage.perform();

        //Canvas case: Slow loading for group discussions when large number of groups Case # 05035288
        //Display popup box when loading
        util.postModuleCoursePageProcessing();

        discussionTopics.printDiscussionUnreadCount(
          modules,
          'coursepage'
        );
      });
    },
    hideCourseInvitationsForAllUsers: function() {
      var acceptanceTextToSearchFor = 'invitert til å delta';
      //If .ic-notification__message contains 'Invitert til å delta' så skjul nærmeste parent .ic-notification
      $(
        ".ic-notification__message.notification_message:contains('" +
          acceptanceTextToSearchFor +
          "')"
      )
        .closest('.ic-notification.ic-notification--success')
        .hide();

      var acceptanceFlashTextToSearchFor = 'delta i dette kurset';

      $(
        "ul#flash_message_holder li:contains('" +
          acceptanceFlashTextToSearchFor +
          "')"
      ).hide();
    },

    //Until Canvas has corrected the translation of drop course to something else than "slipp emnet", we override the functionality.
    overrideUnregisterDialog: function() {
      var selfUnenrollmentButton = $('.self_unenrollment_link');
      var selfUnenrollmentDialog = $('#self_unenrollment_dialog');
      if (selfUnenrollmentButton.length) {
        selfUnenrollmentButton.text(
          selfUnenrollmentButton
            .text()
            .replace('Slipp dette emnet', i18n.DropCourse)
        );
        //                selfUnenrollmentButton.off(); //Prevent default presentation of the dialog with incorrect translation.
        selfUnenrollmentButton.on('click', function(e) {
          setTimeout(function() {
            $('#ui-id-1').html(i18n.DropCourse);
          }, 200);
        });
      }
      if (selfUnenrollmentDialog.length) {
        selfUnenrollmentDialog.find('h2').hide();
        selfUnenrollmentDialog.find('.button-container a span').text('OK');
        selfUnenrollmentDialog.find('.button-container a i').hide(); //Hide x at beginning of OK button

        //Hide default dialog text
        $('#self_unenrollment_dialog')
          .contents()
          .filter(function() {
            return this.nodeType == 3;
          })
          .each(function() {
            this.textContent = '';
          });
        //Add our dialog text
        $('#self_unenrollment_dialog').prepend(
          '<div/><p/><p>' +
            i18n.DropCourseDialogText +
            "<span class='unenroll_dialog_sad'></span><p>" +
            i18n.JoinCourseDialogText +
            "<span class='unenroll_dialog_happy'></span></p>"
        );
      }
    },

    replaceUpcomingInSidebar: function() {
      var coming_up = $('body.home .coming_up');
      if (!coming_up.length) {
        return false;
      }
      coming_up.replaceWith(
        "<div class='deadlines-container'>" +
          '<h2>' +
          i18n.eventsAndDeadlinesTitle +
          '</h2>' +
          "<div class='deadlines-scroll-up'></div>" +
          "<div class='deadlines-list'></div>" +
          "<div class='deadlines-scroll-down'></div>" +
          '</div>'
      );
      return true;
    },
    _displayDeadlines: function(allDeadlines) {
      allDeadlines.sort(function(a, b) {
        return a.date - b.date;
      });
      var weekday = [];
      var month = [];
      var html = '<table>';
      for (var i = 0; i < allDeadlines.length; i++) {
        var monthName = util.getMonthShortName(allDeadlines[i].date);
        if ('url' in allDeadlines[i]) {
          html +=
            "<tr id='deadline-" +
            i +
            "'><div></div><td class='deadline-date'>" +
            allDeadlines[i].date.getDate() +
            '. ' +
            monthName +
            "</td><td class='deadline-title'><a href='" +
            allDeadlines[i].url +
            "' title='" +
            allDeadlines[i].title +
            "'>" +
            allDeadlines[i].title +
            '</a></td></tr>';
        } else {
          html +=
            "<tr id='deadline-" +
            i +
            "'><td class='deadline-date'>" +
            allDeadlines[i].date.getDate() +
            '. ' +
            monthName +
            "</td><td class='deadline-title'>" +
            allDeadlines[i].title +
            '</td></tr>';
        }
      }
      html += '</table>';
      $('body.home .deadlines-list').html(html);
      var upcoming = this.findUpcomingDate(allDeadlines);
      $('#deadline-' + upcoming).addClass('upcoming');
      var parent = $('body.home .deadlines-list');
      var row = $('#deadline-' + upcoming);
      parent.scrollTop(
        parent.scrollTop() +
          row.position().top -
          parent.height() / 2 +
          row.height() / 2
      );
      $('.deadlines-scroll-up').click(function() {
        var scroll = parent.scrollTop() - 50;
        $(parent).animate(
          {
            scrollTop: scroll
          },
          200
        );
      });
      $('.deadlines-scroll-down').click(function() {
        var scroll = parent.scrollTop() + 50;
        $(parent).animate(
          {
            scrollTop: scroll
          },
          200
        );
      });
    },
    printDeadlinesForCourse: function() {
      var courseId = api.getCurrentCourseId();
      var allDeadlines = [];
      var params = {
        all_events: 1,
        type: 'event',
        context_codes: ['course_' + courseId]
      };
      api.getCaledarEvents(params, function(events) {
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
        var params = {
          all_events: 1,
          type: 'assignment',
          context_codes: ['course_' + courseId]
        };
        api.getCaledarEvents(params, function(assignments) {
          for (var i = 0; i < assignments.length; i++) {
            if (assignments[i].all_day_date) {
              var date = new Date(assignments[i].all_day_date);
              var deadlineObj = {
                date: date,
                title: assignments[i].title,
                url: assignments[i].html_url
              };
              allDeadlines.push(deadlineObj);
            }
          }
          if (allDeadlines.length) {
            this._displayDeadlines(allDeadlines);
          }
        });
      });
    },
    findUpcomingDate: function(dates) {
      var today = Date.now();
      var nearestDate,
        nearestDiff = Infinity;
      var noMoreDeadlines = true;
      for (var i = 0; i < dates.length; i++) {
        var diff = +dates[i].date - today;
        if (diff > 0 && diff < nearestDiff) {
          nearestDiff = diff;
          nearestDate = i;
          noMoreDeadlines = false;
        }
      }
      if (noMoreDeadlines) {
        return dates.length - 1;
      } else {
        return nearestDate;
      }
    }
  };
})();
