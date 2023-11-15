<template>
  <CourseModules :nodes="data" v-if="!loading" />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { fetchModulesForCourse } from '../../../js/modules/module-selector/index.js';
import CourseModules from './CourseModules.vue';

export default defineComponent({
  name: 'CourseModuleContainer',
  components: {
    CourseModules
  },
  setup() {
    const data = ref([]);
    const loading = ref(true);

    const fetchAndRegisterServiceWorker = async () => {
      try {
        // Fetch modules for the course
        const response = await fetchModulesForCourse();
        data.value = response;

        // Register the service worker
        if ('serviceWorker' in navigator) {
            const serviceWorkerUrl = process.env.NODE_ENV === 'development'
    ? '../../../kompetanseportalen-localhost.js' // Replace with your actual development server URL
    : '/service-worker.js';  // For production
          const registration = await navigator.serviceWorker.register(serviceWorkerUrl);
          console.log('Service Worker registered with scope:', registration.scope);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false after fetching data
        loading.value = false;
      }
    };

    // Call the asynchronous function within onMounted
    onMounted(fetchAndRegisterServiceWorker);

    return {
      data,
      loading
    };
  },
});
</script>

