<template>
  <header class="header__content">
    <div class="header-brand">Kompetanseportalen</div>
    <ul class="header__link-list">
      <li class="header__list-item">
        <span>
          <a class="header__link" :href="'url'">Ofte stilte spørsmål</a>
        </span>
      </li>

      <li class="header__list-item" v-if="!logged_in">
        <span>
          <a class="header__link" :href="loginLink">Logg inn</a>
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
  const props = defineProps(['logged_in'])
  const domain = window.location.origin;
  const loginLink = domain + "/login/canvas"
  const settingsLink = domain + "/profile/settings?design=udir"
  const logoutLink = domain + "/logout?design=udir"

</script>
<style lang="scss">
@import '../../design/colors.scss';
.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  font-family: 'Montserrat', 'Helvetica Neue', 'sans-serif';
  padding: 1.25rem 0.725rem;
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
}

.header__link-list {
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  margin-left: 1.7rem;
  margin-top: 0.875rem;
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
