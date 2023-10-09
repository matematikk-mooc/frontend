<template>
  <Modal>
    <template v-slot:header>
      <ModalTitle>
        <h2>Hello title</h2>
      </ModalTitle>
    </template>
    <template v-slot:main>
      <ModalContent>
       <p> Here is some serious modal content.</p>
      </ModalContent>
    </template>
    <template v-slot:actions>
      <ModalActions>
        <Button>Hello</Button> 
      </ModalActions>
    </template>
  </Modal>
   <button @click="openModal">Open Modal</button>
</template>

<script>
import Modal from './Modal.vue'
import ModalTitle from './ModalTitle.vue'
import ModalContent from './ModalContent.vue'
import ModalActions from './Actions.vue'
import Button from '../Button.vue'
export default {
  components: {
    Modal,
  },
}
</script>
