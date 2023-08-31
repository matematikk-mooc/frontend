<script setup>
import Card from './Card.vue'
</script>
<template>
  <div class="card-container">
    <Card class="card-item" :theme="'theme_0'"></Card>
    <Card class="card-item" :theme="'theme_1'"></Card>
    <Card class="card-item" :theme="'theme_2'"></Card>
    <Card class="card-item" :theme="'theme_3'"></Card>
    <Card class="card-item" :theme="'theme_4'"></Card>
    <Card class="card-item" :theme="'theme_5'"></Card>
    <Card class="card-item" :theme="'theme_6'"></Card>
    <Card class="card-item" :theme="'theme_7'"></Card>
    <Card class="card-item" :theme="'theme_8'"></Card>
  </div>
</template>

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
