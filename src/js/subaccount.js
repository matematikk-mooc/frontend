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

jQuery(document).ready(function($) {
    const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
    var enrollCode = mmooc.utilRoot.isEnrollCodeParamPassed(urlParamsObj);
    if (enrollCode) {
      return null;
    }
    if (mmooc.utilRoot.isLoginParamPassed(urlParamsObj)) {
      return null;
    }

    if (window.udirDesignLoaded == undefined && this.udirDesignLoaded === undefined) {
        window.udirDesignLoaded = true;
        this.udirDesignLoaded = true;
        console.log("Subaccount: loading design.");

        var filename = 'https://udirdesigncss';
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        fileref.onload = (_) => {
          $.getScript('https://udirdesignjs');
        }
        document.getElementsByTagName("head")[0].appendChild(fileref)
    } else
    {
        console.log("Subaccount: design already loaded.");
    }
});
