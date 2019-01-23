this.mmooc = this.mmooc || {};

const allCoursesFrontpageCourseID = 1;

this.mmooc.settingsRoot = {
  feideEnrollRefferers: [
//    Uncomment the line below if our available courselist design runs on the root account.
//    '/search/all_courses',
    `/courses/${allCoursesFrontpageCourseID}`,
    `/courses/${allCoursesFrontpageCourseID}?coursesList=1`
  ]
};

this.mmooc.settingsRoot.courseListEnum = {
    normalCourse : 1,
    allCoursesList : 2,
    myCoursesList : 3
}