import Banner from "../components/Banner.vue";

//👇 This default export determines where your story goes in the story list
export default {
  component: Banner,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const BannerComponent = {
  render: () => ({
    components: { Banner },
    setup() {},
    template: "<Banner/>",
  }),
};
