<template>
  <div class="modules-list">
    Moduler:
    <ul v-for="m in modulesList" :key="m.id">
      <li>
        {{m.name}}
      </li>
    </ul>

  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
const {modules} = defineProps(['modules'])
const modulesList = ref([...modules])
</script>

<style lang="scss">

.modules-list {
    margin-top: 1rem;
    font-family: 'Roboto';
    font-weight: 400;
  }

</style>