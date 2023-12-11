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
          'udir-task',
          'udir-quote',
          'udir-leader',
          'udir-link', 
          'udir-law',
          'udir-header',
          'udir-warning',
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

            // Add new container immediately before the table
            if (className === "udir-info-header") {
              $table.before('<h2 class="' + className + '"></h2>');
            } else {
              $table.before('<div class="udir-info ' + className + '"></div>');
            }

            // Create two child containers and append them to the parent container
            const $container = $table.prev();
            $container.append('<div class="udir-info__icon-container" aria-hidden="true"></div>');
            const $contentContainer = $(
              '<div class="udir-info__content-container"></div>'
            );
            $container.append($contentContainer);

            if (!(className.includes('general') || className.includes('law') || className.includes('quote'))) {
              // Get the path from the function
              const path = getIcon(className);

              // Add an SVG with the path element to the icon container
              const $iconContainer = $container.find(
                ".udir-info__icon-container"
              );
              $iconContainer.html(
                `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 -960 960 960" width="1em"><path d="${path}"/></svg>`
              );
            } else if (className.includes('law')) {
               // Add an SVG with the path element to the icon container
              const $iconContainer = $container.find(
                ".udir-info__icon-container"
              );
              $iconContainer.html(
                `<span>§</span>`
              );
            } else if (className.includes('quote')) {
               // Add an SVG with the path element to the icon container
              const $iconContainer = $container.find(
                ".udir-info__icon-container"
              );
              $iconContainer.html(
                `<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	                width="1em" height="1em" viewBox="0 0 98.829 98.829"
	                xml:space="preserve">
                    <g>
	                    <g>
		                    <path d="M96.76,41.603C91.511,22.831,78.562,9.204,65.975,9.204c-1.011,0-2.021,0.088-3.005,0.262c-0.558,0.098-1.046,0.426-1.348,0.902c-0.301,0.479-0.386,1.061-0.233,1.605l2.591,9.268c0.25,0.895,1.113,1.5,2.01,1.459l0.206-0.004c4.668,0,13.199,6.996,17.548,22.545c0.172,0.617,0.335,1.248,0.492,1.906c-4.882-2.416-10.706-2.975-15.98-1.506C56.358,48.97,49.388,61.356,52.714,73.252c2.696,9.639,11.563,16.373,21.563,16.373c2.037,0,4.071-0.281,6.046-0.834c7.846-2.193,13.745-8.707,16.611-18.338C99.521,61.764,99.456,51.249,96.76,41.603z"/>
		                    <path d="M14.088,9.206c-1.009,0-2.02,0.086-3.003,0.26c-0.557,0.096-1.046,0.426-1.347,0.902c-0.301,0.479-0.386,1.061-0.234,1.605l2.592,9.268c0.25,0.895,1.097,1.5,2.01,1.459l0.204-0.004c4.668,0,13.2,6.996,17.549,22.545c0.173,0.621,0.336,1.252,0.492,1.906c-4.884-2.416-10.706-2.975-15.98-1.506C4.475,48.97-2.497,61.356,0.831,73.252c2.696,9.639,11.563,16.373,21.563,16.373c2.037,0,4.071-0.281,6.047-0.834c7.845-2.193,13.744-8.707,16.611-18.338c2.586-8.689,2.522-19.205-0.175-28.852C39.625,22.831,26.678,9.206,14.088,9.206z"/>
	                    </g>
                    </g>
                  </svg>`
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
  const icon = "udir-info__";
  if (iconType === icon + "verktoy" || iconType === icon + "tools") {
    return IconPaths['devices'];
  } else if (iconType === icon + "tid" || iconType === icon + "time") {
    return IconPaths['alarm'];
  } else if (iconType === icon + "maal" || iconType === icon + "goals") {
    return IconPaths['flag'];
  }else if (iconType === icon + "tip") {
    return IconPaths['light_bulb'];
  } else if (iconType === icon + "task" || iconType === icon + "read" || iconType === icon + "question") {
    return IconPaths["article"];
  } else if (iconType === icon + "quote") {
    return IconPaths["quote"];
  } else if (iconType === icon + "skoleleder" || iconType === icon + "leader") {
    return IconPaths["face"];
  } else if (iconType === icon + 'link') {
    return IconPaths["link"]
  } else if (
    iconType === icon + "info" ||
    iconType === icon + "important" ||
    iconType === icon + "importantinfo"
  ) {
    return IconPaths["star"];
  } else if (iconType === icon + "warning") {
    return IconPaths["cancel"];
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
