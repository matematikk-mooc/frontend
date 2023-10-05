import IconButton from './IconButton.vue'; 

export default {
  title: 'Components/IconButton',
  component: IconButton,
};

const Template = (args) => ({
  components: { IconButton},
  setup() {
    return { args };
  },
  template: `
      <IconButton class="icon-button"/>
  `,
});

export const Default = Template.bind({});
IconButton.args = {};
