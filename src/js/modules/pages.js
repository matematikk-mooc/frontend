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
            var courseId = mmooc.api.getCurrentCourseId();
            var assignmentId = mmooc.api.getCurrentTypeAndContentId().contentId;
            var user_id = mmooc.api.getUser().id;
            var peerReviewer = mmooc.i18n.PeerReviewer;
            console.log('user_id:' + user_id);

            if ($("#right-side .details .content > h4:contains('" + peerReviewer.toLowerCase() + "')").length) {
                mmooc.api.getSingleSubmissionForUser(courseId, assignmentId, user_id, function(submission) {
                    console.log('submission');
                    console.log(submission);
                        
                    var $peerReviewLinks = $("#right-side .details .content > h4 + ul.unstyled_list a");
                    peerReview = []; //Peer review api is unfortunately not displaying the info we want (only info about the persons beeing peer reviewers for my submission), so we have to do this by using jquery
                    var workflow_state;
                    var peerReviewLinkClass;
                    $peerReviewLinks.each(function(i){
                        // workflow_state either 'assigned' or 'completed'
                        console.log('peer review link class: ' + $(this).attr('class'));
                        peerReviewLinkClass = $(this).attr('class');
                        if (peerReviewLinkClass == "warning") {
                            workflow_state = 'assigned';
                        }
                        if (peerReviewLinkClass == "pass") {
                            workflow_state = 'completed';
                        }
                        console.log('Workflow state: ' + workflow_state);
                        
                        peerReview[peerReview.length] = {"workflow_state" : workflow_state, "assessor" : { "display_name" : $(this).text(), "mmooc_url": $(this).attr('href')}};
                        console.log('Custom peerReview array');
                        console.log(peerReview);
                    });
                    
                    var peerReviewHtml = mmooc.util.renderTemplateWithData("peerReviewRightSide", { submission : submission, peerReview:peerReview });
                    $("body.assignments #application.ic-app #right-side .details" ).append(peerReviewHtml);
                    
                    //If any warnings display peer review warning in the contents column after the assignment meta data
                    var $peerReviewLinksWarnings = $("#right-side .details .content > h4 + ul.unstyled_list a.warning");
                    if ($peerReviewLinksWarnings.length) {
                        var peerReviewWarningHtml = mmooc.util.renderTemplateWithData("peerReviewWarning", { submission : submission, peerReview:peerReview });
                        $("body.assignments #application.ic-app ul.student-assignment-overview" ).after(peerReviewWarningHtml); 
                    }
                });
            }
            
            // mmooc.api.getSingleAssignment(courseId, assignmentId, function(assignment) {
            //     if (assignment.peer_reviews) { //If this is an assignment with peer reviews
            //         console.log('assignment');
            //         console.log(assignment);
            //     } 
            // });
            
            //  mmooc.api.getPeerReviewsForUser(courseId, assignmentId, user_id, function(peerReview) { 
            //     console.log('peerReview');
            //     console.log(peerReview);
            // });
        }
    };
}();
