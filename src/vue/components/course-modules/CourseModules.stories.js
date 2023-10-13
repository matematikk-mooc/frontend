import { defineComponent } from 'vue';
import CourseModules from './CourseModules.vue';

export default {
  title: 'components/CourseModules ',
  component: CourseModules ,
};

export const Default = () =>
  defineComponent({
    components: {CourseModules  },
    template: '<CourseModules/>',
  });
