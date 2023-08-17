<template>
  <div class="footer-licence">
    <span class="licence">
      Lisensnivå: Illustrasjoner og filmer utviklet i regi av prosjektet:
      <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" class="licence-link" target="_blank" rel="license">
        <span>CC BY-NC-ND 4.0</span>
      </a>
      <svg-icon type="mdi" :path="mdiOpenInNew" :size="16"></svg-icon>
    </span>
    <span class="licence">
      Annet innhold utviklet i regi av prosjektet:
      <a href="http://creativecommons.org/licenses/by-nc-sa/4.0" class="licence-link" target="_blank" rel="license">
        <span>CC BY-NC-SA 4.0</span>
      </a>
      <svg-icon type="mdi" :path="mdiOpenInNew" :size="16"></svg-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: 'FooterLicence',
}
</script>

<script setup>
import SvgIcon from 'vue3-icon';
import { mdiOpenInNew } from '@mdi/js/mdi.js';
</script>

<style>
.footer-licence {
  color: black;
  background-color: white;
  display: inline-block;
  width: 100%;
  height: fit-content;
}

.licence{
  height: 1.25rem;
  flex-grow: 0;
  font-family: Montserrat;
  font-size: 0.75rem;
}

.licence-link{
  text-decoration: none !important;
  color: black;
}
</style>
