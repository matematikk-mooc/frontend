<template>
<div class="course-page-announcements-container">
  <span>Kunngjøringer</span><span>{{ count }}</span>
</div>
</template>
<script setup>
const { props } = defineProps(['count']);
</script>
<style lang="scss">
.course-page-announcements-container{
  display: flex;
   width: 100%;
  max-width: 35rem;
  min-width: 30rem;
  align-items: center;
  justify-content: flex-start;
  padding: 1.25rem;
  border-radius: 1.25rem 0 0 1.25rem;
  background: #F5F7F9;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.15);
}
</style>
