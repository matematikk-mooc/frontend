<template>
  <aside class="portal-closure-banner" aria-label="Informasjon om Kompetanseportalen">
    <p>
      Fra <strong>31. januar 2027</strong> vil kompetanseportalen ikke lenger være tilgjengelig.
      Store deler/det meste av innholdet vil være tilgjengelig på Udirs kursportal:
      <a href="https://kurs.udir.no">kurs.udir.no</a>
    </p>
  </aside>
</template>

<style scoped lang="scss">
.portal-closure-banner {
  box-sizing: border-box;
  width: 100%;
  margin: 1rem 0 2rem;
  padding: 2rem 1.5rem;
  border-radius: 4px;
  background-color: #fff3e0;
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;

  p {
    margin: 0;
  }

  a {
    color: #0067b1;
    text-decoration: underline;

    &:hover {
      color: #00468e;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
}
</style>
