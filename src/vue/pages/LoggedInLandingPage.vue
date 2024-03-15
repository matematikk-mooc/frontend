
<template>
    <div class="landing-page">
      <div id="main" class="landing-page--content">
        <!--MobileWarning v-if="mobiletablet"></MobileWarning-->
        <MobileWarning v-if="mobile"></MobileWarning>
        <h1>Alle tilgjengelige kompetansepakker</h1>
        <div class="landing-page--layout">
          <!--CardFilter @update:selectedFilters="onSelectedFiltersUpdate" :filterData="filterData"></CardFilter-->

          <!--CardFilter v-if="allCoursesReady" @update:selectedFilters="onSelectedFiltersUpdate" :filterData="filterList"></CardFilter-->
          <CardFilter v-if="allCoursesReady"></CardFilter>


          <!--CardList v-if="coursesToView.length > 0" :authorized="true" :courses="coursesToView" :newCoursesIndicator=true></CardList-->
          <!--CardList v-if="allCoursesReady" :authorized="true" :courses="allCourses" :newCoursesIndicator=true></CardList-->
          <CardList v-if="allCoursesReady" :authorized="true" :courses="viewCourses" :newCoursesIndicator=true></CardList>
          <div class="no-courses-to-show" v-if="allCoursesReady && viewCourses.length === 0">
          <!--div class="no-courses-to-show" v-else-->
            <h2>Vi fant ingen treff for filtrene du har valgt. Du kan fjerne alle filtrene med "Tilbakestill filter".</h2>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import CardList from '../components/CardList.vue'
  import CardFilter from '../components/CardFilter.vue'
  import { ref, computed, onMounted } from 'vue'
  /* import { filterCourses } from '../utils/filter-courses.js' */
  import MobileWarning from '../components/information-banner/MobileWarning.vue'

  import { useStore } from 'vuex'

  // Destructure the store
  const store = useStore()

  if(!store) {
    console.error("Vuex store is not initialized.")
    /* return */
  }

  // Getters
  const allCourses = computed(() => store.getters.allCourses)
  const viewCourses = computed(() => store.getters.viewCourses)
  const filterList = computed(() => store.getters.filterList)
  /* const highlightedCourse = computed(() => store.getters.highlightedCourse) */
  const mobile = computed(() => store.getters.mobile)
  const allCoursesReady = computed(() => store.getters.allCoursesReady)

    const fetchAllCourses = async () => {
        await store.dispatch('fetchallcourses');
    }

    //Call the asynchronous function within onMounted
    onMounted(fetchAllCourses)

  const onSelectedFiltersUpdate = (updatedFilters) => {
    console.log("onSelectedFiltersUpdate")
    /* console.log(updatedFilters) */
    /* store.dispatch.updateFilter(updatedFilters) */

    store.dispatch('updateFilter', updatedFilters)

    /* if (updatedFilters.length == 0) { */
      /* coursesToView.value = [...allCourses.value] */
      /* return */
    /* } */
    /* coursesToView.value = filterCourses(allCourses.value, updatedFilters) */
    /* coursesToView.value = filterCourses([...allCourses], updatedFilters) */
  }



  /* const coursesToView = ref([...allCourses.value]); */

  /* const onSelectedFiltersUpdate = (updatedFilters) => { */
    /* console.log("onSelectedFiletersUpdate") */
    /* console.log((updatedFilters)) */
    /* console.log((updatedFilters.lenth)) */
    /* console.log((updatedFilters)) */
    /* console.log("filterlist from store") */
    /* console.log(filterList) */
    /* console.log(filterList.value) */
    /* if (updatedFilters.length == 0) { */
      /* coursesToView.value = [...allCourses.value] */
      /* return */
    /* } */
    /* [> coursesToView.value = filterCourses(allCourses.value, updatedFilters) <] */
    /* coursesToView.value = filterCourses([...allCourses], updatedFilters) */
  /* } */



  /* const { courses, filterData, mobiletablet } = defineProps(['courses', 'filterData', 'mobiletablet']); */
  /* const coursesToView = ref([...courses]); */


  /* const onSelectedFiltersUpdate = (updatedFilters) => { */
    /* if(updatedFilters.length == 0){ */
      /* coursesToView.value = [...courses] */
      /* return */
    /* } */
    /* coursesToView.value = filterCourses(courses, updatedFilters) */
  /* } */
  </script>

  <style lang="scss">
  .landing-page {
    height: 100%;
    width: 100%;
    max-width: 1600px;
    box-sizing: border-box;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 85vh;
  }

  .landing-page--content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1.5rem;
    h2 {
      font-size: 2rem;
      margin: 1.5rem 0 1.5rem 0;
    }
  }
  .landing-page--layout {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    @media screen and (max-width: 800px){
      display: flex;
      flex-direction: column;
    }
  }
  </style>
