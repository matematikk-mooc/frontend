<template>
  <header class="header__content" :class="{'stage': isStage, 'prod': !isStage}">
    <!-- Header -->
    <div class="header-brand">Kompetanseportalen</div>
    <div v-if="isStage" class="stage-banner">stage</div>
    <Dropdown :logged_in="logged_in" :admin="admin" :backgroundColor="'white'"  :iconType="'hamburger'" :icon="'settings'" :link="settingsLink"></Dropdown>
    <!-- Navbar -->
    <ul class="header__link-list mobile-hide">
      <li class="header__list-item" v-if="admin">
        <span>
          <a class="header__link" :href="adminLink">Administrator</a>
        </span>
      </li>
      <li class="header__list-item" v-if="!logged_in">
        <span>
          <LoginChoice></LoginChoice>
        </span>
      </li>
      <li class="header__list-item" v-if="logged_in">
        <span>
          <a class="header__link" :href="settingsLink">Innstillinger</a>
        </span>
      </li>
      <li class="header__list-item" v-if="logged_in">
        <span>
          <a class="header__link" :href="logoutLink">Logg ut</a>
        </span>
      </li>
    </ul>
  </header>
</template>

<script setup>
  import LoginChoice from '../login-choice/LoginChoice.vue';
  import Dropdown from '../dropdown/Dropdown.vue'
  const {logged_in, admin} = defineProps(['logged_in', 'admin'])
  const domain = window.location.origin;
  const loginLink = domain + "/login/canvas"
  const settingsLink = domain + "/profile/settings"
  const logoutLink = domain + "/logout"
  const adminLink = domain + "/accounts"
  const isStage =  domain.includes('bibsys.test')
</script>
<style lang="scss">
@import '../../design/colors.scss';

.stage-banner {
position: absolute;
left:0;
color: white;
background-color: white;
font-size: 1.25rem;
padding: 10px;
rotate: -45deg;
background-color: #BED5E8;
font-weight: 500;
font-size: 26px;
font-family: Arial, Helvetica, sans-serif;
}


.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  font-family: 'Montserrat', 'Helvetica Neue', 'sans-serif';
  padding: 20px 0 20px 0;
  width: 100%;
  min-height: 3.75rem;
  &.prod {
    background-color: white;
  }
  &.stage {
  background-color: #BED5E8;
  }
}

.header-brand {
  height: 29.008px;
  flex-grow: 0;
  font-family: 'montserrat';
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: $color-black;
  margin-left: 12px;
}

@media screen and (max-width: 345px) {
  .header-brand {
     font-size: 7vw;
  }
}

.header__link-list {
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.7rem;
  margin-top: 0.875rem;
  @media screen and (max-width: 679.5px) {
    display: none;
    
  }
}

.header__list-item {
  display: block;
  margin: 4px 24px 4px 0;
  position: relative;
  font-weight: 500;
  &:before {
    height: 0;
    width: 0;
  }
  &:not(:last-child):after {
    background-color: $color-grey-300;
    content: '';
    display: block;
    height: 20px;
    text-decoration: none;
    word-break: break-word;
    position: absolute;
    top: 50%;
    right: -14px;
    transform: translateY(-50%);
    width: 2px;
  }
}

.header__link {
  display: block;
  font-size: 18px;
  color: $color-grey-900;
  text-decoration: none;
  border-bottom: 2px solid $color-white;
  &:hover {
    text-decoration: none;
    color: #00468e;
    border-bottom: 2px solid #00468e;
  }
  &::after {
    display: block;
    content: '';
    position: absolute;
    right: 12px;
    top: 8px;
    width: 2px;
  }
}
</style>
