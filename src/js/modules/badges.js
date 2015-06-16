this.mmooc=this.mmooc||{};


this.mmooc.badges = function() {
    return {
        initPage: function() {
            mmooc.util.adaptHeghtToIframeContentForId('tool_content');
        },

        claimBadge: function(OpenBadges, urls, callBack) {
            OpenBadges.issue_no_modal(urls, callBack);
        }
    }
}();
