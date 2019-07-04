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

Handlebars.registerHelper('overrideIconClassByTitle', function(title) {
  title = title.toLowerCase();
  if (title.indexOf('utmerkelse:') != -1) {
    return ' mmooc-icon-badge';
  } else if (title.indexOf('video:') != -1) {
    return ' mmooc-icon-video';
  } else if (title.indexOf('aktivitet:') != -1) {
    return ' mmooc-icon-interactive';
  } else {
    return '';
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

Handlebars.registerHelper('percentageForModules', function(modules) {
  var total = 0;
  var completed = 0;

  for (var i = 0; i < modules.length; i++) {
    var module = modules[i];
    for (var j = 0; j < module.items.length; j++) {
      var item = module.items[j];
      if (item.completion_requirement) {
        total++;
        if (item.completion_requirement.completed) {
          completed++;
        }
      }
    }
  }

  return Math.round((completed * 100) / total);
});

Handlebars.registerHelper('urlForFirstNoneCompleteItem', function(items) {
  if (items != null && items != undefined && items.length > 0) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (
        item.completion_requirement &&
        !item.completion_requirement.completed
      ) {
        return item.html_url;
      }
    }

    return items[0].html_url;
  }

  return null;
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
