this.mmooc = this.mmooc || {};

//const filterCoursesOnAccountId = 99;
//const allCoursesFrontpageCourseID = 234;
const filterCoursesOnAccountId = 4;
const allCoursesFrontpageCourseID = 1;

this.mmooc.settingsRoot = {
  feideEnrollRefferers: [
    `/courses/${allCoursesFrontpageCourseID}?coursesList=1`
  ]
};

this.mmooc.settingsRoot.courseListEnum = {
    normalCourse : 1,
    allCoursesList : 2,
    myCoursesList : 3
}