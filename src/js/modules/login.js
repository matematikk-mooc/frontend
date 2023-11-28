import i18n from '../i18n';
import loginPopup from '../../templates/modules/loginPopup.hbs';
import util from './util';

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
      let infoMessage = document.createElement('div');
      infoMessage.innerHTML = 'For å logge inn her må du være påmeldt minst en kompetansepakke. <br/> Se <a href="https://kompetanse.udir.no">forsiden til kompetanse.udir.no</a>.';
      let parentElement = document.getElementsByClassName('ic-Login-footer')[0];
      parentElement.innerHTML = '';
      parentElement.appendChild(infoMessage);
      console.log(parentElement);
    }
  };
})();
