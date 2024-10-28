<template>
  <header class="header__content">
    <!-- Header -->
    <div class="header-brand">Kompetanseportalen</div>
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

</script>
<style lang="scss">
@import '../../design/colors.scss';



.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  font-family: 'Montserrat', 'Helvetica Neue', 'sans-serif';
  padding: 1.25rem 0 1.25rem 0;
  width: 100%;
}

.header-brand {
  height: 1.813rem;
  flex-grow: 0;
  font-family: 'montserrat';
  font-size: 1.5rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: $color-black;
  margin-left: .75rem;
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
  margin: 0.25rem 1.5rem 0.25rem 0;
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
    height: 1.25rem;
    text-decoration: none;
    word-break: break-word;
    position: absolute;
    top: 50%;
    right: -0.875rem;
    transform: translateY(-50%);
    width: 0.125rem;
  }
}

.header__link {
  display: block;
  font-size: 1.125rem;
  color: $color-grey-900;
  text-decoration: none;
  border-bottom: 0.125rem solid $color-white;
  &:hover {
    color: #00468e;
    border-bottom: 0.125rem solid #00468e;
  }
  &::after {
    display: block;
    content: '';
    position: absolute;
    right: 0.75rem;
    top: 0.5rem;
    width: 0.125rem;
  }
}
</style>
