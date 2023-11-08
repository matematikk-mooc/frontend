<template>
    <Announcements :count="data.count" :url="data.url" v-if="!loading" />
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { getAllUnreadAnnouncementsForCourse } from '../../../js/modules/announcements/index'
import Announcements from './Announcements';

export default defineComponent({
  name: 'AnnouncementsContainer',
  setup() {
    const data = ref({
      url: '',
      count: 0
    });
    const loading = ref(true);

    onMounted(
      async () => {
      try {
        const response = await getAllUnreadAnnouncementsForCourse();
        data.value = {
          url: response.url,
          count: response.count
        };
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
    Announcements
  }
});
</script>
