// Import the necessary Vue and component
import { createApp } from "vue";
import  CourseModuleContainer from "./CourseModuleContainer";


export function renderCourseModules(id) {
 // Create a Vue app instance
  const app = createApp(CourseModuleContainer);
  const appContainer = document.createElement('div');
  appContainer.id= 'moduleSelector'
  // Mount the Vue app to a specific HTML element with an ID
  const parentElement = document.getElementById(id);
  parentElement.insertBefore(appContainer, parentElement.firstChild);

  // Mount the Vue app to the element
  app.mount(appContainer);

}



