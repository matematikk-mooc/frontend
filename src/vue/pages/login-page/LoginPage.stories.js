import LoginForm from "../../components/login-form/LoginForm.vue";
import LoginPage from "./LoginPage.vue";

//👇 This default export determines where your story goes in the story list
export default {
  title: "Pages/LoginPage",
  component: LoginPage,
};

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Login = {
  render: () => ({
    components: {LoginPage, LoginForm },
    setup() {},
    template: "<LoginPage><LoginForm/></LoginPage>",
  }),
};
