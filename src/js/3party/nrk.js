this.mmooc = this.mmooc || {};

this.mmooc.nrk = function() {
	return {
		init : function ()
		{
		    mmooc.util.mmoocLoadScript("https://www.nrk.no/serum/latest/js/video_embed.js");
		}
	}
}();

