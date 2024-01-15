import Announcements from './Announcements.vue';

export default {
  title: 'Components/Announcements',
};

export const Default = () => ({
  components: { Announcements },
  template: '<Announcements :count="3" :url=" " />',
});

export const NoNewAnnouncements = () => ({
  components: { Announcements },
  template: '<Announcements :count="0" :url=" " />',
});
