

export default (function() {


  return {
    _ajax: typeof $ !== 'undefined' ? $ : {},
    _env: typeof ENV !== 'undefined' ? ENV : {},
    _location: 'https://udir-kpas-api.eu.ngrok.io',
    _uriPrefix: '/api/courses/settings',
    _defaultError(event, jqxhr, settings, thrownError) {
      console.log(event, jqxhr, settings, thrownError);
    },


    _get(options) {


      const uri = this._location + this._uriPrefix;
      const params = options.params || {};
      const callback = options.callback;
      const customError = options.error;

      $.ajax({
        url: uri,
        type: 'GET',
        data: params,
        crossDomain: true,
        success(response) {
            console.log(response)
            // response.__setitem__("Content-type", "application/json")
            // response.__setitem__("Access-Control-Allow-Origin", "*")
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
            // var filteredCourses = courses.filter(
            //   util.filterSearchAllCourse
            // );
            callback(courses);
          },
          error: error,
          // if not authenticated, it displays only courses with Open Enrollment enabled
          uri: '/courses/settings',
          params: {}
        });
      },
}
})();