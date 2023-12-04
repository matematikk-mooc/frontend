import '../../vue/design/_infoboxes.scss';
import { IconPaths} from '../../vue/components/icon/iconPaths'


export default (function () {
  function addInfoBoxes() {
    onElementRendered(
      '#content .user_content.enhanced,#content .show-content.enhanced',
      function ($content) {
        var aBoxTags = [
          'uob-tip',
          'pfdk-tips',
          'uob-read',
          'pfdk-les',
          'uob-info',
          'pfdk-info',
          'uob-warning',
          'pfdk-advarsel',
          'uob-header',
          'uob-question',
          'pfdk-spsm',
          'uob-quote',
          'pfdk-sitat',
          'uob-box',
          'pfdk-boks',
          'pfdk-info',
          'pfdk-maal',
          'pfdk-important',
          'pfdk-viktig',
          'pfdk-tid',
          'pfdk-verktoy',
          'udir-skoleleder',
          'udir-kommentar',
          'udir-eksempel',
          'udir-general',
          'udir-importantinfo',
          'udir-tools',
          'udir-time',
          'udir-goals',
          'udir-tip',
          'udir-read',
          'udir-quote',
          'udir-schoolprincipal'
        ]

        do {
          var found = false
          var strTag = ""
          var className=""
          var $table = $content
            .find("table")
            .filter(function (index) {
              var str = $(this).find("tr:eq(0) > td").text()
              var patt = /\[(.*)\]/i // pattern is used to match text in []
              var result = str.match(patt)
              if (!found && result && result[1] && (aBoxTags.indexOf(result[1]) > -1)) {
                strTag = result[1]
                if (strTag === "pfdk-tips") {
                  strTag = "uob-tip";
                } else if (strTag === "pfdk-les") {
                  strTag = "uob-read";
                } else if (strTag === "pfdk-advarsel") {
                  strTag = "uob-warning";
                } else if (strTag === "pfdk-spsm") {
                  strTag = "uob-warning";
                } else if (strTag === "pfdk-sitat") {
                  strTag = "uob-quote";
                } else if (strTag === "pfdk-viktig") {
                  strTag = "uob-important";
                } else if (
                  strTag === "uob-box" ||
                  strTag === "pfdk-boks" ||
                  strTag === "udir-kommentar"
                ) {
                  strTag = "uob-general";
                }

                className= strTag.replace(/.*-/, "udir-info__");

                found = true
                return true
              }
              return false
            })

          if (found) {
            // Define a function that returns the SVG path
            function getPath() {
              // Replace this with your own logic to generate the path
              return "M10 10 H 90 V 90 H 10 Z";
            }

            // Add new container immediately before the table
            if (className === "udir-info-header") {
              $table.before('<h2 class="' + className + '"></h2>');
            } else {
              $table.before('<div class="udir-info ' + className + '"></div>');
            }

            // Create two child containers and append them to the parent container
            const $container = $table.prev();
            $container.append('<div class="udir-info__icon-container"></div>');
            const $contentContainer = $(
              '<div class="udir-info__content-container"></div>'
            );
            $container.append($contentContainer);

            if (!className.includes('general')) {
              // Get the path from the function
              const path = getIcon(className);

              // Add an SVG with the path element to the icon container
              const $iconContainer = $container.find(
                ".udir-info__icon-container"
              );
              $iconContainer.html(
                `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 -960 960 960" width="1em"><path d="${path}"/></svg>`
              );
            }
           

            // Move content from table to the second child container
            $contentContainer.append(
              $table.find("tr:eq(1) > td:eq(0)").contents()
            );

            // Remove the original table
            $table.remove();
          }
        } while (found)
      })
  }
   
  function onPage(regex, fn) {
    if (location.pathname.match(regex)) fn()
  }
        

  return {
    init: function () {
      onPage(/\/(courses|groups)\/\d+/, function () {
        addInfoBoxes()
      })
    }
    
  }
})()


function getIcon(iconType) {
  iconType
  const icon = "udir-info__";
  if (iconType === icon + "verktoy" || iconType === icon + "tools") {
    return IconPaths['devices'];
  } else if (iconType === icon + "tid" || iconType === icon + "time") {
    return IconPaths['alarm'];
  } else if (iconType === icon + "maal" || iconType === icon + "goals") {
    return IconPaths['flag'];
  }else if (iconType === icon + "tip") {
    return IconPaths['light_bulb'];
  } else if (iconType === icon + "read" || iconType === icon + "question") {
    return IconPaths["article"];
  } else if (iconType === icon + "quote") {
    return IconPaths["quote"];
  } else if (iconType === icon + "skoleleder" || iconType === icon + "schoolprincipal") {
    return IconPaths["face"];
  } else if (
    iconType === icon + "info" ||
    iconType === icon + "warning" ||
    iconType === icon + "important" ||
    iconType === icon + "importantinfo"
  ) {
    return IconPaths["star"];
  } 
}
  function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts >= 60) return;

    setTimeout(function () {
      onElementRendered(selector, cb, _attempts);
    }, 200);
}
