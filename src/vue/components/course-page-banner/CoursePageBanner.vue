<template>
  <div class="course-page__banner-container" :class="theme">
    <div class="course-page__banner">
      <div class="course-page__banner__illustration" ariaHidden="true">
        <img :src="imageUrl" />
      </div>
      <h1 class="course-page__banner__title">
        {{ title }}
      </h1>
      <div class="course-page__banner__actions">
        <Button v-if="isEnrolled && isFrontPage" type="outlined" class="self_unenrollment_link">Meld deg av</Button>
      <LanguageSelectorContainer :languages="languages"></LanguageSelectorContainer>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../Button.vue';
import LanguageSelectorContainer from '../language-selector-container/LanguageSelectorContainer.vue';

export default {
  props: {
    imageUrl: String,
    theme: String,
    title: String,
    isEnrolled: Boolean,
    isFrontPage: Boolean,
    languages: String,
  },
  setup(props) {
    return {
      imageUrl: props.imageUrl,
      theme: props.theme,
      title: props.title,
      isEnrolled: props.isEnrolled,
      isFrontPage: props.isFrontPage,
      languages: props.languages
    };
  },
  components: {
    Button,
    LanguageSelectorContainer
  },
};
</script>

<style lang="scss">
@import '../../design/card-themes';

.course-page__banner-container {
  width: 100%;
  height: 12rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 0 1rem 0 1rem;
  margin: 2.5rem 0 2.5rem 0;


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
  &.theme_9 {
    background: map-get($theme_9, background);
  }
}

.course-page__banner {
  width: 100%;
  max-width: 2100px;
  height: 12rem;
  padding: 0 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  &__illustration {
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }

    @media screen and (max-width: 1100px) {
      display: none;
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
}
</style>
