<template>

<a class="header__link" @click="openModal">Logg inn</a>
<Modal :is-open="modalOpen" @close="closeModal">
    <template v-slot:header>
        <h1>Logg inn på kompetanseportalen</h1>
    </template>
    <template v-slot:main>
        <p>
            Dersom du har Feide-bruker kan du logge inn med denne, dersom du ikke har en Feide-bruker,
            kan du opprette en bruker ved hjelp av en annen e-postadresse og logge inn med denne
        </p>
    </template>
    <template v-slot:actions>
        <Button class="btn--lg" type="feideLogin" @click="goToFeide">LOGG INN MED FEIDE</Button>
        <Button class="btn--lg" type="outlined"  @click="goToCanvas">LOGG INN UTEN FEIDE</Button>
    </template>

</Modal>

</template>


<script>
import Modal from '../modal/Modal.vue'
import Button from '../Button.vue'
export default {
  name: 'LoginChoice',
  components: {
    Modal,
    Button,
  },
  props: {

  },
  data () {
    return {
        modalOpen: false
    }
  },
  methods: {
    openModal () {
      this.modalOpen = true
    },
    closeModal () {
      this.modalOpen = false
    },
    goToFeide() {
        console.log(window.location.origin)
        window.location.href = window.location.origin + "/courses?login=1&design=udir"
    },
    goToCanvas() {
        console.log(window.location.origin)
        window.location.href = window.location.origin + "/login/canvas?normalLogin=1&design=udir"
    }
  }
}
</script>

<style scoped>

</style>