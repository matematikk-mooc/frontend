<template>
  <footer>
    <slot></slot>
    <div class="page-footer--content">
      <div class="page-footer--content-wrapper">
        <div class="page-footer--logo-wrapper">
          <a :href="'https://www.udir.no/'" alt="udir.no">
            <img class="page-footer--logo" :src="`${server}/logo-white.png`" />
          </a>
        </div>
        <div class="page-footer--main-content">
          <div class="main-content--header">
            Kompetansepakker er levert av Utdanningsdirektoratet
          </div>

          <div class="page-footer--link-container">
            <PageFooterLink :url="'https://kompetanseudirno.azureedge.net/udirdesign/omkompetanseudirno.html'">Om kompetanskepakker</PageFooterLink>
            <div class="page-footer--divider"></div>
            <PageFooterLink :url="'https://kompetanseudirno.azureedge.net/udirdesign/privacypolicy.html?v=1_0'">Personvernerklæring</PageFooterLink>
            <div class="page-footer--divider"></div>
            <span class="page-footer--accessibility-declaration">
              Tilgjengelighetserklæring på
            </span>

            <PageFooterLink :type="'open-in-new'">Bokmål</PageFooterLink>
            <PageFooterLink :type="'open-in-new'">Nynorsk</PageFooterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import PageFooterLink from './PageFooterLink.vue'
const server = SERVER;
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
  // bottom: 0;

  .page-footer--content-wrapper {
    width: 100%;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    background: map-get($color-palette-steel, background, 700);
    justify-content: center;
    align-items: flex-end;
    gap: 4rem;
    display: inline-flex;
    .page-footer--logo-wrapper {
      a{
          cursor: pointer;
      }
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
}
</style>
