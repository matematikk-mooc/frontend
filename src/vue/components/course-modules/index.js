import { createApp } from "vue";
import AnnouncementsContainer from "../announcements/index";
import CourseModuleContainer from "./CourseModuleContainer";

export function renderCourseModules(id) {
  // Get the parent element
  const parentElement = document.getElementById(id);

  // Create a Vue app instance for Announcements
  const announcementsApp = createApp(AnnouncementsContainer);
  const announcementsContainer = document.createElement("div");
  announcementsContainer.id = "announcementsContainer";

  // Create a Vue app instance for CourseModuleContainer
  const courseModuleApp = createApp(CourseModuleContainer);
  const courseModuleContainer = document.createElement("div");
  courseModuleContainer.id = "moduleSelector";

  // Mount the Announcements app to its container
  announcementsApp.mount(announcementsContainer);

  // Mount the CourseModuleContainer app to its container
  courseModuleApp.mount(courseModuleContainer);

  // Insert courseModuleContainer before any other content
  parentElement.insertBefore(courseModuleContainer, parentElement.firstChild);
  
  // Insert announcementsContainer before any other content
  parentElement.insertBefore(announcementsContainer, parentElement.firstChild);

  
}




