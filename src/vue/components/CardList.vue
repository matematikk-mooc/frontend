
<template>
  <div class="card-container">
    <div v-for="course in courses">

    <Card class="card-item"
      :theme="course.course.course_settings? course.course.course_settings.course_category.category.color_code : 'theme_0'"
      :courseIllustration="course.course.course_settings? course.course.course_settings.image.path : ''">
      <template v-slot:title> {{ course.course.name }} </template>
      <template v-slot:description> {{ course.course.public_description }} </template>
      <template v-slot:leftButton>Meld deg på</template>
      <template v-slot:rightButton>Les mer</template>
    </Card>
  </div>
  </div>
</template>

<script setup>
import Card from './Card.vue'

const { courses } = defineProps(['courses']);
</script>

<style lang="scss">
.card-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 64rem;
  align-items: flex-start;
  justify-content: flex-start;
}
.card-item {
  margin: 0.25rem 1.5rem 2rem 0;
}
</style>
