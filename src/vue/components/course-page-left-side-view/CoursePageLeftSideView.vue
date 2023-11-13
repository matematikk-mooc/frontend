<template>
<div class="course-page-left-side-view-container">
<AnnouncementContainer></AnnouncementContainer>
<CourseModuleContainer></CourseModuleContainer>

</div>
</template>
<script setup>
import AnnouncementContainer from "../announcements" 
import CourseModuleContainer from "../course-modules"
</script>
<style lang="scss">
  .course-page-left-side-view-container{
    width: 100%;
    min-width: 30rem;
    min-height: 600px;
    margin-right: 1rem;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
  }
</style>
