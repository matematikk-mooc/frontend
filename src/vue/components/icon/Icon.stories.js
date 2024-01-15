import Icon from './Icon.vue';

export default {
  title: 'Components/Icon',
  component: Icon,
};

const Template = (args) => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `<Icon :name="args.name" :size="args.size" :color="args.color" />`,
});

export const Default = Template.bind({});
Default.args = {
  name: 'face',
  size: '2em',
  color: 'blue',
};
