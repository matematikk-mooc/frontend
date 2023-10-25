<template>
  <div class="my-courses-page">
    <div class="my-courses-page--content">
      <h2>Mine kompetansepakker</h2>
      <div class="my-courses-page--layout">
        <CardList :authorized="true" :courses="courses"></CardList>
      </div>
    </div>
  </div>
</template>


<script>
import CardList from '../components/CardList.vue';
export default{
  name: 'MyCoursesPage',
  components: {
    CardList
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
    padding: 1.25rem;
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
    margin-left: 1.5rem;
    h2 {
      font-size: 2rem;
      margin: 1.5rem 0 1.5rem 0;
    }
  }
  .my-courses-page--layout {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

</style>
