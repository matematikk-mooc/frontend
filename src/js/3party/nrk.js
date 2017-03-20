function mmoocLoadScript(mmoocScript)
{
    var mmoocScriptElement = document.createElement('script');
    mmoocScriptElement.setAttribute('charset', 'UTF-8');
    mmoocScriptElement.setAttribute('src', mmoocScript);
    document.body.appendChild(mmoocScriptElement);
}
$(document).load($(function() {
    mmoocLoadScript("https://www.nrk.no/serum/latest/js/video_embed.js");
}));