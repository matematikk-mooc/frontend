// Replace the normal jQuery getScript function with one that supports
// debugging and which references the script files as external resources
// rather than inline.
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

function showCanvasLogin() {
  $('.login-box, .overlay').remove(); 
  $('.ic-Login').show();
  $("#f1_container").show(); //Small screens
}
//Redirect if necessary
var redirected = false;
//If this is a Feide self enrollment link, forward to a page that requires authentication. It will redirect to the Canvas login page
//which will pick up that there is an enrollment code in the link and forward to Feide.
if(document.location.pathname == "/search/all_courses" && document.location.search.includes('?enroll_code')) {
  window.location.href = '/courses' + document.location.search;
  redirected = true;
} else if(document.location.pathname == "/login/canvas") {
  if (document.referrer.endsWith("/logout" + mmooc.hrefQueryString)) {
    window.location.href = '/search/all_courses' + mmooc.hrefQueryString;
    redirected = true;
  } else {
    $(".ic-Login").hide();
    $("#f1_container").hide(); //Small screens
    redirected = mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
    if(!redirected) {
      if(!document.location.search.includes("normalLogin=1")) {
        let html = `<div class="login-box frontPageLoginBox">
          <div class="login-box__upper">
          <p class="login-box__text">
          <img width="50px" src="https://server/bitmaps/unit-logo.png"/>&nbsp;&nbsp;
          <span><h3>Velkommen til Unit kompetanseportal</h3></span></p>
          <div class="login-box__close"></div></div>
          <div class="login-box__lower">
            <a class="mmooc-button mmooc-button-primary" onclick="window.location.href=\'/login/saml\'">&nbsp;
            </a>
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <a class="icon-question unit-help-login" target="_blank" href="https://bibsys.instructure.com/courses/553"></a>
            &nbsp;&nbsp;
            &nbsp;&nbsp;
            <a class="mmooc-button mmooc-button-secondary" onclick="showCanvasLogin();">Har ikke Feide</a>
            </div>
          <div class="unitPartners">
        <img class="unitPartnersLogo" src="https://server/bitmaps/udirlogo50px.png"/>
        <img class="unitPartnersSmallLogo" height=15px" src="https://server/bitmaps/logo_ntnu.png"/>
        </div>
        </div>
        `;
        
        document.getElementsByTagName('body')[0].innerHTML += html;
        $(".login-box__close").hide();
        $('#application').before(`<div class="overlay"></div>`);
      }
      else {
        $(".ic-Login").show();
      }
    }
  }
} else if (document.location.pathname == "/courses") {
  redirected = mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
} else if (document.location.pathname == "/" && !$(".ic-DashboardCard__header_hero").length) {
  let html = `
  <div class="card card-body">
  <h3>Er det tomt her?</h3>
    Dersom du har valgt å logge inn med Feide og ikke finner innholdet ditt kan det hende det er fordi du 
    vanligvis har logget på med en annen bruker ved å bruke epost og passord. Logg ut og inn igjen med epost/passord.
  </div>
  `;
  document.getElementById('dashboard-activity').insertAdjacentHTML('beforebegin', html);
}

if(!redirected) {
  const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
  const design = urlParamsObj && urlParamsObj['design'];
  if (design !== undefined && design=="udir") {
      if(this.udirDesignLoaded === undefined)
      {
          this.udirDesignLoaded = true;
          console.log("Root account:Loading udir design.");

          var filename = 'https://udirdesigncss';

          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css")
          fileref.setAttribute("href", filename)
          fileref.onload = (_) => {
            $.getScript('https://udirdesignjs');
          }
          document.getElementsByTagName("head")[0].appendChild(fileref)
      } else {
          console.log("Root account:Udir design already loaded.");
      }
  } else {
      console.log("Root account:Not loading any special design.");
  }
}
