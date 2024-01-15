

export default(() => {
  return {

    addInfoMessage: function() {
      let infoMessage = document.createElement('div');
      infoMessage.innerHTML = 'For å logge inn her må du være påmeldt minst en kompetansepakke. <br/> Se <a href="https://kompetanse.udir.no">forsiden til kompetanse.udir.no</a>.';
      let parentElement = document.getElementsByClassName('ic-Login-footer')[0];
      parentElement.innerHTML = '';
      parentElement.appendChild(infoMessage);
    }
  };
})();
