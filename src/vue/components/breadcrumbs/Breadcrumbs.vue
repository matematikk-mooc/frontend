<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <div class="breadcrumbs__container">
      <!-- Desktop: full breadcrumb trail -->
      <ol class="breadcrumbs__list breadcrumbs__list--desktop">
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

      <!-- Mobile: back arrow + current page -->
      <div class="breadcrumbs__mobile">
        <Link v-if="previousItem" :url="previousItem.url" class="breadcrumbs__back-link">
          <svg class="breadcrumbs__back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
          <span class="breadcrumbs__text">{{ stripText(previousItem.label) }}</span>
        </Link>
        <span v-else class="breadcrumbs__current">
          <span class="breadcrumbs__text">{{ stripText(currentItem.label) }}</span>
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
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

const currentItem = computed(() => props.items[props.items.length - 1]);
const previousItem = computed(() => props.items.length >= 2 ? props.items[props.items.length - 2] : null);

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

  // Ensure no low-res globe/link or other injected icons appear
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
    text-decoration-thickness: 0.03em;
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

  // Mobile: hide full trail, show back + current
  &__mobile {
    display: none;
  }

  @media (max-width: 30rem) {
    &__list--desktop {
      display: none;
    }

    &__mobile {
      display: flex;
      align-items: center;
    }

    &__back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      color: $primary-hover-color;
      text-decoration: none;
      background: none !important;
      background-image: none !important;
      padding: 0 !important;

      &::before,
      &::after {
        content: none !important;
        background: none !important;
        background-image: none !important;
      }

      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.27em;
        text-decoration-thickness: 0.06em;
      }
    }
    &__text {
      margin-left: 4px;
    }

    &__back-icon {
      flex-shrink: 0;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }

    &__current {
      color: $color-grey-600;
    }
  }
}
</style>
