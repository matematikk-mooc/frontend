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
        if(document.getElementById("application")){
          // non-mobile
          var headerwrapper = document.getElementById("application").children[0];
          headerwrapper.append(document.createElement("div"));
          headerwrapper.setAttribute("id", "notLoggedInHeader");
        }
        else if(document.getElementById("f1_container")){
          // mobile
          // header
          var mobileHeaderWrapper = document.getElementById("f1_container").children[0];
          mobileHeaderWrapper.append(document.createElement("div"));
          mobileHeaderWrapper.setAttribute("id", "notLoggedInHeader");

          // login banner
          var wrapper = document.getElementById("f1_container");
          var banner = document.createElement("div");
          banner.setAttribute("id", "banner")
          banner.textContent = "Påloggingsløsningen for Kompetanseportalen uten Feide-bruker er for tiden nede på mobile enheter. Vi anbefaler bruk av datamaskin frem til problemet er løst."
          wrapper.append(banner)
        }
        
        
        // Find modal on render and update content
        else if(document.getElementById("registration_header")){
        const observer = new MutationObserver((mutationsList, observer) => {
          const modal = document.querySelector('.ui-dialog');
          if (modal) {
            // Remove double button
            const doubleParentButton = modal.querySelector(".button-container")
            if (doubleParentButton) {
              doubleParentButton.remove()
            }
            // Find and edit terms text
            const userTerms = modal.querySelector('.checkbox').children[1];
            const privacyPolicy = modal.querySelector('.checkbox').children[2];
            if (privacyPolicy) {
              privacyPolicy.innerText = "personvernserklæringen og brukervilkårene"
              privacyPolicy.href = "https://kp.udir.no/personvern/"
              userTerms.remove()
              observer.disconnect();
            }
          }
        }
      );

        observer.observe(document.body, { childList: true, subtree: true });
          // Add navbar to register page
          var registrationHeaderWrapper = document.getElementById("registration_header").children[0];
          registrationHeaderWrapper.append(document.createElement("div"));
          registrationHeaderWrapper.setAttribute("id", "notLoggedInHeader");
          
          // Define reg nodes
          var registrationContent = document.getElementById("registration_options");
          var registrationFooter = document.getElementById("registration_footer");
          var registrationVideo = document.getElementById("registration_video")
          var student = document.getElementById('signup_student');
          var teacher = document.getElementById('signup_teacher');
          var grownup = document.getElementById('signup_parent');
          var heading = document.querySelector("#registration_options > h2");
          const description = document.createElement('p');
          
          // Create and populate image
          const logo = document.createElement('img')
          logo.classList.add("canvas_logo")
          logo.src = `${SERVER}canvas_transparent.png`;


          // Remove bloat src/vue/assets/canvas_reg_tr.png
          registrationFooter.remove()
          registrationVideo.remove()

          // Create elements and apppend
            const parent = student.parentNode;
            const newParentDiv = document.createElement('div');
            newParentDiv.classList.add("registration-button-container")
            parent.insertBefore(newParentDiv, student);
            newParentDiv.append(student)
            newParentDiv.append(teacher)
            registrationContent.append(newParentDiv)
            registrationContent.append(description)
            registrationContent.append(logo)

          // Change texts
            student.textContent = "Student";
            student.classList.add("btn", "btn--filled");
            teacher.classList.add("btn", "btn--outlined");
            teacher.textContent = "Lærer"
            grownup.textContent = "Foresatte kan registrere seg her"
            heading.textContent = "Registrering"
            description.textContent = "Dersom du ikke har Feide-bruker, eller trenger tilgang til Kompetanseportel uten dette - kan du registrere deg for Canvas ved å velge korrekt rolle og fylle inn nødvendig informasjon her."
        
            // Change terms link
            const regDialog = document.getElementsByClassName("registration-dialog")[0];
          }

          // Restructure reaccept terms page (Newly registered)
          else if(!!document.querySelector(".reaccept_terms")){
            const contentNode = document.querySelector(".ic-Login-confirmation__content").children[2];
            const checkboxNode = document.querySelector(".ic-Login-confirmation__content").children[3];
            // Create DOM element <a>, link, with text
            const privacyLink = Object.assign(document.createElement('a'), {
              href: 'https://kp.udir.no/personvern/',
              textContent: 'Personvernerklæringen',
              target: '_blank'
            });
            contentNode.replaceChildren('Velkommen til Kompetanseportalen! Dersom du er ny her, eller vilkårene for bruk av tjenesten har endret seg siden sist du var innom, vennligst les over innholdet i ', privacyLink, '.');
            // look through nodes and remove textnodes not recognized as children
            checkboxNode.childNodes.forEach(node => { 
              if (node.nodeType === Node.TEXT_NODE) {
                node.remove(); }
                }
            );
          }
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
