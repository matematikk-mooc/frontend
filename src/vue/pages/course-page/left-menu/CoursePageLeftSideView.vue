<template>
<div class="course-page-left-side-view-container">
<AnnouncementContainer></AnnouncementContainer>
<CourseModuleContainer></CourseModuleContainer>
</div>
</template>
<script setup>
import AnnouncementContainer from "../../../components/announcements" 
import CourseModuleContainer from "../../../components/course-modules"
</script>
<style lang="scss">
  .course-page-left-side-view-container{
    width: 100%;
    max-width: 27rem;
    min-height: 600px;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
  }
</style>
