import ModalExample from './ModalExample.vue'; 
import { defineComponent, ref } from 'vue';

export default {
  title: 'Example/ModalExample',
  component: ModalExample, 
};


const Template = (args) =>
  defineComponent({
    components: { ModalExample },
    setup() {
      const modalOpen = ref(false);

      const openModal = () => {
        modalOpen.value = true;
      };

      const closeModal = () => {
        modalOpen.value = false;
      };

      return {
        modalOpen,
        openModal,
        closeModal,
      };
    },
    template: `
      <ModalExample />
    `,
  });

// Export the Template as a Story
export const Default = Template.bind({});
Default.args = {};
