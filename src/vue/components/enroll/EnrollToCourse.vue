<template>

    <Modal :is-open="modalOpen" @close="closeModal">
        <template v-slot:header>
            <h1>Ikke påmeldt</h1>
        </template>
        <template v-slot:main>
            <p>
                For å utnytte innholdet i denne kompetansepakken best mulig, burde du melde deg på.
            </p>
            <p v-if="!authenticated">
                Dersom du har en Feide-bruker kan du logge inn med denne,
                dersom du ikke har en Feide-bruker, kan du opprette en Canvas bruker ved hjelp av en annen e-postadresse og logge inn med denne.
            </p>
        </template>
        <template v-slot:actions>
            <Button v-if="!authenticated" :type="'filled'" :size="'lg'" @click="goToFeide">Feide pålogging</Button>
            <Button v-if="!authenticated" class="btn--lg" type="outlined"  @click="goToCanvas">Canvas pålogging</Button>
            <Button v-if="authenticated"  :type="'filled'" :size="'md'"  @click="goToCanvas">Meld deg på</Button>
        </template>

    </Modal>

</template>


<script>
import Modal from '../modal/Modal.vue'
import Button from '../Button.vue'
export default {
    name: 'EnrollToCourse',
    components: {
        Modal,
        Button,
    },
    props: {
        selfEnrollmentCode: String,
        authenticated: Boolean
    },
    data () {
        return {
            modalOpen: true,
            selfEnrollmentCode: this.selfEnrollmentCode,
        }
    },
    methods: {
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

.backdrop{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(64, 64, 64, .8) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

}
.modal{
    opacity: 1 !important;
}

</style>
