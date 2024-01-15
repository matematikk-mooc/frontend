<template>
  <div class="course-modules-container-with-progression">
      <CourseModules :nodes="courseModules" v-if="courseModulesInStore" :lang="lang"  :moduleProgressions="completionProgression"/>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onBeforeUnmount, computed} from 'vue';
import CourseModules from './CourseModules.vue';
import { Subject } from 'rxjs';
import { getLanguageCode } from '../../utils/lang-utils';
import { renderPreviousAndNextButton } from './page-navigation/index';
import { findPreviousAndNext, extractCurrentCoursePageIdFromUrl} from './previous-next-utils';
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CourseModuleContainer',
  components: {
    CourseModules
  },
  setup() {

    const store = useStore()

    if (!store) {
      console.error('Vuex store is not initialized.');
      return;
    }
    const courseModules = computed(() => {
      return store.getters.courseModules;
    });
    const courseModulesInStore = computed(() => {
      return store.getters.courseModulesInStore;
    });
    const completionProgression = computed(() => {
      return store.getters.completionProgression;
    })

    const urlChangeSubject = new Subject();
    const previousUrl = ref(window.location.href);
    const lang = ref(getLanguageCode());

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

    const createNavigationButtons = (allPages) => {
      const pageId= extractCurrentCoursePageIdFromUrl();
      if (pageId) {
        const { previousPageUrl, nextPageUrl } = findPreviousAndNext(allPages, pageId);
        renderPreviousAndNextButton(previousPageUrl, nextPageUrl);
      }
    }

    const fetchCourseModules = async () => {
      await store.dispatch('fetchCourseModules');
      createNavigationButtons(store.getters.pages)
    }

    // Call the asynchronous function within onMounted
    onMounted(fetchCourseModules);

    return {
      lang,
      courseModules,
      courseModulesInStore,
      completionProgression
    };
  },
});
</script>
<style lang="scss">
.course-modules-container-with-progression{
  width: 100%;
  max-width: 26rem;
  padding-bottom: 3rem;
  margin-right: 1rem;
}
</style>
