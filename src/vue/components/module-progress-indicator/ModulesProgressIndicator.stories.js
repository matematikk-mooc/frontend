import ModulesProgressIndicator from './ModulesProgressIndicator.vue';
import {defineComponent} from 'vue';

export default {
  title: 'Components/ModulesProgressIndicator',
  component: ModulesProgressIndicator
};

const Template = (args) => defineComponent({
  components: { ModulesProgressIndicator },
  setup() {
    return { args };
  },
  template: '<ModulesProgressIndicator v-bind="args" />',
});

export const Example = Template.bind({});
Example.args = {
  modulesProgressionData: {
    totalPages: 300,
    completedPages: 53,
    totalModules: 30,
    completedModules: 2
  }
};

