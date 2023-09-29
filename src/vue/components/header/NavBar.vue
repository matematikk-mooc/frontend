<template>
  <div class="header--nav-container">
    <PageHeader :logged_in="$props.logged_in"></PageHeader>
    <nav class="page--nav-bar">
      <NavBarLinks></NavBarLinks>
    </nav>
  </div>
</template>
<script setup>
import PageHeader from './PageHeader.vue'
import NavBarLinks from './NavBarLinks.vue'
const loggedIn = defineProps(['logged_in'])
</script>

<style lang="scss">
@import '../../design/colors.scss';
.header--nav-container {
  width: 100%;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
}

.page--nav-bar {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 26.75rem;
  background-color: $color-grey-900;
}

.header--links {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: center;
  min-width: 40rem;
  cursor: pointer;
}
</style>
