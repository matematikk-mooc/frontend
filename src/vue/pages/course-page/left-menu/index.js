import { createApp } from "vue";
import CoursePageLeftSideView from "./CoursePageLeftSideView.vue";
import store from "../../../store";

export function renderCourseModules(id) {
  // Get the parent element
  const parentElement = document.getElementById(id);

  // Create a Vue app instance for LeftSideView
  const coursePageLeftSideViewApp = createApp(CoursePageLeftSideView);
  coursePageLeftSideViewApp.use(store);

  const coursePageLeftSideViewAppsContainer = document.createElement("div");
  coursePageLeftSideViewAppsContainer.id = "coursepage-left-side-view";

  // Mount the LeftSideView app to its container
  coursePageLeftSideViewApp.mount(coursePageLeftSideViewAppsContainer);

  // insert coursePageLeftSideViewAppsContainer before any other content
  parentElement.insertBefore(coursePageLeftSideViewAppsContainer, parentElement.firstChild);
}

