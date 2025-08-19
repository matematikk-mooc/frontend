<template>
   <Transition name="fade" mode="out-in">
  <div v-if="isOpen" :tabIndex="0" :key="isOpen ? 'visible' : 'hidden'" class="backdrop" >

    <div class="modal-box">
      <div class="modal-box__close-button">
        <IconButton @click="closeModal" />
      </div>
      <div class="modal-box__header">
        <slot name="header" v-if="$slots.header" >
        </slot>
      </div>

      <div class="modal-box__body" v-if="$slots.main" >
        <slot name="main" >

        </slot>
      </div>

      <div class="modal-box__actions" v-if="$slots.actions" >
        <slot name="actions">
        </slot>
      </div>
    </div>
  </div>
   </Transition>
</template>

<script setup>
import  IconButton  from '../icon-button/IconButton.vue';

const { isOpen } = defineProps(['isOpen'])
const emit = defineEmits()

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss">
@import "../../design/colors.scss";
  .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    background-color: $color-grey-100;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

  }
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to, .fade-leave-active {
  opacity: 0;
}
  .modal-box{
    box-sizing:border-box;
    position: relative;
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 30rem;
    max-width: 70rem;
    max-height: 80vh;
    &__close-button{
      position:absolute;
      z-index:999;
      right: 0.5rem;
      top: 0.5rem;
    }
    &__header{
      box-sizing:border-box;
      position:relative;
      width: 100%;
      left: 0;
      top:0;
      color:$color-black;
      font-size: 1.125rem;
      font-family: Inter;
      font-weight: 500;
      word-wrap: break-word;
       h1, h2, h3 {
        padding: 0 1rem 0 1rem;
        font-size: 1.25rem;
        width: calc(100% - 2rem);
       }
    }

    &__body {
      box-sizing:border-box;
      color: $color-black;
      font-size: 1rem;
      font-family: Inter;
      font-weight: 400;
      line-height: 1.25rem;
      margin-bottom: 1rem;
      word-wrap: break-word;
      padding:0.5rem 1rem 0.5rem 1rem;
      width: 100%;
      overflow-y:auto;
   }

    &__actions {
      position: relative;
      box-sizing: border-box;
      z-index: 1001;
      padding: 0 1rem 1rem 1rem;
      width: 100%;
      display:flex;
      justify-content:flex-end;
       > *  { margin: 0 0.125rem; }
    }
  }

  .course-page__banner-container .modal-box{
    max-width: 40rem;
  }
</style>
