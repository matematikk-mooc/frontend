this.mmooc=this.mmooc||{};


this.mmooc.pages = function() {
    function updateButtonText(container, input, label) {
        if (input.is(":checked")) {
            label.html('Marker som ulest');
            container.addClass("is-done");
        } else {
            label.html('Marker som lest');
            container.removeClass("is-done");
        }
    }

    return {
        modifyMarkAsDoneButton: function() {
            $("body").bind("wiki-page-rendered", function() {
                var container = $("#mark-as-done-container");
                container.appendTo("#content .usercontent");

                var input = container.find("input");
                var label = container.find("label");
                input.change(function() {
                    updateButtonText(container, input, label);
                });

                updateButtonText(container, input, label);


                container.show();
            });
        },

        updateSidebarWhenMarkedAsDone: function() {
          $("body").on("click", "#mark-as-done-checkbox", function() {
            var icon = $("ul.mmooc-module-items .active span:last-child");

            if (icon.hasClass("done")) {
              icon.removeClass("done");
            } else {
              icon.addClass("done");
            }
          })
        },

        // changeTranslations : function() {
        //     $("a.submit_assignment_link").text('Lever besvarelse');
        // },

        showBackLinkIfNecessary: function() {
            if ($('#left-side').is(':hidden')) {
                var linkBack = mmooc.util.renderTemplateWithData("navigateToPreviousPage", {linkText: mmooc.i18n.LinkBack});
                $(linkBack).prependTo($('#content'));
            }
        },

        showBackToAssignmentLink: function(href) {
          if (/\/courses\/\d+\/assignments\/\d+\/submissions\/\d+$/.test(href)) {
            $('#add_comment_form').append('<a href="javascript:window.history.back();" style="margin-top: 20px; display: inline-block;">Tilbake til oppgaven</a>');
            return true;
          }

          return false;
        },
        
        redesignAssignmentPage: function() {
            //Still under development
            var assignmentDetailsSelector = "#right-side .details";
            // var $assignmentsDetails = $(assignmentDetailsSelector);
            var deliveryDate = $(assignmentDetailsSelector + " .content > span:first-of-type").text();
            
            peerReviewObject = { 
                deliveryDate : deliveryDate
            };
            
            var courseId = mmooc.api.getCurrentCourseId();
            var assignmentId = mmooc.api.getCurrentTypeAndContentId().contentId;
            var user_id = mmooc.api.getUser().id;
            console.log('user_id:' + user_id);

            mmooc.api.getSingleAssignment(courseId, assignmentId, function(assignment) {
                console.log('assignment');
                console.log(assignment);
                
                if (assignment.peer_reviews) { //If this is an assignment with peer reviews
                    mmooc.api.getSingleSubmissionForUser(courseId, assignmentId, user_id, function(submission) {
                        console.log('submission');
                        console.log(submission);
                        // var peerReviewHtml = mmooc.util.renderTemplateWithData("peerReviewRightSide", peerReviewObject);
                        
                        mmooc.api.getPeerReviewsForUser(courseId, assignmentId, user_id, function(peerReview) {
                            console.log('peerReview');
                            console.log(peerReview);
                            
                            var peerReviewHtml = mmooc.util.renderTemplateWithData("peerReviewRightSide", { assignment: assignment, submission : submission, peerReview:peerReview });
                            $("body.assignments #application.ic-app #right-side .details" ).append(peerReviewHtml);
                            
                            if (peerReview.length) {
                                var peerReviewWarningHtml = mmooc.util.renderTemplateWithData("peerReviewWarning", { assignment: assignment, submission : submission, peerReview:peerReview });
                                $("body.assignments #application.ic-app ul.student-assignment-overview" ).after(peerReviewWarningHtml);
                            }
                        });
                        
                    });
                } 
            });
        }
    };
}();
