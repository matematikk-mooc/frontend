<script>

export default {
  data() {
    return {
      server: SERVER,
    }
  }
}
</script>

<template>
  <div class="banner">
    <div class="before-login-image-left">
       <img :src="`${server}/images/illustrasjonKvinne_hovedside_Innlogging.svg`" alt="Illustrasjon Dame leser">
    </div>
    <div class="caption">
      <h1> Velkommen til Utdanningsdirektoratets kompetanseportal! </h1>
    </div>
    <div class="before-login-image-right">
         <img :src="`${server}/images/illustrasjonMann_hovedside_Innlogging.svg`" alt="Illustrasjon Mann leser">
    </div>
  </div>
</template>

<style lang="scss">
@import '../design/colors.scss';

.banner {
  position: relative;
  left: 100px;
  right: 50px;
  background: map-get($color-palette-green, background, 200);
  color: map-get($color-palette-green, foreground, 200);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  min-width: 70rem;
  padding: 0rem 0.625rem 0.625rem 0.625rem;
  flex-grow: 0;
  border: 0 0 6.25rem;
  border-radius: 20px;
  img {
    width: 10.173rem;
    height: 10.294rem;
    flex-grow: 0;
    object-fit: contain;
  }

  .before-login-image-left {
    position: relative;
    bottom: -3rem;
  }
  .before-login-image-right {
    position: relative;
    bottom: -3rem;
  }
  .caption {
    position: relative;
    flex: 1 1 80rem;
  }
}
</style>
