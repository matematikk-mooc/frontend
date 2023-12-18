
<template>
    <div class="landing-page">
      <div id="main" class="landing-page--content">
        <h1>Alle tilgjengelige kompetansepakker</h1>
        <div class="landing-page--layout">
          <CardFilter @update:selectedFilters="onSelectedFiltersUpdate" :filterData="filterData"></CardFilter>
          <CardList :authorized="true" :courses="coursesToView"></CardList>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import CardList from '../components/CardList.vue'
  import CardFilter from '../components/CardFilter.vue'
  import {ref} from 'vue'

  const { courses, filterData } = defineProps(['courses', 'filterData']);
  const coursesToView = ref([...courses]);

  const onSelectedFiltersUpdate = (updatedFilters) => {
    if(updatedFilters.length == 0){
      coursesToView.value = [...courses]
      return
    }
    coursesToView.value = []
    courses.forEach(course =>{
      if(course.course_settings){
        course.course_settings.course_filter.forEach(courseFilter => {
          for (const item of updatedFilters) {
            if (item.id === courseFilter.filter.id) {
              if(!coursesToView.value.includes(course)){
                coursesToView.value.push(course);
              }
              break;
            }
          }
        }
        )
      }
    }
    )
  }
  </script>

  <style lang="scss">
  .landing-page {
    height: 100%;
    width: 100%;
    max-width: 1600px;
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
  }
  </style>
