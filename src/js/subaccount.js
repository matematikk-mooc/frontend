import '../css/all.less';

import utilRoot from './utilRoot';

// Replace the normal jQuery getScript function with one that supports
// debugging and which references the script files as external resources
// rather than inline.
var udirDesignLoaded;

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
    console.log("Subaccount:  START.");
    const urlParamsObj = utilRoot.urlParamsToObject();
    var enrollCode = utilRoot.isEnrollCodeParamPassed(urlParamsObj);
    if (enrollCode) {

      console.log("Subaccount:  ENROLLCODE DEFINED.");
      return null;
    }
    if (utilRoot.isLoginParamPassed(urlParamsObj)) {
      console.log("Subaccount:  LOGINPARAM PASSED.");
      return null;
    }

    if (window.udirDesignLoaded == undefined && udirDesignLoaded === undefined) {
        window.udirDesignLoaded = true;
        udirDesignLoaded = true;
        console.log("Subaccount: loading design.");
      console.log("before filename")
        var filename = SERVER + DESIGNCSS;
        console.log(filename)
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        fileref.onload = (_) => {
          $.getScript(SERVER + DESIGNJS);
        }
        console.log("SA: after get script")
        document.getElementsByTagName("head")[0].appendChild(fileref)
    } else
    {
        console.log("Subaccount: design already loaded.");
    }

    console.log("Subaccount:  EOF.")
});
