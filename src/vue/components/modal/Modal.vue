<template>
  <div v-if="isOpen" class="backdrop" @click="closeModal">
    <div class="modal">
      <div class="modal__close-button">
        <IconButton @click="closeModal" />
      </div>
      <!-- Render the header only if the slot has children -->
      <div v-if="!$slots.header" class="modal__header">
        <slot name="header">
        </slot>
      </div>
        <!-- Render the main only if the slot has children -->
      <div class="modal__body"  v-if="$slots.main">
        <slot name="main" >
        
        </slot>
      </div>
      <div class="modal__actions">
        <slot name="actions">
          <!-- Render the actions only if the slot has children -->
          <template v-if="!$slots.actions">Default Actions Content</template>
        </slot>
      </div>
    </div>
  </div>
</template>
e>

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
  .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .modal{
    border: 1px solid blue;
    &__content {
      padding: 1.5rem;

    }

    &__header {
      color: black;
      font-size: 1.25rem;
      font-family: Montserrat;
      font-weight: 500;
      word-wrap: break-word
    }

    &__body {
      color: black;
      font-size: 1rem;
      font-family: Roboto;
      font-weight: 400;
      line-height: 1.5rem;
      word-wrap: break-word
   }

    &__actions {
      display:flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>
