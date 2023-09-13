import Card from "../components/Card.vue";

//👇 This default export determines where your story goes in the story list
export default {
  component: Card,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const CardComponent = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: '<Card v-bind="args"/>',
  }),

  args: {
    theme: "theme_0",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: {
        type: "select",
      },
      options: [
        "theme_0",
        "theme_1",
        "theme_2",
        "theme_3",
        "theme_4",
        "theme_5",
        "theme_6",
        "theme_7",
        "theme_8",
      ],
    },
  },
};
