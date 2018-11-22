this.mmooc = this.mmooc || {};

this.mmooc.enroll = (function() {
  return {
    changeEnrollConfirmationButton: function() {
      var enrollForm = $('#enroll_form');
      enrollForm
        .find('.btn')
        .text('Gå til mine ' + mmooc.i18n.CoursePlural.toLowerCase());
      enrollForm.find('.btn').attr('href', '/courses');
      enrollForm.find('.btn-primary').hide();
    },
    changeEnrollTitle: function(s) {
      var headline = $('.ic-Login-confirmation__headline');
      headline.text(s);
    },
    getEnrollInformationElement: function() {
      //There might be several p elements, depending on which self registration screen we are on.
      //Only return the first one.
      return $('#enroll_form > p:first');
    },
    getEnrollAction: function() {
      return $('#enroll_form').attr('action');
    },
    changeEnrollInformation: function(from, to) {
      var confirmEnrollmentElement = this.getEnrollInformationElement();
      confirmEnrollmentElement.text(
        confirmEnrollmentElement.text().replace(from, to)
      );
    },
    hideEnrollInformationPolicy: function() {
      var informationPolicy = $('.ic-Self-enrollment-footer__Secondary');
      informationPolicy.hide();
    },
    changeEnrollButton: function() {
      var enrollForm = $('#enroll_form');
      var confirmButton = enrollForm.find('.btn');
      confirmButton.text('Ja takk, jeg vil registrere meg!');
    },
    hideEnrollButton: function() {
      var enrollForm = $('#enroll_form');
      var confirmButton = enrollForm.find('.btn');
      confirmButton.hide();
    },
    isAlreadyEnrolled: function() {
      confirmEnrollmentElement = this.getEnrollInformationElement();
      var i = confirmEnrollmentElement
        .text()
        .indexOf('Du er allerede registrert i');
      if (i == -1) {
        return false;
      }
      return true;
    },
    selectRegisterUserCheckbox: function() {
      //The checkbox is hidden by canvas-enroll.less, but we need to check it to get the right fields to display.
      setTimeout(function() {
        var createNewUserRadioButton = $('#selfEnrollmentAuthRegCreate');
        createNewUserRadioButton.click();
      }, 1000); // set timeout in ms
    },
    updatePrivacyPolicyLinks: function() {
      html = mmooc.util.renderTemplateWithData('enrollprivacypolicy', {
        privacypolicylink: mmooc.settings.privacyPolicyLink
      });
      $("label[for='selfEnrollmentAuthRegLoginAgreeTerms']").html(html);
    },
    isSelfEnrollmentPage: function() {
      var i = this.getEnrollInformationElement()
        .text()
        .indexOf('Du registrerer deg i');
      if (i == -1) {
        return false;
      }
      return true;
    },
    changeEnrollPage: function() {
      this.changeEnrollTitle('Påmelding');
      if (this.isAlreadyEnrolled()) {
        this.changeEnrollConfirmationButton();
      } else {
        this.hideEnrollInformationPolicy();
        if (this.isSelfEnrollmentPage()) {
          //When self enrolling, give the user the impression of registering on the platform, and not on the course
          //we use to make self enrollment possible. See settings.js/selfRegisterCourseCode
          this.getEnrollInformationElement().text('');
          $('#enroll_form > p:nth-child(2)').text(
            'Vennligst fyll inn informasjonen nedenfor for å registrere deg på ' +
              mmooc.settings.platformName
          );
          this.selectRegisterUserCheckbox();
          this.updatePrivacyPolicyLinks();
          this.changeEnrollButton();
        } else {
          this.hideEnrollButton();
          this.changeEnrollInformation(
            'Du registrere deg på ',
            'Vi registrerer deg på ' +
              mmooc.i18n.CourseDefinite.toLowerCase() +
              ' '
          );
          var enrollInformationElement = this.getEnrollInformationElement();
          enrollInformationElement.html(" <span class='loading-gif'></span>");
          var enrollAction = this.getEnrollAction();
          mmooc.api.enrollUser(enrollAction, function(data) {
            $('.loading-gif').remove();
            window.location.href = '/search/all_courses';
          });
        }
      }
    },
    printAllCoursesContainer: function() {
      html = mmooc.util.renderTemplateWithData('allcoursescontainer', {
        courseLabel: mmooc.i18n.Course.toLowerCase()
      });
      document.title = 'Tilgjengelige ' + mmooc.i18n.CoursePlural.toLowerCase();
      document.getElementById('content').innerHTML = html;
    },
    printAllCourses: function() {
      html = "<span class='loading-gif'></span>";
      $('.mmooc-all-courses-list').append(html);
      mmooc.api.getAllCourses(function(allCourses) {
        mmooc.api.getEnrolledCourses(function(enrolledCourses) {
          var allCoursesWithStatus = mmooc.enroll.setCourseEnrolledStatus(
            allCourses,
            enrolledCourses
          );

          var categorys = mmooc.util.getCourseCategories(allCoursesWithStatus);

          /* If the amount of courses is large, the filter select box and corresponding javascript code in allcoursescontainer.hbs should be enabled

                    mmooc.enroll.populateFilter(categorys);

  	                $("#filter").change(function() {
  		                  mmooc.enroll.applyFilter();
  	                });
*/

          var coursesCategorized = mmooc.util.getCoursesCategorized(
            allCoursesWithStatus,
            categorys
          );

          $('.loading-gif').remove();

          for (var i = 0; i < coursesCategorized.length; i++) {
            html = mmooc.util.renderTemplateWithData('allcourseslist', {
              title: coursesCategorized[i].title,
              courses: coursesCategorized[i].courses,
              courseLabel: mmooc.i18n.Course.toLowerCase()
            });
            $('.mmooc-all-courses-list').append(html);
          }
          mmooc.enroll.insertModalAndOverlay();
          mmooc.enroll.setClickHandlers();
        });
      });
    },
    setCourseEnrolledStatus: function(allCourses, enrolledCourses) {
      var allCoursesWithStatus = [];
      for (var i = 0; i < allCourses.length; i++) {
        allCourses[i].course.enrolled = false;
        for (var j = 0; j < enrolledCourses.length; j++) {
          if (allCourses[i].course.id == enrolledCourses[j].id) {
            allCourses[i].course.enrolled = true;
          }
        }
        allCoursesWithStatus.push(allCourses[i].course);
      }
      return allCoursesWithStatus;
    },
    insertModalAndOverlay: function() {
      $('body').append("<div class='mmooc-modal-overlay'></div>");
      $('body').append("<div class='mmooc-modal'></div>");
    },
    handleEnrollClick: function(e, html) {
      $('.mmooc-modal').html(html);
      $('.mmooc-modal-overlay').show();
      $('.mmooc-modal').show();
      $('.mmooc-modal .modal-back').click(function(e) {
        e.preventDefault();
        $('.mmooc-modal-overlay').hide();
        $('.mmooc-modal').hide();
      });
    },
    setClickHandlers: function() {
      $('.notenrolled').click(function(e) {
        e.preventDefault();
        var html = $(this)
          .next()
          .html();
        mmooc.enroll.handleEnrollClick(e, html);
      });
      $('.all-courses-show-modal').click(function(e) {
        e.preventDefault();
        var html = $(this)
          .parent()
          .next()
          .html();
        mmooc.enroll.handleEnrollClick(e, html);
      });
      $('.mmooc-modal-overlay').click(function(e) {
        e.preventDefault();
        $('.mmooc-modal-overlay').hide();
        $('.mmooc-modal').hide();
      });
      $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
          $('.mmooc-modal-overlay').hide();
          $('.mmooc-modal').hide();
        }
      });
    },
    populateFilter: function(categorys) {
      var options =
        '<option value="Alle">Alle tilgjengelige ' +
        mmooc.i18n.CoursePlural.toLowerCase() +
        '</option>';
      for (var i = 0; i < categorys.length; i++) {
        options +=
          '<option value="' + categorys[i] + '">' + categorys[i] + '</option>';
      }
      $('#filter').append(options);
    },
    applyFilter: function() {
      var value = $('#filter').val();
      if (value == 'Alle') {
        $('.mmooc-all-courses-list').removeClass('filter-active');
        $('.mmooc-all-courses-list h2').each(function() {
          $(this).show();
          $(this)
            .next()
            .show();
        });
      } else {
        $('.mmooc-all-courses-list').addClass('filter-active');
        $('.mmooc-all-courses-list h2').each(function() {
          if ($(this).text() == value) {
            $(this).show();
            $(this)
              .next()
              .show();
          } else {
            $(this).hide();
            $(this)
              .next()
              .hide();
          }
        });
      }
    }
  };
})();
