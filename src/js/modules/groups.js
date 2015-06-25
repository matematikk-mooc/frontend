this.mmooc=this.mmooc||{};


this.mmooc.groups = function() {
    function interceptLinkToGroupPageForHref(href, event) {
        if (/\/groups\/\d+$/.test(href)) {
            event.preventDefault();
            location.href = href + '/discussion_topics';
        }
    }

    return {
        interceptLinksToGroupPage: function() {
            $("#content").on('click', '.student-group-title a', function(event) {
                var href= $(this).attr("href");
                interceptLinkToGroupPageForHref(href, event);
            });

            $("#right-side").on('click', '.group_list a', function(event) {
                var href= $(this).attr("href");
                interceptLinkToGroupPageForHref(href, event);
            });
        },

        showGroupHeader: function() {
            var courseId = mmooc.api.getCurrentCourseId();
            var groupId = mmooc.api.getCurrentGroupId();
            if (groupId != null) {
                mmooc.api.getGroupMembers(groupId, function(members) {
                    var headerHTML = mmooc.util.renderTemplateWithData("groupheader", {groupId: groupId, courseId: courseId, members: members});
                    document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', headerHTML);
                });
            }
        },

        changeGroupListURLs: function(href) {
          if (/\/groups(\/)?$/.test(href) || /(\/groups(\??([A-Za-z0-9\=\&]{0,})))$/.test(href)) {
            var list = $('.context_list li a');
            list.each(function(i) {
              this.setAttribute('href', this.getAttribute('href') + '/discussion_topics');
            });
            return true;
          }

          return false;
        }
    };
}();
