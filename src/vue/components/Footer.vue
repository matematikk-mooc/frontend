<template>
  <div>
    <div class="footer-licence"  v-if="licence">
      <footer-licence></footer-licence>
    </div>
    <div class="footer">
      <div class="footer">
        <img src="http://localhost:9000/assets/utdanningsdirektoratet-logo-rgb-neg.png" alt="logo" class="logo">
        <div class="footer-information">
          <span class="footer-delivery">Kompetansepakker er levert av Utdanningsdirektoratet</span>
          <br/>
          <ul class="footer-links">
            <li><a class="footer-link" id="contact-point" v-bind:href="'mailto:' + contactPoint">Kontakt</a></li>
            <li><a class="footer-link" id="about-platform" v-bind:href="about">Om Kompetansepakker</a></li>
            <li><a class="footer-link" id="privacy-policy" v-bind:href="privacyLink">Personvernerklæring</a></li>
            <li id="uu-status">Tilgjengelighetserklæring på
              <a class="footer-link" id="uu-status-nb" v-bind:href="uuStatusNb" target="_blank" rel="noreferrer">Bokmål</a>
              <svg-icon type="mdi" :path="mdiOpenInNew" :size="16"></svg-icon>
              <a class="footer-link" id="uu-status-nn" v-bind:href="uuStatusNn" target="_blank" rel="noreferrer">Nynorsk</a>
              <svg-icon type="mdi" :path="mdiOpenInNew" :size="16"></svg-icon>
            </li>
          </ul>
        </div>
        <div>
          <external-button></external-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    licence: Boolean,
    privacyLink: String,
    homeOrg: String,
    contactPoint: String,
    about: String,
    uuStatusNb: String,
    uuStatusNn: String,
  },
}
</script>

<script setup>
import ExternalButton from './subcomponents/ExternalButton.vue';
import FooterLicence from './subcomponents/FooterLicence.vue'
import SvgIcon from 'vue3-icon';
import {mdiOpenInNew} from '@mdi/js'
</script>

<style>

.footer {
  width: 100%;
  height: 6.25rem;
  flex-grow: 0;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 107px;
  padding: 0 0 1rem 0;
  background-color: #2e3c51;
}

.footer-licence {
  width: 100%;
  height: 2.5rem;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 0 1rem 0;
}

.logo {
  width: 9.063rem;
  height: 2.625rem;
  flex-grow: 0;
}

.footer-information {
  justify-content: center;
  align-content:  center;
  text-align: center;

}

.footer-delivery {
  width: 25.063rem;
  height: 1.063rem;
  flex-grow: 0;
  font-family: Montserrat;
  font-size: 0.875rem;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  align-content: center;
}

.footer-links{
  width: 56.375rem;
  height: 2.063rem;
  flex-grow: 0;
  display: inline;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  text-align: center;
}
.footer-links li {
  display: inline-block;
  margin: 0 10px;
  position: relative;
  padding-right: 10px;
}

.footer-links li:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 80%;
  border-right: 1px solid white;
}
.footer-link {
  width: fit-content;
  height: 1rem;
  flex-grow: 0;
  font-family: Montserrat;
  font-size: 0.875rem;
  text-align: center;
  color: white;
  text-decoration: underline;
  padding: 0.5rem;
}

#uu-status {
  color: white;
  display: inline-block;
  margin-top: 10px;
}

</style>
