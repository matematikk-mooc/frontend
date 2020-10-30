this.mmooc = this.mmooc || {};

this.mmooc.coursePage = (function() {
  return {
    showCourseInvitation: function () {
      if (!mmooc.util.isAuthenticated()) {
        var enrollButton = $(".course_enrollment_link");
        var linkToSelectedCourse = window.location.href.split('/');
        var selectedCourseId = linkToSelectedCourse[linkToSelectedCourse.length - 1];

        if (enrollButton) {
          enrollButton.text(mmooc.i18n.EnrollButton);
          enrollButton.click(function (e) {
            e.preventDefault();
                  window.location.href = '/search/all_courses' + mmooc.hrefQueryString + '#' + selectedCourseId;
          })
        }
      }
    },
    listModulesAndShowProgressBar: function() {
      mmooc.api.getModulesForCurrentCourse(function(modules) {
        var progressHTML = "";
        var modulesHTML = "";
        if(mmooc.util.isActiveCourseRoleBased() && mmooc.util.isPrincipal())
        {
          progressHTML = mmooc.util.renderTemplateWithData('courseprogress', {
            title: mmooc.i18n.CourseProgressionTitle,
            modules: modules
          });
          modulesHTML = mmooc.util.renderTemplateWithData('modulesprincipal', {
            navname: mmooc.i18n.GoToModule,
            coursemodules: mmooc.i18n.ModulePlural,
            modules: modules,
            course: mmooc.util.course
          });
        }
        else {
          progressHTML = mmooc.util.renderTemplateWithData('courseprogressforstudent', {
            title: mmooc.i18n.CourseProgressionTitle,
            modules: modules
          });
          modulesHTML = mmooc.util.renderTemplateWithData('modules', {
            navname: mmooc.i18n.GoToModule,
            coursemodules: mmooc.i18n.ModulePlural,
            modules: modules,
            course: mmooc.util.course
          });
        }
        
        if(mmooc.util.isMMOOCLicense()) {
          mmooc.footer.addLicenseInFooter();
        }

        document
          .getElementById('course_home_content')
          .insertAdjacentHTML('beforebegin', progressHTML);

        document
          .getElementById('course_home_content')
          .insertAdjacentHTML('beforebegin', modulesHTML);

        mmooc.multilanguage.perform();
  
        //Canvas case: Slow loading for group discussions when large number of groups Case # 05035288 
        //Display popup box when loading
        mmooc.util.postModuleCoursePageProcessing();

        mmooc.discussionTopics.printDiscussionUnreadCount(
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
            .replace('Slipp dette emnet', mmooc.i18n.DropCourse)
        );
        //                selfUnenrollmentButton.off(); //Prevent default presentation of the dialog with incorrect translation.
        selfUnenrollmentButton.on('click', function(e) {
          setTimeout(function() {
            $('#ui-id-1').html(mmooc.i18n.DropCourse);
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
            mmooc.i18n.DropCourseDialogText +
            "<span class='unenroll_dialog_sad'></span><p>" +
            mmooc.i18n.JoinCourseDialogText +
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
          mmooc.i18n.eventsAndDeadlinesTitle +
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
        var monthName = mmooc.util.getMonthShortName(allDeadlines[i].date);
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
      var upcoming = mmooc.coursePage.findUpcomingDate(allDeadlines);
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
      var courseId = mmooc.api.getCurrentCourseId();
      var allDeadlines = [];
      var params = {
        all_events: 1,
        type: 'event',
        context_codes: ['course_' + courseId]
      };
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
        var params = {
          all_events: 1,
          type: 'assignment',
          context_codes: ['course_' + courseId]
        };
        mmooc.api.getCaledarEvents(params, function(assignments) {
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
            mmooc.coursePage._displayDeadlines(allDeadlines);
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
