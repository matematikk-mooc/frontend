this.mmooc = this.mmooc || {};

this.mmooc.coursesettings = (function() {
  var DISCUSSIONTYPE = 0;
  var ASSIGNMENTTYPE = 1;
  var QUIZTYPE = 2;
  var PAGETYPE = 3;

  var AllModuleItems = [];
  var error = function(error) {
    console.error('error calling api', error);
  };

  function updateOverallProgress(s) {
    $('#mmoocOverallProgress').html(s);
  }
  function getStyle(color, bgcolor) {
    return "style='background-color:" + bgcolor + ';color:' + color + "'";
  }
  function getBooleanOutput(result) {
    if (result) {
      return getStyle('white', 'green') + '>JA';
    }
    return getStyle('white', 'red') + '>NEI';
  }

  function clearTableWithId(id) {
    $('#' + id).html('');
  }

  function printRowInTableId(id, c1, c2) {
    var rowHtml = '<tr><td>' + c1 + '</td><td>' + c2 + '</td></tr>';
    $('#' + id).append(rowHtml);
  }
  function printRowWithColorInTableId(id, c1, c2, color, bgcolor) {
    var rowHtml =
      '<tr><td ' +
      getStyle(color, bgcolor) +
      '>' +
      c1 +
      '</td><td ' +
      getStyle(color, bgcolor) +
      '>' +
      c2 +
      '</td></tr>';
    $('#' + id).append(rowHtml);
  }
  function printRedRowInTableId(id, c1, c2) {
    printRowWithColorInTableId(id, c1, c2, 'white', 'red');
  }
  function printGreenRowInTableId(id, c1, c2) {
    printRowWithColorInTableId(id, c1, c2, 'white', 'green');
  }

  function printRow(c1, c2) {
    return '<tr><td>' + c1 + '</td><td>' + c2 + '</td></tr>';
  }
  function printRowWithColor(c1, c2, color, bgcolor) {
    return (
      '<tr><td' +
      getStyle(color, bgcolor) +
      '>' +
      c1 +
      '</td><td>' +
      c2 +
      '</td></tr>'
    );
  }
  function printRedRow(c1, c2) {
    return printRowWithColor(c1, c2, 'white', 'red');
  }
  function printGreenRow(c1, c2) {
    return printRowWithColor(c1, c2, 'white', 'green');
  }

  function getSanityTableId(courseId, moduleId, contentId) {
    return 'Sanity' + courseId + moduleId + contentId;
  }

  function getWaitIconRowId(tableId) {
    return 'Wait' + tableId;
  }
  function waitIcon(tableId) {
    $('#' + tableId).append(
      "<tr id='" +
        getWaitIconRowId(tableId) +
        "'>td><img src='https://server/bitmaps/loading.gif'/>"
    );
  }
  function clearWaitIcon(tableId) {
    $('#' + getWaitIconRowId(tableId)).remove();
  }

  function printPageTable(courseId, moduleId, item) {
    var contentHtml = '';
    return contentHtml;
  }
  function postProcessPageTable(courseId, moduleId, item) {
    var tableId = getSanityTableId(courseId, moduleId, item.id);
    var req = item.completion_requirement;
    if (req) {
      var reqtype = req.type;
      if (reqtype != 'must_mark_done') {
        printRedRowInTableId(
          tableId,
          'Krav:',
          reqtype + '(Vi anbefaler merk som ferdig for innholdssider.)'
        );
      }
    } else {
      printRowInTableId(tableId, 'Ingen', '');
    }

    clearWaitIcon(tableId);
  }
  function printSubHeaderTable(courseId, moduleId, item) {
    var contentHtml = '';
    return contentHtml;
  }
  function postProcessSubHeaderTable(courseId, moduleId, item) {
    var tableId = getSanityTableId(courseId, moduleId, item.id);
    printRowInTableId(tableId, 'Ingen', '');
    clearWaitIcon(tableId);
  }
  function printFileTable(courseId, moduleId, item) {
    var contentHtml = '';
    var req = item.completion_requirement;
    if (req) {
      var reqtype = req.type;
      if (reqtype != 'must_mark_done') {
        contentHtml += printRedRow('Krav:', reqtype);
      }
    }
    return contentHtml;
  }
  function postProcessFileTable(courseId, moduleId, item) {
    var tableId = getSanityTableId(courseId, moduleId, item.id);
    printRowInTableId(tableId, 'Ingen', '');
    clearWaitIcon(tableId);
  }
  function printDiscussionTable(courseId, moduleId, item) {
    var contentHtml = '';
    var req = item.completion_requirement;
    if (req) {
      var reqtype = req.type;
      if (reqtype != 'must_contribute') {
        contentHtml += printRedRow('Krav:', reqtype);
      }
    }
    return contentHtml;
  }
  function postProcessDiscussionTable(courseId, moduleId, item) {
    var tableId = getSanityTableId(courseId, moduleId, item.id);
    var contentId = item.content_id;
    mmooc.api.getDiscussionTopic(
      courseId,
      contentId,
      (function(tableId) {
        return function(d) {
          clearWaitIcon(tableId);
          if (d.discussion_type != 'side_comment') {
            printRedRowInTableId(
              tableId,
              'Trådtype:',
              d.discussion_type + '(Vi anbefaler side_comment.)'
            );
          }
          var gid = d.group_category_id;
          if (!gid) {
            printRedRowInTableId(
              tableId,
              'Gruppekategori:',
              'Mangler (Dette blir en diskusjon hvor samtlige studenter deltar. Vi anbefaler gruppediskusjoner dersom det er mange studenter.)'
            );
          } else {
            printGreenRowInTableId(tableId, 'Gruppekategori:', gid);
          }
        };
      })(tableId)
    );
  }

  function printAssignmentTable(courseId, moduleId, item) {
    var contentHtml = '';
    var req = item.completion_requirement;
    if (req) {
      var reqtype = req.type;
      if (reqtype != 'must_submit') {
        contentHtml += printRedRow(
          'Krav:',
          reqtype + ' på innleveringsoppgave.'
        );
      }
    }

    return contentHtml;
  }
  function postProcessAssignmentTable(courseId, moduleId, item) {
    var contentId = item.content_id;
    var tableId = getSanityTableId(courseId, moduleId, item.id);
    mmooc.api.getSingleAssignment(
      courseId,
      contentId,
      (function(tableId) {
        return function(a) {
          clearWaitIcon(tableId);
          printRowInTableId(tableId, 'Type:', a.submission_types);
          console.log('Assignment submission type: ' + a.submission_types);
          if (a.submission_types.indexOf('online_upload') > -1) {
            if (a.allowed_extensions) {
              printRowInTableId(
                tableId,
                'Tillatte filendelser:',
                a.allowed_extensions
              );
            } else {
              printRedRowInTableId(
                tableId,
                'Ingen tillatte filendelser spesifisert. Vi anbefaler å sette dette.'
              );
            }
          }
          if (!a.due_at) {
            printRedRowInTableId(
              tableId,
              'Frist:',
              'Ingen. (Vi anbefaler å ha en frist)'
            );
          } else {
            printRowInTableId(tableId, 'Frist:', a.due_at);
          }
          printRowInTableId(tableId, 'Hverandrevurdering:', a.peer_reviews);
          if (a.peer_reviews) {
            if (a.automatic_peer_reviews) {
              var hvvfrist = 'ingen';
              hvvfrist = a.peer_reviews_assign_at;
              printRedRowInTableId(
                tableId,
                'Tildeling av hverandrevurdering:',
                hvvfrist + ' (Vi anbefaler ikke automatisk tildeling.'
              );
              printRowInTableId(
                tableId,
                'Antall vurderinger:',
                a.peer_review_count
              );
            } else {
              printGreenRowInTableId(
                tableId,
                'Tildeling av hverandrevurdering: ',
                'Manuell. Dette er anbefalt. Husk å legge fristen i kalenderen.'
              );
            }
          }
        };
      })(tableId),
      error
    );
  }

  function printQuizTable(courseId, moduleId, item) {
    var contentHtml = '';
    var req = item.completion_requirement;
    if (req) {
      var reqtype = req.type;
      if (reqtype != 'min_score') {
        contentHtml += printRedRow('Krav:', reqtype + ' på quiz.');
      }
    }
    return contentHtml;
  }
  function postProcessQuizTable(courseId, moduleId, item) {
    var contentId = item.content_id;
    var tableId = getSanityTableId(courseId, moduleId, item.id);
    mmooc.api.getQuiz(
      courseId,
      contentId,
      (function(tableId) {
        return function(q) {
          clearWaitIcon(tableId);
          printRowInTableId(tableId, 'Frist:', q.due_at);
        };
      })(tableId)
    );
  }

  function printSanityTableForItem(courseId, moduleId, item) {
    var tableId = getSanityTableId(courseId, moduleId, item.id);
    var contentHtml = "<table id='" + tableId + "'>";
    var type = item.type;
    console.log('Item type:' + type);
    if (type == 'Assignment') {
      contentHtml += printAssignmentTable(courseId, moduleId, item);
    } else if (type == 'Discussion') {
      contentHtml += printDiscussionTable(courseId, moduleId, item);
    } else if (type == 'Page') {
      contentHtml += printPageTable(courseId, moduleId, item);
    } else if (type == 'Quiz') {
      contentHtml += printQuizTable(courseId, moduleId, item);
    } else if (type == 'File') {
      contentHtml += printFileTable(courseId, moduleId, item);
    } else if (type == 'SubHeader') {
      contentHtml += printSubHeaderTable(courseId, moduleId, item);
    }
    waitIcon(tableId);
    contentHtml += '</table>';
    return contentHtml;
  }

  function postProcessSanityTableForItem(courseId, moduleId, item) {
    var type = item.type;
    if (type == 'Assignment') {
      postProcessAssignmentTable(courseId, moduleId, item);
    } else if (type == 'Discussion') {
      postProcessDiscussionTable(courseId, moduleId, item);
    } else if (type == 'Page') {
      postProcessPageTable(courseId, moduleId, item);
    } else if (type == 'Quiz') {
      postProcessQuizTable(courseId, moduleId, item);
    } else if (type == 'File') {
      postProcessFileTable(courseId, moduleId, item);
    } else if (type == 'SubHeader') {
      postProcessSubHeaderTable(courseId, moduleId, item);
    }
  }

  function getCommonUrlKey(url) {
    var key = '';
    var urlPrefix = '/courses';

    var start = url.indexOf(urlPrefix);
    if (start > -1) {
      key = url.substr(start);
    } else {
      console.log('getCommonUrlKey: Could not find key for url: ' + url);
    }
    return key;
  }

  function storeItem(item) {
    if (item.type == 'SubHeader') {
      return;
    }
    if (!item.url) {
      return;
    }
    var url = item.url;

    var key = getCommonUrlKey(url);

    AllModuleItems[key] = item;
  }

  function getSanityTableForModule(courseId, module) {
    var contentHtml =
      "<table class='table'><thead><tr><th>Innholdselement</th><th>Publisert</th><th>Krav</th><th>Type</th><th>Detaljer</th></tr></thead><tbody>";
    var moduleItems = module.items;
    var moduleId = module.id;
    for (var i = 0; i < moduleItems.length; i++) {
      var item = moduleItems[i];

      storeItem(item);

      contentHtml += '<td>' + item.title + '</td>';

      contentHtml += '<td ' + getBooleanOutput(item.published) + '</td>';
      var req = item.completion_requirement;
      if (item.type == 'SubHeader') {
        contentHtml += '<td>';
      } else {
        contentHtml += '<td ' + getBooleanOutput(req);
      }
      if (req) {
        var reqtype = req.type;
        contentHtml += ' (' + reqtype + ')';
        contentHtml += ' ';
        if (reqtype == 'min_score') {
          var min_score = req.min_score;
          contentHtml += '<br/>Min score: ' + min_score;
        }
      }
      contentHtml += '</td><td>';
      contentHtml += item.type;
      contentHtml += '</td><td>';
      contentHtml += printSanityTableForItem(courseId, moduleId, item);
      contentHtml += '</td>';
      contentHtml += '</tr>';
    } //End for all module items.
    contentHtml += '</tbody></table>';
    return contentHtml;
  }
  function postProcessSanityTableForModule(courseId, module) {
    var moduleItems = module.items;
    var moduleId = module.id;
    for (var i = 0; i < moduleItems.length; i++) {
      var item = moduleItems[i];
      postProcessSanityTableForItem(courseId, moduleId, item);
    }
  }

  function processModules(courseId, modules) {
    var contentHtml = '';
    for (var i = 0; i < modules.length; i++) {
      var module = modules[i];

      contentHtml += '<p><b>Modulnavn:' + module.name + '</b></p>';
      contentHtml +=
        '<p>Publisert: <span ' +
        getBooleanOutput(module.published) +
        '</span></p>';

      contentHtml += getSanityTableForModule(courseId, module);
      contentHtml += '<hr/>';
    } //End for all modules
    return contentHtml;
  } //end function

  function postProcessModules(courseId, modules) {
    for (var i = 0; i < modules.length; i++) {
      var module = modules[i];
      postProcessSanityTableForModule(courseId, module);
    } //End for all modules
  } //end function

  function getTitle(item, pageType) {
    var title = '';
    if (pageType == DISCUSSIONTYPE || pageType == PAGETYPE) {
      title = item.title;
    } else {
      title = item.name;
    }
    return title;
  }
  function getPublishedString(item) {
    var s = 'NEI';
    if (item.published) {
      s = "<span style='bgcolor=red;color=white'>JA</span>";
    }
    return s;
  }

  function getOrphanTableId(pageType) {
    return 'pageType' + pageType;
  }
  function createTable(pageType, description) {
    var contentHtml =
      '<h2>' +
      description +
      '</h2>' +
      "<table class='table' id='" +
      getOrphanTableId(pageType) +
      "'>";
    contentHtml +=
      '<thead><tr><th>Publisert</th><th>Tittel</th><th>Lenke</th></tr></thead><tbody></tbody></table>';
    return contentHtml;
  }
  function printRowWithColorInOrphanTable(
    pageType,
    c1,
    c2,
    c3,
    color,
    bgcolor
  ) {
    var rowHtml =
      '<tr><td ' +
      getStyle(color, bgcolor) +
      '>' +
      c1 +
      '</td><td ' +
      getStyle(color, bgcolor) +
      '>' +
      c2 +
      '</td><td ' +
      getStyle(color, bgcolor) +
      '>' +
      c3 +
      '</td></tr>';
    $('#' + getOrphanTableId(pageType)).append(rowHtml);
  }
  function printRedRowInOrphanTable(pageType, c1, c2, c3) {
    printRowWithColorInOrphanTable(pageType, c1, c2, c3, 'white', 'red');
  }
  function printGreenRowInOrphanTable(pageType, c1, c2, c3) {
    printRowWithColorInOrphanTable(pageType, c1, c2, c3, 'white', 'green');
  }

  function getOrphanItemsTable(itemList, pageType) {
    var orphans = false;
    for (var i = 0; i < itemList.length; i++) {
      var item = itemList[i];
      var key = getCommonUrlKey(item.html_url);
      var moduleItem = AllModuleItems[key];
      if (!moduleItem) {
        var title = getTitle(item, pageType);
        var published = getPublishedString(item);
        printRedRowInOrphanTable(pageType, published, title, key);
        orphans = true;
      }
    }
    if (!orphans) {
      printGreenRowInOrphanTable(pageType, 'Ingen', '', '');
    }
  }

  function getGroupCategoryTableId(id) {
    return 'pfdkGroupCategory_' + id;
  }
  function getSectionTableId(id) {
    return 'pfdkSection_' + id;
  }

  return {
    addSanityCheckButton: function() {
      $('#right-side table.summary').before(
        "<a id='pfdksanitycheck' class='Button Button--link Button--link--has-divider Button--course-settings' href='#'><i class='icon-student-view' />Sanity check</a>"
      );

      //Når man trykker på knappen så kjører koden nedenfor.
      $('#pfdksanitycheck').on('click', function() {
        bCancel = false;
        var contentarea = $('#content');
        var contentHtml = '';
        contentarea.html(
          '<h1>Sanity check</h1>\
        <div id="mmoocOverallProgress"></div>\
        <div id="resultarea"></div>'
        );

        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.api.getCourse(
          courseId,
          function(course) {
            contentHtml += '<p><b>Kursnavn:</b> ' + course.name + '</p>';
            var coursePublished = course.workflow_state == 'available';
            contentHtml +=
              '<p>Publisert: <span ' +
              getBooleanOutput(coursePublished) +
              '</span></p>';

            contentHtml += createTable(PAGETYPE, 'Løsrevne sider');
            contentHtml += createTable(ASSIGNMENTTYPE, 'Løsrevne oppgaver');
            contentHtml += createTable(DISCUSSIONTYPE, 'Løsrevne diskusjoner');
            contentHtml += createTable(QUIZTYPE, 'Løsrevne quizer');

            mmooc.api.getModulesForCurrentCourse(function(modules) {
              contentHtml += processModules(courseId, modules);
              $('#resultarea').html(contentHtml);
              postProcessModules(courseId, modules);

              mmooc.api.getPagesForCourse(courseId, function(pages) {
                getOrphanItemsTable(pages, PAGETYPE);
              });
              mmooc.api.getAssignmentsForCourse(courseId, function(
                assignments
              ) {
                getOrphanItemsTable(assignments, ASSIGNMENTTYPE);
              });
              mmooc.api.getDiscussionTopicsForCourse(courseId, function(
                discussions
              ) {
                getOrphanItemsTable(discussions, DISCUSSIONTYPE);
              });
              mmooc.api.getQuizzesForCourse(courseId, function(quizzes) {
                getOrphanItemsTable(quizzes, QUIZTYPE);
              });
            }, error);
          },
          error
        );
      });
    },

    addListSectionsButton: function() {
      $('#right-side table.summary').before(
        "<a id='pfdklistsections' class='Button Button--link Button--link--has-divider Button--course-settings' href='#'><i class='icon-student-view' />List sections</a>"
      );

      //Når man trykker på knappen så kjører koden nedenfor.
      $('#pfdklistsections').on('click', function() {
        var contentarea = $('#content');
        contentarea.html('<h1>Seksjoner</h1><div id="resultarea"></div>');

        var courseId = mmooc.api.getCurrentCourseId();
        var params = { per_page: 999 };
        mmooc.api.getSectionsForCourse(courseId, params, function(sections) {
          var resultHtml =
            "<table class='table'><tr><th>Section name</th><th>Section id</th></tr>";
          for (var i = 0; i < sections.length; i++) {
            resultHtml =
              resultHtml +
              '<tr><td>' +
              sections[i].name +
              '</td><td>' +
              sections[i].id +
              '</td></tr>';
          }
          resultHtml += '</table>';
          $('#resultarea').html(resultHtml);
        });
      });
    },
    addListUsersButton: function() {
      $('#right-side table.summary').before(
        "<a id='pfdklistusers' class='Button Button--link Button--link--has-divider Button--course-settings' href='#'><i class='icon-student-view' />List users</a>"
      );

      //Når man trykker på knappen så kjører koden nedenfor.
      $('#pfdklistusers').on('click', function() {
        var contentarea = $('#content');
        contentarea.html('<h1>Brukere</h1><div id="resultarea"></div>');

        var courseId = mmooc.api.getCurrentCourseId();

        var params = { per_page: 999 };
        mmooc.api.getSectionsForCourse(courseId, params, function(sections) {
          var tableHtml = '';
          for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var tableId = getSectionTableId(section.id);
            tableHtml =
              '<h2>' +
              section.name +
              '</h2>' +
              "<table class='table' id='" +
              tableId +
              "'>";
            tableHtml +=
              '<thead><tr><th>User id</th><th>SIS user id</th></tr></thead><tbody></tbody></table>';
            $('#resultarea').append(tableHtml);

            var params = { per_page: 999 };
            mmooc.api.getEnrollmentsForSection(section.id, params, function(
              enrollments
            ) {
              for (var j = 0; j < enrollments.length; j++) {
                var enrollment = enrollments[j];
                var tableId = getSectionTableId(enrollment.course_section_id);
                var rowHtml =
                  '<tr><td>' +
                  enrollment.user_id +
                  '</td><td>' +
                  enrollment.sis_user_id +
                  '</td></tr>';
                $('#' + tableId).append(rowHtml);
              }
            });
          } // end for all sections
        }); //end getsectionsforcourse
      }); //end pfdklistuser click button
    },
    addListAssignmentsButton: function() {
      $('#right-side table.summary').before(
        "<a id='pfdklistassignments' class='Button Button--link Button--link--has-divider Button--course-settings' href='#'><i class='icon-student-view' />List assignments</a>"
      );

      //Når man trykker på knappen så kjører koden nedenfor.
      $('#pfdklistassignments').on('click', function() {
        var contentarea = $('#content');
        contentarea.html('<h1>Oppgaver</h1><div id="resultarea"></div>');

        var courseId = mmooc.api.getCurrentCourseId();

        var params = { per_page: 999 };
        mmooc.api.getAssignmentsForCourse(courseId, function(assignments) {
          if (!assignments.length) {
            $('#resultarea').append('Ingen oppgaver');
          } else {
            var tableHtml = "<table class='table' id='pfdkassignmentstable'>";
            tableHtml +=
              '<thead><tr><th>Oppgave id</th><th>Beskrivelse</th><th>Hverandrevurdering</th></tr></thead><tbody></tbody></table>';
            $('#resultarea').append(tableHtml);
            for (var i = 0; i < assignments.length; i++) {
              var assignment = assignments[i];
              var peerReview = 'NEI';

              if (assignment.peer_reviews) {
                peerReview = 'JA';
              }

              var rowHtml =
                '<tr><td>' +
                assignment.id +
                "</td><td><a href='" +
                assignment.html_url +
                "' target='_blank'>" +
                assignment.name +
                '</a></td><td>' +
                peerReview +
                '</td></tr>';
              $('#pfdkassignmentstable').append(rowHtml);
            } //end for all assignments
          } // endif any assignments
        }); //end getAssignmentsForCourse
      }); //end addListAssignmentsButton click button
    },

    addListGroupsButton: function() {
      $('#right-side table.summary').before(
        "<a id='pfdklistgroups' class='Button Button--link Button--link--has-divider Button--course-settings' href='#'><i class='icon-student-view' />List groups</a>"
      );

      //Når man trykker på knappen så kjører koden nedenfor.
      $('#pfdklistgroups').on('click', function() {
        var contentarea = $('#content');
        contentarea.html('<h1>Grupper</h1><div id="resultarea"></div>');

        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.api.getGroupCategoriesForCourse(courseId, function(categories) {
          var tableHtml = '';
          for (var i = 0; i < categories.length; i++) {
            var category = categories[i];
            var tableId = getGroupCategoryTableId(category.id);
            tableHtml =
              '<h2>' +
              category.name +
              '</h2>' +
              "<table class='table' id='" +
              tableId +
              "'>";
            tableHtml +=
              '<thead><tr><th>Gruppenavn</th><th>Id</th></tr></thead><tbody></tbody></table>';
            $('#resultarea').append(tableHtml);

            mmooc.api.getGroupsInCategory(category.id, function(groups) {
              for (var j = 0; j < groups.length; j++) {
                var group = groups[j];
                var tableId = getGroupCategoryTableId(group.group_category_id);
                var rowHtml =
                  '<tr><td>' +
                  group.name +
                  '</td><td>' +
                  group.id +
                  '</td></tr>';
                $('#' + tableId).append(rowHtml);
              }
            });
          }
        }); //end getGroupCategoriesForCourse
      }); //end pfdklistgroups button pressed
    } //end addListGroupsButton
  };
})();
