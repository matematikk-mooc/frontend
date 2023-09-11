<template>
  <div class="intro-container">
    <div class="intro-text">
      Tjenesten er laget for ansatte i skole og barnehage. Den er gratis og du kan logge på med
      Feide eller opprette en egen bruker. Første gang du skal logge på med egen bruker må du
      registrere deg i en av kompetansepakkene nedenfor, deretter kan du logge inn med knappen oppe
      til høyre.
    </div>

    <div class="intro-news">
      <h2>Vår nyeste kompetansepakke</h2>
      <Card :theme="'theme_2'"></Card>
    </div>
  </div>
</template>

<script setup>
import Card from './Card.vue'
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
