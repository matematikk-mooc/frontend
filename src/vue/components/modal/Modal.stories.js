
import Modal from './Modal.vue';

export default {
  title: 'Components/Modal', // The title of your story
  component: Modal, // The Vue component you want to showcase
};

const Template = (args) => ({
  components: { Modal },
  setup() {
    // This function should return the template for your component
    return () => (
      <Modal {...args}>
        <template v-slot:header>
          <div>This is the header content</div>
        </template>
        <template v-slot:main>
          <div>This is the main content</div>
        </template>
        <template v-slot:actions>
          <div>This is the actions content</div>
        </template>
      </Modal>
    );
  },
});

// Export the Template as a Story
export const Default = Template.bind({});
Default.args = {
<<<<<<< Updated upstream
  isOpen: true, // Provide any necessary props here
=======
  isOpen: true,
>>>>>>> Stashed changes
};
