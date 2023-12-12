<template>
  <article tabIndex="0"  :aria-label="label" class="card">
    <div class="card-illustration-box" :class="theme">
      <img
      class="card-illustration-box-image"
      :src="courseIllustration"
      alt=""
      />
      <slot name="closeModalButton"></slot>
    </div>
    <div class="card-content-container">
      <header class="card-content-title">
        <h2> <slot name="title"></slot></h2>
      </header>
      <section class="card-content-description">
        <p :class="{ description_text: !isModalOpen}">
        <slot name="description"></slot>
        <slot name="moduleList"></slot>
      </p>


   <div>
        <slot name="filtername"></slot>
      </div>
      <div class="card-content-enrolled" v-if="hasGoToCourse">
        <img class="card-content-enrolled-icon" alt="" :src="server +'enrolled-green-circle.svg'"/>
        <p class="card-content-enrolled-text">
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

export default {
  name: 'Card',
  components: {
  },
  props: {
    theme: String,
    courseIllustration: String,
    isModalOpen: Boolean,
    label: String
  },
   data() {
      return {
        server: SERVER,
        hasGoToCourse: this.$slots.goToCourse !== undefined,
      }
    }
}
</script>

<style lang="scss">
@import '../design/_card-themes.scss';

.card {
  position: relative;
  width: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  background-color: $card-background-color;
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
    height: 100%;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    font-family: Roboto;
    font-weight: 400;
  }

  .card-content-button-container {
    margin-top: 1.5rem;
    display: inline-grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;
  }
  .card-content-title {

    h3 {
      font-size: 1.125;
      font-family: 'Roboto';
      font-weight: 600;
      line-height: 150%;
    }
  }
  .card-content-enrolled {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;

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
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

}
</style>
