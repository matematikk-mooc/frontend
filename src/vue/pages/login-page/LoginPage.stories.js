import LoginPage from './LoginPage.vue' 
import LoginForm from '../../components/login-form/LoginForm.vue'

//👇 This default export determines where your story goes in the story list
export default {
  component: LoginPage,
};

export const Default = {
  render: () => ({
    components: { LoginPage, LoginForm },
    setup() {},
    template: "<LoginPage><LoginForm/></LoginPage>",
  }),
};




