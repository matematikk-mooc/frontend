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
    redirected = mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
  }
}
else if (document.location.pathname == "/courses") {
  redirected = mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
} else {
  //redirected = mmooc.utilRoot.redirectToSamlIfUdirCourse(mmooc.settingsRoot.kpasApiUrl);
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
