import PageFooter from "../components/footer/PageFooter.vue";

//👇 This default export determines where your story goes in the story list
export default {
  component: PageFooter,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Footer = {
  render: (args) => ({
    components: { PageFooter },
    setup() {
      return { args };
    },
    template: "<PageFooter/>",
  }),

  tags: ["autodocs"],
};
