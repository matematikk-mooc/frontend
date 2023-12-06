import api from '../api/api'
import {apiWithResultOnly} from '../api/kpas-api';
import{ renderFooter } from '../../vue/pages/course-page/footer'

export default (function () {
  return {
    changeFooter: async function () {
      const id = api.getCurrentCourseId();
      let license = false;
      if (id) {
        try {
          const result = await apiWithResultOnly.getSettingsCurrentCourse(id);
          if (result.result.licence == 1) {
            license = true;
          }
        } catch (error) {
          // Handle errors
          console.error('Error fetching course settings:', error);
        }
      }
      renderFooter(license);
    },
  };
})();
