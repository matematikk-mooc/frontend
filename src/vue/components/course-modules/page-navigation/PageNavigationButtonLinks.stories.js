import PageNavigationButtonLinks from './PageNavigationButtonLinks.vue';

export default {
 component: PageNavigationButtonLinks
};


/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const ButtonLinks = {
  render: (args) => ({
    components: { PageNavigationButtonLinks },
    setup() {
      return { args };
    },
    template: '<PageNavigationButtonLinks  v-bind="args"></PageNavigationButtonLinks>',
  }),

  args: {
    previousUrl: "url",
    nextUrl: "urls",
  },
  tags: ["autodocs"],
  argTypes: {
    previousUrl: {
      control: {
        type: "select",
      },
      options: ["url", null],
    },
    nextUrl: {
      control: {
        type: "select",
      },
      options: ["url", null],
    },
  },
};

