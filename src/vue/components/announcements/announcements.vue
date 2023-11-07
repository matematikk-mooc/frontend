<template>
<a href="link-to-announcements" class="course-page-announcements__container">
  <h3 class="course-page-announcements__title">
    <Icon aria-hidden="true" class="announcements-icon" name="campaign" size="2em" />
    <span>Kunngjøringer</span>
  </h3>
  <div class="course-page-announcements__count">{{ count }}</div>
</a>
</template>
<script setup>
import Icon from '../icon/Icon.vue'
const { props } = defineProps(['count']);
</script>

<style lang="scss">
@import '../../design/box-shadow';
@import '../../design/colors.scss';
.course-page-announcements {
  &__container{
  text-decoration:none;
  display: flex;
  width: 100%;
  position: relative;
  font-family: Roboto;
  color:map-get($color-palette-steel, foreground, 200);
  max-width: 35rem;
  min-width: 30rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  border-radius: 1.6875rem 0 0 1.6875rem;
  border: 0.0625rem solid $color-grey-400; 
  gap: 0.5rem;
  background-color: map-get($color-palette-steel, background, 200);
  @include box-shadow(medium); 
  }
  &__title {
    font-size: 1.125rem;
    letter-spacing: 0.05em;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display:flex;
    align-items:center;
    gap:0.5rem;
  }

  &__count {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -0.25rem;
    width: 1rem;
    height: 1rem;
    font-size: 0.875rem;
    background-color: map-get($color-palette-red, background, 600);
    padding: 0.125rem;
    border-radius: 50%;
    color: map-get($color-palette-red, foreground, 600);
  }
}
</style>
