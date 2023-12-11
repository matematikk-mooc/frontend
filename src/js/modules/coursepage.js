import api from "../api/api.js";
import util from "./util.js";
export default (function() {
  return {
    showCourseInvitation: function () {
      if (!util.isAuthenticated()) {
        var enrollButton = $(".course_enrollment_link");
        var linkToSelectedCourse = window.location.href.split('/');
        var selectedCourseId = linkToSelectedCourse[linkToSelectedCourse.length - 1];

        if (enrollButton) {
          enrollButton.text('Enroll this course');
          enrollButton.click(function (e) {
            e.preventDefault();
                  window.location.href = '/search/all_courses' + '?design=udir' + '#' + selectedCourseId;
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

    overrideUnregisterDialog: function() {
      var selfUnenrollmentButton = document.getElementsByClassName('self_unenrollment_link')[0];
      if(selfUnenrollmentButton){
        selfUnenrollmentButton.addEventListener('click', function(e) {

        var popup = document.getElementById("self_unenrollment_dialog");
        popup.classList.add("ui-dialog-content");
        popup.classList.add("ui-widget-content");

        var application = document.getElementById("application")
        var overlay = document.createElement("div");
        overlay.classList.add("ui-widget-overlay");
        overlay.setAttribute("style", "z-index: 1001; width: 100%; height: 100%; top: 0px; left: 0px; display: block;")
        application.appendChild(overlay);

        popup.setAttribute("style", "outline: 0px; z-index: 1002; position: absolute; height: auto; width: 300px; top: 50%; left: 50%; display: block;")
        popup.style.display = "block";
        application.appendChild(popup);

        var close = popup.getElementsByClassName("btn dialog_closer")[0];
        if(close){
          close.addEventListener('click', function(e) {
            popup.style.display = "none";
            overlay.remove();
          });
        }
      });
    }
    },

    saveUnenrollDialog: function() {
      var selfUnenrollmentDialog = document.getElementById("self_unenrollment_dialog");
      console.log("self unenroll dialog", selfUnenrollmentDialog)
      if(selfUnenrollmentDialog){
        var application = document.getElementById("application");
        application.appendChild(selfUnenrollmentDialog);
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
          'Viktige datoer' +
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
