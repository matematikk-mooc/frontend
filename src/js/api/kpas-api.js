
/**
 * Utility function to make API calls with callback support.
 * @return {Object} An object with utility functions.
 */
export default (function() {


  return {
    _ajax: typeof $ !== 'undefined' ? $ : {},
    _env: typeof ENV !== 'undefined' ? ENV : {},
    _location: KPASAPIURL,
    _defaultError(event, jqxhr, settings, thrownError) {
      console.log(event, jqxhr, settings, thrownError);
    },


    _get(options) {


      const uri = this._location + options.uri;
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
    },
    getSettingsCurrentCourse: function(courseId, callback, error) {
      this._get({
        callback: function(settings) {
          callback(settings.result);
        },
        error: error,
        uri: '/course/' + courseId + '/settings',
        params: {}
      });
    },
    getHighlightedCourse: function(callback, error) {
      this._get({
        callback: function(course) {
          callback(course);
        },
        error: error,
        uri: '/settings/highlighted',
        params: {}
      });
    },
    getCoursesForFrontpage: function(callback, error) {
     this._get({
        callback: function(course) {
          callback(course);
        },
        error: error,
        uri: '/bff/frontpage/courses',
        params: {}
      });
    }
}
})();


/**
 * Utility function to make API calls with promise-based result.
 * @return {Object} An object with utility functions.
 */
export const apiWithResultOnly = (function() {
  return {
    _ajax: typeof $ !== 'undefined' ? $ : {},
    _env: typeof ENV !== 'undefined' ? ENV : {},
    _location: KPASAPIURL,
    _defaultError(event, jqxhr, settings, thrownError) {
      console.log(event, jqxhr, settings, thrownError);
    },

    _get(options) {
      const uri = this._location + options.uri;
      const params = options.params || {};
      const customError = options.error;

      return new Promise((resolve, reject) => {
        $.ajax({
          url: uri,
          type: 'GET',
          data: params,
          crossDomain: true,
          success(response) {
            resolve(response);
          },
          error(XMLHttpRequest, textStatus, errorThrown) {
            console.log('Error during GET');
            console.error(XMLHttpRequest);
            if (customError) {
              reject(XMLHttpRequest.responseText);
            } else {
              reject(XMLHttpRequest);
            }
          }
        });
      });
    },

    getAllCourseSettings() {
      return this._get({
        uri: '/courses/settings',
        params: {}
      });
    },

    getAllFilters() {
      return this._get({
        uri: '/filters',
        params: {}
      });
    },

    getSettingsCurrentCourse(courseId) {
      return this._get({
        uri: '/course/' + courseId + '/settings',
        params: {}
      });
    }
  };
})();
