this.mmooc=this.mmooc||{};


this.mmooc.routes = function() {
    function Route(path, queryString, handler) {
        this.path = path;
        this.queryString = queryString;
        this.handler = handler;
    }

    var routes = [];

    return {
        addRouteForPath: function(path, handler) {
            routes.push(new Route(path, null, handler));
        },
        addRouteForQueryString: function(queryString, handler) {
            routes.push(new Route(null, queryString, handler));
        },

        performHandlerForUrl: function(location) {

            try {
                var path = location.pathname;
                var queryString = location.search;

                for (var i = 0; i < routes.length; i++) {
                    var route = routes[i];
                    if (route.path != null) {
                        if (route.path.test(path)) {
                            route.handler();
                            return;
                        }
                    } else if (route.queryString != null) {
                        if (route.queryString.test(queryString)) {
                            route.handler();
                            return;
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
}();

if (typeof module !== "undefined" && module !== null) {
    module.exports = this.mmooc.routes;
}
