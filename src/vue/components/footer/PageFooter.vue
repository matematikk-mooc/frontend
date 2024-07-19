<template>
  <footer>
    <License v-if="hasLicense"></License>
    <div class="page-footer--content">
      <div class="page-footer--content-wrapper">
        <div class="page-footer--logo-wrapper">
          <a :href="'https://www.udir.no/'">
            <img aria-label="forside utdanningsdirektoratet" class="page-footer--logo" :src="`${server}logo-white.png`" />
          </a>
        </div>
        <div class="page-footer--main-content">
          <div class="main-content--header">
            Kompetansepakker er levert av Utdanningsdirektoratet
          </div>
          <div class="page-footer--link-container">
            <PageFooterLink :url="'https://kompetanseudirno.azureedge.net/udirdesign/omkompetanseudirno.html'"><template v-slot:footerlink>Om kompetansepakker</template></PageFooterLink>
            <div class="page-footer--divider mobile-hide"></div>
            <PageFooterLink :url="'mailto:kompetansesupport@udir.no'"><template v-slot:footerlink>Kontakt</template></PageFooterLink>
            <div class="page-footer--divider mobile-hide"></div>
              <PageFooterLink :url="'https://kompetanseudirno.azureedge.net/udirdesign/privacypolicy.html?v=1_0'"><template v-slot:footerlink>Personvernerklæring</template></PageFooterLink>
              <div class="page-footer--divider mobile-hide"></div>
            <span class="mobile-hide">
              <span class="page-footer--accessibility-declaration mobile-accessibility-container ">
                Tilgjengelighetserklæring på
              </span>
              <PageFooterLink aria-label="Tilgjengelighetserklæring på bokmål" :type="'open-in-new'" :url="'https://uustatus.no/nb/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431'"><template v-slot:footerlink>Bokmål</template></PageFooterLink>
              <PageFooterLink aria-label="Tilgjengelighetserklæring på nynorsk" :type="'open-in-new'" :url="'https://uustatus.no/nn/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431'"><template v-slot:footerlink>Nynorsk</template></PageFooterLink>
            </span>
          </div>
          <div class="mobile-accessibility-container page-footer--link-container desktop-hide"> 
              Tilgjengelighetserklæring på
            <span class="mobile-accessibility-links">
              <PageFooterLink aria-label="Tilgjengelighetserklæring på bokmål" :type="'open-in-new'" :url="'https://uustatus.no/nb/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431'"><template v-slot:footerlink>Bokmål</template></PageFooterLink>
              <PageFooterLink aria-label="Tilgjengelighetserklæring på nynorsk" :type="'open-in-new'" :url="'https://uustatus.no/nn/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431'"><template v-slot:footerlink>Nynorsk</template></PageFooterLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import PageFooterLink from './PageFooterLink.vue'
import License from './License.vue'
const server = SERVER;

const { hasLicense } = defineProps(['hasLicense']);
</script>

<style lang="scss">
@import '../../design/colors.scss';

.page-footer--content {
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  .page-footer--content-wrapper {
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    background: map-get($color-palette-steel, background, 700);
    justify-content: center;
    align-items: flex-end;
    gap: 4rem;
    display: inline-flex;
    .page-footer--logo-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      a{
          cursor: pointer;
      }

      .page-footer--logo {
        width: 9.125rem;
        height: 2.625rem;
      }
    }
    .page-footer--main-content {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      display: inline-flex;
    }
    .main-content--header {
      color: $color-white;
      text-align: center;
      font-size: 0.875rem;
      font-family: 'Montserrat';
      font-weight: 600;
      word-wrap: break-word;
    }
  }

  .page-footer--link-container {
    font-size: 0.875rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $color-white;
    font-family: 'Montserrat';
    .page-footer--accessibility-declaration {
      margin-bottom: -0.5rem;
    }
  }
  .page-footer--divider {
    width: 0.0625rem;
    height: 1.25rem;
    margin: 0 1.5rem -0.25rem 1.5rem;
    border-right: 0.0625rem solid $color-white;
  }
  .page-footer--link {
    text-underline-offset: 2px;
  }
}
</style>
