

export default (function() {


  return {
    _ajax: typeof $ !== 'undefined' ? $ : {},
    _env: typeof ENV !== 'undefined' ? ENV : {},
    _location: 'https://udir-kpas-api.eu.ngrok.io',
    _uriPrefix: '/api',
    _defaultError(event, jqxhr, settings, thrownError) {
      console.log(event, jqxhr, settings, thrownError);
    },


    _get(options) {


      const uri = this._location + this._uriPrefix + options.uri;
      console.log(uri)
      const params = options.params || {};
      const callback = options.callback;
      const customError = options.error;

      $.ajax({
        url: uri,
        type: 'GET',
        data: params,
        crossDomain: true,
        success(response) {
          callback(response);
        },
        error(XMLHttpRequest, textStatus, errorThrown) {

          console.log('Error during GET');
            console.error(XMLHttpRequest);
          if(customError) {
            customError(XMLHttpRequest.responseText);
          }
        }
      });
    },

    getAllCourseSettings: function(callback, error) {
        this._get({
          callback: function(courses) {
            callback(courses);
          },
          error: error,
          uri: '/courses/settings',
          params: {}
        });
      },

    getAllFilters: function(callback, error) {
        this._get({
          callback: function(filters) {
            callback(filters);
          },
          error: error,
          uri: '/filters',
          params: {}
        });
    }
}
})();
