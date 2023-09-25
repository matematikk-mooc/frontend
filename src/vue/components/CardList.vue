
<template>
  <div class="card-container">
    <div v-for="course in courses">

    <Card class="card-item" :courseId="course.id"
      :theme="course.course_settings? course.course_settings.course_category.category.color_code : 'theme_0'"
      :courseIllustration="course.course_settings? course.course_settings.image.path : ''">
      <template v-slot:title> {{ course.name }} </template>
      <template v-slot:description> {{ course.public_description }} </template>
      <template v-if="course.enrolled" v-slot:enrolled>Påmeldt</template>
      <template v-if="!authorized || !course.enrolled" v-slot:leftButton>Meld deg på</template>
      <template v-if="!authorized || !course.enrolled" v-slot:rightButton>Les mer</template>
      <template v-if="course.enrolled" v-slot:goToCourse>Gå til kompetansepakke</template>
    </Card>
  </div>
  </div>
</template>

<script setup>
import Card from './Card.vue'

const { courses } = defineProps(['courses', 'authorized']);
const domain = window.location.origin;

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
