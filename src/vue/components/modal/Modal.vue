<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
      </div>
      <div class="modal-body">
        <slot name="main"></slot>
      </div>
      <div class="modal-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-close-button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
