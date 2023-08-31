<script setup>
import CardList from '../components/CardList.vue'
import CardFilter from '../components/CardFilter.vue'
import Banner from '../components/Banner.vue'
import NotLoggedInIntro from '../components/NotLoggedInIntro.vue'
</script>
<template>
  <div class="not-logged-in-page">
    <div class="not-logged-in-page--header">
      <Banner></Banner>
      <NotLoggedInIntro></NotLoggedInIntro>
    </div>
    <div class="not-logged-in-page--content">
      <h2>Alle tilgjengelige kompetansepakker</h2>
      <div class="not-logged-in-page--layout">
        <CardFilter></CardFilter>
        <CardList></CardList>
      </div>
    </div>
    <div class="not-logged-in-page--footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.not-logged-in-page {
  height: 100%;
  width: 100%;
  max-width: 1600px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.not-logged-in-page--header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.not-logged-in-page--content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.5rem;
  h2 {
    font-size: 2rem;
    margin: 1.5rem 0 1.5rem 0;
  }
}
.not-logged-in-page--layout {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.not-logged-in-page--footer {
  width: 100%;
}
</style>
