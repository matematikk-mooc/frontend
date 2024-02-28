<template>
  <div class="my-courses-page">
    <div id="main" class="my-courses-page--content">
      <h1>Mine kompetansepakker</h1>
      <div class="my-courses-page--layout">
        <CardList :authorized="true" :courses="courses" v-if="coursesInStore" :newCoursesIndicator=false></CardList>
      </div>
    </div>
  </div>
</template>


<script>
import CardList from '../components/CardList.vue';
import { useStore } from 'vuex'
import { computed, onMounted, watch } from 'vue';

export default{
  name: 'MyCoursesPage',
  components: {
    CardList
  },
  setup() {
    const store = useStore()

    if(!store) {
        console.error("Vuex store is not initialized.")
        return
    }
    const courses = computed(() => {
        return store.getters.myCourses
    })
    const coursesInStore = computed(() => {
        return store.getters.myCoursesReady
    })

    const fetchMyCourses = async () => {
        await store.dispatch('fetchMyCourses');
    }

    //Call the asynchronous function within onMounted
    onMounted(fetchMyCourses)

    // Watch for changes in 'courses' and navigate if it becomes empty
    watch(courses, (newValue, oldvalue) => {
      if (newValue.length === 0) {
        window.location.href = "/search/all_courses?design=udir";
      }
    });

    return {
        courses,
        coursesInStore
    };
  }
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
