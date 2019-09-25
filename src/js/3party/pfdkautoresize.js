
window.addEventListener('message', receiveMessage, false);
function receiveMessage(evt) {
  return; //Unused code?  
  obj = JSON.parse(evt.data);
  if (obj.Sender != 'pfdkautoresize') {
    return;
  }
  var PfDKiframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < PfDKiframes.length; i++) {
    var iFrame = PfDKiframes[i];
    if (iFrame.contentWindow === evt.source) {
      iFrame.height = obj.Height;
    }
  }
}
