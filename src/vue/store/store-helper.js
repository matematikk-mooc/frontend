import { countPagesAndCompleted } from '../components/course-modules/completed-utils.js';

function isSessionStorageAvailable() {
  try {
    const key = '__storage_test__';
    sessionStorage.setItem(key, key);
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

function setSessionStorage(key, data) {
  if (isSessionStorageAvailable()) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}

function isLocalStorageAvailable() {
  try {
    const key = '__storage_test__';
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

function setLocalStorage(key, data) {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

const calculateModuleProgression = (courseModule) => {
  return [...courseModule].map(item => countPagesAndCompleted(item))
}

const deepCompare = (arg1, arg2) => {
  if (Object.prototype.toString.call(arg1) === Object.prototype.toString.call(arg2)){
    if (Object.prototype.toString.call(arg1) === '[object Object]' || Object.prototype.toString.call(arg1) === '[object Array]' ){
      if (Object.keys(arg1).length !== Object.keys(arg2).length ){
        return false;
      }
      return (Object.keys(arg1).every(function(key){
        return deepCompare(arg1[key],arg2[key]);
      }));
    }
    return (arg1===arg2);
  }
  return false;
}

const findAllAndUpdateByProperty = (data, propertyName, propertyValue, newPropertyValue) => {
  const results = [];

  const update = (items) => {
    for (const item of items) {
      // Check if the current item has the property and the value matches
      if (item.hasOwnProperty(propertyName) && item[propertyName] === propertyValue) {
        // Update the property value
        item[propertyName] = newPropertyValue;
        results.push(item);
      }
      // Recursively search through nested nodes
      if (item.nodes && item.nodes.length > 0) {
        update(item.nodes);
      }
    }
  };

  // Start the update
  update(data);

  return results;
};

const findAndUpdateByProperty = (data, searchPropertyName, searchPropertyValue, updatePropertyName, newPropertyValue) => {
  const results = [];

  const update = (items) => {
    for (const item of items) {
      // Check if the current item has the property and the value matches
      if (item.hasOwnProperty(searchPropertyName) && item[searchPropertyName] === searchPropertyValue) {
        // Update the specified property with the new value
        item[updatePropertyName] = newPropertyValue;
        results.push(item);
      }
      // Recursively search through nested nodes
      if (item.nodes && item.nodes.length > 0) {
        update(item.nodes);
      }
    }
  };

  // Start the update
  update(data);

  return results;
};

const updatePropertiesRecursively = (data, searchPropertyName, searchPropertyValue, updatePropertyName, newPropertyValue) => {
  const results = [];

  const update = (items, parentIsActive = false) => {
    for (const item of items) {
      // Check if the current item has the property and the value matches
      if (item.hasOwnProperty(searchPropertyName) && item[searchPropertyName] === searchPropertyValue) {
        // Update the specified property with the new value
        item[updatePropertyName] = newPropertyValue;
        // Set isActive to true for current item and all its parent nodes
        updateParentNodes(data, item, parentIsActive);
        results.push(item);
      }
      // Recursively search through nested nodes
      if (item.nodes && item.nodes.length > 0) {
        update(item.nodes, item.isActive || parentIsActive);
      }
    }
  };

  // Helper function to update isActive for parent nodes
  const updateParentNodes = (data, item, parentIsActive) => {
    let parent = getParentNode(data, item);
    while (parent) {
      parent.isActive = true;
      parent = getParentNode(data, parent);
    }
  };

  // Helper function to get parent node
  const getParentNode = (data, item) => {
    let parent = null;
    const findParent = (items) => {
      for (const currentItem of items) {
        if (currentItem.nodes && currentItem.nodes.includes(item)) {
          parent = currentItem;
          break;
        }
        if (currentItem.nodes && currentItem.nodes.length > 0) {
          findParent(currentItem.nodes);
        }
      }
    };
    findParent(data);
    return parent;
  };

  // Start the update
  update(data);

  return results;
};

const setCourseEnrolledStatus = (allCourses, enrolledCourses) => {
  var allCoursesWithStatus = [];
  for (var i = 0; i < allCourses.length; i++) {
    allCourses[i].course.enrolled = false;
    for (var j = 0; j < enrolledCourses.length; j++) {
      if (allCourses[i].course.id == enrolledCourses[j].id) {
        allCourses[i].course.enrolled = true;
      }
    }
    allCoursesWithStatus.push(allCourses[i].course);
  }
  return allCoursesWithStatus;
};


export { isSessionStorageAvailable, setSessionStorage, isLocalStorageAvailable,
         setLocalStorage, calculateModuleProgression, deepCompare,
         findAllAndUpdateByProperty, findAndUpdateByProperty,
         updatePropertiesRecursively, setCourseEnrolledStatus };
