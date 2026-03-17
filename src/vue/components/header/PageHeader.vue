<template>
  <header class="header__content" :class="{'stage': isStage, 'prod': !isStage}">
    <!-- Header -->
    <a :href="isStage ? 'https://bibsys.test.instructure.com/search/all_courses' : 'https://bibsys.instructure.com/search/all_courses'" class="header-brand">
      Kompetanseportalen
    </a>
    <div v-if="isStage" class="stage-banner">stage</div>
    <Dropdown :logged_in="logged_in" :admin="admin" :backgroundColor="'white'" :iconType="'hamburger'" :icon="'settings'" :link="settingsLink"></Dropdown>
    <!-- Navbar -->
    <ul class="header__link-list mobile-hide login-container">
      <template v-if="!logged_in">
          <button  v-if="renderLoginLink" class="login-button">Logg inn</button>
          <li class="header__list-item" v-else="renderLoginLink">
            <a class="header__link" :href="frontpageLink">Forsiden</a>
          </li>
      </template>
        <ul class="dropdown-list">
          <li v-if="renderLoginLink"><a class="login-dropdown" :href="feideLink"> Feide <Icon name="chevron_right" size="22"/></a></li>
          <li v-if="renderLoginLink"><a class="login-dropdown" :href="loginLink"> Canvas <Icon name="chevron_right" size="22"/></a></li>
        </ul> 
      <template v-if="logged_in">
      <li class="header__list-item" v-if="admin">
        <a class="header__link" :href="adminLink">Administrator</a>
      </li>
        <li class="header__list-item">
          <a class="header__link" :href="settingsLink">Innstillinger</a>
        </li>
        <li class="header__list-item">
          <a class="header__link" :href="logoutLink">Logg ut</a>
        </li>
      </template>
    </ul>
  </header>
</template>

<script setup>
  import Dropdown from '../dropdown/Dropdown.vue'
  const {logged_in, admin} = defineProps(['logged_in', 'admin'])
  const domain = window.location.origin;
  const loginLink = domain + "/login/canvas"
  const feideLink = domain + "/login/saml/2"
  const normalLoginLink = loginLink + "?normalLogin=1&design=udir"
  const frontpageLink = domain + "/search/all_courses"
  const settingsLink = domain + "/profile/settings"
  const logoutLink = domain + "/logout"
  const adminLink = domain + "/accounts"
  const isStage =  domain.includes('bibsys.test')
  const showMenu = ref(false);
  const currentPath = window.location;
  
import { ref, onMounted, computed } from 'vue';
import Icon from "../icon/Icon.vue";

// On component mount, get the current path

const renderLoginLink = computed(() => {
    return currentPath == loginLink ? (console.log("1st"), false)
         : currentPath == normalLoginLink ? (console.log("2nd"), false)
         : (console.log("3rd"), true)
});
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
  font-family: 'Inter', 'Helvetica Neue', 'sans-serif';
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
  height:100px;
  place-content: center;
  flex-grow: 0;
  font-family: 'Inter';
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: $color-black;
  margin-left: 12px;
  text-decoration: none !important;
  transition: transform 0.2s ease;
  &:hover {
    color: #1a1a1a !important;
    transform: scale(1.02);
  }
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
  z-index: 10000;
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

.dropdown-list {
  position: absolute;
  top: 0;
  right: 0;
  margin: unset !important;
  margin-top: 6.4rem !important;
  width: 13.75rem;
  z-index: 2000;
  box-shadow: rgba(50, 50, 93, 0.25) 0rem .8125rem 1.6875rem -0.3125rem, rgba(0, 0, 0, 0.3) 0rem .5rem 1rem -0.5rem;
  transition: all 0.2s ease;
  list-style: none;
  cursor: pointer;
  .login-dropdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 1rem;
    background-color: $color-white ;
    color: black;
    font-size: .875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      background-color: #E3F2EB;
      font-weight:bold;
      text-decoration:none;
    }
    .material-icon {
      display:flex;
      color: #94CAAE;
    }
  }
}

button{
  all: unset;
  cursor: pointer;
}

.login-container {
  height: -webkit-fill-available;
  margin: 0;

  .login-button {
  width: 100%;
  height:100%;
  flex: 1;
    padding: 0 20px;
      transition: all 0.2s ease;
    &:hover {
      background-color: #94CAAE;
      
  }
  }
  .dropdown-list {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  &:focus-within .dropdown-list {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}


</style>
