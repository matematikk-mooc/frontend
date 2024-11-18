
<template>
  <div class="not-logged-in-page">
    <div class="not-logged-in-page--header">
      <MobileWarning v-if="mobiletablet"></MobileWarning>
      <Banner></Banner>
      <NotLoggedInIntro :newestCourse="highlightedCourse"></NotLoggedInIntro>
    </div>
    <div class="not-logged-in-page--content">
      <h2>Alle tilgjengelige kompetansepakker</h2>
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
import MobileWarning from '../components/information-banner/MobileWarning.vue'

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
  justify-content: center;
  align-items: center;
  .intro-text {
      border-radius: 10px;
      background: #dff4ff;
      padding: 16px;
    }
  @media (max-width: 30rem) {
    h1 {
      font-size: 22px;
      text-align: center;
      line-height: normal;
      padding: 1rem
    };
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
    margin: 1.5rem 0 1.5rem 0;
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
