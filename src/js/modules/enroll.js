this.mmooc = this.mmooc || {};

this.mmooc.enroll = (function () {
  return {
    changeEnrollInformationPolicyLink: function () {
      var informationPolicy = $('.ic-Self-enrollment-footer__Secondary > a');
      informationPolicy.attr("href", mmooc.settings.privacyPolicyLink);
    },
    addForgotPasswordLink: function () {
      const buttonId = 'selfEnrollmentForgotPassword';
      const forgotPasswordButtonHtml =
        '<button id="' + buttonId + '" class="btn btn-primary" style="display: none;" type="submit">' +
        'Glemt passord?</button>';

      const parentDiv = $('.ic-Self-enrollment-footer__Primary');
      parentDiv.prepend(forgotPasswordButtonHtml);

      const forgotPasswordButton = $(`#${buttonId}`);
      forgotPasswordButton.on(
        'click', _ => window.location = '/login/canvas?normalLogin=1&design=udir&gp'
      );

      const alreadyHasUserButton = $('#selfEnrollmentAuthRegLogin');
      alreadyHasUserButton.on('click', _ => forgotPasswordButton.show());

      const newUserButton = $('#selfEnrollmentAuthRegCreate');
      newUserButton.on('click', _ => forgotPasswordButton.hide());
    },
    changeEnrollPage: function () {
      this.changeEnrollInformationPolicyLink();
      this.addForgotPasswordLink();
    },
    printAllCoursesContainer: function () {
      html = mmooc.util.renderTemplateWithData('allcoursescontainer', {
        courseLabel: mmooc.i18n.CoursePlural.toLowerCase(),
        allAvailableCoursesIngress: mmooc.i18n.AllAvailableCoursesIngress,
        linkToMyCourses: mmooc.utilRoot.getLinkToMyCourses(),
        isAuthenticated: mmooc.util.isAuthenticated()
      });
      document.title = 'Tilgjengelige ' + mmooc.i18n.CoursePlural.toLowerCase();
      document.getElementById('content').innerHTML = html;
    },
    goToAllCourses() {
      $('#mmooc-all-courses-btn').click(function () {
        const linkToMyCourses = mmooc.utilRoot.getLinkToMyCourses();
        window.location.href = linkToMyCourses;
      })
    },
    printAllCourses: function () {
      var self = this;
      html = "<div class='mmooc-loader-wrapper'><span class='loading-gif'></span></div>";
      $('.mmooc-all-courses-list').append(html);
      mmooc.api.getAllPublicCourses(function (allCourses) {
        mmooc.api.getEnrolledCourses(function (enrolledCourses) {
          var allCoursesWithStatus = mmooc.enroll.setCourseEnrolledStatus(
            allCourses,
            enrolledCourses
          );

          allCoursesWithStatusSorted = mmooc.util.sortCourses(allCoursesWithStatus);
          var categorys = mmooc.util.getCourseCategories(allCoursesWithStatusSorted);

          /* If the amount of courses is large, the filter select box and corresponding javascript code in allcoursescontainer.hbs should be enabled 

          mmooc.enroll.populateFilter(categorys);

          $("#filter").change(function () {
            mmooc.enroll.applyFilter();
          });

          */

          var coursesCategorized = mmooc.util.getCoursesCategorized(
            allCoursesWithStatusSorted,
            categorys
          );

          $('.mmooc-loader-wrapper').remove();

          for (var i = 0; i < coursesCategorized.length; i++) {
            const coursesCategory = coursesCategorized[i];
            const coursesEnrolledAmount = mmooc.util.filter(
              coursesCategory.courses,
              function (course) {
                return course.enrolled === true
              }).length;
            const coursesAmount = coursesCategory.courses && coursesCategory.courses.length;

            var isAuthenticated = mmooc.util.isAuthenticated();
            var courseRegisterText = mmooc.i18n.LogInCanvas;
            if (isAuthenticated) {
              courseRegisterText = mmooc.i18n.CourseRegisterWhenAuthenticated;
            }
            html = mmooc.util.renderTemplateWithData('allcourseslist', {
              queryString: mmooc.hrefQueryString,
              title: coursesCategory.title,
              isAuthenticated: isAuthenticated,
              courses: coursesCategory.courses,
              coursesEnrolledAmount: coursesEnrolledAmount,
              coursesAmount: coursesAmount,
              coursesAmountText: mmooc.i18n.CoursesAmount(coursesAmount),
              courseLabel: mmooc.i18n.Course.toLowerCase(),
              goToCourse: mmooc.i18n.GoToCourse,
              courseRegister: courseRegisterText,
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
    createHashTags: function () {
      $('span').click(function (e) {
        if ($(this).filter("[data-name='course']")) {
          var hashTag = $(e.currentTarget).attr("class")
          window.location.hash = hashTag;
        }
      });

      $("button[data-title]").click(function (e) {
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

          if (mobileViewport.matches) {
            $([document.documentElement, document.body]).animate({
              scrollTop: $(el).find('button').offset().top
            }, 500);
          } else {
            $([document.documentElement, document.body]).animate({
              scrollTop: $("." + currentElementId).offset().top
            }, 500);
          }
          var courseTab = $(el).find('button');
          courseTab.trigger("click");
        }
      })
    },
    setCourseEnrolledStatus: function (allCourses, enrolledCourses) {
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
    insertModalAndOverlay: function () {
      $('body').append("<div class='mmooc-modal-overlay'></div>");
      $('body').append("<div class='mmooc-modal'></div>");
    },
    handleEnrollClick: function (e, html) {
      $('.mmooc-modal').html(html);
      $('.mmooc-modal-overlay').show();
      $('.mmooc-modal').show();
      $('.mmooc-modal .modal-back').click(function (e) {
        e.preventDefault();
        $('.mmooc-modal-overlay').hide();
        $('.mmooc-modal').hide();
      });
    },
    setClickHandlers: function () {
      $('.notenrolled').click(function (e) {
        e.preventDefault();
        var html = $(this)
          .next()
          .html();
        mmooc.enroll.handleEnrollClick(e, html);
      });
      $('.all-courses-show-modal').click(function (e) {
        e.preventDefault();
        var html = $(this)
          .parent()
          .next()
          .html();
        mmooc.enroll.handleEnrollClick(e, html);
      });
      $('.mmooc-modal-overlay').click(function (e) {
        e.preventDefault();
        $('.mmooc-modal-overlay').hide();
        $('.mmooc-modal').hide();
      });
      $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
          $('.mmooc-modal-overlay').hide();
          $('.mmooc-modal').hide();
        }
      });
    },
    populateFilter: function (categorys) {
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
    applyFilter: function () {
      var value = $('#filter').val();
      if (value == 'Alle') {
        $('.mmooc-all-courses-list').removeClass('filter-active');
        $('.mmooc-all-courses-list h2').each(function () {
          $(this).show();
          $(this)
            .next()
            .show();
        });
      } else {
        $('.mmooc-all-courses-list').addClass('filter-active');
        $('.mmooc-all-courses-list h2').each(function () {
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
