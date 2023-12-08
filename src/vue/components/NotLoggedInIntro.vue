<template>
  <div class="intro-container">
    <div class="intro-text">
      Tjenesten er laget for ansatte i skole og barnehage. Den er gratis og du kan logge på med
      Feide eller opprette en egen bruker. Første gang du skal logge på med egen bruker må du
      registrere deg i en av kompetansepakkene nedenfor, deretter kan du logge inn med knappen oppe
      til høyre.
    </div>

    <div class="intro-news">
      <h1>Vår nyeste kompetansepakke</h1>
      <Card
        :theme="newestCourse.course_settings? newestCourse.course_settings.course_category.category.color_code : 'theme_0'"
        :courseIllustration="newestCourse.course_settings? newestCourse.course_settings.image.path: ''"
        >
        <template v-slot:title> {{ newestCourse.name }} </template>
        <template v-slot:description> {{ newestCourse.public_description }} </template>
        <template v-slot:leftButton>
          <Button :type="'filled'" :size="'md'" @click="enrollToCourse(newestCourse.self_enrollment_code)">Meld deg på</Button>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="js">
import Card from './Card.vue'
import Button from './Button.vue';
const {newestCourse} = defineProps(['newestCourse']);
</script>

<style>
.intro-container {
  width: 100%;
  padding: 0.5rem 6rem 0.5rem 10rem;
  margin-top: 1.5rem;
  display: inline-grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 3rem;
}

.intro-text {
  margin-top: 1.5rem;
  font-size: 1.375rem;
  line-height: 2rem;
}
.intro-news {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  h2 {
    font-size: 1.375rem;
    line-height: 2.5rem;
  }
}
</style>
