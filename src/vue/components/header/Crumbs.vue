<template>
    <nav class="breadcrumb mobile-hide">
        <ul>
            <li>
                <p class="breadcrumb-title">Du er her:</p>
            </li>
            <li v-if=allCourses class="all-courses-crumb">
                <a href="/search/all_courses">Alle kompetansepakker</a>
                <Icon name="chevron_right" size="1em" />
            </li>

            <li v-if="myCourses" class="my-courses-crumb">
                <a :href="coursesLink">Mine kompetansepakker</a>
                <Icon name="chevron_right" size="1em" />
            </li>

            <div v-if="courseTitle" class="specific-course-crumb">
                <li>
                    <a :href="specificCourseLink">{{ courseTitle }}</a>
                    <Icon v-if:="domainSubpage" name="chevron_right" size="1em" />
                </li>
            </div>
            <div v-if="domainSubpage" class="specific-subpage-crumb">
                <li>
                    <a :href="specificSubpageLink">{{ activeSubpage }}</a>
                    <Icon v-if:="activeModule" name="chevron_right" size="1em" />
                </li>
            </div>
            <div v-if="activeModule" class="specific-module-crumb">
                <li>
                    <a :href="specificModuleLink">{{ activeModule }}</a>
                </li>
            </div>
        </ul>
    </nav>
</template>
<script setup>
const origin = window.location.origin;
const domain = window.location.href;
const domainArray = domain.split('/')
const courseID = domainArray[4]
const domainSubpage = domainArray[5]
const domainModule = domainArray[6]

const activeSubpage = document.getElementsByClassName('active')[0]?.innerText;
const activeModule = document.getElementsByClassName('tree-node__leaf--active')[0]?.innerText;

const coursesLink = origin + "/courses";
const specificCourseLink = coursesLink + "/" + courseID;
const specificSubpageLink = specificCourseLink + "/" + domainSubpage;
const specificModuleLink = specificSubpageLink + "/" + domainModule;
</script>

<script>
import Icon from '../icon/Icon.vue';

export default {
    name: 'Crumbs',
    props: {
    courses: Array,
    allCourses: Boolean,
    myCourses: Boolean,
    courseTitle: String,
},
    components: {
        Icon
    },
}

</script>

<style scoped>
@media (max-width: 1100px) {
    .breadcrumb {
        display: none !important;
    }
}
.breadcrumb {
    display:flex;
    width:100%;
    height: 100%;
    background-color: #f1f1f1;
    text-wrap: nowrap;
    .breadcrumb-title {
        display:flex;
        align-items: center;
        /* margin-bottom: unset; */
    }
    ul {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        margin: unset;
        padding-left: 30px;
        li{
            &:nth-child(2) {
            padding-left: 15px;
        }
        display:flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 3px;
        margin-top: 3px;
            span {
                padding: 3px 5px 0 5px;
                display:flex
            }
            a {
                text-decoration: underline;
            }

        }
    }
}
</style>