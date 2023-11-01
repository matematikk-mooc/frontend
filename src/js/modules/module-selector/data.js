import api from "../../api/api";
import {mapModules} from "./utils";

export function fetchModulesForCourse() {
  let cid = getCourseId();
  if (cid) {
    return new Promise((resolve, reject) => {
      // Define the API endpoint to fetch modules for the course with pagination.
      const moduleHref = `/api/v1/courses/${cid}/modules?per_page=100`;

      // Send an HTTP GET request to retrieve the modules data.
      $.getJSON(moduleHref)
        .done(async (modules) => {
          // Get the total number of modules in the course.

          // Create an array to store the results of item requests.
          const itemResults = [];

          // Iterate through each module and retrieve their items asynchronously.
          for (const module of modules) {
            // Define the API endpoint to fetch items for the current module.
            const itemHref = `/api/v1/courses/${cid}/modules/${module.id}/items?per_page=100`;

            try {
              const items = await $.getJSON(itemHref);
              itemResults.push({ module, items });
            } catch (error) {
              // Handle any errors from individual item requests here.
              console.error(
                `Error fetching items for module ${module.id}:`,
                error
              );
            }
          }

          // Combine modules with their items.
          const modulesWithItems = itemResults.map(({ module, items }) => ({
           ...module,
            items: [...items],
          }));
          // Resolve the Promise with the modules data.
          resolve(mapModules(modulesWithItems));
        })
        .fail((error) => {
          // Handle errors from the initial module request here.
          console.error("Error fetching modules:", error);
          reject(error);
        });
    });
  } else {
    return Promise.reject("Error when looking up Id, Id is not found");
  }
}

function getCourseId() {
  return api.getCurrentCourseId();
}


