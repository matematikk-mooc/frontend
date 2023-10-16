import '../../vue/design/re-styles/tabs.scss';
export default (function () {

    var strSetNum = 0;
    function transformTabs(){
        onElementRendered('#content .user_content.enhanced,#content .show-content.enhanced',
        function($content) {
        // Store references to the active tab and pane
        var activeTab = null;
        var activePane = null;

        var tables = document.getElementsByTagName('table');

        for (var i = 0; i < 10; i++) {
          var table = null;
          for (var j = 0; j < tables.length; j++) {
            let cell = tables[j].querySelectorAll('tbody > tr > td')[0];
            let celltext = cell.textContent.trim();
            if (celltext.includes("[uob-tabs]")) {
              table = tables[j];
            }
          }

          if (!table) {
            break;
          }

          var customSegments = document.createElement('div');
          customSegments.className = 'custom-segments';
          customSegments.setAttribute('id', 'custom-segments' + i);
          var ul = document.createElement('ul');
          ul.className = 'custom-segments__segments';
          customSegments.appendChild(ul);
          strSetNum++;

          var tds = table.querySelectorAll('td');
          for (var k = 1; k < tds.length; k++) {
            var strAnchor = 'set' + strSetNum + 'tab' + Math.floor(k / 2);

            if (k % 2 === 0) {
              var li = document.createElement('li');
              li.className = 'custom-segments__segment';
              var a = document.createElement('a');
              a.href = '#' + strAnchor;
              a.innerHTML = tds[k].textContent;

              // Add a click event listener to the tab
              li.addEventListener('click', function (event) {
                event.preventDefault();

                var iframes = document.getElementsByTagName('iframe');
                var ready = {
                  context: 'h5p',
                  action: 'ready'
                };
                var resize = {
                  context: 'h5p',
                  action: 'resize'
                };

                for (var i = 0; i < iframes.length; i++) {
                  if (iframes[i].src.indexOf('h5p') !== -1) {
                    iframes[i].contentWindow.postMessage(ready, '*');
                    iframes[i].contentWindow.postMessage(resize, '*');
                  };
                }

                // Deactivate the previously active tab and pane
                if (activeTab) {
                  activeTab.classList.remove('active');
                }
                if (activePane) {
                  activePane.classList.remove('active');
                }


                // Activate the current tab and pane
                activeTab = this;
                activePane = document.getElementById(this.firstChild.getAttribute('href').substring(1));
                activeTab.classList.add('active');
                activePane.classList.add('active');
              });

              li.appendChild(a);
              ul.appendChild(li);
            }

            if (k % 2 === 1) {
              var pane = document.createElement('div');
              pane.className = 'custom-segments__pane';
              pane.setAttribute('id', strAnchor);
              let child = tds[k].innerHTML;
              pane.innerHTML = child;
              customSegments.appendChild(pane);

              // Initially, activate the first tab and pane
              if (Math.floor(k / 2) == 1) {
                pane.classList.add('active');
                li.classList.add('active');
                activeTab = li
                activePane = pane;

              }
            }
          }

          table.parentNode.insertBefore(customSegments, table);
          table.remove();


        }});
    }
    function onElementRendered(selector, cb, _attempts) {
        var el = $(selector);
        _attempts = ++_attempts || 1;
        if (el.length) return cb(el);
        if (_attempts >= 60) return;

        setTimeout(function() {
          onElementRendered(selector, cb, _attempts);
        }, 200);
      }

      function onPage(regex, fn) {
        if (location.pathname.match(regex)) fn();
      }
    return {
        init: function() {
          // -----------------------------------------------------------------------------------
          // Add UoB enhancements to rich content displayed in courses.
          // -----------------------------------------------------------------------------------
          onPage(/\/(courses|groups)\/\d+/, function() {
            transformTabs();
          });
        }
      };


})();