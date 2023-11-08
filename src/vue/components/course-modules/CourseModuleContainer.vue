<template>
    <CourseModules :nodes="data" v-if="!loading" />
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { fetchModulesForCourse } from '../../../js/modules/module-selector/index.js';
import CourseModules from './CourseModules.vue';

export default defineComponent({
  name: 'CourseModuleContainer',
  setup() {
    const data = ref([]);
    const loading = ref(true);

    onMounted(
      async () => {
      try {
        const response = await fetchModulesForCourse();
        data.value= response;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        loading.value = false;
      }
    });

    return {
      data,
      loading
    };
  },
  components: {
    CourseModules
  }
});
</script>
