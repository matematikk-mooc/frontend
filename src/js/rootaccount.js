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
    $(".ic-Login").hide();
    redirected = mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
    if(!redirected) {
      if(!document.location.search.includes("normalLogin=1")) {
        let html = '<div class="login-box"><div class="login-box__upper"><p class="login-box__text">Logg inn på kompetanseportalen</p>\
        <div class="login-box__close"></div></div><div class="login-box__lower">\
        <a class="mmooc-button mmooc-button-primary" onclick="window.location.href=\'/login/saml\'">&nbsp;\
        </a><a class="mmooc-button mmooc-button-secondary" onclick="$(\'.login-box, .overlay\').remove(); $(\'.ic-Login\').show()">Har ikke Feide</a></div></div>';
        
        document.getElementById('wrapper').insertAdjacentHTML('afterend', html);
        $(".login-box__close").hide();
        $('#application').before(`<div class="overlay"></div>`);
      }
      else {
        $(".ic-Login").show();
      }
    }
}
else if (document.location.pathname == "/courses") {
    redirected = mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
} 
if(!redirected) {
  const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
  const design = urlParamsObj && urlParamsObj['design'];
  if (design !== undefined && design=="udir") {
      if(this.udirDesignLoaded === undefined)
      {
          this.udirDesignLoaded = true;
          console.log("Root account:Loading udir design.");
          getScript('https://udirdesignjs');

          var filename = 'https://udirdesigncss';

          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css")
          fileref.setAttribute("href", filename)
          document.getElementsByTagName("head")[0].appendChild(fileref)
      } else {
          console.log("Root account:Udir design already loaded.");
      }
  } else {
      console.log("Root account:Not loading any special design.");
  }
}
