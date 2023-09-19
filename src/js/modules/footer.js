import PageFooter from '../../vue/components/footer/PageFooter.vue';
import { createApp } from 'vue/dist/vue.runtime.esm-bundler.js';
import footer from '../../templates/modules/footer.hbs';
import  footerLicence from '../../templates/modules/footer-license.hbs';
import settings from  '../settings'
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
      var parentElementOfOldFooter = document.getElementById('application');

      var footerElement = parentElementOfOldFooter.appendChild(document.createElement('div'));
      footerElement.setAttribute('id', 'customFooter');
      const customFooter = createApp(PageFooter);
      customFooter.mount('#customFooter');
      // var html = util.renderTemplateWithData(footer, {
      //   privacyPolicyLink: settings.privacyPolicyLink,
      //   homeOrganization: settings.homeOrganization,
      //   contactPoint: settings.contactPoint,
      //   about: settings.aboutThePlatform,
      //   uuStatusNb: settings.uuStatusNb,
      //   uuStatusNn: settings.uuStatusNn,
      // });
      // parentElementOfOldFooter.append(html);
    }
  };
})();
