this.mmooc=this.mmooc||{};


this.mmooc.groups = function() {
    function interceptLinkToGroupPage(href, event) {
        if (/\/groups\/\d+$/.test(href)) {
            event.preventDefault();
            location.href = href + '/discussion_topics';
        }
    }

    return {
        interceptLinksToGroupPage: function() {
            $("#content").on('click', '.student-group-title a', function(event) {
                var href= $(this).attr("href");
                interceptLinkToGroupPage(href, event);
            });

            $("#right-side").on('click', '.group_list a', function(event) {
                var href= $(this).attr("href");
                interceptLinkToGroupPage(href, event);
            });
        },

        showGroupHeader: function() {
            var groupId = mmooc.api.getCurrentGroupId();
            var headerHTML = mmooc.util.renderTemplateWithData("groupheader", {groupId: groupId});
            document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', headerHTML);
        }
    };
}();
