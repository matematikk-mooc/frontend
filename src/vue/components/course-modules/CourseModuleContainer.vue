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
          const serviceWorkerUrl = SERVER + DESIGNJS  // For production
          console.error('ServiceWorker url is : ',serviceWorkerUrl)
          const registration = await navigator.serviceWorker.register(serviceWorkerUrl, { scope: '/' });
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

