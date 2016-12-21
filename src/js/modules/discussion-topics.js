this.mmooc = this.mmooc || {};

this.mmooc.discussionTopics = function () {
    return {
        setDiscussionTopicPubDate: function(discussionTopic) {
            var formattedDate = mmooc.util.formattedDate(discussionTopic.posted_at);
            var pubDate = $("<div class='publication-date'>" + formattedDate + "</div>");
            $(pubDate).prependTo('#discussion_topic .discussion-header-right');
        },

        alterDiscussionReadStateLook: function() {
            var self = this;
            $('body').on('click', '.read-unread-button', function (){
               $(this).toggleClass('read');
               $(this).closest(".entry-content").siblings(".discussion-read-state-btn").click();
               self.toggleReadUnreadButton($(this));
           });

            var checkExist = setInterval(function() {
                if ($('.discussion-read-state-btn').length) {
                  clearInterval(checkExist);
                  var readUnreadButton = $("<div class='read-unread-button'>Marker som lest</div>");
                  readUnreadButton.appendTo('.discussion_entry .entry-header');
                  self.toggleReadUnreadButton($(this).closest(".discussion_entry").find("read-unread-button"));
                }
            }, 100);
        },

        toggleReadUnreadButton: function(button) {
            $(".discussion-read-state-btn").each(function(index) {
                    var button = $(this).siblings(".entry-content").find(".read-unread-button");
                    if($(this).parent().hasClass("unread")) {
                        button.text('Marker som lest');
                        button.addClass('read');
                    }
                    else {
                        button.text('Marker som ulest');
                        button.removeClass('read');
                    }
                });
        },
        setDiscussionsListUnreadClass: function() {
          var wait = setInterval(function() {
            clearInterval(wait);
            $("#open-discussions .ig-list .discussion").each(function() {
              var unread = $(this).find('.new-items').text();
              if(unread.indexOf('0') == -1) {
                $(this).addClass('unread');
              }
            });
          }, 800);
          
        }
    };
}();

