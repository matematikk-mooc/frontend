<template>

<div class="login-direct-link">
    <div class="login-direct-box">
        <div class="login-logos">
            <img class="login-logo" :src="`${this.server}logo-black.svg`" @click="goToUdir">
        </div>
        <div class="login-header">
            <h1 class="login-header-title">Canvas innlogging for åpne nettkurs og kompetansepakker</h1>
            <h2 class="login-header-description">-for fleksibel og livslang læring</h2>
        </div>
        <div class="login-options">
            <Button class="btn--lg" type="feideLogin" @click="goToFeide">LOGG INN MED FEIDE</Button>
            <Button class="btn--lg" type="outlined"  @click="goToCanvas">LOGG INN UTEN FEIDE</Button>
        </div>
    </div>
</div>
</template>

<script>
import Button from '../Button.vue';

export default {
  name: 'LoginDirectLink',
  components: {
    Button,
  },
  props: {

  },
  data () {
    return {
        server: SERVER,
    }
  },
  methods: {
    goToFeide() {
        window.location.href = window.location.origin + "/login/saml/2"
    },
    goToCanvas() {
        window.location.href = window.location.origin + "/login/canvas?normalLogin=1&design=udir"
    },
    goToUdir() {
        window.location.href = "https://udir.no"
    }
  }
}

</script>

<style lang="scss">
@import '../../design/colors.scss';

.login-direct-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: map-get($color-palette-green, background, 300);
}
.login-direct-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30rem;
    max-width: 60rem;
    width: 100%;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
}
.login-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    text-align: center;
}
.login-options {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    gap: 1rem;
}
.login-logos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 4rem;
}

.login-logo {
    height: 6vh;
    cursor: pointer;
}

.login-header-title {
    font-size: 2,25rem;
    line-height: unset;
    @media screen and (max-width: 768px) {
        font-size: 4vw;
    }
}

.login-header-description {
    font-size: 1.5rem;
    @media screen and (max-width: 768px) {
        font-size: 3vw;
    }
}
</style>
