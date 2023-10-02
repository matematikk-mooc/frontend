<template>
  <div class="login-page">
    <slot></slot>
    <img :src="`${server}logg-inn-illustrasjon.svg`">
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import "src/vue/design/colors.scss";

.login-page {
  background-color: $color-grey-100;
}
</style>
