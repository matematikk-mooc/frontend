<template>

    <Button :fullWidth="fullWidth" :type="'filled'" :size="'md'" @click="openModal">Meld deg på</Button>
    <Modal :is-open="modalOpen" @close="closeModal">
        <template v-slot:header>
            <h1>Påmelding</h1>
        </template>
        <template v-slot:main>
            <p>
                For å melde deg på en kompetansepakke, må du være innlogget.
            </p>
            <p>
                Dersom du har en Feide-bruker kan du logge inn med denne,
                dersom du ikke har en Feide-bruker, kan du opprette en Canvas bruker ved hjelp av en annen e-postadresse og logge inn med denne.
            </p>
        </template>
        <template v-slot:actions>
            <Button class="btn--lg" type="feideLogin" @click="goToFeide">Feide pålogging</Button>
            <Button class="btn--lg" type="outlined"  @click="goToCanvas">Canvas pålogging</Button>
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
        selfEnrollmentCode: String,
        fullWidth: Boolean
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
            window.location.href = window.location.origin + "/search/all_courses?enroll_code=" + this.selfEnrollmentCode

        },
        goToCanvas() {
            window.location.href = window.location.origin + "/enroll/" + this.selfEnrollmentCode
        }
      }
    }
    </script>

    <style scoped>

    </style>
