<template>
  <Modal>
    <template v-slot:header>
   
        <h2>Hello title</h2>
    </template>
    <template v-slot:main>
       <p> Here is some serious modal content.</p>
    </template>
    <template v-slot:actions>
        <Button>Hello</Button> 
        <Button>GoodBye</Button> 
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import Button from '../Button.vue'
export default {
  components: {
    Modal,
    Button
  },
}
</script>
