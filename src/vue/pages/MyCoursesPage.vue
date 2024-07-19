<template>
  <div class="my-courses-page">
    <div id="main" class="my-courses-page--content">
      <h1>Mine kompetansepakker</h1>

      <div class="my-courses-invites" v-if="hasInvites">
        <div class="course-invite" v-for="course in invitedCourses" :key="course.id">
            <div class="course-invite-head">
              <p class="course-invite-head-title">{{ course.name }}</p>

              <p class="course-invite-head-description">Du har blitt invitert til å delta i denne pakken. Når du er klar kan du godkjenne eller avvise invitasjonen.</p>
            </div>

            <div class="course-invite-body">
              <Button class="kpas-button" :type="'filled'" :size="'sm'" @click="respondToInvite(course.id, true)">Godta invitasjonen</Button>

              <Button class="kpas-button" :type="'outlined'" :size="'sm'" @click="respondToInvite(course.id, false)">Avslå invitasjonen</Button>
            </div>
        </div>
      </div>

      <div class="my-courses-page--layout">
        <CardList :authorized="true" :courses="coursesToRender" :newCoursesIndicator="false"></CardList>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../components/Button.vue';
import CardList from '../components/CardList.vue';
import { isInvitedCourse } from "../utils/filter-courses";
import api from "../../js/api/api";

export default {
  name: 'MyCoursesPage',
  components: {
    Button,
    CardList
  },
  computed: {
    coursesToRender(){
      return this.courses?.filter(course => !isInvitedCourse(course)) ?? [];
    },
    invitedCourses() {
      return this.courses?.filter(course => isInvitedCourse(course)) ?? [];
    },
    hasInvites() {
      return this.courses?.find(course => isInvitedCourse(course));
    }
  },
  methods: {
    respondToInvite(courseId, accept = false) {
      const userData = api.getUser();
      api.getEnrollmentsForCourse(courseId, { "state[]": "invited", "user_id": userData.id }, (invites) => {
        const enrollmentInvite = invites[0];

        if (accept) {
          api.postEnrollmentAcceptInvite(courseId, enrollmentInvite.id, {}, () => {
            location.reload();
          });
        } else {
          api.postEnrollmentRejectInvite(courseId, enrollmentInvite.id, {}, () => {
            location.reload();
          });
        }
      });
    }
  },
  props: {
    courses: Array,
  },
}
</script>

<style lang="scss">
.my-courses-page {
    height: 100%;
    width: 100%;
    max-width: 1600px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 85vh;
  }

  .my-courses-page--content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1.5rem;

    h1 {
      margin-bottom: 20px;
    }

    h2 {
      font-size: 2rem;
      margin: 1.5rem 0 1.5rem 0;
    }
  }

  .my-courses-invites {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20px;
    gap: 20px;

    .course-invite {
      width: 100%;
      max-width: 450px;
      display: flex;
      flex-direction: column;
      border: 2px solid black;
      border-radius: .5rem;
      padding: 20px 30px;

      &:last-child {
        margin-bottom: 0px;
      }

      .course-invite-head-title {
        font-weight: bold;
        margin: 0px;
        margin-bottom: 6px;
        font-size: 20px;
      }

      .course-invite-head-description {
        margin: 0px;
      }

      .course-invite-body {
        display: flex;
        flex-wrap: wrap;

        button {
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
  }

  .my-courses-page--layout {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>
