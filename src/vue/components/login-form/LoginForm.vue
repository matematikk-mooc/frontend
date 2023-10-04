<template>
  <div class="login-form">
    <h2 class="login-form__title">Logg inn på kompetanse portalen</h2>
    <form @submit.prevent="submitForm" class="login-form__form" autocomplete="off">
      <TextInput v-model="email" name="Email" label="Epost" type="email" placeHolder="navn@eksempel.no" />
      <TextInput v-model="password" name="Password" label="Passord" type="password" />
      <CheckboxInput v-model="stayLoggedIn" name="stayLoggedIn" label="Forbli logget inn" />
      <div class="login-form__action-container">
        <Button type="submit">Logg inn</Button>
        <Link url="www.example.com">Glemt passord?</Link>
      </div>
      <h3 class="login-form__title2">Opprette ny bruker?</h3>
      <p class="login-form__new-user"> For å opprette bruker i kompetanseportalen, må du være registrert i en
        kompetansepakke. Dette gjør du ved å velge en kompetansepakke fra kompetanse.udir.no og registrere deg på denne
        ved hjelp av din e-postadresse. </p>
    </form>
  </div>
</template>

<script>
import { useForm, useField } from "vee-validate"
import Button from "../Button.vue"
import TextInput from "../text-input/TextInput.vue"
import CheckboxInput from "../checkbox-input/CheckboxInput.vue"
import Link from "../link/Link.vue"

export default {
  name: 'LoginForm',
  components: {
    CheckboxInput,
    TextInput,
    Button,
    Link,
  },
  setup() {
    const { handleSubmit } = useForm()

    const email = useField("email")
    const password = useField("password")
    const stayLoggedIn = useField("stayLoggedIn")

    const submitForm = handleSubmit(async () => {
      // Handle login logic here
      if (!(await email.validate()) || !(await password.validate())) {
        return
      }
      console.log("Logging in...")
    })

    return {
      email,
      password,
      stayLoggedIn,
      submitForm,
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../design/colors";

.login-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  background-color: $color-white;

  &__title {
    color: map-get($color-palette-steel, background, 700);
    font-family: Montserrat, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: left;
    text-align: left;
  }

  &__form {
    margin-top: 1rem;
  }

  &__title2 {
    color: $color-black;
    font-family: Montserrat, sans-serif;
    font-size: 1rem;
    font-weight: 700;
    margin-top: 2rem;
  }

  &__action-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  &__new-user {
    color: $color-black;
    font-family: Roboto, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }
}
</style>
