<template>
  <header class="header__content">
    <div class="header-brand">Kompetanse portalen</div>
    <ul class="header__link-list">
      <li class="header__list-item">
        <span>
          <a class="header__link" :href="'url'">FAQ</a>
        </span>
      </li>

      <li class="header__list-item">
        <span>
          <a class="link header__link" :href="'url'">Login</a>
        </span>
      </li>
    </ul>
  </header>
</template>

<script></script>
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
  color: $grey-900;
  text-decoration: none;
  border-bottom: 0.125rem solid $color-white;
  &:hover {
    color: $primary-hover-color;
    border-bottom: 0.125rem solid $primary-hover-color;
  }
  &::after {
    display: block;
    content: '';
    height: 1.25;
    position: absolute;
    right: 0.75rem;
    top: 0.5rem;
    width: 0.125rem;
  }
}
</style>
