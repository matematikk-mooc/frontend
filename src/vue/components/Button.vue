<template>
  <button
    :class="[
      'btn',
      { 'btn--filled': isFilled },
      { 'btn--outlined': isOutlined },
      { 'btn--dropdown': isDropdown },
      { 'btn--sm': size === 'sm' },
      { 'btn--md': !size || size === 'md' },
      { 'btn--lg': size === 'lg' },
    ]"
  >
    <Icon v-if="type === 'previous'" name="chevron_left" size="1.5em" />
    <img class="feide-symbol" v-if="type === 'feideLogin'" :src="`${server}feide_white-symbol.svg`"/>
    <slot></slot>
    <Icon v-if="type === 'next'" name="chevron_right" size="1.5em" />
  </button>
</template>

<script setup>
import Icon from './icon/Icon.vue';
const props = defineProps({
  size: String,
  type: String,
});
const server = SERVER;

const isFilled = !props.type || props.type === 'submit' || props.type === 'filled' || props.type === 'feideLogin';
const isOutlined = props.type === 'outlined' || props.type === 'previous' || props.type === 'next';
const isDropdown = props.type === 'dropdown';
</script>

<style lang="scss">
@import '../design/colors.scss';

.btn {
  cursor: pointer;
  position: relative;
  background: $color-grey-900;
  color: $color-white;
  border: none;
  border-radius: 0.1875rem;
  font-weight: 700;
  line-height: 1;
  display: flex;
  align-items: center;
  bottom: -0.05rem;

  &:hover {
    background: #00468e;
    color: $color-white;
  }

  &--filled {
    background: $color-grey-900;
    color: $color-white;

    &.btn--sm {
      padding: 0.25rem 0.875rem 0.25rem 0.875rem;
    }
    &.btn--md {
      padding: 0.5rem 1.375rem 0.5rem 1.375rem;
    }
    &.btn--lg {
      padding: 0.75rem 1.75rem 0.75rem 1.75rem;
    }
  }

  &--outlined {
    background: $color-white;
    color: $color-grey-900;
    border: 0.125rem solid $color-grey-900;

    &:hover {
      border: 0.125rem solid #00468e;
    }

    &.btn--sm {
      padding: 0.125rem 0.75rem 0.125rem 0.75rem;
    }
    &.btn--md {
      padding: 0.375rem 1.25rem 0.375rem 1.15rem;
    }
    &.btn--lg {
      padding: 0.625rem 1.625rem 0.625rem 1.625rem;
    }
  }

  &--dropdown {
    background: $color-white;
    color: $color-grey-900;
    border: 0.125rem solid $color-grey-900;

    &:hover {
      background: $color-grey-900;
      border: 0.125rem solid $color-grey-900;
    }

    &.btn--sm {
      padding: 0.125rem 0.75rem 0.125rem 0.75rem;
    }
    &.btn--md {
      padding: 0.375rem 1.25rem 0.375rem 1.25rem;
    }
    &.btn--lg {
      padding: 0.625rem 1.625rem 0.625rem 1.625rem;
    }
  }
}

.feide-symbol{
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  margin-top: -0.5em;
}
</style>
