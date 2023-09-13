import NavBar from "../components/header/NavBar.vue";

//👇 This default export determines where your story goes in the story list
export default {
  component: NavBar,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Nav = {
  render: (args) => ({
    components: { NavBar },
    setup() {
      return { args };
    },
    template: "<NavBar/>",
  }),

  tags: ["autodocs"],
};
