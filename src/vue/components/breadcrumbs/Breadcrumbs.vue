<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <div class="breadcrumbs__container">
      <ol class="breadcrumbs__list">
        <li
          v-for="(item, idx) in items"
          :key="idx + '-' + item.label"
          class="breadcrumbs__item"
          :aria-current="idx === items.length - 1 ? 'page' : null"
        >
          <component :is="item.url && idx !== items.length - 1 ? Link : 'span'" :url="item.url" class="breadcrumbs__link">
            <span class="breadcrumbs__text">{{ stripText(item.label) }}</span>
          </component>
          <span v-if="idx !== items.length - 1" class="breadcrumbs__separator" aria-hidden="true">
            {{ separator }}
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
import Link from '../link/Link.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  separator: {
    type: String,
    default: '›',
  },
});

// Fjern lisens fra tittle
function stripText(text) {
  const idx = text.indexOf("::");
  return idx === -1 ? text : text.slice(0, idx).trim();
}
</script>

<style lang="scss">
@import "../../design/colors.scss";

.breadcrumbs {
  width: 100%;
  border-bottom: 1px solid $color-grey-300;
  background: $color-grey-100;
  font-size: 1rem;

  &__container {
    margin: 0 auto;
    padding: 0.5rem 1.25rem;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    color: $color-grey-600;
    line-height: 1.6;
  }

  .link {
    color: $primary-hover-color;
    text-decoration: none;
    text-underline-offset: 0.27em;
    text-decoration-thickness: 0.06em;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.27em;
      text-decoration-thickness: 0.06em;
    }
  }

  /* Ensure no low-res globe/link or other injected icons appear */
  &__link {
    background: none !important;
    background-image: none !important;
    padding: 0 !important;

    &::before,
    &::after {
      content: none !important;
      background: none !important;
      background-image: none !important;
    }
  }

  // Also neutralize Canvas/publisher decorations on any anchors within breadcrumbs
  a::before,
  a::after {
    content: none !important;
    background: none !important;
    background-image: none !important;
  }

  &__text {
    color: black;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 0.06em;
  }

  &__link:hover &__text {
    text-decoration-thickness: 0.15em;
  }

  &__separator {
    margin: 0 0.85rem;
    color: $color-grey-600;
  }

  &__item[aria-current='page'] &__text {
    font-weight: 400;
    text-decoration: none;
    text-underline-offset: initial;
    text-decoration-thickness: initial;
  }
}
</style>
