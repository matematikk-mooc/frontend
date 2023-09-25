import { defineComponent } from "vue";

import Link from "./Link.vue"; // Import your Link component

export default {
  title: "Components/Link",
  component: Link,
  argTypes: {
    url: { control: "text" },
  },
};

const Template = (args) =>
  defineComponent({
    components: { Link },
    setup() {
      return { args };
    },
    template: '<Link v-bind="args">Gå til siden</Link>',
  });

export const Default = Template.bind({});
Default.args = {
  url: "https://example.com",
};
