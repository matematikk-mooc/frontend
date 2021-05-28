this.mmooc = this.mmooc || {};

// Course ID for selected course, which frontend page
// will be swapped with All Courses list
this.mmooc.settings = {
  CanvaBadgeProtocolAndHost: 'https://canvabadges-beta-iktsenteret.bibsys.no',
  useCanvaBadge: false,
  defaultNumberOfReviews: 1, // Default number of peer reviews per student in power function
  useDataportenGroups : false,
  filterCourses: true,
  filterCoursesOnAccountId: $ACCOUNTID,
  disablePeerReviewButton: false,
  principalRoleType: "Skoleleder",
  removeGlobalGradesLink: true,
  removeGroupsLink: true,
  displayProfileLeftMenu: false,
  displayUserMergeButton: true,
  userMergeLtiToolId: $KPAS_MERGE_LTI_ID,
  displayGroupsTab: false,
  displayDiscussionsTab : false,
  displayAlertsMenuItem : false,
  displayCallForAssistanceButtonInGroupDisccussions : false,
  displayInboxMenu: false,
  privacyPolicyLink: 'https://kompetanseudirno.azureedge.net/udirdesign/privacypolicy.html',
  contactPoint: 'kompetansesupport@udir.no',
  platformName: 'UDIR - kompetanseplattform',
  homeOrganization: 'Udir.no',
  aboutThePlatform: 'https://kompetanseudirno.azureedge.net/udirdesign/omkompetanseudirno.html',
};

