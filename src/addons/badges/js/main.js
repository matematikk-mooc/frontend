import '../css/all.less'

import badges from "./badges.js";

$(document).ready(function() {
  try {
    badges.initPage();
  } catch (e) {
    console.log('something went wrong!', e);
  }
});
