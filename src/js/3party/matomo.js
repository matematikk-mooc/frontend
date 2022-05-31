var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["setCookieDomain", "*.kompetanse.udir.no"]);
_paq.push(["setDomains", ["*.kompetanse.udir.no","*.bibsys.instructure.com","*.bibsys.test.instructure.com"]]);
_paq.push(["enableCrossDomainLinking"]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
    var u="//statistik.digilaer.no/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '3']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
})();