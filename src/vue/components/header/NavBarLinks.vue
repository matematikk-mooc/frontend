<template>
  <div class="nav-bar__link-list-container">
    <ul class="nav-bar__link-list">
      <li class="nav-bar__list-item">
        <span>
          <a class="nav-bar__link" :href="myCourses">Mine kompetansepakker</a>
        </span>
      </li>
      <li class="nav-bar__list-item">
        <span>
          <a class="nav-bar__link" :href="allCourses">Alle tilgjengelige kompetansepakker</a>
        </span>
      </li>
    </ul>
  </div>
</template>
<script setup>
  defineProps(['logged_in'])

  const domain = window.location.origin;
  const myCourses = domain + "/courses?design=udir"
  const allCourses = domain + "/search/all_courses?design=udir"
</script>

<style lang="scss">
@import '../../design/colors.scss';

.nav-bar__link-list-container {
  display: block;
}
.nav-bar__link-list {
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  padding: 0.25rem;
  margin-left: 1.7rem;
  margin-top: 0.875rem;
  width: 100%;
  height: 100%;
}

.nav-bar__list-item {
  display: block;
  margin: 0 1.5rem 0.25rem 0.5rem;
  position: relative;
  font-weight: 500;
  color: $color-white;
  &:before {
    height: 0;
    width: 0;
  }
  &:not(:last-child):after {
    background-color: map-get($color-palette-green, background, 400);
    content: '';
    display: block;
    height: 1.25rem;
    text-decoration: none;
    word-break: break-word;
    position: absolute;
    top: 50%;
    right: -1rem;
    transform: translateY(-50%);
    width: 0.063rem;
  }
}

.nav-bar__link {
  display: block;
  color: $color-white;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
  &:hover {
    color: map-get($color-palette-green, background, 400);
  }
}
</style>
