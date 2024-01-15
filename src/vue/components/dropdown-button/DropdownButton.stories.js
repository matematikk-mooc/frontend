import DropdownButton from './DropdownButton.vue';

export default {
  title: 'Components/DropdownButton',
  component: DropdownButton,
};

export const DropdownButtonComponent = (args) => ({
  components: { DropdownButton },
  setup() {
    return { args };
  },
  template: '<DropdownButton v-bind="args" />',
});

DropdownButtonComponent.argTypes = {
  options: {
    control: 'object',
  },
};

DropdownButtonComponent.args = {
  options: [
    { key: 'nb', value: 'Bokmål' },
    { key: 'nn', value: 'Nynorsk' },
    { key: 'se', value: 'Sápmi' },
  ],
  preselect: 'se',
};


