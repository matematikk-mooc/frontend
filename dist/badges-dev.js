this["mmooc"] = this["mmooc"] || {};
this["mmooc"]["templates"] = this["mmooc"]["templates"] || {};

this["mmooc"]["templates"]["badgeView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <div class=\"badge-view ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.complete), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <div class=\"kbadge text-center\">\n                <a class=\"badge-content\" href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <img class=\"badgeImage\" src=\"";
  if (helper = helpers.badgeImage) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.badgeImage); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n\n                    <h3>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n                </a>\n            </div>\n            <div class=\"kbadge back text-center\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.backpack)),stack1 == null || stack1 === false ? stack1 : stack1.active), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <h3>TIPS</h3>\n                <span class=\"criteria\">";
  if (helper = helpers.criteria) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.criteria); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.backpack)),stack1 == null || stack1 === false ? stack1 : stack1.active), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "locked";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "id=\"badge-btn-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.backpack)),stack1 == null || stack1 === false ? stack1 : stack1.awardId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.backpack)),stack1 == null || stack1 === false ? stack1 : stack1.button)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <a href=\"/courses/";
  if (helper = helpers.courseId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.courseId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">G&aring; til kurs</a>\n                ";
  return buffer;
  }

  buffer += "<div id=\"badge_container\">\n    <div class=\"badge-header\">\n        <h1>Kursutmerkelser</h1>\n\n        <div class=\"intro-text\">\n            Her er en oversikt over alle utmerkelser du har f&aring;tt og som du kan f&aring; i dette kurset.\n            <br/> Utmerkelser er bare for dette kurset.\n        </div>\n        <div class=\"counter-text\">\n            Du har oppn&aring;dd ";
  if (helper = helpers.completed_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.completed_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " av ";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " utmerkelser i dette kurset\n        </div>\n        <span class=\"counter\">";
  if (helper = helpers.completed_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.completed_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n    </div>\n    <div class=\"badge-filter\">\n        <div class=\"btn-group\">\n            <div class=\"btn selected show-all\">Alle utmerkelser</div>\n            <div class=\"btn show-unlocked\">Dine utmerkelser</div>\n            <div class=\"btn show-locked\">Uopn&aring;dde utmerkelser</div>\n        </div>\n    </div>\n    <div class=\"badge-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.badges), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </div>\n\n</div>";
  return buffer;
  });
this.mmooc = this.mmooc || {};

this.mmooc.iframe = {
  badges: (function() {
    return {
      initPage: function() {
        if (!parent.mmooc.util.isTeacherOrAdmin()) {
          $('#badge-wrap').addClass('hide');
          var $badges = $(document).find('#badge-wrap .row-fluid .span4');
          var redesignedBadges = [];

          $badges.each(function() {
            redesignedBadges.push(mmooc.iframe.badges.applyNewDesign($(this)));
            $(this).remove();
          });

          mmooc.iframe.badges.displayElements(redesignedBadges);
          $('body').attr('style', 'margin: 0 !important;');
          $('head').append('<base target="_parent"/>');
        } else {
          $('#badge-wrap').attr('style', 'display: block');
        }
        this.notifyParentAndSetSize();
      },

      applyNewDesign: function($element) {
        var complete =
          $element
            .find(
              ":contains('You have completed the modules required to achieve this badge.')"
            )
            .size() > 0;
        var badgeIds = mmooc.iframe.badges.extractIdsFromString(
          $element.find('.thumbnail a').attr('onclick')
        );
        var criteria = $element.find('p:first').html();
        var link =
          'badge-details.php?badge_id=' +
          badgeIds.badgeId +
          '&CLIKEY=' +
          badgeIds.clickey +
          '&course_id=' +
          badgeIds.courseId +
          '&user_id=' +
          badgeIds.userId;

        return {
          complete: complete,
          badgeImage: complete
            ? $element.find('.thumbnail a img').attr('src')
            : mmooc.constants.BADGE_LOCKED_IMAGE_URL,
          name: $element.find('.thumbnail h3').html(),
          criteria: criteria,
          link: link,
          courseId: badgeIds.courseId,
          backpack: this.backpack(complete, $element)
        };
      },

      displayElements: function(elements) {
        var templates = mmooc.util.renderTemplateWithData('badgeView', {
          badges: elements,
          total: elements.length,
          completed_amount: elements.filter(function(e) {
            return e.complete;
          }).length
        });
        var vel = 200;

        $('#badge-wrap').before(templates);

        function toggleSelected($element) {
          $element.siblings().removeClass('selected');
          $element.addClass('selected');
        }
        $('.show-all').click(function() {
          toggleSelected($(this));
          $('.badge-list .badge-view').show(vel);
        });

        $('.show-unlocked').click(function() {
          toggleSelected($(this));
          $('.badge-list .badge-view.locked').hide(vel);
          $('.badge-list .badge-view:not(.locked)').show(vel);
        });

        $('.show-locked').click(function() {
          toggleSelected($(this));
          $('.badge-list .badge-view:not(.locked)').hide(vel);
          $('.badge-list .badge-view.locked').show(vel);
        });

        $('.claim').click(this.handleBackPackClick);
      },

      notifyParentAndSetSize: function() {
        parent.mmooc.badges.initPage();
      },

      handleBackPackClick: function() {
        var badgeUrl = jQuery(this).attr('badge-url');
        var badgeName = jQuery(this).attr('badge-name');
        var badgeEarner = jQuery(this).attr('badge-earner');
        var award = jQuery(this).attr('award-id');

        function handleResults(errors, successes) {
          var badgeDetails = ', ' + badgeName + ', ' + badgeEarner + ', ';
          function notifyBadges(data) {
            jQuery.ajax({
              url: '/badgesafe/record-issued-badges.php',
              type: 'POST',
              data: data
            });
          }

          if (errors.length > 0) {
            var error = 'ERROR';
            notifyBadges({
              data: error + badgeDetails + JSON.stringify(errors),
              error: error
            });
          }
          if (successes.length > 0) {
            jQuery('#badge-btn-' + award).html(
              '<a href="#" class="disabled">Exported</a>'
            );
            notifyBadges({
              data: 'SUCCESS' + badgeDetails + badgeUrl,
              award: award
            });
          }
        }

        parent.mmooc.badges.claimBadge(OpenBadges, [badgeUrl], handleResults);
      },

      backpack: function(complete, element) {
        var btn = element.find('p[id*=badge-btn-]')[0];
        if (complete && btn && btn.childNodes[0]) {
          btn.childNodes[0].setAttribute('class', 'claim');
          return {
            active: true,
            button: btn.innerHTML,
            awardId: btn.childNodes[0].getAttribute('award-id')
          };
        }
        return {
          active: false
        };
      },

      extractIdsFromString: function(string) {
        var args = string.match(/(\d+)/g);
        if (args.length === 4) {
          return {
            badgeId: args[0],
            clickey: args[1],
            courseId: args[2],
            userId: args[3]
          };
        } else {
          return {
            badgeId: '',
            clickey: '',
            userId: '',
            courseId: ''
          };
        }
      }
    };
  })()
};

this.mmooc = this.mmooc || {};

this.mmooc.constants = {};

mmooc.constants.BADGE_URL = '/custom';
mmooc.constants.BADGE_LOCKED_IMAGE_URL =
  mmooc.constants.BADGE_URL + '/bitmaps/badge_locked_.png';
mmooc.constants.BADGE_LABEL = 'utmerkelse';

$(document).ready(function() {
  try {
    mmooc.iframe.badges.initPage();
  } catch (e) {
    console.log('something went wrong!', e);
  }
});

Handlebars.registerHelper('lowercase', function(str) {
  return ('' + str).toLowerCase();
});

Handlebars.registerHelper('uppercase', function(str) {
  return ('' + str).toUpperCase();
});

Handlebars.registerHelper('percentage', function(number1, number2) {
  if (number2 == 0) {
    return 0;
  }
  return Math.round((number1 * 100) / number2);
});

Handlebars.registerHelper('ifEquals', function(var1, var2, options) {
  if (var1 == var2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifUnmaintained', function(options) {
  if(mmooc.util.isUnmaintained(this)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifRoleBased', function(options) {
  if(mmooc.util.isRoleBasedCourse(this)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('courseAlert', function() {
  return mmooc.util.isUnmaintained(this);
});

Handlebars.registerHelper('getCourseUrl', function() {
  if (mmooc.util.isAuthenticated()) {
    return '/courses/' + this.id;
  } else {
    return '/enroll/' + this.self_enrollment_code;
  }
});

Handlebars.registerHelper('ifHasRole', function(enrollments, role, options) {
  for (var i = 0; i < enrollments.length; i++) {
    if (enrollments[i].role == role) {
      return options.fn(this);
    }
  }
});

Handlebars.registerHelper('ifGreaterThan', function(value1, value2, options) {
  if (value1 > value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('mapItemType', function(type) {
  type = type.toLowerCase();
  if (type.indexOf('externalurl') != -1 ||
      type.indexOf('externaltool') != -1) {
    return 'link';
  }
  return type;
});

Handlebars.registerHelper('overrideIconClassByTitle', function(title) {
  title = title.toLowerCase();
  if (title.indexOf('utmerkelse') != -1) {
    return ' mmooc-icon-badge';
  } else if (title.indexOf('video') != -1) {
    return ' mmooc-icon-video';
  } else if (title.indexOf('aktivitet') != -1) {
    return ' mmooc-icon-interactive';
  } else {
    return '';
  }
});

Handlebars.registerHelper('ifIsPrincipal', function(enrollments, options) {
  if(mmooc.util.isTeacherOrAdmin())
  {
    return options.fn(this);
  }
  for (var i = 0; i < enrollments.length; i++) {
    if (enrollments[i].role == mmooc.settings.principalRoleType) {
      return options.fn(this);
    }
  }
});


Handlebars.registerHelper('ifIsIndented', function(options) {
  if(this.indent) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


Handlebars.registerHelper('getPeerReviewWorkflowIconClass', function(
  workflow_state
) {
  if (workflow_state == 'assigned') {
    return ' warning';
  } else if (workflow_state == 'completed') {
    return ' pass';
  } else {
    return '';
  }
});

Handlebars.registerHelper('norwegianDateAndTime', function(timestamp) {
  var year = new Date(timestamp).toString(' yyyy');
  var day = new Date(timestamp).toString('dd. ');
  var time = new Date(timestamp).toString(' HH:mm');
  var monthNumber = parseInt(new Date(timestamp).toString('M'), 10);
  var months = mmooc.i18n.Months;
  var month = months[monthNumber - 1];

  return day + month + year + time; //return new Date(timestamp).toString('dd. MMMM yyyy HH:mm'); // yyyy-MM-dd
});

Handlebars.registerHelper('getSubmissionAssessmentText', function(peerReview) {
  var submissionText = '';
  var numberOfReviews = peerReview.length;
  var numberOfReviewsCompleted = 0;
  var submissionAssessmentText = '';

  $.each(peerReview, function(index, singlePeerReview) {
    if (singlePeerReview.workflow_state == 'completed') {
      numberOfReviewsCompleted = numberOfReviewsCompleted + 1;
    }
  });

  if (numberOfReviews === 0) {
    submissionAssessmentText = mmooc.i18n.SubmissionIsNotAssessed;
  } else if (numberOfReviews === numberOfReviewsCompleted) {
    if (numberOfReviewsCompleted == 1) {
      submissionAssessmentText = mmooc.i18n.SubmissionIsAssessedByOne;
    } else {
      submissionAssessmentText = mmooc.i18n.SubmissionIsAssessedByAll;
    }
  } else {
    submissionAssessmentText =
      numberOfReviewsCompleted.toString() +
      ' ' +
      mmooc.i18n.OutOf +
      ' ' +
      numberOfReviews.toString() +
      ' ' +
      mmooc.i18n.SubmissionAssessmentsAreReady;
  }

  return submissionAssessmentText;
});

Handlebars.registerHelper('ifAtLeastOnePeerReviewIsComplete', function(
  peerReview,
  options
) {
  var atLeastOnePeerReviewComplete = false;
  $.each(peerReview, function(index, singlePeerReview) {
    if (singlePeerReview.workflow_state == 'completed') {
      atLeastOnePeerReviewComplete = true;
    }
  });
  if (atLeastOnePeerReviewComplete) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifAllPeerReviewsAreComplete', function(
  peerReview,
  options
) {
  var allPeerReviewsAreComplete = true;

  $.each(peerReview, function(index, singlePeerReview) {
    if (singlePeerReview.workflow_state != 'completed') {
      allPeerReviewsAreComplete = false;
    }
  });

  if (allPeerReviewsAreComplete) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('getPathFromUrl', function(url) {
  return url.split('?')[0]; //returns an array even if there is no '?' so no need for extra checks
});

Handlebars.registerHelper('urlForCourseId', function(courseId) {
  return '/courses/' + courseId;
});

Handlebars.registerHelper('urlForGroupId', function(groupId) {
  return '/groups/' + groupId + '/discussion_topics';
});

Handlebars.registerHelper('ifItemIsCompleted', function(
  completion_requirement,
  options
) {
  if (completion_requirement && completion_requirement.completed) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('localize', function(key, options) {
  if (mmooc.i18n[key] != null) {
    return mmooc.i18n[key];
  } else {
    return key;
  }
});

Handlebars.registerHelper('ifAllItemsCompleted', function(items, options) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.completion_requirement && !item.completion_requirement.completed) {
      return options.inverse(this);
    }
  }

  return options.fn(this);
});

Handlebars.registerHelper('ifAllModulesCompleted', function(modules, options) {
  if (mmooc.courseList.isCourseCompleted(modules)) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('ifAllStudentModulesCompleted', function(modules, options) {
  var bIncludeIndentedItems = false;
  if (mmooc.util.percentageProgress(modules, bIncludeIndentedItems) == 100)
  {
    return options.fn(this);
  }
  return options.inverse(this);
});


Handlebars.registerHelper('percentageForModules', function(modules) {
  var bIncludeIndentedItems = true;
  return mmooc.util.percentageProgress(modules, bIncludeIndentedItems);
});

Handlebars.registerHelper('percentageForStudentModules', function(modules) {
  var bIncludeIndentedItems = false;
  return mmooc.util.percentageProgress(modules, bIncludeIndentedItems);
});


Handlebars.registerHelper('urlForFirstNoneCompletePrincipalItem', function(items) {
  var bIncludeIndentedItems = true;
  return mmooc.util.firstIncompleteItemHtmlUrl(items, bIncludeIndentedItems);
});

Handlebars.registerHelper('urlForFirstNoneCompleteItem', function(items) {
  var bIncludeIndentedItems = false;
  return mmooc.util.firstIncompleteItemHtmlUrl(items, bIncludeIndentedItems);
});


Handlebars.registerHelper('ifItemTypeDiscussion', function(type, options) {
  if (type == 'Discussion') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('findRightUrlFor', function(activity) {
  return activity.type === 'Submission'
    ? '/courses/' + activity.course_id + '/grades'
    : activity.html_url;
});

Handlebars.registerHelper('checkReadStateFor', function(activity) {
  return mmooc.menu.checkReadStateFor(activity) ? 'unread' : '';
});

Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});

this.mmooc = this.mmooc || {};

this.mmooc.util = (function () {
  return {
    courseListEnum: {
      normalCourse: 1,
      allCoursesList: 2,
      myCoursesList: 3,
      dataportenCallback: 4,
      uidpCallback: 5
    },
    mmoocLoadScript: function (mmoocScript) {
      var mmoocScriptElement = document.createElement('script');
      mmoocScriptElement.setAttribute('charset', 'UTF-8');
      mmoocScriptElement.setAttribute('src', mmoocScript);
      document.body.appendChild(mmoocScriptElement);
    },

    renderTemplateWithData: function (template, data) {
      var html = '';
      try {
        html = mmooc.templates[template](data);
      } catch (e) {
        console.log(e);
      }

      return html;
    },

    //Kilde: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    isMobileOrTablet: function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },

    getPageTitleBeforeColon: function () {
      // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
      var title = document.title;
      if (title.indexOf(':')) {
        title = title.substring(0, title.indexOf(':'));
      }
      return title;
    },

    getPageTitleAfterColon: function () {
      // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
      var title = document.title;
      if (title.indexOf(':')) {
        title = title.substring(title.indexOf(':') + 1, title.length);
      }
      return title;
    },

    filterCourse: function (course) {
      if (!this.mmooc.settings.filterCourses) {
        return true;
      }
      return this.mmooc.settings.filterCoursesOnAccountId.includes(course.account_id);
    },
    filterSearchAllCourse: function (course) {
      if (!this.mmooc.settings.filterCourses) {
        return true;
      }
      return this.mmooc.settings.filterCoursesOnAccountId.includes(course.course.account_id);
    },
    callWhenElementIsPresent: function (classId, callback) {
      var checkExist = setInterval(function () {
        var checkClassId = classId;
        if ($(checkClassId).length) {
          clearInterval(checkExist);
          callback();
        }
      }, 100);
    },

    arraySorted: function (array, elementToSort) {
      if (
        Object.prototype.toString.call(array) === '[object Array]' &&
        elementToSort
      ) {
        return array.sort(function (a, b) {
          if (
            a.hasOwnProperty(elementToSort) &&
            b.hasOwnProperty(elementToSort)
          ) {
            var field1 = a[elementToSort].toLocaleLowerCase();
            var field2 = b[elementToSort].toLocaleLowerCase();
            return field1.localeCompare(field2, 'nb', { usage: 'sort' });
          }
          return 0;
        });
      }
      return array;
    },

    goBack: function (e) {
      //http://stackoverflow.com/questions/9756159/using-javascript-how-to-create-a-go-back-link-that-takes-the-user-to-a-link-i
      var defaultLocation = 'http://localhost:9000';
      var oldHash = window.location.hash;

      history.back(); // Try to go back

      var newHash = window.location.hash;

      /* If the previous page hasn't been loaded in a given time (in this case
       * 1000ms) the user is redirected to the default location given above.
       * This enables you to redirect the user to another page.
       *
       * However, you should check whether there was a referrer to the current
       * site. This is a good indicator for a previous entry in the history
       * session.
       *
       * Also you should check whether the old location differs only in the hash,
       * e.g. /index.html#top --> /index.html# shouldn't redirect to the default
       * location.
       */

      if (
        newHash === oldHash &&
        (typeof document.referrer !== 'string' || document.referrer === '')
      ) {
        window.setTimeout(function () {
          // redirect to default location
          window.location.href = defaultLocation;
        }, 1000); // set timeout in ms
      }
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.preventPropagation) e.preventPropagation();
      }
      return false; // stop event propagation and browser default event
    },

    adaptHeightToIframeContentForId: function (containerId, frameId) {
      var scrollHeight =
        Number(
          document.getElementById(frameId).contentWindow.document.body
            .scrollHeight
        ) + 20;
      document.getElementsByClassName(containerId)[0].style.height =
        scrollHeight + 'px';
    },

    isEnrolledAsStudent: function (enrollments) {
      for (var i = 0; i < enrollments.length; i++) {
        if (enrollments[i].role == 'StudentEnrollment') {
          return true;
        }
      }
      return false;
    },
    isEnrolledAsObserver: function (enrollments) {
      for (var i = 0; i < enrollments.length; i++) {
        if (enrollments[i].role == 'ObserverEnrollment') {
          return true;
        }
      }
      return false;
    },
    enrollmentsHasRoleInCourse: function (enrollments, role) {
      for (i = 0; i < enrollments.length; i++) {
        let enrollment = enrollments[i];
        if (enrollment["role"] == role) {
          return true;
        }
      }
      return false;
    },
    hasRoleInCourse: function (courseId, role, callback) {
      return function (callback, role) {
        mmooc.api.getUsersEnrollmentsForCourse(courseId, function (enrollments) {
          callback(mmooc.util.enrollmentsHasRoleInCourse(enrollments, role));
        });
      }(callback, role)
    },
    isTeacherOrAdmin: function () {
      var roles = mmooc.api.getRoles();
      return (
        roles != null &&
        (roles.indexOf('teacher') != -1 || roles.indexOf('admin') != -1)
      );
    },
    isObserver: function (course) {
      if (course && course.enrollments) {
        return this.isEnrolledAsObserver(course.enrollments);
      }
    },
    isEnrolledWithRole(course, role) {
      if (course && course.enrollments) {
        for (var i = 0; i < course.enrollments.length; i++) {
          if (course.enrollments[i].role == role) {
            return true;
          }
        }
      }
      return false;
    },
    isPfDKCourse: CourseOptions.hasOptionFunction('PfDK'),
    isMultilangCourse: CourseOptions.hasOptionFunction('lang'),
    isPrincipal() {
      return (this.isTeacherOrAdmin() || this.isEnrolledWithRole(mmooc.util.course, mmooc.settings.principalRoleType));
    },
    isRoleBasedCourse: CourseOptions.hasOptionFunction('role'),
    isMMOOCLicense() {
      return CourseOptions.hasOption(mmooc.util.course, 'MMOOCLICENSE');
    },
    postModuleProcessing() {
      try {
        let html = '<div class="login-box" style="position: fixed">Laster diskusjonen</div>';
        $("#wrapper").append(html);
        setInterval(function () {
          console.log("postModuleProcessing intervall timer called")
          $(".login-box").append(".");
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
    postModuleCoursePageProcessing() {
      try {
        $(".mmooc-module-items-icons-Discussion").click(function () {
          mmooc.util.postModuleProcessing()
        });
      } catch (e) {
        console.log(e);
      }
    },
    postModuleMenuProcessing() {
      try {
        $(".mmooc-module-items-icons-Discussion").parent().click(function () {
          mmooc.util.postModuleProcessing()
        });
      } catch (e) {
        console.log(e);
      }
    },
  

    isAlertMsg(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "ALERTMSG") {
            return arr[i + 1];
          }
        }
      }
      return "";
    },
    isUnmaintained(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == "UNMAINTAINED") {
            return arr[i + 1];
          }
        }
      }
      return "";
    },
    isNotificationToUser(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i =0; i < arr.length; i++) {
          if (arr[i] == "notificationtouser"){
            return true ;
          }
        }
      }
      return "";
    },
    isFeedback(course) {
      if (course) {
        var arr = course.course_code.split("::");
        for (var i =0; i < arr.length; i++) {
          if (arr[i] == "feedback"){
            return true ;
          }
        }
      }
      return "";
    },
    //description":"courseId:360:community:1902:940101808"
    getCountyOrCommunityNumber(groupDescription) {
      var arr = groupDescription.split(":");
      for (var i = 0; i < arr.length; i++) {
        if ((arr[i] == "community") || (arr[i] == "county")) {
          return parseInt(arr[i + 1], 10);
        }
      }
      return 0;
    },
    updateInformationPane() {
      mmooc.util.isMemberOfExpiredCommunity(mmooc.util.course, function (isMemberOfExpiredCommunity) {
        var observer = (mmooc.util.isAuthenticated() && mmooc.util.isObserver(mmooc.util.course));
        var pfdk = mmooc.util.isPfDKCourse(mmooc.util.course);
        var unmaintainedSince = mmooc.util.isUnmaintained(mmooc.util.course);
        var alertMsg = mmooc.util.isAlertMsg(mmooc.util.course);
        var notificationtouser= mmooc.util.isNotificationToUser(mmooc.util.course);
        var feedback= mmooc.util.isFeedback(mmooc.util.course);
        if (observer || pfdk || unmaintainedSince || alertMsg || isMemberOfExpiredCommunity || notificationtouser || feedback) {
          mmooc.pages.showInformationPane(observer, pfdk, unmaintainedSince, alertMsg, isMemberOfExpiredCommunity, notificationtouser, feedback);
        } else {
          mmooc.pages.hideInformationPane();
        }
      });
    },
    isMemberOfExpiredCommunity(course, callback) {
      mmooc.api.getUserGroupsForCourse(course.id, function (groups) {
        var memberOfUtgaattKommune = false;
        if (groups.length) {
          for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            var countyOrCommunityNumber = mmooc.util.getCountyOrCommunityNumber(group.description);
            if (countyOrCommunityNumber) {
              if (utgaatteKommuneNr.indexOf(countyOrCommunityNumber) > -1) {
                memberOfUtgaattKommune = true;
                break;
              }
            }
          }
        }
        callback(memberOfUtgaattKommune);
      });
    },
    isActiveCourseRoleBased() {
      return mmooc.util.isRoleBasedCourse(mmooc.util.course);
    },
    isAuthenticated: function () {
      return mmooc.api.getRoles() !== null;
    },

    getGroupsInfo(groups) {
      var groupsInfo = {};
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].description) {
          var s = groups[i].description.split(":");
          if (s[2] == "community") {
            groupsInfo.municipalityId = s[3];
          } else if (s[2] == "county") {
            groupsInfo.countyId = s[3];
          }
        }
      }
      return groupsInfo;
    },
    firstIncompleteItemHtmlUrl: function (items, bIncludeIndentedItems) {
      var firstHtmlUrl = null;
      var firstItem = null;
      if (items != null && items != undefined && items.length > 0) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if (!firstHtmlUrl && item.html_url) {
            firstHtmlUrl = item.html_url;
          }
          if (item.completion_requirement && !(item.indent && !bIncludeIndentedItems)) {
            if (!firstItem) {
              firstItem = item;
            }
            if (!item.completion_requirement.completed) {
              return item.html_url;
            }
          }
        }
      }
      if (firstItem) {
        return firstItem.html_url;
      }
      return firstHtmlUrl;
    },

    percentageProgress: function (modules, bIncludeIndentedItems) {
      var total = 0;
      var completed = 0;

      for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        for (var j = 0; j < module.items.length; j++) {
          var item = module.items[j];
          if (!(item.indent && !bIncludeIndentedItems)) {
            if (item.completion_requirement) {
              total++;
              if (item.completion_requirement.completed) {
                completed++;
              }
            }
          }
        }
      }
      return Math.round((completed * 100) / total);
    },
    updateProgressForRoleBasedCourses: function (courses) {
      const error = error => console.error('error calling api', error);
      for (var i = 0; i < courses.length; i++) {
        var course = courses[i];
        if (mmooc.util.isRoleBasedCourse(course) && !mmooc.util.isEnrolledWithRole(course, mmooc.settings.principalRoleType)) {
          mmooc.api.listModulesForCourse(
            (function (courseId) {
              return function (modules) {
                var bIncludeIndentedItems = false;
                var p = mmooc.util.percentageProgress(modules, bIncludeIndentedItems);
                var divId = "#course_" + courseId + "> div > div.mmooc-course-list-progress > div ";
                $(divId + " > div").attr("style", "width:" + p + "%; -webkit-transition: width 2s; transition: width 2s;");
                if (p == 100) {
                  $(divId).addClass("mmooc-progress-bar-done");
                }
              };
            })(course.id)
            , error, course.id);
        }
      }
    },
    setGlobalPeerReviewButtonState: function () {
      if (mmooc.settings.disablePeerReviewButton == true) {
        $('.assignments #right-side :submit').prop('disabled', true);
      }
    },

    formattedDate: function (date) {
      var date = new Date(date);
      var month = mmooc.util.getMonthShortName(date);
      return (
        date.getDate() +
        ' ' +
        month +
        ', ' +
        date.getFullYear() +
        ' - ' +
        date.getHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes()
      );
    },

    getWeekdayShortName: function (date) {
      var weekdays = ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'];
      return weekdays[date.getDay()];
    },

    getMonthShortName: function (date) {
      var months = [
        'jan',
        'feb',
        'mar',
        'apr',
        'mai',
        'jun',
        'jul',
        'aug',
        'sep',
        'okt',
        'nov',
        'des'
      ];
      return months[date.getMonth()];
    },
    getCourseCategories: function (courses) {
      var categorys = [];
      var hasOther = false;
      for (var i = 0; i < courses.length; i++) {
        var category = mmooc.util.getCourseCategory(courses[i].course_code);
        if (categorys.indexOf(category) == -1) {
          if (category == 'Andre') {
            hasOther = true;
          } else {
            categorys.push(category);
          }
        }
      }
      //      categorys.sort();
      if (hasOther) {
        categorys.push('Andre');
      }
      return categorys;
    },
    sortCourses: function (courses) {
      return courses.sort(function (a, b) {
        var aParams = a.course_code.split("::");
        if (aParams.length < 2) {
          return 1;
        }

        var aCourseCode = aParams[aParams.length - 1];

        var bParams = b.course_code.split("::");
        if (bParams.length < 2) {
          return -1;
        }
        var bCourseCode = bParams[bParams.length - 1];

        return aCourseCode < bCourseCode ? -1 : 1;
      });
    },
    getCoursesCategorized: function (courses, categorys) {
      var coursesCategorized = [];
      for (var i = 0; i < categorys.length; i++) {
        var categoryCourses = [];
        var noOfRoleBasedCourses = 0;
        var noOfPersonalBasedCourses = 0;
        for (var j = 0; j < courses.length; j++) {
          var course = courses[j];
          var category = mmooc.util.getCourseCategory(course.course_code);
          if (categorys[i] == category) {
            course.roleBasedCourse = mmooc.util.isRoleBasedCourse(course);
            if(course.roleBasedCourse) {
              noOfRoleBasedCourses++;
            } else {
              noOfPersonalBasedCourses++;
            }
            categoryCourses.push(course);
          }
        }
        /*        categoryCourses.sort(function(a, b) {
                  return a.course_code > b.course_code;
                });
        */
        var categoryObj = {
          title: categorys[i],
          noOfRoleBasedCourses: noOfRoleBasedCourses,
          noOfPersonalBasedCourses: noOfPersonalBasedCourses,
          courses: categoryCourses
        };
        coursesCategorized.push(categoryObj);
      }
      return coursesCategorized;
    },
    getCourseCategory: function (courseCode) {
      var category = 'Andre';
      if (courseCode && courseCode.indexOf('::') > -1) {
        category = courseCode.substring(0, courseCode.indexOf('::'));
      }
      return category;
    },
    getToolsInLeftMenu: function (path) {
      var modulesFound = false;
      var toolList = [];
      var activeToolName = 'Verktøy';
      var activeToolPath = '';

      $('#section-tabs .section > a').each(function () {
        var currentClass = $(this).attr('class');
        if (modulesFound && currentClass != 'settings') {
          var href = $(this).attr('href');
          var title = $(this).html();
          var activeTool = false;
          if (href == path) {
            activeTool = true;
            activeToolName = title;
            activeToolPath = href;
          }
          toolList.push({
            activeTool: activeTool,
            href: href,
            title: title
          });
        } else if (currentClass == 'modules') {
          modulesFound = true;
        }
      });
      return {
        activeToolName: activeToolName,
        activeToolPath: activeToolPath,
        toolList: toolList
      };
    },
    debounce: function (func, wait, immediate) {
      var timeout;
      return function () {
        var context = this, args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    },
    filter: function (arr, fun) {
      var len = arr.length;
      if (typeof fun != "function")
        throw new TypeError();

      var res = new Array();
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in arr) {
          var val = arr[i];
          if (fun.call(thisp, val, i, arr))
            res.push(val);
        }
      }

      return res;
    },
    urlHashToObject: () => {
      if (document.location.hash === '') return {};

      const hash = location.hash.substring(1);
      return JSON.parse(
        '{"' + hash.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        (key, value) => key === "" ? value : decodeURIComponent(value)
      );
    },
    updateRightMenuButtons: function() {
      $("#course_show_secondary > a").each(function() {
        var $this = $(this);
        var _href = $this.attr("href");
        $this.attr("href", _href + mmooc.hrefAmpQueryString);
      });
    },
    getLinkToAvailableCourses: function () {
      var linkToAvailableCourses = "/search/all_courses" + mmooc.hrefQueryString;
      //ETH20190409 By making sure the root account loads our design, we do not need a front page.
      /*
              if (this.mmooc.allCoursesFrontpageCourseID > 0) {
                  linkToAvailableCourses = "/courses/" + this.mmooc.allCoursesFrontpageCourseID + "?coursesList=1";
              }
      */
      return linkToAvailableCourses;
    },
    //This function can probably be deleted now that we use ?udirDesign
    isCourseFrontpageForAllCoursesList: function () {
      return false;
      const queryString = document.location.search;
      const currentCourseID = mmooc.api.getCurrentCourseId();

      const isOverridenCourse = currentCourseID === this.mmooc.allCoursesFrontpageCourseID;
      const isNotTeacherOrAdmin = !mmooc.util.isTeacherOrAdmin();

      const urlParamsObj = mmooc.utilRoot.urlParamsToObject();
      const isOverridenAnyCourse = urlParamsObj && urlParamsObj['coursesList'];
      const isDisabledOverridenCourse = urlParamsObj && !urlParamsObj['skipCoursesList'];
      const isMyCourses = urlParamsObj && urlParamsObj['myCourses'];
      const isDataportenCallback = urlParamsObj && urlParamsObj['dataportenCallback'];

      const urlHashObj = mmooc.util.urlHashToObject();
      const isUidpCallback = urlHashObj && urlHashObj['id_token'];

      var returnCode = mmooc.util.courseListEnum.normalCourse;

      if (isOverridenCourse && isNotTeacherOrAdmin && isDisabledOverridenCourse) {
        returnCode = mmooc.util.courseListEnum.allCoursesList;
      }
      if (isOverridenAnyCourse) {
        returnCode = mmooc.util.courseListEnum.allCoursesList;
      }
      if (isMyCourses) {
        returnCode = mmooc.util.courseListEnum.myCoursesList;
      }
      if (isDataportenCallback) {
        returnCode = mmooc.util.courseListEnum.dataportenCallback;
      } else if (isUidpCallback) {
        returnCode = mmooc.util.courseListEnum.uidpCallback;
      }
      return returnCode;
    },
    tinyMceEditorIsInDOM(callback) {
      this.executeCallbackWhenObjectExists(function () {
        this.tinyMCE.activeEditor;
      }, callback);
    },
    executeCallbackWhenObjectExists(functionWithObjectReference, callback) {
      let counter = 0;
      let maxTries = 10;
      let success = false;
      var objectExistInterval = setInterval(function () {
        try {
          if (!success) {
            functionWithObjectReference();
            clearInterval(objectExistInterval);
            callback();
            success = true;
          }
        } catch (e) {
          counter += 1;
          if (counter >= maxTries) {
            clearInterval(objectExistInterval);
          }
        }
      }, 1000);
    }
  };
})();

this.mmooc = this.mmooc || {};

if (typeof this.mmooc.i18n === 'undefined') {
  if (mmooc.api.getLocale() == 'nn') {
    this.mmooc.i18n = {
      AllAvailableCoursesIngress: "Oversikt over alle kompetansepakker du er meldt på og som du kan melde deg på.",
      DropCourseDialogText: 'Trykk OK for å melde deg av kompetansepakken ',
      NoCoursesInfo: 'Det finst ingen kompetansepakker du kan registrere deg på for augeblikket',
      CourseContinue: 'Fortsette',
      CourseRegisterWhenAuthenticated: 'Meld deg på',
      YouAreRegisteredToXCourses: amount => `du er registrert i ${amount} kompetansepakker`,
      CoursesAmount: amount => `${amount} kompetansepakker`,
      OpenCoursesGroup: 'Åpne',
      CloseCoursesGroup: 'Lukk',
      LogIn: 'Logg inn',
      LogInPopup: 'Logg inn på kompetanseportalen',
      LogInCanvas: 'Har ikkje Feide',
      RegisterPopup: 'Meld deg på',
      RegisterWithCanvas: 'Har ikkje Feide',
      JoinCourseDialogText:
        'Du kan melde deg på kompetansepakken igjen seinare om du vil ',
      DropCourse: 'Meld deg av kompetansepakken',
      CreateAccountTitle: 'Har du ikkje konto?',
      CreateAccountSubtitle: 'Klikk her for å lage ein',
      Course: 'Kompetansepakke',
      CourseDefinite: 'Kompetansepakken',
      CoursePlural: 'Kompetansepakker',
      CourseProgressionTitle: 'Din progresjon i kompetansepakken:',
      GoToCourse: 'Gå til kompetansepakken',
      GoToModule: 'Gå til modul',
      BackToCoursePage: 'Tilbake til forsida',
      AddACourse: 'Legg til ein kompetansepakke',
      Module: 'Modul',
      ModulePlural: 'Modular',
      CourseModules: 'Kompetansepakkemodular',
      Assignment: 'Oppgåve',
      Discussion: 'Diskusjon',
      Quiz: 'Prøve',
      Page: 'Innhaldsside',
      ExternalUrl: 'Ekstern lenke',
      ExternalTool: 'Eksternt verktøy',
      File: 'Fil',
      Announcement: 'Kunngjering',
      DiscussionTopic: 'Diskusjon',
      Conversation: 'Innboksmelding',
      Message: 'Oppgåvevarsel',
      Submission: 'Innlevering',
      AssessmentRequest: 'Vurderingsførespurnad',
      Conference: 'Conference',
      Collaboration: 'Collaboration',
      LinkBack: 'Tilbake til førre side',
      Badgesafe: 'Utmerkingar',
      PeerReview: 'Kvarandrevurdering',

      //Teksten nedenfor brukes til å gjenkjenne
      //om man er på en hverandrevurderingsside.
      //http://localhost/courses/1/assignments/1/submissions/3
      //http://localhost/courses/1/assignments/1
      PeerReviewer: 'Fagfellevurdering',

      //Teksten nedenfor brukes til å undersøke om man viser sin egen innlevering
      Delivery: 'Innleveringsdetaljar',

      DetailsAboutYourDelivery: 'Detaljar om innleveringa di',
      DetailsAboutDelivery: 'Detaljar om innlevering',
      SubmissionIsNotAssessed: 'Oppgåva er ikkje vurdert',
      SubmissionIsAssessedByOne: 'Vurderinga er klar',
      SubmissionIsAssessedByAll: 'Alle vurderingar er klare',
      SubmissionAssessmentsAreReady: 'vurderingar er klare',
      GroupGetInTouchSubject: 'ønsker kontakt',
      eventsAndDeadlinesTitle: 'Viktige datoar',
      WeHaveAQuestionToTeacherInTheDiscussion:
        'Vi har eit spørsmål til rettleiar i diskusjonen',
      CallForInstructorHoverOverText:
        'Sender ei melding til rettleiar om at de treng hjelp i denne konkrete gruppediskusjonen. Treng du personleg rettleiing: send melding til din rettleiar i innboks.',
      NoTeacherFeedbackLink:
        'No teacher_feedback link. Does the help menu have a link to send feedback to the teacher?',
      NoEnrollments:
        'Velkommen til vår kompetanseplattform. Du er ikkje påmeldt nokon kompetansepakker endå. Klikk på knappen nedanfor for å sjå tilgjengelege kompetansepakker.',
      OutOf: 'av',
      Months: [
        'januar',
        'februar',
        'mars',
        'april',
        'mai',
        'juni',
        'juli',
        'august',
        'september',
        'oktober',
        'november',
        'desember'
      ]
    };
  } else {
    this.mmooc.i18n = {
      AllAvailableCoursesIngress: "Oversikt over alle kompetansepakker du er meldt på og som du kan melde deg på.",
      DropCourseDialogText: 'Trykk OK for å melde deg av kompetansepakken ',
      NoCoursesInfo: 'Det er ingen kompetansepakker du kan registrere deg på for øyeblikket',
      EnrollButton: 'Join this Course',
      CourseContinue: 'Fortsette',
      CourseRegisterWhenAuthenticated: 'Meld deg på',
      YouAreRegisteredToXCourses: amount => `du er registert i ${amount} kompetansepakker`,
      CoursesAmount: amount => `${amount} kompetansepakker`,
      OpenCoursesGroup: 'Åpne',
      CloseCoursesGroup: 'Lukk',
      LogInPopup: 'Logg inn på kompetanseportalen',
      LogIn: 'Logg inn',
      LogInCanvas: 'Har ikke Feide',
      RegisterPopup: 'Meld deg på',
      RegisterWithCanvas: 'Har ikke Feide',
      JoinCourseDialogText:
        'Du kan melde deg på kompetansepakken igjen senere om du vil ',
      DropCourse: 'Meld deg av kompetansepakken',
      CreateAccountTitle: 'Har du ikke konto?',
      CreateAccountSubtitle: 'Klikk her for å lage en',
      Course: 'Kompetansepakke',
      CourseDefinite: 'Kompetansepakken',
      CoursePlural: 'Kompetansepakker',
      CourseProgressionTitle: 'Din progresjon i kompetansepakken:',
      GoToCourse: 'Gå til kompetansepakken',
      GoToModule: 'Gå til modul',
      BackToCoursePage: 'Tilbake til forsiden',
      AddACourse: 'Legg til en kompetansepakke',
      Module: 'Modul',
      ModulePlural: 'Moduler',
      CourseModules: 'Kompetansepakkemoduler',
      Assignment: 'Oppgave',
      Discussion: 'Diskusjon',
      Quiz: 'Prøve',
      Page: 'Innholdsside',
      ExternalUrl: 'Ekstern lenke',
      ExternalTool: 'Eksternt verktøy',
      File: 'Fil',
      Announcement: 'Kunngjøring',
      DiscussionTopic: 'Diskusjon',
      Conversation: 'Innboksmelding',
      Message: 'Oppgavevarsel',
      Submission: 'Innlevering',
      AssessmentRequest: 'Vurderingsforespørsel',
      Conference: 'Conference',
      Collaboration: 'Collaboration',
      LinkBack: 'Tilbake til forrige side',
      Badgesafe: 'Utmerkelser',
      PeerReview: 'Hverandrevurdering',

      //Teksten nedenfor brukes til å gjenkjenne om man er på en hverandrevurderingsside.
      PeerReviewer: 'Hverandrevurdering',

      //Teksten nedenfor brukes til å undersøke om man viser sin egen innlevering
      Delivery: 'innlevering',

      DetailsAboutYourDelivery: 'Detaljer om din innlevering',
      DetailsAboutDelivery: 'Detaljer om innlevering',
      SubmissionIsNotAssessed: 'Oppgaven er ikke vurdert',
      SubmissionIsAssessedByOne: 'Vurderingen er klar',
      SubmissionIsAssessedByAll: 'Alle vurderinger er klare',
      SubmissionAssessmentsAreReady: 'vurderinger er klare',
      GroupGetInTouchSubject: 'ønsker kontakt',
      eventsAndDeadlinesTitle: 'Viktige datoer',
      WeHaveAQuestionToTeacherInTheDiscussion:
        'Vi har et spørsmål til veileder i diskusjonen',
      CallForInstructorHoverOverText:
        'Sender en melding til veileder om at dere trenger hjelp i denne konkrete gruppediskusjonen. Trenger du personlig veiledning: send melding til din veileder i innboks.',
      NoTeacherFeedbackLink:
        'No teacher_feedback link. Does the help menu have a link to send feedback to the teacher?',
      NoEnrollments:
        'Velkommen til vår kompetanseplattform. Du er ikke påmeldt noen kompetansepakker enda. Klikk på knappen nedenfor for å se tilgjengelige kompetansepakker.',
      OutOf: 'av',
      Months: [
        'januar',
        'februar',
        'mars',
        'april',
        'mai',
        'juni',
        'juli',
        'august',
        'september',
        'oktober',
        'november',
        'desember'
      ]
    };
  }
}

this.mmooc = this.mmooc || {};

// Course ID for selected course, which frontend page
// will be swapped with All Courses list
this.mmooc.settings = {
  CanvaBadgeProtocolAndHost: 'https://canvabadges-beta-iktsenteret.bibsys.no',
  useCanvaBadge: false,
  defaultNumberOfReviews: 1, // Default number of peer reviews per student in power function
  useDataportenGroups : false,
  filterCourses: true,
  filterCoursesOnAccountId: [99, 100, 102, 103, 137, 138, 139, 145],
  disablePeerReviewButton: false,
  principalRoleType: "Skoleleder",
  removeGlobalGradesLink: true,
  removeGroupsLink: true,
  displayProfileLeftMenu: false,
  displayUserMergeButton: true,
  userMergeLtiToolId: 863,
  displayGroupsTab: false,
  displayDiscussionsTab : false,
  displayAlertsMenuItem : false,
  displayCallForAssistanceButtonInGroupDisccussions : false,
  displayInboxMenu: false,
  privacyPolicyLink: 'https://kompetanseudirno.azureedge.net/udirdesign/privacypolicy.html?v=1_0',
  contactPoint: 'kompetansesupport@udir.no',
  platformName: 'UDIR - kompetanseplattform',
  homeOrganization: 'Udir.no',
  aboutThePlatform: 'https://kompetanseudirno.azureedge.net/udirdesign/omkompetanseudirno.html',
};


//# sourceMappingURL=badges-min.js.map