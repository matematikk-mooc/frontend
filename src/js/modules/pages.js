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
        
        replaceCreateAccountLink: function() {
          var url = "/enroll/" + mmooc.settings.selfRegisterCourseCode;
          $("#register_link").attr("href", url);
          $("#register_link div.ic-Login__banner-title").html(mmooc.i18n.CreateAccountTitle);
          $("#register_link div.ic-Login__banner-subtitle").html(mmooc.i18n.CreateAccountSubtitle);
        },

        duplicateMarkedAsDoneButton: function() {
            var checkExist = setInterval(function() {
                if($('.module-sequence-footer-content').length) {
                  clearInterval(checkExist);
                  $("#mark-as-done-checkbox").clone().prependTo(".module-sequence-footer-content");
                  $(document).on("click","#mark-as-done-checkbox", function() {
                    var self = $(this);
                    setTimeout(function(){ 
                        if(self.parent().attr("class") == "module-sequence-footer-content") {
                        $(".header-bar-right #mark-as-done-checkbox").remove();
                        self.clone().prependTo(".header-bar-right");
                    }
                    else {
                        $(".module-sequence-footer-content #mark-as-done-checkbox").remove();
                        self.clone().prependTo(".module-sequence-footer-content");
                    }
                    }, 800);
                  });
                }
            }, 100);
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
                if ($('.assessment_request_incomplete_message').css('display') == 'none') {
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

            function _updateDomAfterSaveRubricButtonClick(event) {
                console.log('_updateDomAfterSaveRubricButtonClick is running');
                function _arePointsGivenInRubric() {
                    
                    var criterion_descriptionsCompleted = $('#rubric_holder table.rubric_table tr.criterion:not(.blank) td.criterion_description.completed').length;
                    var criterion_descriptions = $('#rubric_holder table.rubric_table tr.criterion:not(.blank) td.criterion_description').length;
                    var totalPoints = $('#rubric_holder table.rubric_table tr.summary .rubric_total').text();
                    
                    var pointsAreGiven = false;
                    if (totalPoints != "") {
                        if (criterion_descriptionsCompleted == criterion_descriptions) { //If all criteria are filled in 
                            pointsAreGiven = true;
                        }
                    }
                    
                    return pointsAreGiven; 
                }

                function _appendCompletedPeerReviewHtml(assignment, submission, peerReview) {
                    var submissionTitle = _getSubmissionTitle();
                    var isTeacherViewingStudentsSubmission = _isTeacherViewingStudentsSubmission();
                    var isPeerReviewFinished = true;
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

                    $(".mmooc-assignment-submission, .mmooc-assignment-submission-answers").remove(); //Remove old Html that was created before
                    $("body.assignments #application.ic-app #content .submission_details" ).after(submissionHtml);
                }
                
                //Functionality for this is as follows:
                // We want the peer review to display that it is finished without a refresh of the page.
                // Unfortunately we don't have any info about the peer review from the API because as a user you don't have access to that data it seems.
                // In order to solve this we check that the user has submitted data by checking the DOM. Then the SubmissionObject used in the template (assignmentSubmission) is changed so the peer review looks completed (which it also is).  

                if (_arePointsGivenInRubric()) {
                    mmooc.api.getSingleAssignment(courseId, assignmentId, function(assignment) {
                        mmooc.api.getSingleSubmissionForUser(courseId, assignmentId, submission_user_id, function(submission) {
                            var submission_id = submission.id;

                            mmooc.api.getPeerReviewsForSubmissionId(courseId, assignmentId, submission_id, function(peerReview) {
                                _logDataToConsole(assignment, submission, peerReview);
                                _appendCompletedPeerReviewHtml(assignment, submission, peerReview);
                            });
                        });
                    });
                }
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

            function _addSaveRubricButtonIfItDoesNotExist() {

                function _new_save_rubric_button(event) {
                    console.log('dynamically button (#mmooc_save_rubric_button.save_rubric_button )is clicked');

                    //Start original rubric button on click code in Canvas LMS
                    var showGrade = function(submission) {
                        $(".grading_box").val(submission.grade != undefined && submission.grade !== null ? submission.grade : "");
                        $(".score").text(submission.score != undefined && submission.score !== null ? round(submission.score, round.DEFAULT) : "");
                        $(".published_score").text(submission.published_score != undefined && submission.published_score !== null ? round(submission.published_score, round.DEFAULT) : "");
                    };

                    var toggleRubric = function($rubric) {
                        ariaSetting = $rubric.is(":visible");
                        $("#application").find("[data-hide_from_rubric]").attr("aria-hidden", ariaSetting)
                    };

                    var closeRubric = function() {
                        $("#rubric_holder").fadeOut(function() {
                        toggleRubric($(this));
                        $(".assess_submission_link").focus();
                        });
                    };

                    var $rubric = $(this).parents("#rubric_holder").find(".rubric");
                    var data = rubricAssessment.assessmentData($rubric);
                    var url = $(".update_rubric_assessment_url").attr('href');
                    var method = "POST";
                    $rubric.loadingImage();
                    
                    $.ajaxJSON(url, method, data, function(data) {
                        $rubric.loadingImage('remove');
                        var assessment = data;
                        var found = false;
                        if(assessment.rubric_association) {
                            rubricAssessment.updateRubricAssociation($rubric, data.rubric_association);
                            delete assessment.rubric_association;
                        }
                        for(var idx in rubricAssessments) {
                            var a = rubricAssessments[idx].rubric_assessment;
                            if(a && assessment && assessment.id == a.id) {
                                rubricAssessments[idx].rubric_assessment = assessment;
                                found = true;
                            }
                        }
                        if(!found) {
                            if (!data.rubric_assessment) {
                                data = { rubric_assessment: data };
                            }
                            rubricAssessments.push(data);
                            var $option = $(document.createElement('option'));
                            $option.val(assessment.id).text(assessment.assessor_name).attr('id', 'rubric_assessment_option_' + assessment.id);
                            $("#rubric_assessments_select").prepend($option).val(assessment.id);
                        }
                        $("#rubric_assessment_option_" + assessment.id).text(assessment.assessor_name);
                        $("#new_rubric_assessment_option").remove();
                        $("#rubric_assessments_list").show();
                        rubricAssessment.populateRubric($rubric, assessment);
                        submission = assessment.artifact;
                        if (submission) {
                            showGrade(submission);
                        }
                        closeRubric();
                        //End original rubric button on click code in Canvas LMS
                        console.log('Finished running #mmooc_save_rubric_button.save_rubric_button code');
                        _updateDomAfterSaveRubricButtonClick();
                    });
                }

                if (isPeerReview) {
                    var isAssessingRubric = false;
                    if ($('#rubric_holder .rubric_container.rubric.assessing').length) {
                        isAssessingRubric = true;
                    }

                    if (isAssessingRubric) { //We know that we are in assessing mode
                        //The button should be there
                        var $saveRubricButton = $("#rubric_holder #rubric_criterion_comments_dialog + .button-container > button.save_rubric_button");
                        if ($saveRubricButton.length == 0) {
                            console.log('Adding custom save rubric button');
                            var saveRubricButtonHtml = mmooc.util.renderTemplateWithData("assignmentPageWithPeerReviewSaveRubricButton", {});
                            
                            // $("#rubric_holder #rubric_criterion_comments_dialog + .button-container button.save_rubric_button").remove(); 
                            $("#rubric_holder #rubric_criterion_comments_dialog + .button-container").append(saveRubricButtonHtml);
                            $(document).on("click", "#mmooc_save_rubric_button", _new_save_rubric_button);
                        }
                    }
                }
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
//                            _addSaveRubricButtonIfItDoesNotExist(); //Enable this if the button 'Lagre kommentar' in the peer review dialog is not displaying
                            $(document).on("click", "button.save_rubric_button", _updateDomAfterSaveRubricButtonClick);
                        }); 
                    });
                });
            }
        }
    };
}();
