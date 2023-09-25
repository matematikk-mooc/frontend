import { defineComponent } from "vue";
import LoginForm from "./LoginForm.vue";

export default {
  title: "Components/LoginForm",
  component: LoginForm,
};

const Template = (args) =>
  defineComponent({
    components: { LoginForm },
    setup() {
      return args;
    },
    template:
      '<div style="max-width:700px;display:flex;alignContent:center;justifyContent:center;padding:30px"><LoginForm v-bind="args" /></div>',
  });

export const Default = Template.bind({});
Default.args = {
  email: "",
  password: "",
  stayLoggedIn: false,
};
