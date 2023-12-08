
<template>
  <div class="card-container">
    <div v-for="course in courses">

    <Card class="card-item" :class="{ modal_card: course.isModalOpen }"
      :isModalOpen="course.isModalOpen"
      :theme="course.course_settings? course.course_settings.course_category.category.color_code : 'theme_0'"
      :courseIllustration="course.course_settings? course.course_settings.image.path : ''"
      :label="course.name"
      >
      <template v-slot:closeModalButton v-if="course.isModalOpen">
        <span class="close" @click="closeModal(course)">&times;</span>
      </template>
      <template  v-slot:title> {{ course.name }} </template>
      <template class="card-content-description-text" v-slot:description> {{ course.public_description }} </template>

      <template v-if="course.enrolled" v-slot:enrolled>Påmeldt</template>
      <template v-if="authorized && !course.enrolled" v-slot:leftButton>
        <Button :type="'filled'" :size="'md'" @click="enrollToCourse(course.self_enrollment_code)">Meld deg på</Button>
      </template>
      <template v-if="!authorized" v-slot:leftButton>
        <RegisterChoice :selfEnrollmentCode="course.self_enrollment_code"></RegisterChoice>
      </template>
      <template v-slot:rightButton v-if="!course.isModalOpen && (!authorized || !course.enrolled)">
        <Button :type="'outlined'" :size="'md'" @click="handleModal(course)">Les mer</Button>
      </template>
      <template v-slot:moduleList v-if="course.isModalOpen && modules.length > 0">
        <ModulesList :modules="modules"></ModulesList>
      </template>
      <template v-if="course.enrolled" v-slot:goToCourse>
        <Button :type="'outlined'" :size="'md'" @click="goToCourse(course.id)">Gå til kompetansepakke</Button>
      </template>
    </Card>
    </div>

  </div>
</template>

<script >
import Card from './Card.vue'
import Button from './Button.vue';
import ModulesList from './ModulesList.vue';
import RegisterChoice from './login-choice/RegisterChoice.vue';

export default {
  name: 'CardList',
  components: {
    Card,
    Button,
    ModulesList,
    RegisterChoice,
  },
  props: {
    courses: Array,
    authorized: Boolean
  },
  data() {
    return {
      showModal: false,
      domain: window.location.origin,
      selectedCourse : {},
      modules: [],
      kpasApiUrl: KPASAPIURL,
    }
  },
  methods: {
    enrollToCourse (enrollCode) {
      window.location.href = this.domain + '/enroll/' + enrollCode
    },
    goToCourse (courseId) {
      window.location.href = this.domain + '/courses/' + courseId
    },
    async handleModal(course) {
      await this.viewModules(course.id);
      course.isModalOpen = true;
    },
    closeModal(course) {
      course.isModalOpen = false;
    },
    async viewModules (courseId) {
      let self = this;
      self.modules = [];
      if(this.authorized){
        await fetch(self.domain + '/api/v1/courses/' + courseId + '/modules', {
          method: 'GET',
          headers: {
          }
        }).then(response => response.json() ) .then(response => {

          response.forEach(module => {
            if(module.published === true){
              if(module.name.includes("nb:")){
                self.handleMultilangModules(module)
              }
              self.modules.push(module)
            }
          })

        })
    }
    else{
      await fetch(this.kpasApiUrl + '/course/' + courseId + '/moduletitles', {
        method: 'GET',
        headers: {
        }
      }).then(response => response.json() ) .then(response => {
        response = response.result
        response.forEach(module => {
          if(module.published === true){
            if(module.name.includes("nb:")){
              self.handleMultilangModules(module)
            }
            self.modules.push(module)
          }
        })

      })
    }
    },

    handleMultilangModules(module){
      let parts = module.name.split(["|"])
      for(let i = 0; i < parts.length; i++){
        if(parts[i].includes("nb")){
          module.name = parts[i].slice(3)
          break;
        }
      }
    },
  }

}
</script>

<style lang="scss">
@import '../design/_card-themes.scss';

.modal_card {
  width: 36.625rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: white;
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}
.card-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 140rem;
  align-items: flex-start;
  justify-content: flex-start;
  @media (max-width:1025px){
    width: 64rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
}
.card-item {
  margin: 0.25rem 1.5rem 2rem 0;
}
</style>
