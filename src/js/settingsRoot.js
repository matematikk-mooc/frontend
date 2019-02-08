this.mmooc = this.mmooc || {};

//const allCoursesFrontpageCourseID = 234;
const allCoursesFrontpageCourseID = 1;
//const filterCoursesOnAccountId = [99, 100, 102, 103];
const filterCoursesOnAccountId = [4, 5];

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