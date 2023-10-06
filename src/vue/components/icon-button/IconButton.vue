<template>
 <button  @click="handleClick" class="icon-button">
  <Icon name="close"/>
 </button>
</template>
<script setup>
import Icon from "../icon/Icon.vue"

import { defineEmits } from 'vue'

const emits = defineEmits(['handleClick'])

const handleClick = () => {
  emits('handleClick')
}
</script>
<style lang="scss">
 @import "../../design/colors.scss";

.icon-button {
  background-color: map-get($color-palette-peach,background, 400);
  color: $color-black;
  border: none;
  padding: 0.25rem;
  font-size: 1.5rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
   border-radius: 70%;

  &:focus {
    outline: none;
  }
}
</style>
