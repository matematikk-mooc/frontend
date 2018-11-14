this.mmooc=this.mmooc||{};


this.mmooc.badges = function() {

    function resizeIframe() {
        mmooc.util.adaptHeightToIframeContentForId('tool_content_wrapper', 'tool_content');
    };
    return {
        initPage: function() {
            resizeIframe();

            var resizeTimer;
            $(window).resize(function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(resizeIframe, 42);
            });

        },

        claimBadge: function(OpenBadges, urls, callBack) {
            OpenBadges.issue_no_modal(urls, callBack);
        }
    }
}();
