<template>
  <div class="course-modules-container-with-progression">
      <CourseModules :nodes="data" v-if="!loading" :lang="lang"  :moduleProgressions="completed"/>
  </div>
  
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount} from 'vue';
import CourseModules from './CourseModules.vue';
import { fetchModulesForCourse } from '../../../js/modules/module-selector/index.js';
import { Subject } from 'rxjs';
import { getLanguageCode } from '../../utils/lang-utils';
import {countPagesAndCompleted} from './completed-utils'



export default defineComponent({
  name: 'CourseModuleContainer',
  components: {
    CourseModules
  },
  setup() {

    const urlChangeSubject = new Subject();
    const previousUrl = ref(window.location.href);
    const lang = ref(getLanguageCode());
    const completed = ref([]);


    let observer = null;

    const observeUrlChanges = () => {
      observer = new MutationObserver((_mutations) => {
        if (window.location.href !== previousUrl.value) {
          urlChangeSubject.next(window.location.href);
          previousUrl.value = window.location.href;
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };

    const stopObservingUrlChanges = () => {
      if (observer) {
        observer.disconnect();
      }
    };

    const getSelectedLanguage = () => {
      // Call your function here and update functionResult
      lang.value = getLanguageCode();
    };

    onMounted(() => {
      observeUrlChanges();

      // Subscribe to URL changes
      urlChangeSubject.subscribe(() => {
        getSelectedLanguage();
      });
    });

    onBeforeUnmount(() => {
      stopObservingUrlChanges();
    });

    const data = ref([]);
    const loading = ref(true);


  
    const fetchData = async () => {
      try {
        // Fetch modules for the course
        const response = await fetchModulesForCourse();
        data.value = response;
        completed.value = data.value.map(item => countPagesAndCompleted(item));
        console.error('completed courses: ', completed.value)
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
      loading,
      lang,
      completed
    };
  },
});
</script>
<style lang="scss">
.course-modules-container-with-progression{
  width: 100%;
  max-width: 26rem;
  padding-bottom: 3rem;
}
</style>


