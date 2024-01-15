import '../../vue/design/re-styles/tabs.scss';
export default (function () {

  var strSetNum = 0;
  function transformTabs(){
    onElementRendered('#content .user_content.enhanced,#content .show-content.enhanced',
    function() {
      var tables = document.querySelectorAll('table');
      //References to the active tabs and panes
      var activeTab = new Map();
      var activePane = new Map();

      for (var i = 0; i < tables.length; i++) {
        var customtabs = []
        let tbody = tables[i].querySelector('tbody')
        if (tbody) {
          let cells = tbody.querySelectorAll('tr td')
          let celltext = cells[0].textContent.trim();
          var table = null;
          if (celltext.includes("[uob-tabs]") || celltext.includes("[udir-tabs]")) {
            table = tables[i];


            var customSegments = document.createElement('div');
            customSegments.className = 'custom-segments';
            customSegments.setAttribute('id', 'custom-segments' + i);
            var ul = document.createElement('ul');
            var div = document.createElement('div');
            div.className = 'custom-segments__tabHeaders';
            ul.className = 'custom-segments__segments';
            div.appendChild(ul);
            customSegments.appendChild(div);
            strSetNum++;

            table.parentElement.insertBefore(customSegments, table);
            table.remove();


            const tds = Array.from(table.querySelectorAll('tbody > tr > td'));
            const tbody = Array.from(table.getElementsByTagName('tbody'))[0];

            for (var k = 2; k < tds.length; k++) {
              var strAnchor = 'set' + strSetNum + 'tab' + Math.floor(k / 2);
              if (tds[k].parentNode.parentNode == tbody) {
                if (k % 2 === 0) {
                  var li = document.createElement('li');
                  li.className = 'custom-segments__segment';
                  li.set = strSetNum
                  customtabs.push(li);
                  var a = document.createElement('a');
                  a.href = '#' + strAnchor;
                  a.innerHTML = tds[k].textContent;

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
                    activeTab.set(li.set, li);
                    activePane.set(li.set, pane);
                  }
                }
              }
            }
          }
        }


        for (var l = 0; l < customtabs.length; l++) {
          customtabs[l].addEventListener('click', function (event) {
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

            for (var p = 0; p < iframes.length; p++) {
              if (iframes[p].src.indexOf('h5p') !== -1) {
                iframes[p].contentWindow.postMessage(ready, '*');
                iframes[p].contentWindow.postMessage(resize, '*');
              };
            }
            // Deactivate the previously active tab and pane
            if (activeTab.get(this.set)) {
              activeTab.get(this.set).classList.remove('active');
            }
            if (activePane.get(this.set)) {
              activePane.get(this.set).classList.remove('active');
            }

            // Activate the current tab and pane
            activeTab.set(this.set, this);
            activePane.set(this.set, document.getElementById(this.firstChild.getAttribute('href').substring(1)));
            activeTab.get(this.set).classList.add('active');
            activePane.get(this.set).classList.add('active');
          });
        }
      }

    });

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
      // Add UoB enhancements to rich content displayed in courses.
      onPage(/\/(courses|groups)\/\d+/, function() {
        transformTabs();
      });
    }
  };


})();
