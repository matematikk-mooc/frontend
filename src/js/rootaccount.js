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

//Redirect if necessary
var redirected = false;
if(document.location.pathname == "/login/canvas") {
  if (document.referrer.endsWith("/logout" + mmooc.hrefQueryString)) {
    window.location.href = '/search/all_courses' + mmooc.hrefQueryString;
    redirected = true;
  } else {
    $(".ic-Login").hide();
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
          </a>&nbsp;&nbsp;
          <a class="mmooc-button mmooc-button-secondary" onclick="$(\'.login-box, .overlay\').remove(); $(\'.ic-Login\').show()">Har ikke Feide</a>
          </div>
        <div class="unitPartners">
        <img class="unitPartnersLogo" src="https://server/bitmaps/udirlogo50px.png"/>
        <img class="unitPartnersSmallLogo" height=15px" src="https://server/bitmaps/logo_ntnu.png"/>
        </div>
        </div>
        `;
        
        document.getElementById('wrapper').insertAdjacentHTML('afterend', html);
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
    vanligvis har logget på med en annen bruker ved å bruke epost og passord. Du kan hente innholdet fra den andre brukeren din
    ved å velge <b>Konto->Slå sammen brukere</b> i venstremenyen og følge oppskriften.
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
