<template>
  <div class="my-courses-page">
    <span class="mobile-hide">
      <Crumbs :courses="courses" :myCourses="true"/>
    </span>
    <div id="main" class="my-courses-page--content">
      <h1 class="course-page-title">Mine kompetansepakker</h1>
      <div class="my-courses-page--layout">
        <CardList :authorized="true" :courses="courses" :newCoursesIndicator=false></CardList>
      </div>
    </div>
  </div>
</template>


<script>
import CardList from '../components/CardList.vue';
import Crumbs from '../components/header/Crumbs.vue';
export default{
  name: 'MyCoursesPage',
  components: {
    CardList,
    Crumbs
  },
  props: {
    courses: Array,
  },
}
</script>

<style lang="scss">

.my-courses-page {
    height: 100%;
    width: 100%;
    max-width: 1600px;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 85vh;
  }

  .my-courses-page--content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .course-page-title {
      padding-left: 1.5rem;
    }
    h2 {
      font-size: 2rem;
      margin: 1.5rem 0 1.5rem 0;
    }
  }
  .my-courses-page--layout {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 1.5rem;
  }

</style>
