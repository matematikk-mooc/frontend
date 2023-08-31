<template>
  <div class="card">
    <div class="card-illustration-box" :class="theme">
      <img
        class="card-illustration-box-image"
        src="../assets/IllustrasjonerKompetansepakker/elever-med-stor-laeringspotensial-liten.svg"
        alt="illustrasjon"
      />
    </div>
    <div class="card-content-container">
      <div class="card-content-title">
        <h3>What everything is about.</h3>
      </div>
      <div class="card-content-description">
        Here is some content for the card content. The card is very useful to display key
        information about other content.
      </div>
      <div class="card-content-button-container">
        <Button :type="'filled'" :size="'md'"></Button>
        <Button :type="'outlined'" :size="'md'"></Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import Button from './Button.vue';
const props = defineProps(['theme'])
</script>

<style lang="scss" scoped>
@import '../design/colors.scss';

.card {
  position: relative;
  width: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  background-color: $color-white;
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

  .card-illustration-box-image {
    width: 100%;
    height: 100%;
    object-position: right bottom;
  }
  .card-content-container {
    width: 100%;
    height: 100%;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
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
    }
  }
}
</style>
