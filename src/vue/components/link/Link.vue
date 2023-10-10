<template>
  <a :href="url" class="link">
    <slot></slot>
  </a>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    url: String,
  },
});
</script>

<style lang="scss">
@import "../../design/semantic-colors";
.link {
  color: black;
  cursor: pointer;
  &__text {
    color: #000;
    font-family: Montserrat;
    font-size: 0.85rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &:hover {
    text-decoration: underline;
    color: map-get($semantic-colors, hover);
  }
}
</style>
