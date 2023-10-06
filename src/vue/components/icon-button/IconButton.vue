<template>
 <button class="icon-button">
  <Icon name="close" class="icon-button__icon"/>
 </button>
</template>
<script>
import Icon from "../icon/Icon.vue"
export default {
  components: {
    Icon,
  },
  setup() {},
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
