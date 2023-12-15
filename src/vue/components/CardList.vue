
<template>
  <div class="card-container">
    <div v-for="course in courses" :key="course.id">
      <Card class="card-item"
        :theme="course.course_settings ? course.course_settings.course_category.category.color_code : 'theme_0'"
        :courseIllustration="course.course_settings ? course.course_settings.image.path : ''"
        :label="course.name"
      >
        <template v-slot:title>{{ course.name }}</template>
        <template v-slot:description>{{ truncateString(course.public_description) }}</template>

        <template v-if="course.enrolled" v-slot:enrolled>Påmeldt</template>
        <template v-if="authorized && !course.enrolled" v-slot:leftButton>
          <Button :type="'filled'" :size="'md'" @click="enrollToCourse(course.self_enrollment_code)">Meld deg på</Button>
        </template>
        <template v-if="!authorized" v-slot:leftButton>
          <RegisterChoice :selfEnrollmentCode="course.self_enrollment_code"></RegisterChoice>
        </template>
        <template v-if="(!authorized || !course.enrolled)" v-slot:rightButton>
          <Button :type="'outlined'" :size="'md'" @click="handleModal(course)">Les mer</Button>
        </template>
        <template v-if="course.isModalOpen && modules.length > 0" v-slot:moduleList>
          <ModulesList :modules="modules"></ModulesList>
        </template>
        <template v-if="course.enrolled" v-slot:goToCourse>
          <Button :type="'outlined'" :size="'md'" @click="goToCourse(course.id)">Gå til kompetansepakke</Button>
        </template>
      </Card>

      <Modal :is-open="course.isModalOpen" @close="closeModal(course)">
        <template v-slot:header>
          <div class="course-illustration-box" :class="course.course_settings ? course.course_settings.course_category.category.color_code : 'theme_0'">
            <img
              class="course-illustration-box-image"
              :src="course.course_settings ? course.course_settings.image.path : ''"
              alt=""
            />
          </div>
          <h2>{{ course.name }}</h2>
        </template>
        <template v-slot:main>
          <p class="course-description">{{ course.public_description }}</p>
          <ModulesList :modules="modules"></ModulesList>
        </template>
        <template v-slot:actions>
          <Button :type="'filled'" :size="'md'" @click="enrollToCourse(course.self_enrollment_code)">Meld deg på</Button>
          <Button type="outlined" :size="'md'" @click="closeModal(course)">Lukk</Button>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import Button from './Button.vue';
import ModulesList from './ModulesList.vue';
import Modal from '../components/modal/Modal';
import RegisterChoice from './login-choice/RegisterChoice.vue';

export default {
  name: 'CardList',
  components: {
    Card,
    Button,
    ModulesList,
    RegisterChoice,
    Modal,
  },
  props: {
    courses: Array,
    authorized: Boolean,
  },
  data() {
    return {
      showModal: false,
      domain: window.location.origin,
      selectedCourse: {},
      modules: [],
      kpasApiUrl: KPASAPIURL,
    };
  },
  methods: {
    enrollToCourse(enrollCode) {
      window.location.href = this.domain + '/enroll/' + enrollCode;
    },
    truncateString(str) {
      if (str.length > 100) {
        return str.substring(0, 120) + '...';
      }
      return str;
    },
    goToCourse(courseId) {
      window.location.href = this.domain + '/courses/' + courseId;
    },
    async handleModal(course) {
      await this.viewModules(course.id);
      course.isModalOpen = true;
    },
    closeModal(course) {
      course.isModalOpen = false;
    },
    async viewModules(courseId) {
      let self = this;
      self.modules = [];
      if (this.authorized) {
        await fetch(self.domain + '/api/v1/courses/' + courseId + '/modules', {
          method: 'GET',
          headers: {},
        })
          .then(response => response.json())
          .then(response => {
            response.forEach(module => {
              if (module.published === true) {
                if (module.name.includes('nb:')) {
                  self.handleMultilangModules(module);
                }
                self.modules.push(module);
              }
            });
          });
      } else {
        await fetch(this.kpasApiUrl + '/course/' + courseId + '/moduletitles', {
          method: 'GET',
          headers: {},
        })
          .then(response => response.json())
          .then(response => {
            response = response.result;
            response.forEach(module => {
              if (module.published === true) {
                if (module.name.includes('nb:')) {
                  self.handleMultilangModules(module);
                }
                self.modules.push(module);
              }
            });
          });
      }
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
  },
};
</script>

<style lang="scss">
@import '../design/_card-themes.scss';

.card-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 140rem;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 1025px) {
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

.course-illustration-box {
  z-index: 100;
  position: relative;
  width: 100%;
  height: 10rem;

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
