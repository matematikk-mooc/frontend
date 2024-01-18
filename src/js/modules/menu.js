import NavBar from '../../vue/components/header/NavBar.vue';
import { createApp } from 'vue/dist/vue.runtime.esm-bundler.js';
import { getMainContentId } from './menu-utils';
import { renderCourseModules } from "../../vue/pages/course-page/left-menu"
import util from './util.js'

export default (function() {
  function createStyleSheet() {
    var style = document.createElement('style');

    // WebKit hack :(
    style.appendChild(document.createTextNode(''));

    document.head.appendChild(style);

    return style.sheet;
  }

  var stylesheet = createStyleSheet();

  return {
    tooltipRegexpPattern : new RegExp("(<br>|</i>)(.*$)"),

    listModuleItems: function () {
      const leftSideElement = document.getElementById('left-side')
      if (leftSideElement) {
          renderCourseModules("left-side");
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
    renderUnauthenticatedMenu: function () {
       const mainContentId = getMainContentId() ?? '';
      if (!util.isAuthenticated()) {

        $('#header').hide();
        var headerwrapper = document.getElementById("application").children[0];
        headerwrapper.append(document.createElement("div"));
        headerwrapper.setAttribute("id", "notLoggedInHeader");
        const headerProps = {
          logged_in: false,
          admin: false,
          mainContentId,
        }
        let customHeader = createApp(NavBar, headerProps);
        customHeader.mount("#notLoggedInHeader");
      }
      else {
        $('#header').hide();
        let admin = false;
        if(util.isAdmin()){
          admin = true;
        }
        var headerwrapper = document.getElementById("application").children[0];
        headerwrapper.append(document.createElement("div"));
        headerwrapper.setAttribute("id", "loggedInHeader");
        const headerProps = {
          logged_in: true,
          admin: admin,
          mainContentId,
        }
        let customHeader = createApp(NavBar, headerProps);
        customHeader.mount("#loggedInHeader");
      }
    },
  };
})();
