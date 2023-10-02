<template>
  <div class="login-page">
    <div class="login-page__logo">
      <div class="login-page__top-container">
        <img class="login-page__logo" :src="`logo-black.svg`" />
        <h1 class="login-page__title">Kompetanseportal</h1>
      </div>
    
    </div>
    
    <div class="login-page__main-content">
      <div class="login-page__form"> <slot></slot></div>
        <div class="login-page__illustration">
            <img :src="`logg-inn-illustrasjon.svg`">
        </div>
    </div>              
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import "src/vue/design/colors.scss";

.login-page {
  position:relative;
  background-color: $color-grey-100;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem 0 1.5rem;

  &__top-container{
    display:flex;
    justify-content: flex-start;
  }
 &__title{
  font-family: Montserrat;
  font-size: 1.5rem;
  font-weight: 500;
 }
 &__logo{
  margin-right: 2rem;
 }

  &__main-content {
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  &__illustration {
   max-width: 30%;
  }
  &__form {
   width: 50%;
   max-width: 25rem;
   margin-right: 2.5rem;
  }

  
}
</style>
