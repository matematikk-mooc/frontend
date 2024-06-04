<template>
    <!-- {{ console.log(courses[0]) }} -->
    <nav class="breadcrumb mobile-hide">
        <p class="breadcrumb-title">Du er her:</p>
        <ul>
            <li v-if=allCourses class="all-courses-crumb">
                <Icon name="chevron_right" size="1.5em" />
                <a href="/search/all_courses">Alle kompetansepakker</a>
            </li>

            <li v-if="myCourses" class="my-courses-crumb">
                <Icon name="chevron_right" size="1.5em" />
                <a :href="coursesLink">Mine kompetansepakker</a>
            </li>

            <div v-if="courseTitle" class="specific-course-crumb">
                <li>
                    <Icon name="chevron_right" size="1.5em" />
                    <a :href="specificCourseLink">{{ courseTitle }}</a>
                </li>
            </div>
            <div v-if="domainSubpage" class="specific-subpage-crumb">
                <li>
                    <Icon name="chevron_right" size="1.5em" />
                    <a :href="specificSubpageLink">{{ activeSubpage }}</a>
                </li>
            </div>
            <div v-if="activeModule" class="specific-module-crumb">
                <li>
                    <Icon name="chevron_right" size="1.5em" />
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
.breadcrumb {
    display:flex;
    width:100%;
    height: 46px;
    background-color: #f1f1f1;
    .breadcrumb-title {
        display:flex;
        align-items: center;
        margin-left: 30px;

    }
    ul {
        display:flex;
        flex-direction: row;
        align-items: center;
        list-style: none;
        margin: unset;
        li{
        display:flex;
        flex-direction: row;
        align-items: center;
        margin-left: 12px;
            span {
                display:flex
            }
            a {
                margin-left: 20px;
                text-decoration: underline;
            }
        }
    }
}
</style>