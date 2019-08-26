this.mmooc = this.mmooc || {};

this.mmooc.footer = (function() {
  return {
    addLicenseInFooter: function() {
      //Previous existing footer is hidden by css ('footer#footer')and is also removed in New UI after March 2016 because of a bug fix.
      var $publicLicense = $('#content .public-license'); //License that is displayed on the course front page
      var $parentElementOfOldFooter = $('#application.ic-app #wrapper');

      var relativeUrl = window.location.pathname;
      var displayPrivateLicence = false; 
  
      var onCoursePage = /\/courses\/\d+/;
      displayPrivateLicense = (onCoursePage.test(relativeUrl) && ($publicLicense.length == 0));

      var html = mmooc.util.renderTemplateWithData('footer-license', {privateLicense: displayPrivateLicense, privacyPolicyLink: mmooc.settings.privacyPolicyLink, contactPoint: mmooc.settings.contactPoint});
      $parentElementOfOldFooter.append(html);
    }
  };
})();
