<template>
  <div class="course-page-announcements-container">
    <a :href="concatenatedUrl" class="course-page-announcements-link">
      <h3 class="course-page-announcements-title">
        <Icon aria-hidden="true" class="announcements-icon" name="campaign" size="2em" />
        <span>Kunngjøringer</span>
      </h3>
      <div class="course-page-announcements-count" v-if="count > 0">{{ count }}</div>
    </a>
  </div>
  
</template>

<script setup>
import Icon from '../icon/Icon.vue';
import { computed } from 'vue';

const props = defineProps({
  count: Number,
  url: String,
});

const concatenatedUrl = computed(() => {
  try {
    const currentLocation = window.location.href;
    const baseUrlMatch = currentLocation.match(/^(https?:\/\/[^/]+)/);
    const baseUrl = baseUrlMatch ? baseUrlMatch[1] : '';
    return baseUrl + props.url;
  } catch (error) {
    // Handle any errors, e.g., invalid URLs
    console.error('Error:', error);
    // Use a default URL or an empty string if an error occurs
    return '';
  }
});
</script>

<style lang="scss">
@import '../../design/box-shadow';
@import '../../design/colors.scss';
.course-page-announcements-container{
  width: 100%;
  max-width: 26rem!important;
  min-width:unset;
  background-color: map-get($color-palette-steel, background, 200);
  padding: .5rem .5rem .5rem 2rem;
  border-radius: 1.6875rem 0 0 1.6875rem;
  border: 0.0625rem solid $color-grey-400;
  margin-bottom: 1rem;
  box-sizing: border-box;
  @include box-shadow(medium);

}
.course-page-announcements-link {
    text-decoration: none;
    display: flex;
    position: relative;
    box-sizing: border-box;
    font-family: Roboto;
    color: map-get($color-palette-steel, foreground, 200);
    align-items: center;
    justify-content: flex-start;
    gap: .5rem;
   
    .course-page-announcements-title {
      font-size: 1.125rem;
      letter-spacing: 0.05em;
      box-sizing: border-box;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .course-page-announcements-count {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      top: 0.065rem;
      width: 1rem;
      height: 1rem;
      font-size: 0.875rem;
      background-color: map-get($color-palette-red, background, 600);
      padding: 0.125rem;
      border-radius: 50%;
      color: map-get($color-palette-red, foreground, 600);
  }

    &:hover {
      text-decoration: none;
      background-color: map-get($color-palette-azur, background, 300);
      color: map-get($color-palette-azur, foreground, 300);
      .course-page-announcements-title {
        font-weight: 600;
      }
    }
}
</style>

