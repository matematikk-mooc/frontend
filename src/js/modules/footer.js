import settings from  '../settings'

import footer from '../../templates/modules/footer.hbs';
import  footerLicence from '../../templates/modules/footer-license.hbs';
import util from './util';
export default (function() {
  return {
    addLicenseInFooter : function() {
      $(".public-license").hide()
      var $mmoocLicenseElement = $('#mmoocLicense');

      var html = util.renderTemplateWithData(footerLicence, {});
      $mmoocLicenseElement.html(html);
    },


    changeFooter : function() {
      var $parentElementOfOldFooter = $('#application.ic-app #wrapper');
      var html = util.renderTemplateWithData(footer, {
        privacyPolicyLink: settings.privacyPolicyLink,
        homeOrganization: settings.homeOrganization,
        contactPoint: settings.contactPoint,
        about: settings.aboutThePlatform,
        uuStatusNb: settings.uuStatusNb,
        uuStatusNn: settings.uuStatusNn,
      });
      $parentElementOfOldFooter.append(html);
    }
  };
})();
