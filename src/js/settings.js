this.mmooc = this.mmooc || {};

// Course ID for selected course, which frontend page
// will be swapped with All Courses list
this.mmooc.settings = {
  CanvaBadgeProtocolAndHost: 'https://canvabadges-beta-iktsenteret.bibsys.no',
  useCanvaBadge: false,
  defaultNumberOfReviews: 1, // Default number of peer reviews per student in power function
//  filterCoursesOnAccountId : [99, 100, 102, 103],
  useDataportenGroups : true,
  filterCoursesOnAccountId: [4, 5],
  disablePeerReviewButton: true,
  removeGlobalGradesLink: true,
  removeGroupsLink: true,
  privacyPolicyLink: 'http://matematikk-mooc.github.io/privacypolicy.html',
  platformName: 'matematikk.mooc.no'
};

