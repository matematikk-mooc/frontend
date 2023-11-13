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
function itemHasRestrictedAccess(item) {
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
    return modules.map((module) => {
      const activePage = getModuleItemIdFromUrl();
      const isActive = findNodeById(activePage, module.items);
      return {
        id: Number(module.id),
        label: module.name,
        isCompleted: module.completed_at !== null,
        type: "module",
        isActive: isActive!== null,
        nodes: mapCoursesInSubDirectory(module.items),
      };
    });
  } catch (error) {
    console.error("Error mapping modules:", error);
    return []; // Return an empty array or handle the error as needed
  }
}


// Define functions for mapping Page and SubHeader items

function mapToPage(item) {
  return {
    id: Number(item.id),
    label: item.title,
    type: "page",
    nodes: [],
    url: item.html_url,
    isActive: item.isActive
  };
}

function mapToSubHeader(item) {
  return {
    id: Number(item.id),
    type: "module", // You are using a fixed type 'module' here
    label: item.title,
    nodes: [],
    isActive:false
  };
}
export function getModuleItemIdFromUrl() {
  var urlSearchParams = new URLSearchParams(location.search);
  var moduleItemId = urlSearchParams.get('module_item_id');
  return moduleItemId ? decodeURIComponent(moduleItemId) : null;
}
/**
 * Maps courses within a module into a nested structure of subdirectories and course pages.
 * @param {array} items - The array of modules within a course.
 * @returns {array} An array of nested items, which can be subdirectories or course pages.
 */
function mapCoursesInSubDirectory(items) {
  const activePage = getModuleItemIdFromUrl();
  const userIsPrincipal = isPrincipal();
  const nestedItems = [];
  let currentSubheader = null;
  items.forEach((item) => {
    if (item.id === activePage) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
    if (userIsPrincipal) {
      if (item.type === "SubHeader") {
        currentSubheader = mapToSubHeader(item);
        nestedItems.push(currentSubheader);
      } else if (item.type === "Page") {
        if (currentSubheader) {
           if (item.isActive) {
            currentSubheader.isActive = true;
          }
          currentSubheader.nodes.push(mapToPage(item));
        } else {
          nestedItems.push(mapToPage(item));
        }
      }
    } else if (!itemHasRestrictedAccess(item) && !userIsPrincipal) {
      if (item.type === "SubHeader") {
        currentSubheader = mapToSubHeader(item);
        nestedItems.push(currentSubheader);
      } else if (item.type === "Page") {
        if (currentSubheader) {
          if (item.isActive) {
            currentSubheader.isActive = true;
          }
          currentSubheader.nodes.push(mapToPage(item));
        } else {
          nestedItems.push(mapToPage(item));
        }
      }
    }
  });

  return nestedItems;
}

/**
 * Recursively finds a node by its ID within a nested structure.
 * @param {string} targetId - The ID to search for.
 * @param {array} nodes - The array of nodes to search within.
 * @returns {string|null} The ID of the found node or null if not found.
 */
function findNodeById(targetId, nodes) {
  // Loop through each node in the array
  for (const node of nodes) {
    // Check if the current node's ID matches the target ID
    if (node.id === targetId) {
      // Return the ID if found
      return node.id;
    }

    // If the current node has child nodes
    if (node.nodes && node.nodes.length > 0) {
      // Recursively call findNodeById on the child nodes
      const foundNode = findNodeById(targetId, node.nodes);

      // If the node is found in the child nodes, return the current node's ID
      if (foundNode) {
        return node.id;
      }
    }
  }

  // If the target ID is not found in the entire structure, return null
  return null;
}

