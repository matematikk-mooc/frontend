
<template>
    <div class="landing-page">
      <div id="main" class="landing-page--content">
        <h1>Alle tilgjengelige kompetansepakker</h1>

        <div class="security-banner">
            <p class="security-banner__title"><b>Sikkerhetshendelse i Canvas</b></p>

            <p class="security-banner__description">Det har vært en sikkerhetshendelse hos vår leverandør av Canvas, Instructure. Situasjonen er under avklaring i dialog med Instructure og Sikt, og oppdatering vil bli gitt ved ny informasjon. Vi ber om at alle utviser økt årvåkenhet for <a href="https://en.wikipedia.org/wiki/Phishing" target="_blank" rel="noopener noreferrer">phishing</a>.</p>

            <p class="security-banner__link">Du kan lese mer om hendelsen på statussiden til Canvas: <a target="_blank" href="https://status.instructure.com/" rel="noopener noreferrer">status.instructure.com</a></p>
        </div>

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
  .security-banner {
    background: #ef9a9a;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 10px 20px;
  }

  .security-banner a {
    color: black;
    text-decoration: underline;
  }

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
    .modal-box__header {
      h2 {
        font-size: 1.5rem;
      }
    }
    h2 {
      font-size: 1.5rem;
      margin: 0.7rem 0;
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
