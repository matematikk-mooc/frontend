this.mmooc = this.mmooc || {};

this.mmooc.pages = (function() {
  function updateButtonText(container, input, label) {
    if (input.is(':checked')) {
      label.html('Marker som ulest');
      container.addClass('is-done');
    } else {
      label.html('Marker som lest');
      container.removeClass('is-done');
    }
  }
  function getHeaderBarJson() {
    var headerBarPosition = 'after';

    //Content page
    var headerBar = $(
      '#wiki_page_show > div.header-bar-outer-container > div > div.header-bar.flex-container > div.header-bar-right.header-right-flex'
    );

    //Quiz
    if (!headerBar.length) {
      headerBar = $('#quiz_show > div.header-bar > div');
    }
    //Assignment
    if (!headerBar.length) {
      headerBar = $(
        '#assignment_show > div.assignment-title > div.assignment-buttons'
      );
    }
    //Discussion
    if (!headerBar.length) {
      headerBar = $('#discussion-managebar > div > div > div.pull-right');
    }
    //File
    if (!headerBar.length) {
      headerBar = $('#content');
      headerBarPosition = 'before';
    }
    var headerBarJson = { headerBar: headerBar, position: headerBarPosition };

    return headerBarJson;
  }

  function addButton(buttonHtml) {
    var headerBarJson = getHeaderBarJson();
    if (headerBarJson.headerBar.length) {
      if (headerBarJson.position == 'after') {
        headerBarJson.headerBar.append(buttonHtml);
      } else {
        headerBarJson.headerBar.before(buttonHtml);
      }
    } else {
      setTimeout(function() {
        addButton(buttonHtml);
      }, 500);
    }
  }

  return {
    modifyMarkAsDoneButton: function() {
      $('body').bind('wiki-page-rendered', function() {
        var container = $('#mark-as-done-container');
        container.appendTo('#content .usercontent');

        var input = container.find('input');
        var label = container.find('label');
        input.change(function() {
          updateButtonText(container, input, label);
        });

        updateButtonText(container, input, label);

        container.show();
      });
    },
    addGotoModuleButton: function() {
      var moduleItemId = mmooc.api.getCurrentModuleItemId();
      var courseId = mmooc.api.getCurrentCourseId();
      var targetHref =
        '/courses/' + courseId + '/modules#context_module_item_' + moduleItemId;
      var buttonHtml =
        "<a class='btn' href='" + targetHref + "'>Gå til modul</a>";
      addButton(buttonHtml);
    },
    addStudentViewButton: function() {
      var courseId = mmooc.api.getCurrentCourseId();
      var buttonHtml = '<a class="btn student_view_button" ';
      buttonHtml +=
        'rel="nofollow" data-method="post" href="/courses/' +
        ENV.COURSE_ID +
        '/student_view">';
      buttonHtml += '<i class="icon-student-view"></i>Studentvisning</a>';
      addButton(buttonHtml);
    },

    updateSidebarWhenMarkedAsDone: function() {
      $('body').on('click', '#mark-as-done-checkbox', function() {
        var icon = $('ul.mmooc-module-items .active span:last-child');

        if (icon.hasClass('done')) {
          icon.removeClass('done');
        } else {
          icon.addClass('done');
        }

        //Mark principal sybmol as done as well.
        var principal = icon.find(".mmooc-icon-principal-tag")
        if(principal && principal.hasClass('done')) {
          principal.removeClass('done');
          principal.addClass('not_done');
        } else {
          principal.removeClass('not_done');
          principal.addClass('done');
        }

        //Check if header title should/not be marked as done as well.
        var activeHeader = $('#mmooc-module-item-active-header');
        var activeListId = activeHeader.attr('href');
        var activeList = $(activeListId);
        var noOfItemsInActiveList = activeList.find('li').length;
        var noOfItemsDoneInActiveList = activeList.find('li').find('.done')
          .length;
        var headerIcon = activeHeader.find('span:last-child');
        if (noOfItemsDoneInActiveList < noOfItemsInActiveList) {
          headerIcon.removeClass('done');
        } else {
          headerIcon.addClass('done');
        }
      });
    },

    updateSidebarWhenContributedToDiscussion: function() {
      $('#discussion_container').on('click', '.btn-primary', function() {
        var icon = $('ul.mmooc-module-items .active span:last-child');

        if (!icon.hasClass('done')) {
          icon.addClass('done');
        }
      });
    },

    duplicateMarkedAsDoneButton: function() {
      var checkExist = setInterval(function() {
        const targetParent = "module-sequence-footer";
        const targetParentSelector = '.' + targetParent;

        if ($(targetParentSelector).length) {
          clearInterval(checkExist);
          $('#mark-as-done-checkbox')
            .clone()
            .prependTo(targetParentSelector);
          $(document).on('click', '#mark-as-done-checkbox', function() {
            var self = $(this);
            setTimeout(function() {
              if (
                self.parent().attr('class') == targetParent
              ) {
                $('.header-bar-right #mark-as-done-checkbox').remove();
                self.clone().prependTo('.header-bar-right');
              } else {
                $(
                  '.module-sequence-footer-content #mark-as-done-checkbox'
                ).remove();
                self.clone().prependTo(targetParentSelector);
              }
            }, 800);
          });
        }
      }, 100);
    },

    showInformationPane: function(observer, pfdk, unmaintainedSince, alertMsg, isMemberOfExpiredCommunity) {
      var paneHTML = mmooc.util.renderTemplateWithData('informationpane', {observer:observer, pfdk:pfdk, unmaintainedSince:unmaintainedSince, alertMsg:alertMsg, expiredCommunity: isMemberOfExpiredCommunity});
      document
        .getElementById('wrapper')
        .insertAdjacentHTML('afterend', paneHTML);
    },
    hideInformationPane: function() {
      $("#fixed_bottom").hide();
    },
    showBackLinkIfNecessary: function() {
      if ($('#left-side').is(':hidden')) {
        var linkBack = mmooc.util.renderTemplateWithData(
          'navigateToPreviousPage',
          { linkText: mmooc.i18n.LinkBack }
        );
        $(linkBack).prependTo($('#content'));
      }
    },

    redesignAssignmentPage: function() {
      function _isAssignmentWithPeerReview() {
        var returnValue = false;
        var peerReviewer = mmooc.i18n.PeerReviewer;
        if (
          $(
            "#right-side .details .content > h4:contains('" +
              peerReviewer.toLowerCase() +
              "')"
          ).length
        ) {
          returnValue = true;
        }
        return returnValue;
      }

      function _getPeerReviewArray() {
        // 20062018 Erlend: Canvas har endret designet og jeg måtte endre litt denne testen.
        function _getWorkFlowState(peerReviewLinkClass) {
          var _workflow_state = ''; // workflow_state either 'assigned' or 'completed'
          if (peerReviewLinkClass == 'icon-warning') {
            _workflow_state = 'assigned';
          } else if (peerReviewLinkClass == 'icon-check') {
            _workflow_state = 'completed';
          }
          return _workflow_state;
        }

        // 20062018 Erlend: Canvas har endret designet og jeg måtte endre litt på selector.
        //                  Årsaken til at vi må hente ut informasjon om peer review på denne måten
        //                  er at studenter ikke får denne informasjonen via api'et.
        var $peerReviewLinks = $(
          '#right-side .details .content > h4 + ul.unstyled_list a'
        );
        var _peerReview = []; //Peer review api is unfortunately not displaying the info we want (only info about the persons beeing peer reviewers for my submission), so we have to do this by using jquery
        var workflow_state;
        var peerReviewLinkClass;

        $peerReviewLinks.each(function(i) {
          peerReviewLinkClass = $(this)
            .find('i')
            .attr('class');
          workflow_state = _getWorkFlowState(peerReviewLinkClass);
          _peerReview[_peerReview.length] = {
            workflow_state: workflow_state,
            assessor: {
              display_name: $(this).text(),
              mmooc_url: $(this).attr('href')
            }
          };
        });

        console.log('Custom peerReview array:');
        console.log(_peerReview);

        return _peerReview;
      }

      function _appendPeerReviewHtmlOnRightSide(submission, peerReview) {
        var peerReviewHtml = mmooc.util.renderTemplateWithData(
          'assignmentPageWithPeerReviewRightSide',
          { submission: submission, peerReview: peerReview }
        );
        // $("body.assignments #application.ic-app #right-side .details" ).append(peerReviewHtml);
        $(peerReviewHtml).insertBefore(
          'body.assignments #application.ic-app #right-side .details'
        );
      }

      function _appendPeerReviewWarningInContentsColumn(
        submission,
        peerReview
      ) {
        var $peerReviewLinksWarnings = $(
          '#right-side .details .content > h4 + ul.unstyled_list a.warning'
        );
        if ($peerReviewLinksWarnings.length) {
          //If any warnings display peer review warning in the contents column after the assignment meta data
          var peerReviewWarningHtml = mmooc.util.renderTemplateWithData(
            'assignmentPageWithPeerReviewWarning',
            { submission: submission, peerReview: peerReview }
          );
          $(
            'body.assignments #application.ic-app ul.student-assignment-overview'
          ).after(peerReviewWarningHtml);
        }
      }

      function _displayRightColumnContents() {
        $('#right-side .details').show();
      }

      var courseId = mmooc.api.getCurrentCourseId();
      var assignmentId = mmooc.api.getCurrentTypeAndContentId().contentId;
      var user_id = mmooc.api.getUser().id;

      if (_isAssignmentWithPeerReview()) {
        // console.log('user_id:' + user_id);
        mmooc.api.getSingleSubmissionForUser(
          courseId,
          assignmentId,
          user_id,
          function(submission) {
            console.log('submission');
            console.log(submission);
            var peerReview = _getPeerReviewArray();
            _appendPeerReviewHtmlOnRightSide(submission, peerReview);
            _appendPeerReviewWarningInContentsColumn(submission, peerReview);
          }
        );
      } else {
        _displayRightColumnContents();
        $('#submission_comment.submission_comment_textarea').show();
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
          if (current_user_id != submission_user_id) {
            //Submission opened by admin or teacher. We don't make any changes in the existing design when this is the case.
            returnValue = mmooc.i18n.DetailsAboutDelivery;
          }
        }
        return returnValue;
      }

      function _isTeacherViewingStudentsSubmission() {
        var returnValue = false;
        var current_user_id = mmooc.api.getUser().id;
        if (!isPeerReview && current_user_id != submission_user_id) {
          //Submission opened by admin or teacher. We don't make any changes in the existing design when this is the case.
          returnValue = true;
        }
        return returnValue;
      }

      function _isPeerReviewFinished() {
        var returnValue = false;
        if (
          $('.assessment_request_incomplete_message').css('display') == 'none'
        ) {
          returnValue = true;
        }
        return returnValue;
      }

      function _isRubric() {
        var returnValue = false;
        if ($('.assess_submission_link').length) {
          returnValue = true;
        }
        return returnValue;
      }

      function _addClickEventOnOpenAssessmentButton() {
        $(document).on('click', '.open-assessment-dialog-button', function(
          event
        ) {
          event.preventDefault();
          $('#rubric_holder').show();
          // $('.assess_submission_link.rubric').click(); //click on the previous hidden button.
        });
      }

      function _updateDomAfterSaveRubricButtonClick(event) {
        console.log('_updateDomAfterSaveRubricButtonClick is running');
        function _appendCompletedPeerReviewHtml(
          assignment,
          submission,
          peerReview
        ) {
          var submissionTitle = _getSubmissionTitle();
          var isTeacherViewingStudentsSubmission = _isTeacherViewingStudentsSubmission();
          var isPeerReviewFinished = true;
          var submissionObject = {
            assignment: assignment,
            submission: submission,
            peerReview: peerReview,
            submissionTitle: submissionTitle,
            isPeerReview: isPeerReview,
            isPeerReviewFinished: isPeerReviewFinished,
            isTeacherViewingStudentsSubmission: isTeacherViewingStudentsSubmission
          };

          var submissionHtml = mmooc.util.renderTemplateWithData(
            'assignmentSubmission',
            submissionObject
          );

          $(
            '.mmooc-assignment-submission, .mmooc-assignment-submission-answers'
          ).remove(); //Remove old Html that was created before
          $(
            'body.assignments #application.ic-app #content .submission_details'
          ).after(submissionHtml);
        }

        //Functionality for this is as follows:
        // We want the peer review to display that it is finished without a refresh of the page.
        // Unfortunately we don't have any info about the peer review from the API because as a user you don't have access to that data it seems.
        // In order to solve this we check that the user has submitted data by checking the DOM. Then the SubmissionObject used in the template (assignmentSubmission) is changed so the peer review looks completed (which it also is).

        mmooc.api.getSingleAssignment(courseId, assignmentId, function(
          assignment
        ) {
          mmooc.api.getSingleSubmissionForUser(
            courseId,
            assignmentId,
            submission_user_id,
            function(submission) {
              var submission_id = submission.id;

              mmooc.api.getPeerReviewsForSubmissionId(
                courseId,
                assignmentId,
                submission_id,
                function(peerReview) {
                  _logDataToConsole(assignment, submission, peerReview);
                  _appendCompletedPeerReviewHtml(
                    assignment,
                    submission,
                    peerReview
                  );
                }
              );
            }
          );
        });
      }

      function _isPeerReview() {
        var returnValue = false;
        var peerReviewText = mmooc.i18n.PeerReviewer;
        var originalSubmissionHeader =
          'body.assignments #application.ic-app #content .submission_details h2.submission_header';
        if (
          $(originalSubmissionHeader + ":contains('" + peerReviewText + "')")
            .length
        ) {
          returnValue = true;
        }
        return returnValue;
      }

      function _isOwnSubmission() {
        var returnValue = false;
        var deliveryText = mmooc.i18n.Delivery;
        var originalSubmissionHeader =
          'body.assignments #application.ic-app #content .submission_details h2.submission_header';
        if (
          $(originalSubmissionHeader + ":contains('" + deliveryText + "')")
            .length
        ) {
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
          assignment: assignment,
          submission: submission,
          peerReview: peerReview,
          submissionTitle: submissionTitle,
          isPeerReview: isPeerReview,
          isPeerReviewFinished: isPeerReviewFinished,
          isTeacherViewingStudentsSubmission: isTeacherViewingStudentsSubmission
        };

        var submissionHtml = mmooc.util.renderTemplateWithData(
          'assignmentSubmission',
          submissionObject
        );
        $(
          'body.assignments #application.ic-app #content .submission_details'
        ).after(submissionHtml);
      }

      function _addSaveRubricButtonIfItDoesNotExist() {
        function _new_save_rubric_button(event) {
          console.log(
            'dynamically button (#mmooc_save_rubric_button.save_rubric_button )is clicked'
          );

          //Start original rubric button on click code in Canvas LMS
          var showGrade = function(submission) {
            $('.grading_box').val(
              submission.grade != undefined && submission.grade !== null
                ? submission.grade
                : ''
            );
            $('.score').text(
              submission.score != undefined && submission.score !== null
                ? round(submission.score, round.DEFAULT)
                : ''
            );
            $('.published_score').text(
              submission.published_score != undefined &&
                submission.published_score !== null
                ? round(submission.published_score, round.DEFAULT)
                : ''
            );
          };

          var toggleRubric = function($rubric) {
            ariaSetting = $rubric.is(':visible');
            $('#application')
              .find('[data-hide_from_rubric]')
              .attr('aria-hidden', ariaSetting);
          };

          var closeRubric = function() {
            $('#rubric_holder').fadeOut(function() {
              toggleRubric($(this));
              $('.assess_submission_link').focus();
            });
          };

          var $rubric = $(this)
            .parents('#rubric_holder')
            .find('.rubric');
          var data = rubricAssessment.assessmentData($rubric);
          var url = $('.update_rubric_assessment_url').attr('href');
          var method = 'POST';
          $rubric.loadingImage();

          $.ajaxJSON(url, method, data, function(data) {
            $rubric.loadingImage('remove');
            var assessment = data;
            var found = false;
            if (assessment.rubric_association) {
              rubricAssessment.updateRubricAssociation(
                $rubric,
                data.rubric_association
              );
              delete assessment.rubric_association;
            }
            for (var idx in rubricAssessments) {
              var a = rubricAssessments[idx].rubric_assessment;
              if (a && assessment && assessment.id == a.id) {
                rubricAssessments[idx].rubric_assessment = assessment;
                found = true;
              }
            }
            if (!found) {
              if (!data.rubric_assessment) {
                data = { rubric_assessment: data };
              }
              rubricAssessments.push(data);
              var $option = $(document.createElement('option'));
              $option
                .val(assessment.id)
                .text(assessment.assessor_name)
                .attr('id', 'rubric_assessment_option_' + assessment.id);
              $('#rubric_assessments_select')
                .prepend($option)
                .val(assessment.id);
            }
            $('#rubric_assessment_option_' + assessment.id).text(
              assessment.assessor_name
            );
            $('#new_rubric_assessment_option').remove();
            $('#rubric_assessments_list').show();
            rubricAssessment.populateRubric($rubric, assessment);
            submission = assessment.artifact;
            if (submission) {
              showGrade(submission);
            }
            closeRubric();
            //End original rubric button on click code in Canvas LMS
            console.log(
              'Finished running #mmooc_save_rubric_button.save_rubric_button code'
            );
            _updateDomAfterSaveRubricButtonClick();
          });
        }

        if (isPeerReview) {
          var isAssessingRubric = false;
          if ($('#rubric_holder .rubric_container.rubric.assessing').length) {
            isAssessingRubric = true;
          }

          if (isAssessingRubric) {
            //We know that we are in assessing mode
            //The button should be there
            var $saveRubricButton = $(
              '#rubric_holder #rubric_criterion_comments_dialog + .button-container > button.save_rubric_button'
            );
            if ($saveRubricButton.length == 0) {
              console.log('Adding custom save rubric button');
              var saveRubricButtonHtml = mmooc.util.renderTemplateWithData(
                'assignmentPageWithPeerReviewSaveRubricButton',
                {}
              );

              // $("#rubric_holder #rubric_criterion_comments_dialog + .button-container button.save_rubric_button").remove();
              $(
                '#rubric_holder #rubric_criterion_comments_dialog + .button-container'
              ).append(saveRubricButtonHtml);
              $(document).on(
                'click',
                '#mmooc_save_rubric_button',
                _new_save_rubric_button
              );
            }
          }
        }
      }

      if (_isCodeRunningInIframe()) {
        return false; //The code is running in an iframe. Code should not be running.
      }
      var courseId = mmooc.api.getCurrentCourseId();
      var assignmentId = mmooc.api.getCurrentTypeAndContentId().contentId;
      var isRubric = _isRubric();
      var isPeerReview = _isPeerReview();
      var isOwnSubmission = _isOwnSubmission();
      var submission_user_id = ENV.SUBMISSION.user_id;

      if (isRubric) {
        //Spesial design dersom vi bruker vurderingskriterier.
        if (isPeerReview || isOwnSubmission) {
          mmooc.api.getSingleAssignment(courseId, assignmentId, function(
            assignment
          ) {
            mmooc.api.getSingleSubmissionForUser(
              courseId,
              assignmentId,
              submission_user_id,
              function(submission) {
                var submission_id = submission.id;

                mmooc.api.getPeerReviewsForSubmissionId(
                  courseId,
                  assignmentId,
                  submission_id,
                  function(peerReview) {
                    _logDataToConsole(assignment, submission, peerReview);
                    _appendSubmissionHtml(assignment, submission, peerReview);
                    _addClickEventOnOpenAssessmentButton();
                    //                            _addSaveRubricButtonIfItDoesNotExist(); //Enable this if the button 'Lagre kommentar' in the peer review dialog is not displaying
                    //                          Update: This is a bug in Canvas: https://community.canvaslms.com/thread/12681-peer-review-issues
                    $(document).on(
                      'click',
                      'button.save_rubric_button',
                      _updateDomAfterSaveRubricButtonClick
                    );
                  }
                );
              }
            );
          });
        }
      } //Vis standard design.
      else {
        $('.submission-details-header.submission_details').show();
        $('.submission-details-comments').show();
        $('#submission_comment.submission_comment_textarea').show();
      }
    }
  };
})();
