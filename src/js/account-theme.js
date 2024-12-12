import LoginDirectLink from '../vue/components/login-choice/LoginDirectLink.vue';
import { createApp } from 'vue';
import utilRoot from './utilRoot';

var udirDesignLoaded;


jQuery.extend({
  getScript: function (url, callback) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;

    // Handle Script loading
    {
      var done = false;

      // Attach handlers for all browsers
      script.onload = script.onreadystatechange = function () {
        if (
          !done &&
          (!this.readyState ||
            this.readyState == "loaded" ||
            this.readyState == "complete")
        ) {
          done = true;
          if (callback) callback();

          // Handle memory leak in IE
          script.onload = script.onreadystatechange = null;
        }
      };
    }

    head.appendChild(script);

    // We handle everything using the script element injection
    return undefined;
  },
});

jQuery(document).ready(function ($) {


  var redirected = false;

  // Redirect if necessary
  if (document.location.pathname == "/search/all_courses" && document.location.search.includes('?enroll_code')) {
    window.location.href = '/courses' + document.location.search;
    redirected = true;
  } else if (document.location.pathname == "/login/canvas") {
    if (document.referrer.includes("/logout")) {
      window.location.href = '/search/all_courses';
      redirected = true;
    } else if (!document.referrer.includes("/login/canvas")) {
      $(".ic-Login").hide();
/*       $("#f1_container").hide(); // Small screens */
      redirected = utilRoot.redirectFeideAuthIfEnrollReferrer();
      if (!redirected) {
        if (!document.location.search.includes("normalLogin=1")) {
          if (document.getElementById('application')) {
            document.getElementById('wrapper').remove();
            console.log("application");
            var parent = document.getElementById('application');
          }
          else if (document.getElementById('f1_container')) {
            console.log('f1_container'); 
            var parent = document.getElementById('f1_container');
          }
            let login = document.createElement('div');
            login.id = 'login-component';
            let customLogin = createApp(LoginDirectLink);
            if (parent) {
              console.log(parent, "parent")
              parent.appendChild(login);
            }
            customLogin.mount("#login-component");
        } else {
          $(".ic-Login").show();
          $("#f1_container").show(); // Small screens
        }
      }
    }
  } else if (document.location.pathname == "/courses") {
    redirected = utilRoot.redirectToEnrollIfCodeParamPassed();
  } else if (document.location.href.indexOf('?login_success=1') != -1) {
    window.location.href = '/search/all_courses';
  } else if (document.location.pathname == "/") {
    setTimeout(function () {
      if (!$(".ic-DashboardCard__header_hero").length) {
        let html = `
        <div class="card card-body">
        <h3>Er det tomt her?</h3>
          <p>Dersom du har valgt å logge inn med Feide og ikke finner innholdet ditt kan det hende det er fordi du
          vanligvis har logget på med en annen bruker ved å bruke epost og passord. Logg ut og inn igjen ved å benytte "Ikke Feide" - knappen.
          </p>
          <img src="${SERVER}bitmaps/nyinnlogging.png" width="70%" alt="Ny innloggingsskjerm"/>
        </div>
        `;
        document.getElementById('dashboard-activity').insertAdjacentHTML('beforebegin', html);
      }
    }, 1000)
  }

  if (!redirected) {
    if (window.udirDesignLoaded === undefined) {
      window.udirDesignLoaded = true;
      console.log("Loading udir design.");

      var filename = SERVER + DESIGNCSS;

      var fileref = document.createElement("link")
      fileref.setAttribute("rel", "stylesheet")
      fileref.setAttribute("type", "text/css")
      fileref.setAttribute("href", filename)
      fileref.onload = (_) => {
        $.getScript(SERVER + DESIGNJS);
      }
      document.getElementsByTagName("head")[0].appendChild(fileref)
    } else {
      console.log("Udir design already loaded.");
    }
  }

});
