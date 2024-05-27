<template>
  <div class="dropdown-container desktop-hide">
    <button aria-label="Åpne nedtrekksmeny" @click="handleFocus" class="dropdown-toggle-button">
        <Icon :name="iconType"/>
    </button>
    <ul class="dropdown-list" v-show="showMenu">
        <li v-if="admin"><a @click="handleLinkClick" class="dropdown-item" :href="adminLink">Administrator <Icon name="chevron_right" size="22"/></a> </li>
        <li v-if="logged_in"><a  @click="handleLinkClick" class="dropdown-item" :href="settingsLink">Innstillinger <Icon name="chevron_right" size="22"/></a> </li>
        <li v-if="!logged_in"><a class="dropdown-item" :href="loginLink"> Logg inn <Icon name="chevron_right" size="22"/></a></li>  
        <li v-if="logged_in"><a class="dropdown-item" :href="logoutLink"> Logg ut <Icon name="chevron_right" size="22"/></a></li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Icon from "../icon/Icon.vue";

const domain = window.location.origin;
const loginLink = domain + "/login/canvas"
const logoutLink = domain + "/logout"
const settingsLink = domain + "/profile/settings"
const adminLink = domain + "/accounts"
const showMenu = ref(false);

const props = defineProps({
iconType: String,
backgroundColor: String,
showMenu: Boolean,
logged_in: Boolean,
admin: Boolean,
});

const handleFocus = () => {
  showMenu.value = !showMenu.value;
};
const handleLinkClick = () => {
    showMenu.value = false;
};
</script>

<style scoped lang="scss">
@import "../../design/colors.scss";

.dropdown-toggle-button {
  height: 3.75rem;
  width: 3.75rem;
  border: none;
  padding: 0.125rem;
  z-index: 1020;
  background-color: v-bind(backgroundColor);
  color: $color-black;
  font-size: 2rem;
  border-radius: 0 !important;
  cursor: pointer;
  transition: all 0.2s ease;
    &:hover {
        background-color: #94CAAE;
    }
    &:focus {
        background-color: #7DBF9D;
    }
}

.dropdown-list {
  position: absolute;
  top: 0;
  right: 0;
  margin: unset !important;
  margin-top: 3.6875rem !important;
  width: 13.75rem;
  z-index: 2000;
  box-shadow: rgba(50, 50, 93, 0.25) 0rem .8125rem 1.6875rem -0.3125rem, rgba(0, 0, 0, 0.3) 0rem .5rem 1rem -0.5rem;
  transition: all 0.2s ease;
  .dropdown-item {
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

// Hides the dropdown list when the focus is not within the dropdown or button
div:not(:focus-within) ul {
  display: none;
}
</style>