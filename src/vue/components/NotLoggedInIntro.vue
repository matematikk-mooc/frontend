<template>
  <div class="intro-container">
    <div class="intro-text">
      Tjenesten er laget for ansatte i skole og barnehage. Den er gratis og du kan logge på med
      Feide eller opprette en egen bruker. Første gang du skal logge på med egen bruker må du
      registrere deg i en av kompetansepakkene nedenfor, deretter kan du logge inn med knappen oppe
      til høyre.
    </div>

    <div class="intro-news">
      <h1>Vår nyeste kompetansepakke</h1>

      <CardHighlighted class="card-highlighted"
        :theme="newestCourse.course_settings ? newestCourse.course_settings?.course_category?.category.color_code : 'theme_0'"
        :courseIllustration="newestCourse.course_settings ? newestCourse.course_settings?.image.path : ''"
        :label="newestCourse.name"
        :filters="newestCourse.course_settings ? newestCourse.course_settings.course_filter : []"
      >
        <template v-slot:new-flag>
          <NewCourseFlag v-if="newCourseFlag()"></NewCourseFlag>
        </template>
        <template v-slot:title>{{ newestCourse.name }}</template>
        <template v-slot:description>{{ truncateString(newestCourse.public_description) }}</template>

        <template v-slot:leftButton>
          <RegisterChoice :selfEnrollmentCode="newestCourse.self_enrollment_code"></RegisterChoice>
        </template>
        <template  v-slot:rightButton>
          <Button :fullWidth="true" :type="'outlined'" :size="'md'" @click="handleModal()">Les mer</Button>
        </template>
      </CardHighlighted>

      <Modal :is-open="isModalOpen" @close="closeModal()">
        <template v-slot:header>
          <div class="course-illustration-box" :class="newestCourse.course_settings ? newestCourse.course_settings?.course_category?.category.color_code : 'theme_0'">
            <img
              class="course-illustration-box-image"
              :src="newestCourse.course_settings ? newestCourse.course_settings?.image.path : ''"
              alt=""
            />
          </div>
          <h2>{{ newestCourse.name }}</h2>
        </template>
        <template v-slot:main>
          <p class="course-description">{{ newestCourse.public_description }}</p>
          <ModulesList :modules="modules"></ModulesList>
        </template>
        <template v-slot:actions>
          <RegisterChoice :selfEnrollmentCode="newestCourse.self_enrollment_code"></RegisterChoice>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import CardHighlighted from './CardHighlighted.vue';
import Button from './Button.vue';
import ModulesList from './ModulesList.vue';
import Modal from '../components/modal/Modal';
import RegisterChoice from './login-choice/RegisterChoice.vue';
import NewCourseFlag from './NewCourseFlag.vue';
import { shallowUpdateUrlParameter } from '../utils/url-utils';

export default {
  name: 'NotLoggedInIntro',
  components: {
    CardHighlighted,
    Button,
    ModulesList,
    Modal,
    RegisterChoice,
    NewCourseFlag,
  },
  props: {
    newestCourse: Object,
  },
  data() {
    var url = new URL(window.location.href);
    var coursePreviewId = url.searchParams.get("course_preview_id");
    var coursePreviewFeatured = url.searchParams.get("course_preview_featured");
    var showCoursePreview = coursePreviewFeatured == "true" && coursePreviewId != null && this.newestCourse != null
      && coursePreviewId == this.newestCourse.id;

    if (showCoursePreview) {
      this.viewModules(coursePreviewId)
    }

    return {
      modules: [],
      isModalOpen: showCoursePreview,
      domain: window.location.origin,
    }
  },
  methods: {
    enrollToCourse(enrollCode) {
      window.location.href = this.domain + '/enroll/' + enrollCode;
    },
    newCourseFlag() {
    if (this.newestCourse.course_settings) {
      console.log(this.newestCourse.course_settings?.course_category.new)
      if (this.newestCourse.course_settings?.course_category) {
        return this.newestCourse.course_settings?.course_category.new;
      }
    }
      return false;
    },
    truncateString(str) {
      if (!str) {
        return '';
      }
      if (str.length > 100) {
        return str.substring(0, 120) + '...';
      }
      return str;
    },
    goToCourse(courseId) {
      window.location.href = this.domain + '/courses/' + courseId;
    },
    async handleModal() {
      await this.viewModules(this.newestCourse.id);
    },
    closeModal() {
      shallowUpdateUrlParameter("course_preview_id", null)
      shallowUpdateUrlParameter("course_preview_featured", null)
      this.isModalOpen = false;
    },
    async viewModules(courseId) {
      shallowUpdateUrlParameter("course_preview_id", courseId)
      shallowUpdateUrlParameter("course_preview_featured", "true")

      this.isModalOpen = true;
      let self = this;
      self.modules = [];

      await fetch(KPASAPIURL + '/course/' + courseId + '/moduletitles', {
        method: 'GET',
        headers: {},
      })
        .then(response => response.json())
        .then(response => {
          response = response.result;
          response.forEach(module => {
            if (module.published === true) {
              console.log(111111, module, self.modules)
              if (module.name.includes('nb:')) {
                self.handleMultilangModules(module);
              }
              self.modules.push(module);
            }
          });
        })
        .catch(() => {
          this.closeModal()
        });
    },

    handleMultilangModules(module) {
      let parts = module.name.split(['|']);
      for (let i = 0; i < parts.length; i++) {
        if (parts[i].includes('nb')) {
          module.name = parts[i].slice(3);
          break;
        }
      }
    },
  }
}

</script>

<style scoped lang="scss">
@import '../design/_card-themes.scss';
.intro-container {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 6rem 0.5rem 9rem;
  margin-top: 1rem;
  margin-bottom: 20px;
  display: inline-grid;
  grid-template-columns: auto auto;
  justify-content: center;
  gap: 3rem;
  @media screen and (max-width: 1000px){
    display: flex;
    flex-direction: column;
  }
}

.intro-text {
  margin-top: 1.5rem;
  font-size: 1.375rem;
  line-height: 2rem;
}
.intro-news {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  h1 {
    font-size: 1.375rem;
    line-height: 2.5rem;
  }
}

.backdrop{
  background-color: rgba(153, 153, 153, 0.8);
}

.card-highlighted {
  box-sizing: border-box !important;
  justify-content: space-between !important;
}

.course-illustration-box {
  z-index: 100;
  position: relative;
  width: 100%;
  height: 10rem;
   @media screen and (max-height: 960px){
      display:none;
    }

  .course-illustration-box-image {
    width: 100%;
    height: 100%;
    object-position: right bottom;

  }
}

.course-description {
  line-height: 1.5;
}

.theme_0 {
  background: map-get($theme_0, background);
}

.theme_1 {
  background: map-get($theme_1, background);
}

.theme_2 {
  background: map-get($theme_2, background);
}

.theme_3 {
  background: map-get($theme_3, background);
}

.theme_4 {
  background: map-get($theme_4, background);
}

.theme_5 {
  background: map-get($theme_5, background);
}

.theme_6 {
  background: map-get($theme_6, background);
}

.theme_7 {
  background: map-get($theme_7, background);
}

.theme_8 {
  background: map-get($theme_8, background);
}

.theme_9 {
  background: map-get($theme_9, background);
}
</style>
