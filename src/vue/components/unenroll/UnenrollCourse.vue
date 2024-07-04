<template>
    <Modal :is-open="isModalOpen" @close="closeModal">
        <template v-slot:header>
            <h1>Bekreft avmelding</h1>
        </template>

        <template v-slot:main>
            <p>
                Er du sikker på at du vil melde deg av dette emnet? Du vil ikke lenger se emnedeltagere eller kommunisere direkte med foreleserne, og vil ikke kunne se hendelsene fra emnet i strømmen din og som varslinger.
            </p>
        </template>

        <template v-slot:actions>
            <Button class="btn--lg" type="outlined"  @click="unenrollCourse">Meld deg av emnet</Button>
        </template>
    </Modal>
</template>


<script>
import Modal from '../modal/Modal.vue'
import Button from '../Button.vue'
import {getCookie} from '../../utils/url-utils';
export default {
    name: 'UnenrollCourse',
    components: {
        Modal,
        Button,
    },
    props: {
        courseId: String,
        unenrollmentUuid: String,
        isModalOpen: Boolean,
        closeModal: Function
    },
    methods: {
        unenrollCourse() {
            const url = `/courses/${this.courseId}/self_unenrollment/${this.unenrollmentUuid}`
            const csrfToken = getCookie('_csrf_token');

            const formData = new URLSearchParams();
            formData.append('_method', 'POST');
            formData.append('authenticity_token', csrfToken);

            fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Csrf-Token': decodeURIComponent(csrfToken)
                },
            })
            .then(response => {
                if (!response.ok) throw new Error(`Network response was not ok for unenrollment (courseId: ${this.courseId}, unenrollmentUuid: ${this.unenrollmentUuid})`);
                window.location.href = '/search/all_courses';
            })
            .catch(() => {
                this.closeModal();
            })
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
