import { createStore } from 'vuex';
import api from "../../../js/api/api";
import kpasApi from '../../../js/api/kpas-api';
import util from "../../../js/modules/util";
import { isLocalStorageAvailable, setLocalStorage, deepCompare } from '../store-helper';


const store =  createStore({
  state: {
    myCourses: isLocalStorageAvailable() ?
    JSON.parse(localStorage.getItem('mycourses')) : [],
    myCoursesReady: false
  },
  mutations: {
    SET_MY_COURSES (state, mycourses) {
      state.myCourses = [...mycourses];
      setLocalStorage('mycourses', state.myCourses)
    },
    SET_MY_COURSES_READY (state, contentInStore) {
      state.myCoursesReady = contentInStore
    },
  },
  actions: {
    async fetchMyCourses({ dispatch, commit }) {
      try {
        if (localStorage.getItem('mycourses') === null) {
          api.getEnrolledCourses((courses) => {
            kpasApi.getAllCourseSettings(function (allCoursesSettings) {
              var myCoursesWithSettings = util.mapCourseSettings(courses, allCoursesSettings.result)
              myCoursesWithSettings.forEach(course => {
                course.enrolled = true;
              });
              commit('SET_MY_COURSES', myCoursesWithSettings)
              commit('SET_MY_COURSES_READY', true)
            })
          });
        } else {
          commit('SET_MY_COURSES_READY', true)
          dispatch('fetchMyCoursesBackgroud')
        }
      } catch (error) {
        console.error("Error fetching course modules", error)
      }
    },
    async fetchMyCoursesBackgroud({ state, commit }) {
      try {
          api.getEnrolledCourses((courses) => {
            kpasApi.getAllCourseSettings(function (allCoursesSettings) {
              var myCoursesWithSettings = util.mapCourseSettings(courses, allCoursesSettings.result)
              myCoursesWithSettings.forEach(course => {
                course.enrolled = true;
              });

              const storeMyCourses = JSON.parse(JSON.stringify(state.myCourses))
              const responseMyCourses = JSON.parse(JSON.stringify(myCoursesWithSettings))

              if(!(deepCompare(storeMyCourses, responseMyCourses))){
                commit('SET_MY_COURSES', myCoursesWithSettings)
                commit('SET_MY_COURSES_READY', true)
              }
            })
          });
      } catch (error) {
        console.error('Error fetching mycourses', error)
      }
    }
  },
  getters: {
    myCourses(state) {
      return state.myCourses
    },
    myCoursesReady(state) {
      return state.myCoursesReady
    }
  }
});





















// const store = createStore({
  // state: {
    // courseList: isSessionStorageAvailable() ?
    // JSON.parse(sessionStorage.getItem('courseList')) || [] : [],
    // coursesInStore: false,
  // },
  // mutations: {
    // SET_COURSE_MODULES (state, fetchedCourseModules) {
      // state.courseModules = [...fetchedCourseModules];
      // setSessionStorage(api.getCurrentCourseId(), state.courseModules)
    // },
    // SET_COURSE_LIST_IN_STORE (state, contentInStore) {
      // state.coursesInStore = contentInStore
    // },
  // },
  // actions: {
    // async fetchCourseList({ dispatch, commit }) {
      // try {
        // if (sessionStorage.getItem('courseList') === null) {
          // const response = await api.getEnrolledCourses()
          // commit('SET_COURSE_MODULES', response);
          // commit('SET_COURSE_LIST_IN_STORE', true);
        // } else {
          // commit('SET_COURSE_LIST_IN_STORE', true);
          // dispatch('fetcCourseListInBackgroud');
        // }
      // } catch (error) {
        // console.error('Error fetching course modules:', error);
      // }
    // },
    // async fetcCourseListInBackgroud({ state, commit }) {
      // try {
        // const response = await fetchModulesForCourse();
        // const storeCourseModules = JSON.parse(JSON.stringify(state.courseModules));
        // const responseCourseModules = JSON.parse(JSON.stringify(response));

        // if (!(deepCompare(storeCourseModules, responseCourseModules))) {
          // commit('SET_COURSE_MODULES', response);
          // commit('SET_COURSE_LIST_IN_STORE', true);
        // }
      // } catch (error) {
        // console.error('Error fetching course modules:', error);
      // }
    // },
  // },
  // getters: {
    // courseList(state) {
      // return state.courseList
    // },
    // coursesInStore(state) {
      // return state.coursesInStore
    // }
  // }
// });


export default store;
