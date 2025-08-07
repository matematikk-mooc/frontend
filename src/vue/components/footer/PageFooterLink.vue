<template>
  <a :href="url" class="page-footer--link">
    <slot name="footerlink"></slot>
    <Icon v-if="type == 'open-in-new'" :name="'open_in_new'"/>
  </a>
</template>
<script setup>
import Icon from "../icon/Icon.vue"
const props = defineProps(['type', 'url'])
</script>

<style lang="scss">

@import '../../design/colors.scss';

a.page-footer--link {
  cursor: pointer;
  text-align: center;
  color: $color-white;
  font-size: 0.875;
  font-family: 'Inter';
  font-weight: 400;
  text-decoration: underline;
  word-wrap: break-word;
  text-underline-offset: 0.3rem;
  padding: 0.75rem 0.25rem 0.5rem 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: map-get($color-palette-green, background, 400);
  }

  .material-design-icon.icon-size {
    height: 1.125rem;
    width: 1.125rem;
  }

  .material-design-icon.icon-size > .material-design-icon__svg {
    height: 1.125rem;
    width: 1.125rem;
  }
}
</style>
