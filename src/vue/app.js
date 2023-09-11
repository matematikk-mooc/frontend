// import FooterTest from './components/FooterTest.vue';
// import TestHeader from "./components/TestHeader.vue";
// import api from "../js/api/api";
// import { createApp } from "vue/dist/vue.runtime.esm-browser.prod.js";
// import util from "../js/modules/util";
// import "./design/index.scss";

// try {
//   api.getCoursesForAccount(138, function (courses) {
//     console.log(courses);
//     let footerProps = {
//       name: "NameProp",
//       licence: util.isMMOOCLicense(),
//       courses: courses,
//     };

//     var footerComponent = createApp(FooterTest, footerProps);
//     var footerWrapper = document
//       .getElementById("wrapper")
//       .appendChild(document.createElement("div"));
//     footerWrapper.setAttribute("id", "footer");
//     footerComponent.mount("#footer");
//   });

//   var header = createApp(TestHeader);
//   var headerwrapper = document.getElementById("application").children[0];
//   headerwrapper.append(document.createElement("div"));
//   headerwrapper.setAttribute("id", "test2");
//   header.mount("#test2");
// } catch (e) {
//   console.log(e);
// }

//export default app;
