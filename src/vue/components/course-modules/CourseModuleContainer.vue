<template>
  <CourseModules :nodes="data" v-if="!loading" />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import CourseModules from './CourseModules.vue';
import { fetchModulesForCourse } from '../../../js/modules/module-selector/index.js';

export default defineComponent({
  name: 'CourseModuleContainer',
  components: {
    CourseModules
  },
  setup() {
    const data = ref([]);
    const loading = ref(true);

    const fetchData = async () => {
      try {
        // Fetch modules for the course
        const response = await fetchModulesForCourse();
        data.value = response;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false after fetching data
        loading.value = false;
      }
    };

    // Call the asynchronous function within onMounted
    onMounted(fetchData);

    return {
      data,
      loading
    };
  },
});
</script>


