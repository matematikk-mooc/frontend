this.mmooc = this.mmooc || {};

this.mmooc.login = (() => {
  return {
    handleLoginButtonClick() {
      $('.mmooc-header__login-button').click(() => {
        if(!$('.login-box').length) {
          let html = mmooc.util.renderTemplateWithData('loginPopup', {
            logInText: mmooc.i18n.LogInPopup,
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
