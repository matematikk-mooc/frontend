this.mmooc = this.mmooc || {};

this.mmooc.discussionTopics = function () {
    return {
        setDiscussionTopicPubDate: function(discussionTopic) {
            var formattedDate = mmooc.util.formattedDate(discussionTopic.posted_at);
            var pubDate = $("<div class='publication-date'>" + formattedDate + "</div>");
            $(pubDate).prependTo('.discussion-header-right');
        }
    };
}();

