this.mmooc = this.mmooc || {};

this.mmooc.login = (() => {
  return {
    handleLoginButtonClick() {
      $('.mmooc-header__login-button').click(() => {
        if(!$('.login-box').length) {
          let html = mmooc.util.renderTemplateWithData('loginPopup', {
            logInText: mmooc.i18n.LogIn,
            logInFeideText: mmooc.i18n.LogInFeide,
            logInCanvasText: mmooc.i18n.LogInCanvas,
          });
            document.getElementById('wrapper').insertAdjacentHTML('afterend', html);
            $('#application').before(`<div class="overlay"></div>`)
            $('.login-box__close, .overlay').click(() => {
              $('.login-box, .overlay').remove()
            })
        }
      })
    }
  };
})();
