<template>
  <div class="banner">
    <div class="before-login-image-left">
      <img
        aria-label="illustrasjon-banner" :src ="`${server}IllustrasjonerHeaderIkkeInnloggetSide/illustrasjon-kvinne-hovedside-innlogging.svg`"
      />
    </div>
    <div class="caption">
      <h1>Velkommen til Utdanningsdirektoratets kompetanseportal!</h1>
    </div>
    <div class="before-login-image-right">
      <img
      aria-label="illustrasjon-banner" :src="`${server}IllustrasjonerHeaderIkkeInnloggetSide/illustrasjon-mann-hovedside-innlogging.svg`"
      />
    </div>
  </div>
</template>

<script setup>
const server= SERVER

</script>

<style lang="scss">
@import '../design/colors.scss';

.banner {
  position: relative;
  background: map-get($color-palette-green, background, 200);
  color: map-get($color-palette-green, foreground, 200);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0rem 0.625rem 0.625 0.625rem;
  flex-grow: 0;
  border: 0 0 6.25rem;
  border-radius: 20px;
  word-break: break-word;
  img {
    width: 10.173rem;
    height: 10.294rem;
    flex-grow: 0;
    object-fit: contain;
  }

  .before-login-image-left {
    position: relative;
    bottom: -3rem;
    @media screen and (max-width: 1000px){
      display: none;
    }
  }
  .before-login-image-right {
    position: relative;
    bottom: -3rem;
    @media screen and (max-width: 1000px){
      display: none;
    }
  }
  .caption {
    position: relative;
    flex: 1 1 80rem;
  }
}
</style>
