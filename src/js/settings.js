

// Course ID for selected course, which frontend page
// will be swapped with All Courses list
var settings = {
  CanvaBadgeProtocolAndHost: 'https://canvabadges-beta-iktsenteret.bibsys.no',
  useCanvaBadge: false,
  defaultNumberOfReviews: 1, // Default number of peer reviews per student in power function
  useDataportenGroups : false,
  filterCourses: true,
  filterCoursesOnAccountId: ACCOUNTID,
  disablePeerReviewButton: false,
  principalRoleType: "Skoleleder",
  removeGlobalGradesLink: true,
  removeGroupsLink: true,
  displayProfileLeftMenu: false,
  displayUserMergeButton: true,
  userMergeLtiToolId: KPAS_MERGE_LTI_ID,
  displayGroupsTab: false,
  displayDiscussionsTab : false,
  displayAlertsMenuItem : false,
  displayCallForAssistanceButtonInGroupDisccussions : false,
  displayInboxMenu: false,
  privacyPolicyLink: 'https://kompetanseudirno.azureedge.net/udirdesign/privacypolicy.html?v=1_0',
  contactPoint: 'kompetansesupport@udir.no',
  platformName: 'UDIR - kompetanseplattform',
  homeOrganization: 'Udir.no',
  aboutThePlatform: 'https://kompetanseudirno.azureedge.net/udirdesign/omkompetanseudirno.html',
  uuStatusNb: 'https://uustatus.no/nb/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431',
  uuStatusNn: 'https://uustatus.no/nn/erklaringer/publisert/2796ebc6-161f-4dc9-9429-70d7dd136431',
};
if (typeof module !== 'undefined' && module !== null) {
  module.exports = settings;
}