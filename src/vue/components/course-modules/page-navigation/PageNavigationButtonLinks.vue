<template>
  <div class="page-button-link-navigation">
    <div class="page-button-link-container-left">
      <ButtonLink v-show="previousUrl !== null" type="previous" :url="previousUrl"><span class="leftText">Forrige</span></ButtonLink>
    </div>
    <div class="page-button-link-container-right">
      <ButtonLink  v-show="nextUrl !== null" type="next" :url="nextUrl"><span class="rightText">Neste</span></ButtonLink>
    </div>
  </div>
</template>

<script setup>
import ButtonLink from '../../../components/button/ButtonLink.vue';

// Define props
const props = defineProps(['previousUrl', 'nextUrl']);
</script>

<style lang="scss">
.module-sequence-custom-footer-content{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}
.custom-button-navigation-wrapper{
  width: 100%;
  box-sizing: border-box;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

}
.page-button-link-navigation {
  display: flex;
  width: 100%;
  gap: 50%;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  .page-button-link-container-right{
    align-self: flex-end;
    min-width: 5rem;
    a {
      height: 26px;
      .rightText {
        padding-right:10px;
      }
      svg {
        margin-right: -10px;
      }
    }
  }
  .page-button-link-container-left{
    align-self: flex-start;
    min-width: 5rem;
    height: 42px;
        a {
      height: 26px;
      .leftText {
        padding-left: 10px;
      }
      svg {
        margin-left: -10px;
      }
    }
  }

  .btn-link {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

}
</style>
