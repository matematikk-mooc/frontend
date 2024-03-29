import LoginDirectLink from '../vue/components/login-choice/LoginDirectLink.vue';
import { createApp } from 'vue';
import { hrefQueryString } from './settingsRoot';
import utilRoot from './utilRoot';

// Replace the normal jQuery getScript function with one that supports
// debugging and which references the script files as external resources
// rather than inline.
var self = this;
var udirDesignLoaded;
function getScript(url, callback) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.src = url;

  // Handle Script loading
  {
    var done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
      if (
        !done &&
        (!this.readyState ||
          this.readyState == 'loaded' ||
          this.readyState == 'complete')
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
}

//Redirect if necessary
var redirected = false;
//If this is a Feide self enrollment link, forward to a page that requires authentication. It will redirect to the Canvas login page
//which will pick up that there is an enrollment code in the link and forward to Feide.
if(document.location.pathname == "/search/all_courses" && document.location.search.includes('?enroll_code')) {
  window.location.href = '/courses' + document.location.search;
  redirected = true;
} else if(document.location.pathname == "/login/canvas") {
  if (document.referrer.endsWith("/logout" + hrefQueryString)) {
    window.location.href = '/search/all_courses' + hrefQueryString;
    redirected = true;
  } else if(!document.referrer.includes("/login/canvas")) {
    $(".ic-Login").hide();
    $("#f1_container").hide(); //Small screens
    redirected = utilRoot.redirectFeideAuthIfEnrollReferrer();
    if(!redirected) {
      if(!document.location.search.includes("normalLogin=1")) {
        document.getElementById('wrapper').remove();
        let parent = document.getElementById('application');
        let login = document.createElement('div');
        login.id = 'login-component';
        let customLogin = createApp(LoginDirectLink);
        parent.appendChild(login);
        customLogin.mount("#login-component");

      }
      else {
        $(".ic-Login").show();
        $("#f1_container").show(); //Small screens
      }
    }
  }
} else if (document.location.pathname == "/courses") {
  redirected = utilRoot.redirectToEnrollIfCodeParamPassed();
} else if (document.location.href.indexOf('?login_success=1') != -1  ){
  window.location.href = '/search/all_courses?design=udir';
} else if (document.location.pathname == "/") {
  setTimeout(function() {
    if(!$(".ic-DashboardCard__header_hero").length) {
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



if(!redirected) {
  const urlParamsObj = utilRoot.urlParamsToObject();
  const design = urlParamsObj && urlParamsObj['design'];
  if (design !== undefined && design=="udir") {
      if(window.udirDesignLoaded === undefined)
      {
          window.udirDesignLoaded = true;
          console.log("Root account:Loading udir design.");

          var filename = SERVER + DESIGNCSS;

          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css")
          fileref.setAttribute("href", filename)
          fileref.onload = (_) => {
            $.getScript(SERVER + DESIGNJS);
          }
          document.getElementsByTagName("head")[0].appendChild(fileref)
      } else {
          console.log("Root account:Udir design already loaded.");
      }
  } else {
      console.log("Root account:Not loading any special design.");
  }
}
