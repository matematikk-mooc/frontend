<template>
  <div class="background">
    <Button @click="openModal">Open Modal</Button>
    <Modal :is-open="modalOpen" @close="closeModal">
      <template v-slot:header>
        <h2>This is the header content</h2>
      </template>
      <template v-slot:main>
        <div>This is the main content</div>
      </template>
      <template v-slot:actions>
        <Button type="filled">Hello</Button>
        <Button type="outlined"  @click="closeModal">Goodbye</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup>

import Modal from './Modal.vue'
import Button from '../Button.vue'
import { ref } from 'vue'

const modalOpen = ref(false)
const openModal = () => {
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}
</script>

<style lang="scss">
@import "../../design/colors.scss";
  .background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:  $color-grey-100;
    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>
