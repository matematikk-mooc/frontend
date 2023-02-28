this.mmooc = this.mmooc || {};

this.mmooc.footer = (function() {
  return {
    addLicenseInFooter : function() {
      $(".public-license").hide()
      var $mmoocLicenseElement = $('#mmoocLicense');

      var html = mmooc.util.renderTemplateWithData('footer-license', {});
      $mmoocLicenseElement.html(html);
    },
    changeFooter : function() {
      var $parentElementOfOldFooter = $('#application.ic-app #wrapper');
      var html = mmooc.util.renderTemplateWithData('footer', {
        privacyPolicyLink: mmooc.settings.privacyPolicyLink, 
        homeOrganization: mmooc.settings.homeOrganization, 
        contactPoint: mmooc.settings.contactPoint, 
        about: mmooc.settings.aboutThePlatform, 
        uuStatusNb: mmooc.settings.uuStatusNb,
        uuStatusNn: mmooc.settings.uuStatusNn,
      });
      $parentElementOfOldFooter.append(html);
    }
  };
})();
