import DropdownButton from './DropdownButton.vue'; // Adjust the import path

export default {
  title: 'Components/DropdownButton',
  component: DropdownButton,
};

const Template = () => ({
  components: { DropdownButton },
  template: '<DropdownButton/>',
});

export const Default = Template.bind({});
