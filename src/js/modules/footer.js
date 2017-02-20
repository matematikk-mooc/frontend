this.mmooc=this.mmooc||{};


this.mmooc.footer = function() {

    return {

        addLicenseInFooter: function() {
           
           //Previous existing footer is hidden by css ('footer#footer')and is also removed in New UI after March 2016 because of a bug fix.
           var $customFooter = $('footer#mmooc-footer'); //Appended as new html contents in #wrapper
           var $publicLicense = $('#content .public-license'); //License that is displayed on the course front page
           var $parentElementOfOldFooter = $('#application.ic-app #wrapper'); 
           
           var relativeUrl = window.location.pathname;
           var hideCustomFooterLicence = false; //License should not be displayed on the '/courses' or '/' page or the login or logout page.
                      
           if ((relativeUrl == '/courses') || (relativeUrl == '/courses/') || (relativeUrl == '/') || (relativeUrl == '/login/canvas') ||  (relativeUrl.indexOf("enroll") !== -1) || (relativeUrl == '/logout')) {
               hideCustomFooterLicence = true;
           }
           
           //If there is no existing custom footer and there is public license on th page and it's not the course front page, 
           //then display the custom license in a custom footer element. The html for the license is in src/templates/modules/footer-license.hbs
           if ($customFooter.length == 0 && $publicLicense.length == 0 && !hideCustomFooterLicence) {
                var html = mmooc.util.renderTemplateWithData("footer-license", {});
                $parentElementOfOldFooter.append(html);
           }
           
        }
    };
}();
