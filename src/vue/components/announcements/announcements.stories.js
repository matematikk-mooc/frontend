import Announcements from './announcements.vue';

export default {
  title: 'Components/Announcements',
};

export const Default = () => ({
  components: { Announcements },
  template: '<Announcements :count="3" />',
});
