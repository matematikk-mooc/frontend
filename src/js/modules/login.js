import loginPopup from '../../templates/modules/loginPopup.hbs';
import loginInfo from '../../templates/modules/loginInfo.hbs';
import util from './util';
import i18n from '../i18n';

export default(() => {
  return {
    handleLoginButtonClick : function() {
      $('.mmooc-header__login-button').click(() => {
        if(!$('.login-box').length) {
          let html = util.renderTemplateWithData(loginPopup, {
            logInText: i18n.LogInPopup,
            logInCanvasText: i18n.LogInCanvas,
          });
            document.getElementById('wrapper').insertAdjacentHTML('afterend', html);
            $('#application').before(`<div class="overlay"></div>`)
            $('.login-box__close, .overlay').click(() => {
              $('.login-box, .overlay').remove()
            })
        }
      })
    },
    addInfoMessage: function() {
      let html = util.renderTemplateWithData(loginInfo);
      $(".ic-Login-footer").html(html);
      $(".ic-Login-footer").show();
    }
  };
})();
