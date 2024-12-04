// https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js
export default (function () {
  return {
    init: function () {
      (function () {
        if (
          !window.postMessage ||
          !window.addEventListener ||
          window.h5pResizerInitialized
        ) {
          return;
        }
        window.h5pResizerInitialized = true;
        var actionHandlers = {};
        actionHandlers.hello = function (iframe, data, respond) {
          iframe.style.width = '100%';
          iframe.getBoundingClientRect();
          var resize = function () {
            if (iframe.contentWindow) {
              respond('resize');
            } else {
              window.removeEventListener('resize', resize);
            }
          };
          window.addEventListener('resize', resize, false);
          respond('hello');
        };
        actionHandlers.prepareResize = function (iframe, data, respond) {
          if (
            iframe.clientHeight !== data.scrollHeight ||
            data.scrollHeight !== data.clientHeight
          ) {
            iframe.style.height = data.clientHeight + 'px';
            respond('resizePrepared');
          }
        };
        actionHandlers.resize = function (iframe, data) {
          iframe.style.height = data.scrollHeight + 'px';
        };
        var escape = function (event) {
          if (event.keyCode === 27) {
            exitFullScreen();
          }
        };
        window.addEventListener(
          'message',
          function receiveMessage(event) {
            if (event.data.context !== 'h5p') {
              return;
            }
            var iframe,
              iframes = document.getElementsByTagName('iframe');
            for (var i = 0; i < iframes.length; i++) {
              if (iframes[i].contentWindow === event.source) {
                iframe = iframes[i];
                break;
              }
            }
            if (!iframe) {
              return;
            }
            if (actionHandlers[event.data.action]) {
              actionHandlers[event.data.action](
                iframe,
                event.data,
                function respond(action, data) {
                  if (data === undefined) {
                    data = {};
                  }
                  data.action = action;
                  data.context = 'h5p';
                  event.source.postMessage(data, event.origin);
                },
              );
            }
          },
          false,
        );
        var iframes = document.getElementsByTagName('iframe');
        var ready = { context: 'h5p', action: 'ready' };
        for (var i = 0; i < iframes.length; i++) {
          if (iframes[i].src.indexOf('h5p') !== -1) {
            iframes[i].contentWindow.postMessage(ready, '*');
          }
        }
      })();
    },
  };
})();
