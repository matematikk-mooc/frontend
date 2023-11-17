import NavBar from '../../vue/components/header/NavBar.vue';
import activitystream from '../../templates/modules/activitystream.hbs';
import api from '../api/api.js';
import backbutton from '../../templates/modules/backbutton.hbs';
import { createApp } from 'vue/dist/vue.runtime.esm-bundler.js';
import groupdiscussionGetHelpFromTeacher from '../../templates/modules/groupdiscussionGetHelpFromTeacher.hbs';
import { hrefQueryString } from '../settingsRoot.js';
import i18n from '../i18n.js';
import login from './login.js';
import multilanguage from '../3party/multilanguage.js';
import { renderCourseModules } from "../../vue/pages/course-page/left-menu"
import settings from '../settings.js';
import usermenu from '../../templates/modules/usermenu.hbs';
import util from './util.js'
import utilRoot from '../utilRoot.js';

export default (function() {
  let self = this
  function extractBadgesLinkFromPage() {
    var href = null;
    var a = null;
    var badgeSafe = $('li.section:contains("BadgeSafe")')

    if(badgeSafe) {
      a = badgeSafe.find('a');
    }
    if(a) {
      href = a.attr('href');
    }
    return { title: i18n.Badgesafe, url: href };
  }

  function createStyleSheet() {
    var style = document.createElement('style');

    // WebKit hack :(
    style.appendChild(document.createTextNode(''));

    document.head.appendChild(style);

    return style.sheet;
  }

  function insertCustomMenuElementInTopMenu(linkText, link) {
    var menu = document.getElementById('menu');
    if (menu) {
      menu.insertAdjacentHTML(
        'afterbegin',
        '<li class="menu-item custom-item ic-app-header__menu-list-item"><a href="' +
          link +
          '" class="menu-item-no-drop ic-app-header__menu-list-link">' +
          linkText +
          '</a></li>'
      );
    }
  }

  function openHelpDialog(event) {
    event.preventDefault();
    $('#global_nav_help_link').click(); //Do the same as when you are clicking on the original help button (which display the help dialog)
  }

  function hideHelpMenuElementIfNotActivated() {
    $canvasHelpButton = $('#global_nav_help_link');
    if ($canvasHelpButton.length == 0) {
      $('li.helpMenu').hide();
    }
  }
  function handleMenuClick(menuSelectId, menuId, time) {
    if ($(menuId).css('display') != 'none') {
      $(menuId).slideUp(time);
      $(menuSelectId).off('mouseleave');
    } else {
      $(menuId).slideDown(time);
      $(menuSelectId).mouseleave(function() {
        $(menuId).slideUp(time);
      });
    }
  }
  function createNewTooltipText(oldText, tooltipType, newText) {
    return oldText.replace(new RegExp("(<br>|</i>)(.*$)"), tooltipType + newText)
  }

  function updateButtonTooltip(el, item) {
    var tooltip = el.attr("data-html-tooltip-title");
    if(tooltip) {
      el.attr("data-html-tooltip-title", createNewTooltipText(tooltip, "</i>", item.title));
    }
  }

  var stylesheet = createStyleSheet();

  return {
    tooltipRegexpPattern : new RegExp("(<br>|</i>)(.*$)"),

    listModuleItems: function () {

      const leftSideElement = document.getElementById('left-side')
      if (leftSideElement) {
          renderCourseModules("left-side");
          //Canvas case: Slow loading for group discussions when large number of groups Case # 05035288
          //Display popup box when loading
          util.postModuleMenuProcessing()

          $('.mmooc-reveal-trigger').click(function (event) {
            var $trigger = $(this)
            var body = $trigger.attr('href')
            var i = $trigger.find('i')

            //Hvis elementet vises så lukker vi det
            if ($(body).css('display') != 'none') {
              $(body).slideUp(400)
              //Hvis det inneholder det aktive elementet så må vi vise det.
              if ($trigger.attr('id') == 'mmooc-module-item-active-header') {
                $trigger.attr('class', 'active mmooc-reveal-trigger')
              }
              i.attr('class', 'icon-mini-arrow-right')
            } else {
              $(body).slideDown(400)
              if ($trigger.attr('id') == 'mmooc-module-item-active-header') {
                $trigger.attr('class', 'mmooc-reveal-trigger')
              }
              i.attr('class', 'icon-mini-arrow-down')
            }
            return false

          })
        }


    },

    createNewTooltipText : function(oldText, tooltipType, newText) {
      return oldText.replace(this.tooltipRegexpPattern, tooltipType + newText)
    },
    updateButtonTooltip : function(el, item) {
      var tooltip = el.attr("data-html-tooltip-title");
      if(tooltip) {
        el.attr("data-html-tooltip-title", createNewTooltipText(tooltip, "</i>", item.title));
      }
    },
    showLeftMenu: function() {
      stylesheet.insertRule(
        'body.with-left-side #main { width: 100% !important, minWidth: 1600px; }',
        stylesheet.cssRules.length
      );
      stylesheet.insertRule(
        '.with-left-side #left-side { display: block !important }',
        stylesheet.cssRules.length
      );
      $('body').addClass('useFullWidth'); //Used to solve problems in making the design 100% width in the new UI. This is the simplest way to implement this.
    },
    renderLeftHeaderMenu: function() {
      // render left header menu only for authenticated users
      if (util.isAuthenticated()) {

        //Remove canvas default buttons in header

        var history = document.getElementById("global_nav_history_link");
        if (history != null){
          history.remove();
        }
        var coursesButton = document.getElementById("global_nav_courses_link");
        if (coursesButton != null){
          coursesButton.remove();
        }
        var groupsButton = document.getElementById("global_nav_groups_link")
        if (groupsButton != null){
          groupsButton.remove();
        }

        var commonsButton = document.getElementById("context_external_tool_176_menu_item")
        if (commonsButton != null){
          commonsButton.remove();
        }

        // The entire menu is rebuilt because of unwanted popup in the new ui menu
        if (settings.removeGlobalGradesLink == false) {
          insertCustomMenuElementInTopMenu('Karakterer', '/grades' + hrefQueryString);
        }
        if (settings.removeGroupsLink == false) {
          insertCustomMenuElementInTopMenu('Grupper', '/groups' + hrefQueryString);
        }
        var linkToMyCourses = utilRoot.getLinkToMyCourses();
        insertCustomMenuElementInTopMenu(i18n.CoursePlural, linkToMyCourses);

        if (util.isTeacherOrAdmin()) {
          this.showLeftMenu();

          $('#section-tabs-header').show();

          //Canvas changed the aria-label as shown in the two lines below. Keep both lines for backward compatibility.
          $("nav[aria-label='context']").show();
          $("nav[aria-label='Emner-navigasjonsmeny']").show();

          //20180821ETH Venstremenyen heter noe annet for grupper.
          //20180906ETH Men vi ønsker ikke vise den.
          //                $("nav[aria-label='Navigasjonsmeny for grupper ']").show();

          $('#edit_discussions_settings').show();
          $('#availability_options').show();
          $('#group_category_options').show();

          //KURSP-223 Diskusjonssiden scroller til toppen når man skal skrive et innlegg eller et svar
          //Denne koden ser ikke ut til å være nødvendig ettersom vi ikke har noe kode som
          //skjuler editor_tabs.
          //$('#editor_tabs').show();

          // Done via CSS since content is loaded using AJAX
          stylesheet.insertRule(
            'body.pages .header-bar-outer-container { display: block }',
            stylesheet.cssRules.length
          );
          stylesheet.insertRule(
            '#discussion-managebar { display: block }',
            stylesheet.cssRules.length
          );
        }
      }

      var roles = api.getRoles();
      if (roles != null && roles.indexOf('admin') != -1) {

        //Remove canvas default buttons  and commons in header
        var accountsButton = document.getElementById("global_nav_accounts_link")
        if(accountsButton != null){
          accountsButton.remove();
        }

        // Admin needs original canvas Course dropdown to access site admin settings
        //$("#courses_menu_item").show(); //Applies only for Old UI. This is the course menu item with a sub menu.
        insertCustomMenuElementInTopMenu('Admin', '/accounts' + hrefQueryString);
        // Admin needs more profile settings
        $('.add_access_token_link').show();
        $('body.profile_settings')
          .find('#content > table, #content > h2, #content > p')
          .show();
      }
    },

    renderUnauthenticatedMenu: function() {
      if (!util.isAuthenticated()) {

        $('#header').hide();
        var headerwrapper = document.getElementById("application").children[0];
        headerwrapper.append(document.createElement("div"));
        headerwrapper.setAttribute("id", "notLoggedInHeader");
        const headerProps = {
          logged_in: false,
          admin: false
        }
        let customHeader = createApp(NavBar, headerProps);
        customHeader.mount("#notLoggedInHeader");

        login.handleLoginButtonClick();
      }
      else {
        $('#header').hide();
        let admin = false;
        if(util.isTeacherOrAdmin()){
          admin = true;
        }
        var headerwrapper = document.getElementById("application").children[0];
        headerwrapper.append(document.createElement("div"));
        headerwrapper.setAttribute("id", "loggedInHeader");
        const headerProps = {
          logged_in: true,
          admin: admin
        }
        let customHeader = createApp(NavBar, headerProps);
        customHeader.mount("#loggedInHeader");
      }
    },
    hideRightMenu: function() {
      $('#right-side').hide();
      $('body').removeClass('with-right-side');
    },
    showMobileTabs: function() {
        var selectedTab = document.querySelector(".selected");

        if(selectedTab) {
          selectedTab.insertAdjacentHTML(
            'beforeend',
            '<div class="tabs-hamburger">☰</div>'
          );
        }

        $('.tabs-hamburger').click(function(event) {
          var selectedTab = $('.mmooc-course-tab').filter('.selected');
          var notSelectedTabs = $('.mmooc-course-tabs li:not(".selected")');
          var allTabs = $('.mmooc-course-tab');
          var time = 100;

          if ($(allTabs).css('display') != 'none') {
            $(notSelectedTabs).slideUp(time);
            selectedTab.insertBefore('.mmooc-course-tab:first-of-type');
            $(notSelectedTabs).show();
          } else {
            $(notSelectedTabs).show();
          }
          selectedTab.insertBefore('.mmooc-course-tab:first-of-type');
        });

        $(window).on('resize', function(e) {
          var desktopViewport = window.matchMedia("(max-width: 1050px)");
          var tabsNotSelected = $('.mmooc-course-tabs li:not(".selected")');
          var tabsHamburger = $('.tabs-hamburger');

          if(desktopViewport.matches) {
            $(tabsHamburger).css("display", "block");
          }else {
            $(tabsHamburger).css("display", "none");
          }

          if (!desktopViewport.matches) {
            tabsNotSelected.css("display", "flex");
          }else {
            tabsNotSelected.css("display", "none");
          }
      });
    },
    hideSectionTabsHeader: function() {
      $('#section-tabs-header-subtitle').hide();
    },
    showHamburger: function() {
      if(util.isAuthenticated()) {
        var header = document.querySelector(".ic-app-header__main-navigation");

        if (header) {
          header.insertAdjacentHTML(
            'afterbegin',
            '<div class="menu-mobile">☰</div>'
          );
        }
      }
    },
    showMobileMenu: function() {
      if(util.isAuthenticated) {
        $('.menu-mobile').click(function(event) {
          var mobileMenu = $('#menu');
          var time = 100;

          if (mobileMenu.css('display') != 'none') {
            mobileMenu.slideUp(time);
          } else {
            mobileMenu.slideDown(time);
          }
        });

      $(window).on('resize', function(e) {
          var desktopViewport = window.matchMedia("(min-width: 1051px)");

          if (desktopViewport.matches) {
            $('#menu').css("display", "flex");
          }else {
            $('#menu').css("display", "none");
          }
      });
      }
    },
    showUserMenu: function() {
      var menu = document.getElementById('menu');
      if (menu != null && util.isAuthenticated()) {
        var html = util.renderTemplateWithData(usermenu, {
          alertMenuItem: settings.displayAlertsMenuItem,
          user: api.getUser(),
          queryString: hrefQueryString,
          displayInboxMenu: settings.displayInboxMenu,
        });
        menu.insertAdjacentHTML('afterend', html);

        if(settings.displayAlertsMenuItem) {
          $('#mmooc-menu-item-varsler').click(function(event) {
            handleMenuClick('#mmooc-menu-item-varsler', '#mmooc-activity-stream', 400);
          });
        }
        $('#mmooc-menu-item-profile-settings').click(function(event) {
          handleMenuClick(
            '#mmooc-menu-item-profile-settings',
            '#mmooc-profile-settings',
            400
          );
        });

        var linkToMyCourses = utilRoot.getLinkToMyCourses();
        this.alterHomeLink(linkToMyCourses);

        api.getUnreadMessageSize(function(conversations) {
          var msgBadge = $('#mmooc-unread-messages-count');
          if (conversations.unread_count != '0') {
            msgBadge.html(conversations.unread_count);
            msgBadge.show();
          } else {
            msgBadge.hide();
          }
        });
        this.updateNotificationsForUser();


        //20180921ETH Vi bruker ikke hjelpemenyen lenger.
        //                $(document).on("click", ".helpMenu", openHelpDialog);
        //                hideHelpMenuElementIfNotActivated();
      }
    },
    setMenuActiveLink: function() {
      var menuItems = $('.ic-app-header__menu-list li a ');
      menuItems.each((_, element) => {
        if (window.location.pathname.includes($(element).attr('href'))) {
          $(element).addClass('active');
        }
      });
    },

    updateNotificationsForUser: function() {
      if(!settings.displayAlertsMenuItem) {
        return;
      }
      api.getActivityStreamForUser(function(activities) {
        var unreadNotifications = 0;
        for (var i = 0; i < activities.length; i++) {
          if (checkReadStateFor(activities[i])) {
            unreadNotifications++;
          }
          activities[i].created_at = util.formattedDate(
            activities[i].created_at
          );
        }

        var badge = $('#mmooc-notification-count');
        if (unreadNotifications == 0) {
          badge.hide();
        } else {
          badge.html(unreadNotifications);
          badge.show();
        }

        document.getElementById(
          'mmooc-activity-stream'
        ).innerHTML = util.renderTemplateWithData(activitystream, {
          activities: activities
        });

        var notifications = $('#mmooc-notifications').find('li');
        var showAllItems = $('#mmooc-notifications-showall');
        if (notifications.size() > 10) {
          notifications.slice(10).addClass('hidden');

          showAllItems.click(function() {
            notifications.removeClass('hidden');
            showAllItems.hide();
          });
        } else {
          showAllItems.hide();
        }
      });
    },

    showCourseMenu: function(courseId, selectedMenuItem, title, hideTabs) {
      hideTabs = hideTabs || false; //Do not hide tabs if the parameter
      $('body').addClass('with-course-menu');
      api.getCourse(courseId, function(course) {
        _renderCourseMenu(course, selectedMenuItem, title, hideTabs);
        showMobileTabs();
      });
    },

    showBackButton: function(url, title) {
      var buttonHTML = util.renderTemplateWithData(backbutton, {
        url: url,
        title: title
      });
      document
        .getElementById('content-wrapper')
        .insertAdjacentHTML('afterbegin', buttonHTML);
    },

    showGroupHeader: function() {
      var groupId = api.getCurrentGroupId();
      var groupHeaderHTML = util.renderTemplateWithData(backbutton, {
        groupId: groupId
      });
      document
        .getElementById('content-wrapper')
        .insertAdjacentHTML('afterbegin', groupHeaderHTML);
    },

    showDiscussionGroupMenu: function() {
      function strLeft(sourceStr, keyStr) {
        return (sourceStr.indexOf(keyStr) == -1) | (keyStr == '')
          ? ''
          : sourceStr.split(keyStr)[0];
      }

      function _addGetHelpFromteacherButton(group) {
        //Match gruppenavn mot seksjon i seksjonsliste.
        function _getSectionRecipientFromGroupName(
          sectionRecipients,
          groupName
        ) {
          for (var i = 0; i < sectionRecipients.length; i++) {
            var r = sectionRecipients[i];
            if (r.name == groupName) {
              return r.id;
            }
          }
          return null;
        }

        function _tilkallVeilederFeilet() {
          $('#mmooc-get-teachers-help').addClass('btn-failure');
          $('#mmooc-get-teachers-help').html('Tilkall veileder feilet');
        }

        function _sendMessageToSectionTeachers() {
          var courseId = api.getCurrentCourseId();
          api.getUserGroupsForCourse(courseId, function(groups) {
            if (groups.length == 0 || groups.length > 1) {
              _tilkallVeilederFeilet();
              alert(
                'Det er noe galt med gruppeoppsettet ditt.\nDu er medlem i ' +
                  groups.length +
                  ' grupper.'
              );
            } else {
              var group = groups[0];
              var groupName = group.name;
              var groupCourseId = group.course_id;
              api.getSectionRecipients(
                groupCourseId,
                (function(courseId) {
                  return function(recipients) {
                    var sectionRecipient = _getSectionRecipientFromGroupName(
                      recipients,
                      groupName
                    );
                    if (sectionRecipient == null) {
                      _tilkallVeilederFeilet();
                      alert(
                        'Det er noe galt med gruppeoppsettet ditt.\nFant ikke seksjonen til ' +
                          groupName
                      );
                    } else {
                      var sectionRecipientTeachers =
                        sectionRecipient + '_teachers';
                      var subject =
                        groupName + ' ' + i18n.GroupGetInTouchSubject;
                      var discussionUrl = window.location.href;
                      var discussionAndGroupTitle = $(
                        '.discussion-title'
                      ).text();
                      var discussionTitle = strLeft(
                        discussionAndGroupTitle,
                        ' - '
                      );
                      var newLine = '\n';

                      var body =
                        i18n.WeHaveAQuestionToTeacherInTheDiscussion +
                        ' "' +
                        discussionTitle +
                        '":' +
                        newLine +
                        discussionUrl;

                      $('#mmooc-get-teachers-help').html('Sender melding...');

                      api.postMessageToConversation(
                        courseId,
                        sectionRecipientTeachers,
                        subject,
                        body,
                        function(result) {
                          console.log(result);
                          $('#mmooc-get-teachers-help').addClass('btn-done');
                          $('#mmooc-get-teachers-help').html(
                            'Veileder tilkalt'
                          );
                        },
                        function(error) {
                          _tilkallVeilederFeilet();
                          alert(
                            'Tilkall veileder feilet. Gruppen har ingen veileder.'
                          );
                          console.log(error);
                        }
                      );
                    }
                  };
                })(groupCourseId)
              );
            }
          });
        }

        function _addClickEventOnGetHelpFromTeacherButton() {
          $('#mmooc-get-teachers-help').click(function() {
            $('#mmooc-get-teachers-help').off('click');
            $('#mmooc-get-teachers-help').html('Finner veileder...');
            _sendMessageToSectionTeachers();
          });
        }

        // Get help from teacher by clicking a button
        var getHelpButtonFromteacherButtonHTML = util.renderTemplateWithData(
          groupdiscussionGetHelpFromTeacher,
          { hoverOverText: i18n.CallForInstructorHoverOverText }
        );
        //document.getElementById('content').insertAdjacentHTML('afterbegin', getHelpButtonFromteacherButtonHTML);
        $('#discussion-managebar > div > div > div.pull-right').append(
          getHelpButtonFromteacherButtonHTML
        );
        _addClickEventOnGetHelpFromTeacherButton();
      }

      var groupId = api.getCurrentGroupId();
      if (groupId != null) {
        api.getGroup(groupId, function(group) {
          // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
          var title = util.getPageTitleAfterColon();
          showCourseMenu(group.course_id, 'Grupper', title, true); //Group menu in tabs including title - Use optional fourth parameter for hiding tabs
          if(settings.displayCallForAssistanceButtonInGroupDisccussions) {
            _addGetHelpFromteacherButton(group);
          }
        });
      }
    },

    checkReadStateFor: function(activity) {
      return activity.read_state === false;
    },

    extractBadgesLinkFromPage: function() {
      var href = null;
      var a = null;
      var badgeSafe = $('li.section:contains("BadgeSafe")')

      if(badgeSafe) {
        a = badgeSafe.find('a');
      }
      if(a) {
        href = a.attr('href');
      }
      return { title: i18n.Badgesafe, url: href };
    },
    setCanvaBadgesLink: function(course, callback) {
      var user_id = api.getUser().id;

      //This should be refactored to be in an api resource file
      var domain = location.host;
      var urlToCanvaBadgesApi =
        settings.CanvaBadgeProtocolAndHost +
        '/api/v1/badges/public/' +
        user_id +
        '/' +
        encodeURIComponent(domain) +
        '.json';
      $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        url: urlToCanvaBadgesApi,
        timeout: 5000,
        success: function(data) {
          if ($.isFunction(callback)) {
            callback({
              title: i18n.Badgesafe,
              url: '/courses/' + course.id + '?allcanvabadges'
            });
          }

          // if(data.objects && data.objects.length > 0) {

          // }
        },
        error: function(err) {
          if ($.isFunction(callback)) {
            callback({
              title: i18n.Badgesafe,
              url: undefined
            });
          }
        }
      });
    },

    injectGroupsPage: function() {
      $('#courses_menu_item').after(
        '<li class="menu-item"><a href="/groups" class="menu-item-no-drop">Grupper</a></li>'
      );
    },

    alterHomeLink: function(linkToMyCourses) {
      let logo = SERVER + 'Ny-Udir-Logo-RGB-Neg.png'
      $('#header-logo').attr('href', linkToMyCourses);
      $('a.ic-app-header__logomark').attr('href', linkToMyCourses); //New UI
// 20180122ETH Uncommenting the line below to see if we can specify the logo in the theme editor instead.
//             In any case the logo should not be hardcoded but taken from the variables file instead.
      $('a.ic-app-header__logomark').attr('src', logo); //New UI
      $('.ic-app-header__logomark-container')
        .detach()
        .prependTo('.ic-app-header__main-navigation');
    },

    alterCourseLink: function() {
      //   if ($('#menu > li:first-child a').hasClass('menu-item-no-drop')) {
      //     $('#menu > li:first-child a').attr('href', '/courses');
      //   }
    }
  };
})();
