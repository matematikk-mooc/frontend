<template>
   <Transition name="fade" mode="out-in">
  <div v-if="isOpen"  :key="isOpen ? 'visible' : 'hidden'" class="backdrop" >

    <div class="modal">
      <div class="modal__close-button">
        <IconButton @click="closeModal" />
      </div>
      <div class="modal__header">
        <slot name="header" v-if="$slots.header" >
        </slot>
      </div>

      <div class="modal__body" v-if="$slots.main" >
        <slot name="main" >

        </slot>
      </div>

      <div class="modal__actions" v-if="$slots.actions" >
        <slot name="actions">
        </slot>
      </div>
    </div>
  </div>
   </Transition>
</template>

<script setup>
import  IconButton  from '../icon-button/IconButton.vue';
import { ref, defineProps, defineEmits } from 'vue'

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
  .modal{
    position: relative;
    background-color: $color-white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    min-width: 30rem;
    padding: 0 0.5rem 0.5rem 0.5rem;
    &__close-button{
      position:absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
    &__header, h1, h2, h3 {
      position:relative;
      left: 0;
      top:0;
      color:$color-black;
      font-size: 1.125rem;
      font-family: Montserrat;
      font-weight: 500;
      word-wrap: break-word;
      width: calc(100% - 1.25rem);
    }

    &__body, p {
      color: $color-black;
      font-size: 1rem;
      font-family: Roboto;
      font-weight: 400;
      line-height: 1.25rem;
      margin-bottom: 1rem;
      word-wrap: break-word;
      padding:0.5rem 0 0.5rem 0;
      max-width: 40rem;
   }

    &__actions {
      position: relative;
      z-index: 1001;
      width: 100%;
      display:flex;
      justify-content:flex-end;
       > *  { margin: 0 0.125rem; }
    }
  }
</style>
