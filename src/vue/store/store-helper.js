import { countPagesAndCompleted } from '../components/course-modules/completed-utils.js';
import store from './index.js';

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
        if (key === 'isActive' && (store.getters.pageCompletion === 'true')) {
          return true
        }
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

const checkProperties = (data, searchPropertyName, searchPropertyValue, secondPropertyName, secondPropertyValue) => {
  // Function to recursively search through the data structure
  const search = (items) => {
    for (const item of items) {
      // Check if the current item has the search property and the value matches
      if (item.hasOwnProperty(searchPropertyName) && item[searchPropertyName] === searchPropertyValue) {
        // If the second property is present and has the specified value, return true
        if (item.hasOwnProperty(secondPropertyName) && item[secondPropertyName] === secondPropertyValue) {
          return true;
        }
      }
      // Recursively search through nested nodes
      if (item.nodes && item.nodes.length > 0) {
        if (search(item.nodes)) {
          return true;
        }
      }
    }
    // If no matching item is found, return false
    return false;
  };

  // Start the search from the root of the data structure
  return search(data);
};

export { isSessionStorageAvailable, setSessionStorage, calculateModuleProgression,
         deepCompare, findAllAndUpdateByProperty, findAndUpdateByProperty,
         updatePropertiesRecursively, checkProperties };
