import { createStore } from 'vuex';
import api from "../../js/api/api";
import { fetchModulesForCourse } from '../../js/modules/module-selector/index';
import { isSessionStorageAvailable, setSessionStorage, calculateModuleProgression,
         deepCompare, findAllAndUpdateByProperty, findAndUpdateByProperty,
         updatePropertiesRecursively } from './store-helper'


const store = createStore({
  state: {
    courseModules: isSessionStorageAvailable() ?
    JSON.parse(sessionStorage.getItem(api.getCurrentCourseId())) || [] : [],
    courseModulesInStore: false,
    completionProgression: [],
    pages: []
  },
  mutations: {
    SET_COURSE_MODULES (state, fetchedCourseModules) {
      state.courseModules = [...fetchedCourseModules];
      setSessionStorage(api.getCurrentCourseId(), state.courseModules)
    },
    SET_COURSE_COMPLETION_PROGRESSION(state) {
      state.completionProgression = [...calculateModuleProgression(state.courseModules)]
    },
    SET_LIST_ALL_PAGES(state) {
      state.completionProgression.forEach(module => state.pages.push(...module.pages));
    },
    SET_COURSE_MODULES_IN_STORE (state, contentInStore) {
      state.courseModulesInStore = contentInStore
    },
    SET_PAGE_COMPLETION(state, completed) {
      const pageId = api.getCurrentModuleItemId()
      findAndUpdateByProperty(state.courseModules, 'id', pageId, 'isCompleted', completed)
      setSessionStorage(api.getCurrentCourseId(), state.courseModules)
    },
    SET_ACTIVE_MODULE_AND_PAGE(state, url) {
      findAllAndUpdateByProperty(state.courseModules, 'isActive', true, false)
      updatePropertiesRecursively(state.courseModules, 'url', url, 'isActive', true)
      setSessionStorage(api.getCurrentCourseId(), state.courseModules)
    }
  },
  actions: {
    async fetchCourseModules({ dispatch, commit }) {
      try {
        if (sessionStorage.getItem(api.getCurrentCourseId()) === null) {
          const response = await fetchModulesForCourse();
          commit('SET_COURSE_MODULES', response);
          commit('SET_COURSE_COMPLETION_PROGRESSION');
          commit('SET_LIST_ALL_PAGES');
          commit('SET_COURSE_MODULES_IN_STORE', true);
        } else {
          commit('SET_COURSE_COMPLETION_PROGRESSION');
          commit('SET_LIST_ALL_PAGES');
          commit('SET_COURSE_MODULES_IN_STORE', true);
          dispatch('fetchCourseModulesBackGround');
        }
      } catch (error) {
        console.error('Error fetching course modules:', error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
    },
    async fetchCourseModulesBackGround({ state, commit }) {
      try {
        const response = await fetchModulesForCourse();
        const storeCourseModules = JSON.parse(JSON.stringify(state.courseModules));
        const responseCourseModules = JSON.parse(JSON.stringify(response));

        if (!(deepCompare(storeCourseModules, responseCourseModules))) {
          commit('SET_COURSE_MODULES', response);
          commit('SET_COURSE_COMPLETION_PROGRESSION');
          commit('SET_LIST_ALL_PAGES');
          commit('SET_COURSE_MODULES_IN_STORE', true);
        }
      } catch (error) {
        console.error('Error fetching course modules:', error);
      }
    },
    setActivePageAndModule( { commit }, url) {
      commit('SET_ACTIVE_MODULE_AND_PAGE', url)
    },
    setPageCompletion ( { commit }, completed ) {
      commit('SET_PAGE_COMPLETION', completed)
      commit('SET_COURSE_COMPLETION_PROGRESSION')
    }
  },
  getters: {
    courseModules(state) {
      return state.courseModules
    },
    courseModulesInStore(state) {
      return state.courseModulesInStore
    },
    completionProgression(state) {
      return state.completionProgression
    },
    pages(state) {
      return state.pages
    }
  }
});


export default store;
