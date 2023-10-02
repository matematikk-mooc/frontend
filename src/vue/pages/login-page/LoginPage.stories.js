import LoginPage from './LoginPage.vue' // Adjust the import path as needed
import LoginForm from '../login-form/LoginForm.vue'

// Export a default object that contains the story title and component
export default {
  title: 'LoginPage',
  component: LoginPage,
};

// Define the template for the story
const Template = (args, { argTypes }) => ({
  components: { LoginPage, LoginForm },
  template: '<LoginPage v-bind="$props"><LoginForm></LoginForm> </LoginPage>',
});

// Define the default args for your component (if any)
export const Default = Template.bind({});
Default.args = {};


