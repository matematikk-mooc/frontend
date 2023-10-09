import Modal from './Modal.vue';
import Button from '../Button.vue';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args) => ({
  components: { Modal, Button },
  setup() {
    return () => (
      <Modal {...args}>
        {{
          header: () => <h2>This is the header content</h2>,
          main: () => <div>This is the main content</div>,
          actions: () => (
            <>
              <Button type="filled">Hello</Button>
              <Button type="outlined">Goodbye</Button>
            </>
          ),
        }}
      </Modal>
    );
  },
});

const TemplateWithoutHeader = (args) => ({
  components: { Modal, Button },
  setup() {
    return () => (
      <Modal {...args}>
        {{
          main: () => <div>This is the main content</div>,
          actions: () => (
            <>
              <Button type="filled">Hello</Button>
              <Button type="outlined">Goodbye</Button>
            </>
          ),
        }}
      </Modal>
    );
  },
});

const TemplateWithoutActions = (args) => ({
  components: { Modal, Button },
  setup() {
    return () => (
      <Modal {...args}>
        {{
          header: () => <h2>This is the header content</h2>,
          main: () => <div>This is the main content</div>,
        }}
      </Modal>
    );
  },
});

const TemplateWithoutMainContent = (args) => ({
  components: { Modal, Button },
  setup() {
    return () => (
      <Modal {...args}>
        {{
          header: () => <h2>This is the header content</h2>,
          actions: () => (
            <>
              <Button type="filled">Hello</Button>
              <Button type="outlined">Goodbye</Button>
            </>
          ),
        }}
      </Modal>
    );
  },
});

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};

export const WithoutHeader =TemplateWithoutHeader.bind({});
WithoutHeader.args = {
  isOpen: true,
};

export const WithoutActions =TemplateWithoutActions.bind({});
WithoutActions.args = {
  isOpen: true,
};

export const WithoutMainContent =TemplateWithoutMainContent.bind({});
WithoutMainContent.args = {
  isOpen: true,
};
