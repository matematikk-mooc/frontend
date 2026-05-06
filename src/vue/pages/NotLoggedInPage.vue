
<template>
  <div class="not-logged-in-page">
    <div class="not-logged-in-page--header">
      <Banner></Banner>
      <NotLoggedInIntro :newestCourse="highlightedCourse"></NotLoggedInIntro>
    </div>
    <div class="not-logged-in-page--content">
      <h2>Alle tilgjengelige kompetansepakker</h2>

        <div class="security-banner">
            <p class="security-banner__title"><b>Sikkerhetshendelse i Canvas</b></p>

            <p class="security-banner__description">Det har vært en sikkerhetshendelse hos vår leverandør av Canvas, Instructure. Situasjonen er under avklaring i dialog med Instructure og Sikt, og oppdatering vil bli gitt ved ny informasjon. Vi ber om at alle utviser økt årvåkenhet for phishing. Ta kontakt med IT-support om du opplever et phishingforsøk.</p>

            <p class="security-banner__link">Du kan lese mer om hendelsen på statussiden til Canvas: <a target="_blank" href="https://status.instructure.com/" rel="noopener noreferrer">status.instructure.com</a></p>
        </div>

      <div class="not-logged-in-page--layout">
        <CardFilter @update:selectedFilters="onSelectedFiltersUpdate" :filterData="filterData"></CardFilter>
        <CardList v-if="coursesToView.length > 0" :authorized="false" :courses="coursesToView" :newCoursesIndicator=true></CardList>
        <div v-else>
          <h3>Vi fant ingen treff for filtrene du har valgt. Du kan fjerne alle filtrene med "Tilbakestill filter".</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardList from '../components/CardList.vue'
import CardFilter from '../components/CardFilter.vue'
import Banner from '../components/Banner.vue'
import NotLoggedInIntro from '../components/NotLoggedInIntro.vue'
import {ref} from 'vue'
import { filterCourses } from '../utils/filter-courses.js'

const { courses, filterData, highlightedCourse, mobiletablet } = defineProps(['courses', 'filterData', 'highlightedCourse', 'mobiletablet']);
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

.not-logged-in-page {
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

.not-logged-in-page--header {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .intro-text {
      border-radius: 10px;
      background: #dff4ff;
      padding: 16px;
    }
  @media (max-width: 30rem) {
    .intro-text {
      margin-top: unset;
      font-size: 1.125rem;
      font-weight: normal;
      line-height: normal;
      border-radius: 20px;
      background: #dff4ff;
      padding: 16px;
    }
  }

}
.not-logged-in-page--content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    font-size: 1.5rem;
     margin: 10px 0;
    @media (max-width: 30rem) {
      font-size: 1.250rem;
      margin: 1rem 0 1rem 0;
    }
  }
}
.not-logged-in-page--layout {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 800px){
    display: flex;
    flex-direction: column;
  }
}
.not-logged-in-page--footer {
  width: 100%;
}
</style>
