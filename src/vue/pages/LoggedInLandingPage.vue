
<template>
    <div class="landing-page">
      <div id="main" class="landing-page--content">
        <h1>Alle tilgjengelige kompetansepakker</h1>
        <div class="landing-page--layout">
          <CardFilter @update:selectedFilters="onSelectedFiltersUpdate" :filterData="filterData"></CardFilter>
          <CardList v-if="coursesToView.length > 0" :authorized="true" :courses="coursesToView" :newCoursesIndicator=true></CardList>
          <div class="no-courses-to-show" v-else>
            <h2>Vi fant ingen treff for filtrene du har valgt. Du kan fjerne alle filtrene med "Tilbakestill filter".</h2>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import CardList from '../components/CardList.vue'
  import CardFilter from '../components/CardFilter.vue'
  import {ref} from 'vue'
  import { filterCourses } from '../utils/filter-courses.js'
  import MobileWarning from '../components/information-banner/MobileWarning.vue'

  const { courses, filterData, mobiletablet } = defineProps(['courses', 'filterData', 'mobiletablet']);
  const coursesToView = ref([...courses]);

  const onSelectedFiltersUpdate = (updatedFilters) => {
    if(updatedFilters.length == 0){
      coursesToView.value = [...courses]
      return
    }
    coursesToView.value = filterCourses(courses, updatedFilters)
  }
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
