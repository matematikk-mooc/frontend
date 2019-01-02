$(document).ready(function() {
  try {
    mmooc.iframe.badges.initPage();
  } catch (e) {
    console.log('something went wrong!', e);
  }
});
