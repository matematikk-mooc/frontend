<template>

    <Modal :is-open="modalOpen" @close="closeModal">
        <template v-slot:header>
            <h1>Ikke påmeldt</h1>
        </template>
        <template v-slot:main>
            <p>
                For å utnytte innholdet i denne kompetansepakken best mulig, må du melde deg på. 
            </p>
            <p v-if="!authenticated">
                Dersom du har Feide-bruker kan du logge inn med denne,
                dersom du ikke har en Feide-bruker, kan du opprette en bruker ved hjelp av en annen e-postadresse og logge inn med denne.
            </p>
        </template>
        <template v-slot:actions>
            <Button v-if="!authenticated" class="btn--lg" type="feideLogin" @click="goToFeide">LOGG INN MED FEIDE</Button>
            <Button v-if="!authenticated" class="btn--lg" type="outlined"  @click="goToCanvas">LOGG INN UTEN FEIDE</Button>
            <Button v-if="authenticated" :fullWidth="true" :type="'filled'" :size="'md'"  @click="goToCanvas">Meld deg på</Button>
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
    background-color: rgba(153, 153, 153, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

}
.modal{
    opacity: 1 !important;
}

</style>
