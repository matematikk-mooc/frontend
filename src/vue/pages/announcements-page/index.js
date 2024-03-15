import CourseModuleContainer from "../../components/course-modules/CourseModuleContainer.vue";
import { createApp } from "vue";

export function renderCourseModulesOnAnnouncementsPage(id) {
  console.error('The render function is called');
  // Get the parent element
  const parentElement = document.getElementById(id)

  // Create a Vue app instance for LeftSideView
  const courseModuleContainerApp = createApp(CourseModuleContainer)
  const courseModuleContainerAppsContainer = document.createElement("div")
  courseModuleContainerAppsContainer.id = "announcements-navigation-container"

  // Mount the LeftSideView app to its container
  courseModuleContainerApp.mount(courseModuleContainerAppsContainer)

  
  // InsertCourseModuleContainerContainer before any other content
  parentElement.insertBefore(courseModuleContainerAppsContainer, parentElement.firstChild)
}
