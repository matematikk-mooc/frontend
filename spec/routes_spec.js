var routes = mmooc.routes;

describe('routes', function() {
  var callbacks;

  beforeEach(function() {
    callbacks = {
      routeForPath: function() {},
      routeForQueryString: function() {}
    };

    spyOn(callbacks, 'routeForPath');
    spyOn(callbacks, 'routeForQueryString');
  });

  describe('addRouteForPath', function() {
    it('Is invoked for path', function() {
      var location = {
        pathname: '/courses/1',
        search: null
      };

      routes.addRouteForPath(/\/courses\/\d$/, callbacks.routeForPath);

      routes.performHandlerForUrl(location);
      expect(callbacks.routeForPath).toHaveBeenCalled();
    });
  });

  describe('addRouteForQueryString', function() {
    it('Is invoked for QueryString', function() {
      var location = {
        pathname: '',
        search: '?module_item_id=1'
      };

      routes.addRouteForQueryString(
        /module_item_id=/,
        callbacks.routeForQueryString
      );

      routes.performHandlerForUrl(location);
      expect(callbacks.routeForQueryString).toHaveBeenCalled();
    });
  });
});
