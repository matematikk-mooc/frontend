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
import { privacyPolicyLink } from "../settings.js";
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
    hideElementsFromUsers:function() {
    // Remove elements with class "public-license"
   var publicLicenseElements = document.getElementsByClassName('public-license')[0];
   if (publicLicenseElements) {
            publicLicenseElements.parentNode.removeChild(publicLicenseElements);
        }

    // Check if the user is a student or if teacher/admin is in student mode.
    var userIsStudent = !util.isTeacherOrAdmin();
    // Conditionally remove elements based on userIsStudent
    if (userIsStudent) {
        // Remove element with class "header-bar-outer-container"
        var headerBarContainer = document.getElementsByClassName('header-bar-outer-container')[0];
        if (headerBarContainer) {
            headerBarContainer.parentNode.removeChild(headerBarContainer);
        }
    } else {
        // Remove element with class "page-heading"
        var pageHeadingElement = document.getElementsByClassName('page-heading')[0];
        if (pageHeadingElement) {
            pageHeadingElement.parentNode.removeChild(pageHeadingElement);
        }
    }
},


    //Until Canvas has corrected the translation of drop course to something else than "slipp emnet", we override the functionality.
    overrideUnregisterDialog: function() {
      console.log('overrideUnregisterDialog')
      var selfUnenrollmentButton = document.getElementsByClassName('self_unenrollment_link')[0];
      console.log(selfUnenrollmentButton)
      var selfUnenrollmentDialog = $('#self_unenrollment_dialog');
      console.log(selfUnenrollmentDialog)
      var parent = selfUnenrollmentDialog.parent();
      console.log(parent)
      selfUnenrollmentButton.addEventListener('click', function(e) {
        console.log('i was clicked');

        var popup = document.getElementById("self_unenrollment_dialog");
        popup.classList.add("ui-dialog-content");
        popup.classList.add("ui-widget-content");
        document.getElementById("application").appendChild(popup);

        popup.classList.add(["ui-corner-all", "ui-draggable",  "ui-resizable", "ui-dialog-buttons"]);
        popup.setAttribute("style", "outline: 0px; z-index: 1002; height: auto; width: 300px; top: 1114px; left: auto; display: block;")
        popup.style.display = "block";
        console.log(popup)

        var close = document.getElementsByClassName("btn dialog_close")[0];
        if(close){
        close.addEventListener('click', function(e) {
          console.log('close was clicked');
          popup.style.display = "none";
        })
        }

      });
      // if (selfUnenrollmentButton.length) {
      //   selfUnenrollmentButton.text(
      //     selfUnenrollmentButton
      //       .text()
      //       .replace('Slipp dette emnet', i18n.DropCourse)
      //   );
        //                selfUnenrollmentButton.off(); //Prevent default presentation of the dialog with incorrect translation.
      //   selfUnenrollmentButton.addEventListener('click', function(e) {
      //     // setTimeout(function() {
      //     //   $('#ui-id-1').html(i18n.DropCourse);
      //     // }, 200);
      //     console.log('unregiserr click')
      //     console.log(selfUnenrollmentDialog.parentElement)
      //     // document.getElementById("self_unenrollment_dialog").parentElement.style.display = "block"
      //     // document.getElementsByClassName("ui-dialog")[0].d
      //     // document.getElementById("self_unenrollment_dialog").removeAttribute("style")
      //     // document.getElementById("self_unenrollment_dialog").classList.add("ui-dialog-content")
      //     // document.getElementById("self_unenrollment_dialog").classList.add("ui-widget-content")
      // })
      // if (selfUnenrollmentDialog.length) {
      //   selfUnenrollmentDialog.find('h2').hide();
      //   selfUnenrollmentDialog.find('.button-container a span').text('OK');
      //   selfUnenrollmentDialog.find('.button-container a i').hide(); //Hide x at beginning of OK button

      //   //Hide default dialog text
      //   $('#self_unenrollment_dialog')
      //     .contents()
      //     .filter(function() {
      //       return this.nodeType == 3;
      //     })
      //     .each(function() {
      //       this.textContent = '';
      //     });
      //   //Add our dialog text
      //   $('#self_unenrollment_dialog').prepend(
      //     '<div/><p/><p>' +
      //       i18n.DropCourseDialogText +
      //       "<span class='unenroll_dialog_sad'></span><p>" +
      //       i18n.JoinCourseDialogText +
      //       "<span class='unenroll_dialog_happy'></span></p>"
      //   );
      // }
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
