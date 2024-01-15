import ButtonLink from "./ButtonLink.vue";

//👇 This default export determines where your story goes in the story list
export default {
  component: ButtonLink,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const PrimaryButtonLink = {
  render: (args) => ({
    components: { ButtonLink },
    setup() {
      return { args };
    },
    template: '<ButtonLink v-bind="args">ButtonLink</ButtonLink>',
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
      options: ["filled", "outlined", "next", "previous"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
};

export const SecondaryButtonLink = {
  render: (args) => ({
    components: { ButtonLink },
    setup() {
      return { args };
    },
    template: '<ButtonLink v-bind="args">ButtonLink</ButtonLink>',
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
      options: ["filled", "outlined", "next", "previous"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
  },
};
