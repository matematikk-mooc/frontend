// Modal.stories.js (assuming it's in the same directory as Modal.vue)

import Modal from './Modal.vue'; // Adjust the import path accordingly

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args, { argTypes }) => ({
  components: { Modal },
  props: Object.keys(argTypes),
  template: '<Modal v-bind="$props">Modal Content Goes Here</Modal>',
});

export const Default = Template.bind({});
Default.args = {

};
