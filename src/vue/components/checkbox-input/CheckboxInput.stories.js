import CheckboxInput from "./CheckboxInput.vue";

export default {
  title: "Components/CheckboxInput",
  component: CheckboxInput,
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
  },
};

const Template = (args) => ({
  components: { CheckboxInput },
  setup() {
    return { args };
  },
  template: '<CheckboxInput v-bind="args"></CheckboxInput>',
});

export const Default = Template.bind({});
Default.args = {
  label: "Checkbox label",
  name: "staySignedIn",
};
