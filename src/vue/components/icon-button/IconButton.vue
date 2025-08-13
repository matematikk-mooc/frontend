<template>
  <button aria-label="Gå tilbake til kursoversikten" @click="handleClick" class="icon-button">
    <Icon name="close" />
  </button>
</template>

<script setup>
import Icon from "../icon/Icon.vue";

const emits = defineEmits(['handleClick']);

const handleClick = () => {
  emits('handleClick');
};
</script>

<style lang="scss">
@import "../../design/colors.scss";

.icon-button {
  background-color: white;
  color: $color-black;
  border: 1px solid black;
  z-index: 1020;
  padding: 0.125rem;
  font-size: 2rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 70%;
    .material-icon{
      display: flex;
      place-content: center;
      svg {
        font-size: 24px;
      }
}

  &:focus {
    background-color: map-get($color-palette-peach, background, 500);
  }
}
</style>
