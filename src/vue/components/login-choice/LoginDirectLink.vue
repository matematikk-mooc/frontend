<template>

<div class="login-direct-link">
    <div class="login-direct-box">
        <div class="login-logos">
            <img class="login-logo" :src="`${this.server}logo-white.png`" @click="goToUdir">
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
    height: 100vh;
}
.login-direct-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 40rem;
    width: 100%;
    margin-top: 16px;
    border: 1px solid #2e3c51;
    border-radius: 0.5rem;
    color:white;
    background-color: #2e3c51;
    box-shadow: rgba(50, 50, 93, 0.85) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
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
    .btn--filled.btn--md {
        height: auto !important;
    }
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
    height: 6rem;
    cursor: pointer;
    @media screen and (max-width: 768px) {
        height: 6vh;
    }

}

.login-header-title {
    font-size: 1.4rem;
    line-height: unset;
    @media screen and (max-width: 768px) {
        font-size: 4vw;
    }
}

.login-header-description {
    font-size: 1.0rem;
    @media screen and (max-width: 768px) {
        font-size: 3vw;
    }
}
</style>
