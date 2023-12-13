<template>

    <Button :type="'filled'" :size="'md'" @click="openModal">Meld deg på</Button>
    <Modal :is-open="modalOpen" @close="closeModal">
        <template v-slot:header>
            <h1>Meld deg på kompetansepakken</h1>
        </template>
        <template v-slot:main>
            <p>
                For å melde deg på en kompetansepakke, må du være innlogget.
            </p>
            <p>
                Dersom du har Feide-bruker kan du logge inn med denne,
                dersom du ikke har en Feide-bruker, kan du opprette en bruker ved hjelp av en annen e-postadresse og logge inn med denne.
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
      name: 'RegisterChoice',
      components: {
        Modal,
        Button,
      },
      props: {
        forwardTo: String,
        selfEnrollmentCode: String
      },
      data () {
        return {
            modalOpen: false,
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
            window.location.href = window.location.origin + "/search/all_courses?enroll_code=" + this.selfEnrollmentCode

        },
        goToCanvas() {
            console.log(window.location.origin)
            window.location.href = window.location.origin + "/enroll/" + this.selfEnrollmentCode
        }
      }
    }
    </script>

    <style scoped>

    </style>
