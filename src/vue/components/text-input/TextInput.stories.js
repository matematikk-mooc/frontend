import TextInput from "./TextInput.vue";

export default {
  title: "Components/TextInput",
  component: TextInput,
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    rules: { control: "text" },
    type: { control: "text" },
    modelValue: { control: "text" },
  },
};

const Template = (args) => ({
  components: { TextInput },
  setup() {
    return { args };
  },
  template: '<TextInput v-bind="args" />',
});

export const Email = Template.bind({});
Email.args = {
  label: "E-post",
  name: "email",
  rules: "required|min:3",
  type: "email",
  modelValue: "",
};

export const Password = Template.bind({});
Password.args = {
  label: "Passord",
  name: "password",
  rules: "required|min:8",
  type: "password",
  modelValue: "",
};
