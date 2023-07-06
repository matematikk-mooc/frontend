import util from "../modules/util";

export default (function() {
  return {
    init: function() {
      util.mmoocLoadScript(
        'https://www.nrk.no/serum/latest/js/video_embed.js'
      );
    }
  };
})();
