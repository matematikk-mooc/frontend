<template>
  <button aria-label="Gå tilbake til kursoversikten" @click="handleClick" class="icon-button">
    <Icon name="close" />
  </button>
</template>

<script setup>
import Icon from "../icon/Icon.vue";
import { defineEmits } from 'vue';

const emits = defineEmits(['handleClick']);

const handleClick = () => {
  emits('handleClick');
};
</script>

<style lang="scss">
@import "../../design/colors.scss";

.icon-button {
  background-color: map-get($color-palette-peach, background, 400);
  color: $color-black;
  border: none;
  z-index: 1020;
  padding: 0.125rem;
  font-size: 2rem;
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 70%;

  &:hover {
    background-color: map-get($color-palette-peach, background, 500);
  }

  &:focus {
    background-color: map-get($color-palette-peach, background, 500);
  }
}
</style>


