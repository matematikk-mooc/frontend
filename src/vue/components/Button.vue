<script setup>
const props = defineProps(['size', 'type'])
</script>
<template>
  <button
    :class="[
      { btn: true },
      { 'btn--filled': type === undefined || type === 'filled' },
      { 'btn--outlined': type === 'outlined' },
      { 'btn--sm': size === 'sm' },
      { 'btn--md': size === undefined || size === 'md' },
      { 'btn--lg': size === 'lg' }
    ]"
  >
    Button
  </button>
</template>

<style lang="scss">
@import '../design/colors.scss';
*,
*:after,
*::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.btn {
  cursor: pointer;
  position: relative;
  background: $color-grey-900;
  color: $color-white;
  border: none;
  border-radius: 0.1875rem;
  font-weight: 700;
  line-height: 1;
  &:hover {
    background: #00468e;
  }
}

.btn--filled {
  background: $color-grey-900;
  color: $color-white;
  &.btn--sm {
    padding: 0.25rem 0.875rem 0.25rem 0.875rem;
  }
  &.btn--md {
    padding: 0.5rem 1.375rem 0.5rem 1.375rem;
  }
  &.btn--lg {
    padding: 0.75rem 1.75rem 0.25rem 1.75rem;
  }
}
.btn--outlined {
  background: $color-white;
  color: $color-grey-900;
  border: 0.125rem solid $color-grey-900;
  &.btn--sm {
    padding: 0.125rem 0.75rem 0.125rem 0.75rem;
  }
  &.btn--md {
    padding: 0.375rem 1.25rem 0.375rem 1.15rem;
  }
  &.btn--lg {
    padding: 0.625rem 1.625rem 0.125rem 1.625rem;
  }
  &:hover {
    color: $color-white;
    border-color: #00468e;
  }
}
</style>
