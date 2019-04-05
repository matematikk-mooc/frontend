// Replace the normal jQuery getScript function with one that supports
// debugging and which references the script files as external resources
// rather than inline.
jQuery.extend({
  getScript: function(url, callback) {
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
});

function loadcssfile(filename){
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
    document.getElementsByTagName("head")[0].appendChild(fileref)
}


jQuery(function($) {
    const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
    const design = urlParamsObj && urlParamsObj['design'];
    if (design !== undefined && design=="udirDesign") {
        $.getScript('http://localhost:9000/mmooc-min.js');
        loadcssfile('http://localhost:9000/mmooc-min-dev.css');
    } else {
        $("#application").show();
    }

    if(document.location.pathname == "/login/canvas") {
        mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
    }
    else if (document.location.pathname == "/courses") {
        mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
    }
});

