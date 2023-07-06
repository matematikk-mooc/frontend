import api from "../api/api";
import head from "../../templates/modules/powerfunctions/head.hbs";
import mainteacher from "../../templates/modules/powerfunctions/mainteacher.hbs";
import peerReview from "../../templates/modules/powerfunctions/peer-review.hbs";
import settings from "../settings";
import studentprogress from "../../templates/modules/powerfunctions/student-progress.hbs";
import tail from "../../templates/modules/powerfunctions/tail.hbs";
import util from "./util";

export default (function() {
  let rootId = undefined;

  _render = (template, heading, data) => {
    const html =
      util.renderTemplateWithData(head, {
        heading: heading
      }) +
      util.renderTemplateWithData(template, data) +
      util.renderTemplateWithData(tail, {});
    document.getElementById(rootId).innerHTML = html;
  };

  AssignPeerReviewsForGroup = () => {
    _renderView = () => {
      api.getCoursesForUser(courses => {
        _render(peerReview, 'Assign peer reviews by group', {
          courses: courses
        });
        let peerReviewAssignments = [];
        $('#mmpf-course-select').change(() => {
          const courseID = $('#mmpf-course-select option:selected').val();
          api.getGroupCategoriesForCourse(courseID, categories => {
            $('.step-2').css('display', 'list-item');
            $('.step-3').css('display', 'none');
            $('.step-4').css('display', 'none');
            let html = `${html}<option value=''>Choose a group set</option>`;
            categories.forEach(category => {
              html = `${html}<option value='${category.id}'>${
                category.name
              }</option>`;
            });
            $('#mmpf-category-select').html(html);
            $('.peer-review-list').html('');
            $('.assignment-info').html('');
          });
        });

        $('#mmpf-category-select').change(() => {
          const categoryID = $('#mmpf-category-select option:selected').val();
          api.getGroupsInCategory(categoryID, groups => {
            $('.step-3').css('display', 'list-item');
            $('.step-4').css('display', 'none');
            let html = `${html}<option value='' disabled>Choose groups</option>`;
            groups.forEach(
              group =>
                (html = `${html}<option value="${group.id}">${
                  group.name
                }</option>`)
            );
            $('#mmpf-group-select').html(html);
            $('.peer-review-list').html('');
            $('.assignment-info').html('');
          });
        });

        $('#mmpf-group-select').change(() => {
          const courseID = $('#mmpf-course-select option:selected').val();
          api.getAssignmentsForCourse(courseID, assignments => {
            peerReviewAssignments = [];
            assignments.forEach(assignment => {
              if (assignment.peer_reviews)
                peerReviewAssignments.push(assignment);
            });
            let html = "<option value=''>Choose an assignment</option>";
            peerReviewAssignments.forEach(
              peerReviewAssignment =>
                (html = `${html}<option value="${peerReviewAssignment.id}">${
                  peerReviewAssignment.name
                }</option>`)
            );
            $('#mmpf-assignment-select').html(html);
            $('.peer-review-list').html('');
            $('.assignment-info').html('');
            $('.step-4').css('display', 'list-item');
          });
        });

        $('#mmpf-assignment-select').change(() => {
          const assignmentID = $(
            '#mmpf-assignment-select option:selected'
          ).val();
          for (let i = 0; i < peerReviewAssignments.length; i++) {
            if (peerReviewAssignments[i].id == assignmentID) {
              var activeAssignment = peerReviewAssignments[i];
            }
          }
          let assignmentDue = new Date(activeAssignment.due_at);
          if (typeof activeAssignment.peer_reviews_assign_at !== 'undefined') {
            let peerReviewDue = new Date(
              activeAssignment.peer_reviews_assign_at
            );
            peerReviewDue = `0${peerReviewDue
              .getDate()
              .slice(-2)}.0${peerReviewDue
              .getMonth()
              .slice(-2)}.${peerReviewDue.getFullYear()}`;
          } else {
            peerReviewDue = 'Ikke satt';
          }
          assignmentDue = `0${assignmentDue
            .getDate()
            .slice(-2)}.0${assignmentDue
            .getMonth()
            .slice(-2)}.${assignmentDue.getFullYear()}`;
          const html = `<h3>${
            activeAssignment.name
          }</h3><p><span class='bold'>Innleveringsfrist: </span>${assignmentDue}<br>
						<span class='bold'>Hverandrevurderingsfrist: </span>${peerReviewDue}</p>`;
          $('.assignment-info').html(html);
          let selectedGroups = [];
          $('#mmpf-group-select option:selected').each(() => {
            selectedGroups.push(this);
          });
          $('.peer-review-list').html('');
          _listPeerReviewsForGroup(selectedGroups, assignmentID);
          _showInput();
        });
      });
    };

    _listPeerReviewsForGroup = (selectedGroups, assignmentID) => {
      $('.peer-review-list').html('');
      $('.progress-info').html(
        '<p>Laster hverandrevurderinger... (Kan ta opptil 1 minutt)</p>'
      );
      const courseID = $('#mmpf-course-select option:selected').val();
      let html = '';
      let peerReviewsInGroup = [];
      let count = 0;
      let asyncsDone = 0;
      let inArray = false;
      const groupsMembers = [];
      const allSubmitted = [];
      let noOfAssignedPeerReviewsForStudent = [];
      let noOfPeerReviewersForStudent = [];
      api.getPeerReviewsForAssignment(
        courseID,
        assignmentID,
        peerReviews => {
          for (var i = 0; i < selectedGroups.length; i++) {
            api.getGroupMembers(selectedGroups[i].value, function(
              members
            ) {
              groupsMembers.push(members);
              asyncsDone++;
              $('.progress-info').html('Laster grupper');
              $('#progress').show();
              var width = (100 / selectedGroups.length) * asyncsDone + '%';
              $('#bar').width(width);
              if (asyncsDone == selectedGroups.length) {
                //Sort groups array based on selected groups array
                var groupsMembersSorted = [];
                for (var i = 0; i < selectedGroups.length; i++) {
                  for (var j = 0; j < groupsMembers.length; j++) {
                    if (
                      selectedGroups[i].value == groupsMembers[j][0].group_id
                    ) {
                      groupsMembersSorted.push(groupsMembers[j]);
                      break;
                    }
                  }
                }
                _findSubmissionsForGroups(groupsMembersSorted);
              }
            });
          }

          _findSubmissionsForGroups = groupsMembers => {
            const totalMembers = 0;
            asyncsDone = 0;
            // Find total members
            for (let j = 0; j < groupsMembers.length; j++) {
              for (let i = 0; i < groupsMembers[j].length; i++) {
                totalMembers++;
              }
            }
            for (let j = 0; j < groupsMembers.length; j++) {
              // Get submissions for users in group and push to array if workflow_state is submitted or graded
              for (let i = 0; i < groupsMembers[j].length; i++) {
                api.getSingleSubmissionForUser(
                  courseID,
                  assignmentID,
                  groupsMembers[j][i].id,
                  submission => {
                    $('.progress-info').html('Laster besvarelser');
                    if (
                      submission.workflow_state == 'submitted' ||
                      submission.workflow_state == 'graded'
                    ) {
                      allSubmitted.push(submission);
                    }
                    asyncsDone++;
                    width = (100 / totalMembers) * asyncsDone + '%';
                    $('#bar').width(width);
                    // Print groups when all requests are done
                    if (asyncsDone == totalMembers) {
                      for (let i = 0; i < groupsMembers.length; i++) {
                        _printSingleGroup(groupsMembers[i], allSubmitted);
                      }
                    }
                  }
                );
              }
            }
          };

          _printSingleGroup = (members, submitted) => {
            peerReviewsInGroup = [];
            inArray = false;
            count = 0;
            var groupName;
            members.forEach(
              member => (noOfPeerReviewersForStudent[member.id] = 0)
            );
            for (let i = 0; i < selectedGroups.length; i++) {
              if (selectedGroups[i].value == members[0].group_id) {
                groupName = selectedGroups[i].text;
              }
            }
            html = `<h3>${groupName}</h3><ul>`;
            // Traverse all peer reviews and group members
            for (let i = 0; i < peerReviews.length; i++) {
              for (let j = 0; j < members.length; j++) {
                // Check if object is already in array
                for (let k = 0; k < peerReviewsInGroup.length; k++) {
                  if (peerReviewsInGroup[k] === peerReviews[i]) inArray = true;
                }
                // Push object to array if assesor is member of group and object not already in array
                if (peerReviews[i].assessor_id == members[j].id && !inArray) {
                  peerReviewsInGroup[count] = peerReviews[i];
                  count++;
                }
                inArray = false;
              }
            }
            inArray = false;
            for (let i = 0; i < members.length; i++) {
              const noOfAssignedPeerReviews = 0;
              count = 0;
              // List users and tag users without submissions
              if (submitted) {
                for (let j = 0; j < submitted.length; j++) {
                  // Check if user has submission
                  if (submitted[j].user_id == members[i].id) {
                    html = `${html}<li><a href='/courses/${courseID}/assignments/${assignmentID}/submissions/${
                      members[i].id
                    }' target='_blank'>${members[i].name}</a></li><ul>`;
                    inArray = true;
                    break;
                  }
                }
                if (!inArray) {
                  html = `${html}<li>${
                    members[i].name
                  }<span class='no-submission'>Ikke levert besvarelse</span></li><ul>`;
                }
              } else {
                html = `${html}<li>${members[i].name}</li><ul>`;
              }
              for (let k = 0; k < peerReviewsInGroup.length; k++) {
                if (members[i].id == peerReviewsInGroup[k].assessor_id) {
                  noOfAssignedPeerReviews++;
                  noOfPeerReviewersForStudent[peerReviewsInGroup[k].user.id]++;
                  // List user name and tag peer review as completed/not completed
                  if (peerReviewsInGroup[k].workflow_state == 'completed') {
                    html = `${html}<li>
										<a href='/courses/${courseID}/assignments/${assignmentID}/submissions/${
                      peerReviewsInGroup[k].user.id
                    }' target='_blank'>
										${
                      peerReviewsInGroup[k].user.display_name
                    }</a><span style='color:green;'>Fullført</span></li>`;
                  } else {
                    html = `${html}<li>
										<a href='/courses/${courseID}/assignments/${assignmentID}/submissions/${
                      peerReviewsInGroup[k].user.id
                    }' target='_blank'>
										${
                      peerReviewsInGroup[k].user.display_name
                    }</a><span style='color:red;'>Ikke fullført</span></li>`;
                  }
                  count++;
                }
              }
              html = `${html}</ul>`;
              if (count == 0) html = `${html}<div>Ingen tildelt</div>`;
              inArray = false;
              noOfAssignedPeerReviewsForStudent[
                members[i].id
              ] = noOfAssignedPeerReviews;
            }
            $('#progress').hide();
            $('.peer-review-list').append(`${html}</ul>`);
            $('.progress-info').html('');
            $('.input-wrapper').show();
            $('.btn-create-pr')
              .unbind()
              .click(() => {
                const numOfReviews = $('.number-of-reviews').val();
                // Create peer reviews for group after validation
                if (!_isNormalInteger(numOfReviews) || numOfReviews < 1) {
                  alert('Antall gjennomganger må være et positivt heltall');
                } else {
                  $('.input-wrapper').hide();
                  _createPeerReviewsForGroups(
                    courseID,
                    assignmentID,
                    numOfReviews,
                    allSubmitted,
                    groupsMembers,
                    selectedGroups,
                    peerReviewsInGroup,
                    noOfAssignedPeerReviewsForStudent,
                    noOfPeerReviewersForStudent
                  );
                }
              });
          };
        }
      );
    };

    _createPeerReviewsForGroups = (
      courseID,
      assignmentID,
      numOfReviews,
      allSubmitted,
      groupsMembers,
      selectedGroups,
      peerReviewsInGroup,
      noOfAssignedPeerReviewsForStudent,
      noOfPeerReviewersForStudent
    ) => {
      $('.peer-review-list').html('');
      $('#progress').show();
      const asyncsDone = 0;
      let assesorIndex = 0;
      let submitted = [];
      let skipped = 0;
      let width = 0;
      for (let m = 0; m < groupsMembers.length; m++) {
        $('#bar').width('0%');
        submitted = [];
        // Get submissions for group
        $('.progress-info').html(
          `Finner innleveringene for gruppe ${m + 1} av ${groupsMembers.length}`
        );
        for (let k = 0; k < allSubmitted.length; k++) {
          for (let l = 0; l < groupsMembers[m].length; l++) {
            width = (100 / allSubmitted.length) * k + '%';
            $('#bar').width(width);
            if (allSubmitted[k].user_id == groupsMembers[m][l].id)
              submitted.push(allSubmitted[k]);
          }
        }
        // Continue if number of reviews exeeds number of groups members
        if (numOfReviews > submitted.length - 1) {
          skipped = skipped + submitted.length;
          alert(
            `For mange gjennomganger i forhold til antall besvarelser for gruppe ${
              selectedGroups[m].text
            }`
          );
          continue;
        }
        $('.progress-info').html('Tildeler hverandrevurderinger...');
        $('#bar').width(0);
        for (let j = 0; j < numOfReviews; j++) {
          for (let i = 0; i < submitted.length; i++) {
            assesorIndex = i + 1 + j;
            // Check if index exceeds array length
            if (assesorIndex >= submitted.length)
              assesorIndex = assesorIndex - submitted.length;
            let userID = submitted[assesorIndex].user_id;
            for (let l = 0; l < numOfReviews; l++) {
              for (let k = 0; k < peerReviewsInGroup.length; k++) {
                if (
                  (peerReviewsInGroup[k].assessor_id == userID &&
                    peerReviewsInGroup[k].user_id == submitted[i].user_id) ||
                  userID == submitted[i].user_id
                ) {
                  assesorIndex++;
                  if (assesorIndex >= submitted.length)
                    assesorIndex = assesorIndex - submitted.length;
                  userID = submitted[assesorIndex].user_id;
                }
              }
            }
            // Check if student already has enough peer reviews or peer reviewers
            if (
              noOfAssignedPeerReviewsForStudent[userID] < numOfReviews &&
              noOfPeerReviewersForStudent[submitted[i].user_id] < numOfReviews
            ) {
              noOfAssignedPeerReviewsForStudent[userID]++;
              noOfPeerReviewersForStudent[submitted[i].user_id]++;
              api.createPeerReview(
                courseID,
                assignmentID,
                submitted[i].id,
                userID,
                function(result) {
                  asyncsDone++;
                  width =
                    (100 / (numOfReviews * allSubmitted.length)) * asyncsDone +
                    '%';
                  $('#bar').width(width);
                  if (
                    asyncsDone ==
                    allSubmitted.length * numOfReviews - skipped
                  ) {
                    $('#progress').hide();
                    _listPeerReviewsForGroup(selectedGroups, assignmentID);
                    if (skipped > 0) {
                      alert(
                        `Klarte ikke tildele hverandrevurderinger for ${skipped} studenter. (Studentene har allerede nok hverandrevurderinger eller hverandrevurderere.)`
                      );
                    }
                  }
                }
              ); //end createPeerReview async call
            } //end if noOfAssignedPeerReviewsForStudent < numOfReviews && noOfPeerReviewersForStudent[submitted[i].user_id] < numOfReviews
            else {
              skipped++;
              if (asyncsDone == allSubmitted.length * numOfReviews - skipped) {
                $('#progress').hide();
                _listPeerReviewsForGroup(selectedGroups, assignmentID);
                if (skipped > 0) {
                  alert(
                    `Klarte ikke tildele hverandrevurderinger for ${skipped} studenter. (Studentene har allerede nok hverandrevurderinger eller hverandrevurderere.)`
                  );
                }
              }
            }
          } //end for submitted.length
        } //end for numOfReviews (ferdig å tildele hverandrevurderinger for en gruppe)
      } //end for groupsMembers.length (ferdig å tildele hverandrevurderinger for alle grupper)
    };

    _isNormalInteger = str => {
      return /^\+?(0|[1-9]\d*)$/.test(str);
    };

    _showInput = () => {
      $('.peer-review-create').html(
        `<div class='input-wrapper'><input type='text' value='${
          settings.defaultNumberOfReviews
        }' style='width:25px;' class='number-of-reviews'>
				gjennomganger per bruker<br><input type='button' value='Tildel hverandrevurderinger' class='button btn-create-pr'></div>`
      );
    };

    return {
      run: () => _renderView()
    };
  };

  ListStudentProgress = () => {
    const error = error => console.error('error calling api', error);

    _renderView = () => {
      api.getCoursesForUser(courses => {
        _render(
          studentprogress,
          'List student progress by section',
          { courses: courses }
        );
        $('#mmpf-course-select').change(() => {
          const courseID = $('#mmpf-course-select option:selected').val();
          const params = { per_page: 999 };
          api.getSectionsForCourse(courseID, params, sections => {
            $('.step-2').css('display', 'list-item');
            $('.step-3').css('display', 'none');
            let html = `${html}<option value=''>Choose a section</option>`;
            sections.forEach(
              section =>
                (html = `${html}<option value="${i}">${section.name}</option>`)
            );
            $('#mmpf-section-select').html(html);
            $('.student-progress-table').html('');
          });
        });
        $('#mmpf-section-select').change(() => {
          const courseID = $('#mmpf-course-select option:selected').val();
          api.getModulesForCourseId(
            modules => {
              $('.step-3').css('display', 'list-item');
              let html = `${html}<option value=''>Choose a module</option>`;
              modules.forEach(
                module =>
                  (html = `${html}<option value="${module.id}">${
                    module.name
                  }</option>`)
              );
              $('#mmpf-module-select').html(html);
              $('.student-progress-table').html('');
            },
            error,
            courseID
          );
        });
        $('#mmpf-module-select').change(() => {
          _printStudentProgressForSection();
          $('.student-progress-table').html('');
        });
      });
    };

    _printStudentProgressForSection = () => {
      $('#progress').hide();
      const courseID = $('#mmpf-course-select option:selected').val();
      const moduleID = $('#mmpf-module-select option:selected').val();
      const sectionIndex = $('#mmpf-section-select option:selected').val();
      const sectionParams = { per_page: 999, include: ['students'] };
      let moduleParams = { per_page: 999 };
      let html = '<table><tr><th>Navn</th>';
      const asyncsDone = 0;
      api.getItemsForModuleId(
        items => {
          items.forEach(item => (html = `${html}<th>${item.title}</th>`));
          html = `${html}</tr>`;
          api.getSectionsForCourse(courseID, sectionParams, sections => {
            if (sections[sectionIndex].students.length < 1)
              $('.student-progress-table').html(
                `Ingen studenter funnet i klasse ${sections[sectionIndex].name}`
              );
            for (let j = 0; j < sections[sectionIndex].students.length; j++) {
              moduleParams = {
                student_id: sections[sectionIndex].students[j].id,
                per_page: 999
              };
              api.getItemsForModuleId(
                itemsForStudent => {
                  for (
                    let l = 0;
                    l < sections[sectionIndex].students.length;
                    l++
                  ) {
                    if (
                      sections[sectionIndex].students[l].id ==
                      itemsForStudent[0].student_id
                    )
                      html = `${html}<tr><td>${
                        sections[sectionIndex].students[l].name
                      }</td>`;
                  }
                  if (itemsForStudent.length < 1)
                    html = `${html}<td>Ingen krav</td>`;
                  for (let k = 0; k < itemsForStudent.length; k++) {
                    if ('completion_requirement' in itemsForStudent[k]) {
                      if (itemsForStudent[k].completion_requirement.completed) {
                        html = `${html}<td class='ok' />`;
                      } else {
                        html = `${html}<td class='nok' />`;
                      }
                    } else {
                      html = `${html}<td>Ingen krav</td>`;
                    }
                  }
                  asyncsDone++;
                  const width =
                    (100 / sections[sectionIndex].students.length) *
                      asyncsDone +
                    '%';
                  $('#bar').width(width);
                  $('#progress').show();
                  if (asyncsDone == sections[sectionIndex].students.length) {
                    $('#progress').hide();
                    $('.student-progress-table').html(`${html}</table>`);
                  }
                },
                error,
                courseID,
                moduleID,
                moduleParams
              );
              html = `${html}</tr>`;
            }
          });
        },
        error,
        courseID,
        moduleID,
        moduleParams
      );
    };

    return {
      run: () => {
        _renderView();
      }
    };
  };

  Menu = () => {
    _setUpClickHandlers = () => {
      $('#mmooc-pf-peer-review-btn').click(() => {
        new AssignPeerReviewsForGroup().run();
      });
      $('#mmooc-pf-student-progress-btn').click(() => {
        new ListStudentProgress().run();
      });
    };

    return {
      run: () => {
        try {
          _render(mainteacher, 'Choose function');
          _setUpClickHandlers();
        } catch (e) {
          alert(e.message);
          console.log(e);
        }
      }
    };
  };

  return {
    show: parentId => {
      rootId = parentId;
      new Menu().run();
    }
  };
})();
