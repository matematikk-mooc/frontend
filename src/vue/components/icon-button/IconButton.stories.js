
import IconButton from './IconButton.vue';
import { action } from '@storybook/addon-actions';

 const handleClick=() => {
      console.log('Button clicked');
    }
export default {
  title: 'components/IconButton',
  component: IconButton,
};

const Template = (args, { argTypes }) => ({
  components: { IconButton },
  template: `
    <IconButton @handleClick="handleClick" v-bind="$props"/>
  `,
  methods: {
    handleClick: action('handleClick'),
  },
});

export const CloseButton = Template.bind({});



