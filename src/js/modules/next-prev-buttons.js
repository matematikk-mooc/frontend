import { createApp, h } from "vue";

import Button from "../../vue/components/Button.vue";
import api from "../api/api";
import util from "./util";

export default (function() {

    function isStudent() {
        return util.isActiveCourseRoleBased() && !util.isPrincipal();
    }

    function itemHasRestrictedAccess(item) {
        return item.indent === 1;
    }

    function mapStudentItems(items) {
        let studentItems = [];
        for (let i = 0; i < items.length; i++) {
            if (!itemHasRestrictedAccess(items[i])) {
                studentItems.push(items[i]);
            }
        }
        return studentItems;
    }

    function removeSubHeaders(items) {
        let filteredItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].type !== "SubHeader") {
                filteredItems.push(items[i]);
            }
        }
        return filteredItems;
    }

    function insertNextButton(nextModuleItem) {
        let nextButton = document.getElementById("custom-next-button");

        const app = createApp({
            render() {
                return h(Button, {type: 'next', size: 'lg' }, "Neste");
            }
        });
        nextButton.addEventListener("click", function() {
            window.location.href = nextModuleItem.html_url;
        });

        app.mount("#custom-next-button");
    }

    function insertPrevButton(prevModuleItem) {
        let prevButton = document.getElementById("custom-prev-button");

        const app = createApp({
            render() {
                return h(Button, {type: 'previous', size: 'lg' }, "Forrige");
            }
        });

        prevButton.addEventListener("click", function() {
            window.location.href = prevModuleItem.html_url;
        });
        app.mount("#custom-prev-button");
    }

    function hidePrevButton() {
        let currentPrev = $(".module-sequence-footer-button--previous")[0];
        if(currentPrev){
            currentPrev.remove();
        }
    }

    function hideNextButton() {
        let currentNext = $(".module-sequence-footer-button--next")[0];
        if (currentNext){
            currentNext.remove();
        }
    }

    function insertNextButtonFrontpage(nextModuleItem) {
        let parent = document.getElementsByClassName("show-content")[0];
        let buttonWrapper = document.createElement("div");
        buttonWrapper.setAttribute('class', "custom-next-button-wrapper")
        let nextButton = document.createElement("div");
        const app = createApp({
            render() {
                return h(Button, {type: 'next', size: 'lg' }, "Neste");
            }
        });
        nextButton.id = "custom-next-button";
        nextButton.addEventListener("click", function() {
            window.location.href = nextModuleItem.html_url;
        });
        buttonWrapper.append(nextButton);

        parent.appendChild(buttonWrapper);
        app.mount("#custom-next-button");

    }

    function getFrontpageNextPage(){
        let currentCourseId  = ENV.COURSE_ID? ENV.COURSE_ID : ENV.COURSE.id;
        api.getModulesForCourseIdIncludeItems(currentCourseId, function(modules) {
            let firstModule = modules[0];
            let firstModuleItems = firstModule.items;
            firstModuleItems = removeSubHeaders(firstModuleItems);
            if (isStudent()) {
                firstModuleItems = mapStudentItems(firstModuleItems);
            }
            let firstItem = null;
            if(firstModuleItems.length > 1){
                firstItem = firstModuleItems[1];
            }
            else {
                firstModule = modules[1]
                firstModuleItems = removeSubHeaders(firstModule.items);
                if(isStudent()){
                    firstModuleItems = mapStudentItems(firstModuleItems);
                }
                firstItem = firstModuleItems[0];
            }
            insertNextButtonFrontpage(firstItem);
        })

    }

    function getPrevAndNextItems() {
        let currentCourseId  = ENV.COURSE_ID? ENV.COURSE_ID : ENV.COURSE.id;
        api.getCurrentModule(function(currentModule) {
            hideNextButton();
            hidePrevButton();

            let path = new URL(document.location).searchParams;
            let currentItemId = path.get("module_item_id");
            let previousItem = null;
            let nextItem = null;
            let moduleItems = currentModule.items;

            let navButtonsWrapper = document.createElement("div");
            navButtonsWrapper.id = "custom-nav-buttons-wrapper";

            let prevButton = document.createElement("div");
            prevButton.id = "custom-prev-button";

            let nextButton = document.createElement("div");
            nextButton.id = "custom-next-button";

            navButtonsWrapper.appendChild(prevButton);
            navButtonsWrapper.appendChild(nextButton);
            $(".module-sequence-footer-content")[0].appendChild(navButtonsWrapper);

            moduleItems = removeSubHeaders(moduleItems);
            if (isStudent()){
                moduleItems = mapStudentItems(moduleItems);
            }
            let currentIndex = moduleItems.findIndex(item => item.id === currentItemId);
            if(currentIndex == 0){

                //Første side i modulen, må hente forrige modul
                api.getModulesForCourseIdIncludeItems(currentCourseId, function(allmodules) {
                    let currentModuleIndex = allmodules.findIndex(m => m.id == currentModule.id);
                    if (currentModuleIndex > 0) {
                        let previousModule = allmodules[currentModuleIndex - 1];
                        let previousModuleItems = previousModule.items;
                        previousModuleItems = removeSubHeaders(previousModuleItems);
                        if (isStudent()) {
                            previousModuleItems = mapStudentItems(previousModuleItems);
                        }
                        previousItem = previousModuleItems[previousModuleItems.length - 1];
                        insertPrevButton(previousItem);
                    }

                });
            }
            else {
                previousItem = moduleItems[currentIndex - 1];
                insertPrevButton(previousItem);

            }
            if(currentIndex == moduleItems.length - 1){
                //Siste side i modulen, må hente neste modul
                api.getModulesForCourseIdIncludeItems(currentCourseId, function(allmodules) {
                    let currentModuleIndex = allmodules.findIndex(m => m.id == currentModule.id);
                    if (currentModuleIndex < allmodules.length - 1) {
                        let nextModule = allmodules[currentModuleIndex + 1];
                        let nextModuleItems = nextModule.items;
                        nextModuleItems = removeSubHeaders(nextModuleItems);
                        if (isStudent()) {
                            nextModuleItems = mapStudentItems(nextModuleItems);
                        }
                        nextItem = nextModuleItems[0];
                        insertNextButton(nextItem);
                    }

                });

            }
            else {
                nextItem = moduleItems[currentIndex + 1];
                insertNextButton(nextItem);
            }
        });
    }

    return {
        getPrevAndNextItems: getPrevAndNextItems,
        getFrontpageNextPage: getFrontpageNextPage
    };

})();
