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
            window.location.href = '/search/all_courses' + mmooc.hrefQueryString;
          });
        }
      }
    },
    printAllCoursesContainer: function() {
      html = mmooc.util.renderTemplateWithData('allcoursescontainer', {
        courseLabel: mmooc.i18n.CoursePlural.toLowerCase(),
        allAvailableCoursesIngress: mmooc.i18n.AllAvailableCoursesIngress,
        linkToMyCourses: mmooc.utilRoot.getLinkToMyCourses()
      });
      document.title = 'Tilgjengelige ' + mmooc.i18n.CoursePlural.toLowerCase();
      document.getElementById('content').innerHTML = html;
    },
    printAllCourses: function() {
      var self = this;
      html = "<div class='mmooc-loader-wrapper'><span class='loading-gif'></span></div>";
      $('.mmooc-all-courses-list').append(html);
      mmooc.api.getAllPublicCourses(function(allCourses) {
        mmooc.api.getEnrolledCourses(function(enrolledCourses) {
          var allCoursesWithStatus = mmooc.enroll.setCourseEnrolledStatus(
            allCourses,
            enrolledCourses
          );

          var categorys = mmooc.util.getCourseCategories(allCoursesWithStatus);

          /* If the amount of courses is large, the filter select box and corresponding javascript code in allcoursescontainer.hbs should be enabled 

          mmooc.enroll.populateFilter(categorys);

          $("#filter").change(function () {
            mmooc.enroll.applyFilter();
          });

          */

          var coursesCategorized = mmooc.util.getCoursesCategorized(
            allCoursesWithStatus,
            categorys
          );

          $('.mmooc-loader-wrapper').remove();
            
          for (var i = 0; i < coursesCategorized.length; i++) {
            const coursesCategory = coursesCategorized[i];
            const coursesEnrolledAmount = mmooc.util.filter(
              coursesCategory.courses,
              function(course) { 
                return course.enrolled === true 
            }).length;
            const coursesAmount = coursesCategory.courses && coursesCategory.courses.length;

            html = mmooc.util.renderTemplateWithData('allcourseslist', {
              queryString: mmooc.hrefQueryString,
              title: coursesCategory.title,
              isAuthenticated: mmooc.util.isAuthenticated(),
              courses: coursesCategory.courses,
              coursesEnrolledAmount: coursesEnrolledAmount,
              coursesAmount: coursesAmount,
              coursesAmountText: mmooc.i18n.CoursesAmount(coursesAmount),
              courseLabel: mmooc.i18n.Course.toLowerCase(),
              goToCourse: mmooc.i18n.GoToCourse,
              courseRegister: mmooc.i18n.CourseRegister,
              courseRegisterFeide: mmooc.i18n.CourseRegisterFeide,
              openCoursesGroupText: mmooc.i18n.OpenCoursesGroup,
              closeCoursesGroupText: mmooc.i18n.CloseCoursesGroup,
              YouAreRegisteredToXCoursesText: mmooc.i18n.YouAreRegisteredToXCourses(coursesEnrolledAmount),
              index: i
            });
            $('.mmooc-all-courses-list').append(html);
          }

          // Displays information, that there is no current courses available to enroll
          if (coursesCategorized.length == 0) {
            html = '<p class="text-center">' + mmooc.i18n.NoCoursesInfo + '</p>';
            $('.mmooc-all-courses-list').append(html);
          }
          
          mmooc.enroll.insertModalAndOverlay();
          mmooc.enroll.setClickHandlers();

          // TODO: move if there is a better place for this code - it handles course list UI
          // accordion UI
          $('.mmooc-accordion-header').click(event => {
            let accordionIndex = event.target.getAttribute('index');

            if (
              $(`#mmooc-accordion-header-${accordionIndex}`).hasClass(
                'mmooc-accordion-header-active'
              )
            ) {
              $(`#mmooc-accordion-header-${accordionIndex}`).toggleClass(
                'mmooc-accordion-header-active'
              );
            } else {
              $('.mmooc-accordion-header-active').removeClass(
                'mmooc-accordion-header-active'
              );

              $(`#mmooc-accordion-header-${accordionIndex}`).addClass(
                'mmooc-accordion-header-active'
              );
            }

            // remove active tabs when new accordion element is clicked
            $('.mmooc-tab-head').removeClass('mmooc-tab-head-active');
            $('.mmooc-tab-content').removeClass('mmooc-tab-content-active');
            $('.mmooc-tabs-mobile-header-active').removeClass(
              'mmooc-tabs-mobile-header-active'
            );
            $('.mmooc-tabs-mobile-content-active').removeClass(
              'mmooc-tabs-mobile-content-active'
            );

            // add active class to first tab when the accordion element is opened
            $('.mmooc-tab-head-0').addClass('mmooc-tab-head-active');
            $('.mmooc-tab-content-0').addClass('mmooc-tab-content-active');
          });

          // tabs
          $('.mmooc-tab-head').click(event => {
            let tabIndex = event.target.getAttribute('index');

            $('.mmooc-tab-head').removeClass('mmooc-tab-head-active');
            $(`#mmooc-tab-head-${tabIndex}`).addClass('mmooc-tab-head-active');

            $('.mmooc-tab-content').removeClass('mmooc-tab-content-active');
            $(`#mmooc-tab-content-${tabIndex}`).addClass(
              'mmooc-tab-content-active'
            );
          });

          // tabs-mobile

          $('.mmooc-tabs-mobile-header').click(event => {
            let mobileTabIndex = event.target.getAttribute('index');

            if (
              $(`#mmooc-tabs-mobile-header-${mobileTabIndex}`).hasClass(
                'mmooc-tabs-mobile-header-active'
              )
            ) {
              $(`#mmooc-tabs-mobile-header-${mobileTabIndex}`).toggleClass(
                'mmooc-tabs-mobile-header-active'
              );
              $(`#mmooc-tabs-mobile-content-${mobileTabIndex}`).toggleClass(
                'mmooc-tabs-mobile-content-active'
              );
            } else {
              $('.mmooc-tabs-mobile-header-active').removeClass(
                'mmooc-tabs-mobile-header-active'
              );
              $('.mmooc-tabs-mobile-content-active').removeClass(
                'mmooc-tabs-mobile-content-active'
              );

              $(`#mmooc-tabs-mobile-header-${mobileTabIndex}`).addClass(
                'mmooc-tabs-mobile-header-active'
              );
              $(`#mmooc-tabs-mobile-content-${mobileTabIndex}`).addClass(
                'mmooc-tabs-mobile-content-active'
              );
            }
          });
          
          self.createHashTags();
          self.scrollToCourse();
        });
      });
    },
    createHashTags: function() {
        $('span').click(function(e) {
          if ($(this).filter("[data-name='course']")) {
            var hashTag = $(e.currentTarget).attr("class")
            window.location.hash = hashTag;
          }
        });

        $("button[data-title]").click(function(e){
          var firstCourseId = $(this).siblings().find('span').eq(0).attr('class');
          var hashTag = firstCourseId;
          window.location.hash = hashTag;
        })
    },
    scrollToCourse: function () {
        var currentHash = window.location.hash.split('#');
        var courses = $('span').filter("[data-name='course']");

        courses.each(function (i, el) {
          var currentElementId = $(el).attr('class');
          if (currentHash[1] === currentElementId) {
            var categoryElement = $(el).closest('section').find('button').eq(0);
            categoryElement.trigger("click");

            var mobileViewport = window.matchMedia("(max-width: 650px)");

            if(mobileViewport.matches) {
              $([document.documentElement, document.body]).animate({
                scrollTop: $(el).find('button').offset().top
              }, 500);
            }else {
              $([document.documentElement, document.body]).animate({
                scrollTop: $("." + currentElementId).offset().top
              }, 500);
            }
            var courseTab = $(el).find('button');
            courseTab.trigger("click");
          }
        })
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
