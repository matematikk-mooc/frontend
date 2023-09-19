<template>
  <a :href="url" class="page-footer--link">
    <slot></slot> <SvgIcon v-if="type == 'open-in-new'" :size="16" :path="mdiOpenInNew" />
  </a>
</template>
<script setup>
// import OpenInAppIcon from 'vue-material-design-icons/OpenInApp.vue'
import SvgIcon from 'vue3-icon';
import {mdiOpenInNew} from '@mdi/js'
const props = defineProps(['type', 'url'])
</script>

<style lang="scss">

@import '../../design/colors.scss';

a.page-footer--link {
  cursor: pointer;
  text-align: center;
  color: $color-white;
  font-size: 0.875;
  font-family: 'Montserrat';
  font-weight: 400;
  text-decoration: underline;
  word-wrap: break-word;
  text-underline-offset: 0.3rem;
  &:hover {
    color: map-get($color-palette-green, background, 400);
  }
  padding: 0.75rem 0.25rem 0.5rem 0.25rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;

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
