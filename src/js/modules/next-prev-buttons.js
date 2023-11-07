import NextPrevButton from "../../vue/components/next-prev-button/NextPrevButton.vue";
import api from "../api/api";
import { createApp } from "vue";
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
        hideNextButton();
        let parent = document.getElementById("custom-nav-buttons-wrapper");
        let nextButton = document.createElement("div");
        let app = createApp(NextPrevButton, {
            type: "outlined",
            text: "Neste",
            size: 'lg',
            url: nextModuleItem.html_url,
        });

        nextButton.id = "custom-next-button";
        parent.appendChild(nextButton);
        app.mount("#custom-next-button");
    }

    function insertPrevButton(prevModuleItem) {
        hidePrevButton();
        let parent = document.getElementById("custom-nav-buttons-wrapper");
        let prevButton = document.createElement("div");
        let app = createApp(NextPrevButton, {
            type: "outlined",
            text: "Forrige",
            size: 'lg',
            url: prevModuleItem.html_url,
        });
        prevButton.id = "custom-prev-button";
        parent.appendChild(prevButton);
        app.mount("#custom-prev-button");
    }

    function hidePrevButton() {
        let currentPrev = $(".module-sequence-footer-button--previous")[0];
        currentPrev.remove();
    }

    function hideNextButton() {
        let currentNext = $(".module-sequence-footer-button--next")[0];
        currentNext.remove();
    }

    function getPrevAndNextItems() {
        let currentCourseId  = ENV.COURSE_ID? ENV.COURSE_ID : ENV.COURSE.id;
        api.getCurrentModule(function(currentModule) {
            let path = new URL(document.location).searchParams;
            let currentItemId = path.get("module_item_id");
            let previousItem = null;
            let nextItem = null;
            let moduleItems = currentModule.items;
            let navButtonsWrapperParent = $(".module-sequence-footer-content")[0];
            let navButtonsWrapper = document.createElement("div");
            navButtonsWrapper.id = "custom-nav-buttons-wrapper";
            navButtonsWrapperParent.appendChild(navButtonsWrapper);
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
                    else {
                        //Første side i første modul, skjul forrige knapp
                        hidePrevButton();
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
                    else {
                        //Siste side i siste modul, skjul neste knapp
                        hideNextButton();
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
        getPrevAndNextItems: getPrevAndNextItems
    };

})();
