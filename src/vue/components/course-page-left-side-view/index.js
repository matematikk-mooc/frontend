import { createApp } from "vue";
import CoursePageLeftSideView from "./CoursePageLeftSideView.vue"

export function renderCourseModules(id) {
  // Get the parent element
  const parentElement = document.getElementById(id);

  // Create a Vue app instance for LeftSideView
  const coursePageLeftSideViewApp = createApp(CoursePageLeftSideView);
  const coursePageLeftSideViewAppsContainer = document.createElement("div");
  coursePageLeftSideViewAppsContainer.id = "coursepage-left-side-view";

  // Mount the LeftSideView app to its container
  coursePageLeftSideViewApp.mount(coursePageLeftSideViewAppsContainer);

  
  // Insert coursePageLeftSideViewContainer before any other content
  parentElement.insertBefore(coursePageLeftSideViewAppsContainer, parentElement.firstChild);

  
}
