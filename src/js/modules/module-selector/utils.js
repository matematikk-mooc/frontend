import util from "../util";

/**
 * Check if the user is a principal based on course role.
 * @returns {boolean} True if the user is a principal, false otherwise.
 */
export function isPrincipal() {
  return util.isActiveCourseRoleBased() && util.isPrincipal();
}

/**
 * Check if an item has restricted access by verifying its indent level.
 * @param {object} item - The item to check for restricted access.
 * @returns {boolean} True if the item has restricted access (indent level 1), false otherwise.
 */
export function itemHasRestrictedAccess(item) {
  return item.indent === 1;
}

/**
 * Check if an item is of type 'Page'.
 * @param {object} item - The item to check for its type.
 * @returns {boolean} True if the item is of type 'Page', false otherwise.
 */
export function itemIsPage(item) {
  return item.type === "Page";
}

/**
 * Maps an array of modules into a specific format for rendering.
 * @param {array} modules - The array of modules to map.
 * @returns {array} An array of mapped module objects.
 */
export function mapModules(modules) {
  try {
    return modules.map((module) => ({
      id: module.id,
      label: module.name,
      isCompleted: module.completed_at !== null,
      type: "module", // You are using a fixed type 'module' here
      nodes: mapCoursesInSubDirectory(module.items),
    }));
  } catch (error) {
    console.error("Error mapping modules:", error);
    return []; // Return an empty array or handle the error as needed
  }
}

// Define functions for mapping Page and SubHeader items

function mapToPage(item) {
  return {
    id: item.id,
    label: item.title,
    type: "Page",
    nodes: [],
    url: item.html_url,
  };
}

function mapToSubHeader(item) {
  return {
    id: item.id,
    type: "module", // You are using a fixed type 'module' here
    label: item.title,
    nodes: [],
  };
}

/**
 * Maps courses within a module into a nested structure of subdirectories and course pages.
 * @param {array} items - The array of modules within a course.
 * @returns {array} An array of nested items, which can be subdirectories or course pages.
 */
function mapCoursesInSubDirectory(items) {
  const userIsPrincipal = false; // Set to true or false based on your logic
  const nestedItems = [];
  let currentSubheader = null;

  items.forEach((item) => {
    if (userIsPrincipal || (!userIsPrincipal && item.indent !== 1)) {
      if (item.type === "SubHeader") {
        currentSubheader = mapToSubHeader(item);
        nestedItems.push(currentSubheader);
      } else if (item.type === "Page") {
        if (currentSubheader) {
          currentSubheader.nodes.push(mapToPage(item));
        } else {
          nestedItems.push(mapToPage(item));
        }
      }
    }
  });

  return nestedItems;
}
