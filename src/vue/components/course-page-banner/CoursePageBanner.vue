<template>
  <div class="course-page__banner" :class="theme">
    <div class="course-page__banner__illustration">
      <img :src="imageUrl" />
    </div>
    <h1 class="course-page__banner__title">
      {{ title }}
    </h1>
    <div class="course-page__banner__actions">
      <Button type="outlined">Meld deg av</Button>
     <DropdownButton></DropdownButton>
    </div>
  </div>
</template>

<script>
import Button from '../Button.vue';
import DropdownButton from '../dropdown-button/DropdownButton.vue';

export default {
  props: {
    imageUrl: String,
    theme: String,
    title: String,
  },
  setup(props) {
    return {
      imageUrl: props.imageUrl,
      theme: props.theme,
      title: props.title,
    };
  },
  components: {
    Button,
    DropdownButton
  },
};
</script>

<style lang="scss">
@import '../../design/card-themes';

.course-page__banner {
  width: 100%;
  height: 12rem;
  padding: 0 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__illustration {
    width: 26rem;
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }

  &__title {
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0 1rem 0 1rem;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: flex-end;
    margin-right: 1rem;
  }

  &.theme_0 {
    background: map-get($theme_0, background);
  }
  &.theme_1 {
    background: map-get($theme_1, background);
  }
  &.theme_2 {
    background: map-get($theme_2, background);
  }
  &.theme_3 {
    background: map-get($theme_3, background);
  }
  &.theme_4 {
    background: map-get($theme_4, background);
  }
  &.theme_5 {
    background: map-get($theme_5, background);
  }
  &.theme_6 {
    background: map-get($theme_6, background);
  }
  &.theme_7 {
    background: map-get($theme_7, background);
  }
  &.theme_8 {
    background: map-get($theme_8, background);
  }
}
</style>


