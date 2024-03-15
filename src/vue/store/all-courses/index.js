import { createStore } from 'vuex';
import api from "../../../js/api/api";
import kpasApi from '../../../js/api/kpas-api';
import util from "../../../js/modules/util";
import { filterCourses } from '../../utils/filter-courses.js'
import { isLocalStorageAvailable, setLocalStorage, deepCompare, setCourseEnrolledStatus } from '../store-helper';



const store =  createStore({
  state: {
    // All courses do not change
    allCourses: isLocalStorageAvailable() ?
    JSON.parse(localStorage.getItem('allCourses')) : [],

    // All courses has been trough current filter
    viewCourses: isLocalStorageAvailable() ?
    JSON.parse(localStorage.getItem('viewCourses')) : [],

    // All filters do not change
    filterList: isLocalStorageAvailable() ?
    JSON.parse(localStorage.getItem('allFilters')) || []: [],

    viewList: isLocalStorageAvailable() ?
    JSON.parse(localStorage.getItem('viewFilters')) || []: [],

    highlightedCourse: isLocalStorageAvailable() ?
    JSON.parse(localStorage.getItem('highlightedcourse')) : {},

    mobile: isLocalStorageAvailable() ?
    JSON.parse(localStorage.getItem('mobile')) : false,

    allCoursesReady: false,
  },
  mutations: {
    SET_ALL_COURSES (state, allcourses) {
      console.log("SET_ALL_COURSES", allcourses)
      console.log(typeof(allcourses))
      state.allCourses = [...allcourses];
      setLocalStorage('allCourses', state.allCourses)
    },
    // SET_VIEW_COURSES (state, updatedFilters) {
    SET_VIEW_COURSES (state) {
      console.log("SET_VIEW_COURSES")
      // console.log("SET_VIEW_COURSES", updatedFilters)
      // console.log(typeof(updatedFilters))
      if (state.viewList.length === 0) {
        state.viewCourses = state.allCourses
      } else {
        state.viewCourses = filterCourses(state.allCourses, state.viewList)
      }
      setLocalStorage('viewCourses', state.viewCourses)
    },
    SET_FILTER_DATA (state, filterdata) {
      console.log("SET_FILTER_DATA", filterdata)
      console.log(typeof(filterdata))
      state.filterList = [...filterdata]
      state.viewList = [...filterdata]
      setLocalStorage('allFilters', state.filterList)
      setLocalStorage('viewFilters', state.viewList)
    },
    SET_UPDATE_FILTER_DATA (state, filterdata) {
      console.log("SET_UPDATE_FILTER_DATA", filterdata)
      console.log(typeof(filterdata))
      state.viewList = [...filterdata]
      setLocalStorage('viewFilters', state.viewList)
    },
    SET_HIGHTLIGTED_COURSE (state, highlightedcourse) {
      console.log("SET_HIGHTLIGTED_COURSE", highlightedcourse)
      console.log(typeof(highlightedcourse))
      state.highlightedCourse = highlightedcourse
      setLocalStorage('highlightedcourse', state.highlightedCourse)
    },
    SET_MOBILE_TABLET (state, mobiletablet) {
      console.log("SET_MOBILE_TABLET", mobiletablet)
      console.log(typeof(mobiletablet))
      state.mobile = mobiletablet
      setLocalStorage('mobile', state.mobile)
    },
    SET_ALL_COURSES_READY (state, contentInStore) {
      console.log("SET_ALL_COURSES_READY", contentInStore)
      console.log(typeof(contentInStore))
      state.allCoursesReady = contentInStore
    },
    SET_VIEWFILTER_TO_ALLFILTER (state) {
      console.log("SET_VIEWFILTER_TO_ALLFILTER")
      state.viewList = state.filterList
      setLocalStorage('viewFilters', state.filterList)
    },
  },
  actions: {

    // async fetchallcourses({ dispatch, commit }) {
    async fetchallcourses({ commit }) {
      console.log("fetchallcourses");
      try {
        console.log("fetchallcourses try");
        if (localStorage.getItem('allCourses') === null) {
          console.log("fetchallcourses if");

          api.getAllPublicCourses(function (allCourses) {
            api.getEnrolledCourses(function (enrolledCourses) {
              var allCoursesWithStatus = setCourseEnrolledStatus(
                allCourses,
                enrolledCourses
              );
              kpasApi.getAllCourseSettings(function (allCoursesSettings) {
                kpasApi.getAllFilters(function (allFilters) {
                  kpasApi.getHighlightedCourse( function (highlightedCourse) {
                    var highlightedCourseId = highlightedCourse.result.course_id
                    var allFiltersList = allFilters.result;
                    var allCoursesWithSettings = util.mapCourseSettings(allCoursesWithStatus, allCoursesSettings.result);
                    //Reverse list to show newest courses first
                    allCoursesWithSettings = allCoursesWithSettings.reverse();
                    var highlightedCourse = allCoursesWithSettings.find(course => course.id == highlightedCourseId);
                    if(highlightedCourse == null || highlightedCourse == undefined) {
                      highlightedCourse = allCoursesWithSettings[0];
                    }
                    var mobiletablet = util.isMobileOrTablet();

                    commit('SET_ALL_COURSES', allCoursesWithSettings)
                    commit('SET_FILTER_DATA', allFiltersList)
                    // commit('SET_FILTER_DATA', [])
                    commit('SET_HIGHTLIGTED_COURSE', highlightedCourse)
                    commit('SET_MOBILE_TABLET', mobiletablet)
                    commit('SET_VIEW_COURSES')
                    commit('SET_ALL_COURSES_READY', true)
                  })
                })
              })
            })
          })
        } else {
          console.log("fetchallcourses else")
          commit('SET_VIEW_COURSES')
          commit('SET_ALL_COURSES_READY', true)
          // dispatch('fetchallcoursesBackgroud')
        }
      } catch (error) {
        console.error("Error fetching course modules", error)
      }
    },
    async updateFilter({ commit }, updatedfilter) {
      console.log("updatefiter inside store")
      // commit('SET_FILTER_DATA', updatedfilter)
      commit('SET_UPDATE_FILTER_DATA', updatedfilter)
      commit('SET_VIEW_COURSES')
    },
    async resetViewFilters({ commit } ) {
      console.log("resetViewFilters inside store")
      commit('SET_VIEWFILTER_TO_ALLFILTER')
      commit('SET_VIEW_COURSES')
    },

    // async fetchallcourses({ dispatch, commit }) {
      // try {
        // if (localStorage.getItem('allcourses') === null) {
          // api.getEnrolledCourses((courses) => {
            // kpasApi.getAllCourseSettings(function (allCoursesSettings) {
              // var allCoursesWithSettings = util.mapCourseSettings(courses, allCoursesSettings.result)
              // allCoursesWithSettings.forEach(course => {
                // course.enrolled = true;
              // });
              // commit('SET_ALL_COURSES', allCoursesWithSettings)
              // commit('SET_ALL_COURSES_READY', true)
            // })
          // });
        // } else {
          // commit('SET_ALL_COURSES_READY', true)
          // dispatch('fetchallcoursesBackgroud')
        // }
      // } catch (error) {
        // console.error("Error fetching course modules", error)
      // }
    // },

    // async fetchallcoursesBackgroud({ state, commit }) {
      // try {
          // api.getEnrolledCourses((courses) => {
            // kpasApi.getAllCourseSettings(function (allCoursesSettings) {
              // var allCoursesWithSettings = util.mapCourseSettings(courses, allCoursesSettings.result)
              // allCoursesWithSettings.forEach(course => {
                // course.enrolled = true;
              // });

              // const storeallcourses = JSON.parse(JSON.stringify(state.allCourses))
              // const responseallcourses = JSON.parse(JSON.stringify(allCoursesWithSettings))

              // if(!(deepCompare(storeallcourses, responseallcourses))){
                // commit('SET_ALL_COURSES', allCoursesWithSettings)
                // commit('SET_ALL_COURSES_READY', true)
              // }
            // })
          // });
      // } catch (error) {
        // console.error('Error fetching allcourses', error)
      // }
    // }
  },
  getters: {
    allCourses(state) {
      return state.allCourses
    },
    viewCourses(state) {
      console.log("viewCourses from store")
      return state.viewCourses
    },
    filterList(state) {
      console.log("viewFilterList in store")
      console.log(state.viewList)
      console.log(state.viewList.value)
      return state.viewList
    },
    filterListWithArray(state) {
      var data = [
        {
          name: 'Målgruppe',
          /* filter: filterData.filter(item => item.type == 'TARGET').map(item => item) */
          // filter: state.viewList.filter(item => item.type == 'TARGET').map(item => item)
          filter: state.filterList.filter(item => item.type == 'TARGET').map(item => item)

        },
        {
          name: 'Kategori',
          /* filter: filterData.filter(item => item.type == 'CATEGORY').map(item => item) */
          // filter: state.viewList.filter(item => item.type == 'CATEGORY').map(item => item)
          filter: state.filterList.filter(item => item.type == 'CATEGORY').map(item => item)
        }
      ]
      console.log("filterListWithArray")
      console.log(data)
      return data
      // console.log("viewFilterList in store")
      // console.log(state.viewList)
      // console.log(state.viewList.value)
      // return state.viewList
    },
    highlightedCourse(state) {
      return state.highlightedCourse
    },
    mobile(state) {
      return state.mobile
    },
    allCoursesReady(state) {
      return state.allCoursesReady
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
