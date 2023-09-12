import Button from "../components/Button.vue";

//👇 This default export determines where your story goes in the story list
export default {
  component: Button,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const PrimaryButton = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),

  args: {
    type: "filled",
    size: "md",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["filled", "outlined"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
};

export const SecondaryButton = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),

  args: {
    type: "outlined",
    size: "md",
  },
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["filled", "outlined"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
};
