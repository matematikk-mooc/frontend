$(document).ready(function() {
   try {
       mmooc.iframe.badges.initPage(25);
   } catch (e) {
       console.log("something went wrong!", e);
   }
});