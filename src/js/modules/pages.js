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

        redesignAssignmentPage: function() {

            function _isAssignmentWithPeerReview() {
                var returnValue = false;
                var peerReviewer = mmooc.i18n.PeerReviewer;
                if ($("#right-side .details .content > h4:contains('" + peerReviewer.toLowerCase() + "')").length) {
                    returnValue = true;
                }
                return returnValue;
            }

            function _getPeerReviewArray() {

                function _getWorkFlowState(peerReviewLinkClass) {
                    var _workflow_state = ""; // workflow_state either 'assigned' or 'completed'
                    if (peerReviewLinkClass == "warning") {
                        _workflow_state = 'assigned';
                    } else if (peerReviewLinkClass == "pass") {
                        _workflow_state = 'completed';
                    }
                    return _workflow_state; 
                }

                var $peerReviewLinks = $("#right-side .details .content > h4 + ul.unstyled_list a");
                var _peerReview = []; //Peer review api is unfortunately not displaying the info we want (only info about the persons beeing peer reviewers for my submission), so we have to do this by using jquery
                var workflow_state;
                var peerReviewLinkClass;

                $peerReviewLinks.each(function(i){
                    peerReviewLinkClass = $(this).attr('class');
                    workflow_state = _getWorkFlowState(peerReviewLinkClass);
                    _peerReview[_peerReview.length] = {"workflow_state" : workflow_state, "assessor" : { "display_name" : $(this).text(), "mmooc_url": $(this).attr('href')}};
                });

                console.log('Custom peerReview array:');
                console.log(_peerReview);

                return _peerReview;
            }

            function _appendPeerReviewHtmlOnRightSide(submission, peerReview) {
                var peerReviewHtml = mmooc.util.renderTemplateWithData("assignmentPageWithPeerReviewRightSide", { submission : submission, peerReview:peerReview });
                // $("body.assignments #application.ic-app #right-side .details" ).append(peerReviewHtml);
                $(peerReviewHtml).insertBefore("body.assignments #application.ic-app #right-side .details");
            }

            function _appendPeerReviewWarningInContentsColumn(submission, peerReview) {
                var $peerReviewLinksWarnings = $("#right-side .details .content > h4 + ul.unstyled_list a.warning");
                if ($peerReviewLinksWarnings.length) { //If any warnings display peer review warning in the contents column after the assignment meta data
                    var peerReviewWarningHtml = mmooc.util.renderTemplateWithData("assignmentPageWithPeerReviewWarning", { submission : submission, peerReview:peerReview });
                    $("body.assignments #application.ic-app ul.student-assignment-overview" ).after(peerReviewWarningHtml);
                }
            }

            function _displayRightColumnContents() {
                $("#right-side .details").show();
            }

            var courseId = mmooc.api.getCurrentCourseId();
            var assignmentId = mmooc.api.getCurrentTypeAndContentId().contentId;
            var user_id = mmooc.api.getUser().id;

            if (_isAssignmentWithPeerReview()) {
                // console.log('user_id:' + user_id);
                mmooc.api.getSingleSubmissionForUser(courseId, assignmentId, user_id, function(submission) {
                    console.log('submission');
                    console.log(submission);
                    var peerReview = _getPeerReviewArray();
                    _appendPeerReviewHtmlOnRightSide(submission, peerReview);
                    _appendPeerReviewWarningInContentsColumn(submission, peerReview);
                });
            } else {
                _displayRightColumnContents();
            }
        },

        redesignPeerReviewAndOwnSubmissionDetailsPage: function() {

            function _isCodeRunningInIframe() {
                var returnValue = true;
                if (ENV.SUBMISSION && ENV.SUBMISSION.user_id) {
                    returnValue = false;
                }
                return returnValue;
            }

            function _getSubmissionTitle() {
                var returnValue;
                var current_user_id = mmooc.api.getUser().id;
                if (isPeerReview) {
                    returnValue = mmooc.i18n.PeerReview;
                } else {
                    returnValue = mmooc.i18n.DetailsAboutYourDelivery;
                    if (current_user_id != submission_user_id) { //Submission opened by admin or teacher. We don't make any changes in the existing design when this is the case.
                        returnValue = mmooc.i18n.DetailsAboutDelivery;
                    }
                }
                return returnValue;
            }

            function _isTeacherViewingStudentsSubmission() {
                var returnValue = false;
                var current_user_id = mmooc.api.getUser().id;
                if (!isPeerReview && current_user_id != submission_user_id) { //Submission opened by admin or teacher. We don't make any changes in the existing design when this is the case.
                    returnValue = true;
                }
                return returnValue;
            }

            function _isPeerReviewFinished() {
                var returnValue = false;
                if($('.assessment_request_incomplete_message').css('display') == 'none') {
                    returnValue = true;
                }
                return returnValue;
            }

            function _addClickEventOnOpenAssessmentButton() {
                $(document).on("click", ".open-assessment-dialog-button", function(event) {
                    event.preventDefault();
                    $('#rubric_holder').show();
                    // $('.assess_submission_link.rubric').click(); //click on the previous hidden button.
                });
            }

            function _isPeerReview() {
                var returnValue = false;
                var peerReviewText = mmooc.i18n.PeerReview;
                var originalSubmissionHeader = "body.assignments #application.ic-app #content .submission_details h2.submission_header";
                if ($(originalSubmissionHeader + ":contains('" + peerReviewText + "')").length) {
                    returnValue = true;
                }
                return returnValue;
            }

            function _isOwnSubmission() {
                var returnValue = false;
                var deliveryText = mmooc.i18n.Delivery;
                deliveryText = deliveryText.toLowerCase();
                var originalSubmissionHeader = "body.assignments #application.ic-app #content .submission_details h2.submission_header";
                if ($(originalSubmissionHeader + ":contains('" + deliveryText + "')").length) {
                    returnValue = true;
                }
                return returnValue;
            }

            function _logDataToConsole(assignment, submission, peerReview) {
                console.log('submission_user_id:' + submission_user_id);
                console.log('Assignment:');
                console.log(assignment);
                console.log('Submission:');
                console.log(submission);
                console.log('peerReview for submission id');
                console.log(peerReview);
            }

            function _appendSubmissionHtml(assignment, submission, peerReview) {
                var submissionTitle = _getSubmissionTitle();
                var isTeacherViewingStudentsSubmission = _isTeacherViewingStudentsSubmission();
                var isPeerReviewFinished = _isPeerReviewFinished();
                var submissionObject = {
                        assignment : assignment,
                        submission : submission,
                        peerReview : peerReview,
                        submissionTitle : submissionTitle,
                        isPeerReview : isPeerReview,
                        isPeerReviewFinished : isPeerReviewFinished,
                        isTeacherViewingStudentsSubmission : isTeacherViewingStudentsSubmission
                    };

                var submissionHtml = mmooc.util.renderTemplateWithData("assignmentSubmission", submissionObject);
                $("body.assignments #application.ic-app #content .submission_details" ).after(submissionHtml);
            }

            if (_isCodeRunningInIframe()) {
                return false; //The code is running in an iframe. Code should not be running.
            }
            var courseId = mmooc.api.getCurrentCourseId();
            var assignmentId = mmooc.api.getCurrentTypeAndContentId().contentId;
            var isPeerReview = _isPeerReview();
            var isOwnSubmission = _isOwnSubmission();
            var submission_user_id = ENV.SUBMISSION.user_id; 

            if (isPeerReview || isOwnSubmission) { 
                mmooc.api.getSingleAssignment(courseId, assignmentId, function(assignment) {
                    mmooc.api.getSingleSubmissionForUser(courseId, assignmentId, submission_user_id, function(submission) {
                        var submission_id = submission.id;    

                        mmooc.api.getPeerReviewsForSubmissionId(courseId, assignmentId, submission_id, function(peerReview) {
                            _logDataToConsole(assignment, submission, peerReview);
                            _appendSubmissionHtml(assignment, submission, peerReview);
                            _addClickEventOnOpenAssessmentButton();  
                        });
                        
                        

                        //  mmooc.api.getPeerReviewsForUser(courseId, assignmentId, user_id, function(peerReview) {
                        // mmooc.api.getPeerReviewsForUser(courseId, assignmentId, submission_user_id, function(peerReview) {
                        //     console.log('peerReview');
                        //     console.log(peerReview);
                        // });
                        

                        // mmooc.api.getPeerReviewsForAssignment(courseId, assignmentId, function(peerReview) {
                        //     console.log('peerReview for assignment');
                        //     console.log(peerReview);
                        // });
                    });
                });
            }
        }
    };
}();
