
var routes = (function() {
  class Route {
    constructor(paths, queryStrings, handler) {
      if (paths != null) {
        this.paths = paths instanceof Array ? paths : [paths];
      } else {
        this.paths = null;
      }

      if (queryStrings != null) {
        this.queryStrings =
          queryStrings instanceof Array ? queryStrings : [queryStrings];
      } else {
        this.queryStrings = null;
      }

      this.handler = handler;
      this.isAlreadyHandled = false;
    }
  }

  var routes = [];

  return {
    addRouteForPath: function(path, handler) {
      routes.push(new Route(path, null, handler));
    },
    addRouteForQueryString: function(queryString, handler) {
      routes.push(new Route(null, queryString, handler));
    },

    addRouteForPathOrQueryString: function(path, queryString, handler) {
      routes.push(new Route(path, queryString, handler));
    },

    performHandlerForUrl: function(location) {
      var path = location.pathname;
      var queryString = location.search;

      for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        if (route.paths != null) {
          for (var j = 0; j < route.paths.length; j++) {
            if (route.paths[j].test(path) && !route.isAlreadyHandled) {
              //20180911ETH Need to know if there is a query string to decide how to handle a discussion.
              route.hasQueryString = queryString.length;
              route.path = path;
              route.isAlreadyHandled = true;
              route.handler();
            }
          }
        }

        if (route.queryStrings != null) {
          for (var k = 0; k < route.queryStrings.length; k++) {
            if (
              route.queryStrings[k].test(queryString) &&
              !route.isAlreadyHandled
            ) {
              route.isAlreadyHandled = true;
              console.log('Handle query string: ' + route.queryStrings[k]);
              route.handler();
              return;
            }
          }
        }
      }
    }
  };
})();

if (typeof module !== 'undefined' && module !== null) {
  module.exports = routes;
}
