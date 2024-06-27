<template>
  <article tabIndex="0" :aria-label="label" class="card-box">
    <div class="card-illustration-box" :class="theme">
    <slot name="new-flag"></slot>
      <img
        class="card-illustration-box-image"
        :src="courseIllustration"
        alt=""
      />
      <slot name="closeModalButton"></slot>
    </div>
    <div class="card-content-container">
      <header class="card-box-title">
        <h2><slot name="title"></slot></h2>
      </header>
      <section class="card-content-description">
        <p :class="{ description_text: true }">
          <slot name="description"></slot>
          <slot name="moduleList"></slot>
        </p>

        <ul class="card-content-tags">
          <template  v-for="filterItem in filters" :key="filterItem.filter_id">
            <li>{{ filterItem.filter.filter_name }}</li>
          </template>
        </ul>

        <div class="card-content-enrolled">
          <img
            v-if="hasGoToCourse"
            class="card-content-enrolled-icon"
            alt=""
            :src="server + 'enrolled-green-circle.svg'"
          />
          <p v-if="hasGoToCourse" class="card-content-enrolled-text">
            <slot name="enrolled"></slot>
          </p>
        </div>
        <div class="card-content-button-container">
          <slot name="leftButton"></slot>
          <slot name="rightButton"></slot>
          <slot name="goToCourse"></slot>
        </div>
      </section>
    </div>
  </article>
</template>

<script lang="js">
import NewCourseFlag from './NewCourseFlag.vue';

export default {
  name: 'Card',
  components: {
    NewCourseFlag,
  },
  props: {
    theme: String,
    courseIllustration: String,
    label: String,
    filters: Array
  },
  data() {
    return {
      server: SERVER,
      hasGoToCourse: this.$slots.goToCourse !== undefined,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../design/_card-themes.scss';

.card-box {
  position: relative;
  width: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  background-color: $card-background-color;
  height: 100%;

  .card-illustration-box {
    position: relative;
    width: 100%;
    height: 10rem;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .theme_0 {
    background: map-get($theme_0, background);
  }
  .theme_1 {
    background: map-get($theme_1, background);
  }
  .theme_2 {
    background: map-get($theme_2, background);
  }
  .theme_3 {
    background: map-get($theme_3, background);
  }
  .theme_4 {
    background: map-get($theme_4, background);
  }
  .theme_5 {
    background: map-get($theme_5, background);
  }
  .theme_6 {
    background: map-get($theme_6, background);
  }
  .theme_7 {
    background: map-get($theme_7, background);
  }
  .theme_8 {
    background: map-get($theme_8, background);
  }
  .theme_9 {
    background: map-get($theme_9, background);
  }

  .card-illustration-box-image {
    width: 100%;
    height: 100%;
    object-position: right bottom;
  }

  .card-content-container {
    box-sizing: border-box;
    flex-grow: 2;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    font-family: Roboto;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-content-description {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .card-content-tags {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    margin-top: 10px;
  }

  .card-content-tags li {
    background: #eaeaf5;
    padding: 4px 15px;
    margin: 0px;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }

  .card-content-button-container {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }

  .card-box-title {
    h2,
    h3 {
      font-size: 1.125rem;
      font-family: 'Roboto';
      font-weight: 600;
      line-height: 1.5rem;
      margin: 0;
    }
  }

  .card-content-enrolled {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    height: 2rem;
    width: 100%;
  }

  .card-content-enrolled-text {
    font-size: 0.875rem;
    font-family: 'Roboto';
    font-weight: 400;
    color: black;
  }

  .card-content-enrolled-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  .description_text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
}
</style>
