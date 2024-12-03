<template>
  <div class="header--nav-container">
    <!-- this gives users using screenreader, the opportunity to skip all navigation and go right to content -->
    <a class="skip-to-content-link" :href="mainContentId">
      Gå til hovedinnhold
    </a>
    <PageHeader :logged_in="logged_in" :admin="admin"></PageHeader>
    <span class="nav-bar-container" :class="{ logged_out: !logged_in }">
      <nav class="page--nav-bar">
        <NavBarLinks :logged_in="logged_in"></NavBarLinks>
      </nav>
    </span>
  </div>
</template>
<script setup>
import PageHeader from './PageHeader.vue'
import NavBarLinks from './NavBarLinks.vue'

const {logged_in, admin, mainContentId} = defineProps(['logged_in', 'admin', 'mainContentId'])

</script>

<style lang="scss">
@import '../../design/colors.scss';

.nav-bar-container {
  width: 100%;
  z-index: 3;
}
.logged_out {
  display: none;
}
.header--nav-container {
  width: 100%;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 0;
  border-bottom: 1px solid black;
  .skip-to-content-link {
  left: 50%;
  position: absolute;
  transform: translateY(-100%);
}
}

.page--nav-bar {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0;
  background-color: $color-grey-900;
  z-index: 1;
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
