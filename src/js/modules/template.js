import Handlebars from 'handlebars/runtime';
import util from './util';
import menu from './menu';
import settings from '../settings';
import courselist from './courselist';

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
  if(util.isUnmaintained(this)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifRoleBased', function(options) {
  if(util.isRoleBasedCourse(this)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('courseAlert', function() {
  return util.isUnmaintained(this);
});

Handlebars.registerHelper('getCourseUrl', function() {
  if (util.isAuthenticated()) {
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
  if(util.isTeacherOrAdmin())
  {
    return options.fn(this);
  }
  for (var i = 0; i < enrollments.length; i++) {
    if (enrollments[i].role == settings.principalRoleType) {
      return options.fn(this);
    }
  }
});

Handlebars.registerHelper('norwegianDateAndTime', function(timestamp) {
  var year = new Date(timestamp).toString(' yyyy');
  var day = new Date(timestamp).toString('dd. ');
  var time = new Date(timestamp).toString(' HH:mm');
  var monthNumber = parseInt(new Date(timestamp).toString('M'), 10);
  var months =  [
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
      ];
  var month = months[monthNumber - 1];

  return day + month + year + time; //return new Date(timestamp).toString('dd. MMMM yyyy HH:mm'); // yyyy-MM-dd
});



Handlebars.registerHelper('getPathFromUrl', function(url) {
  return url.split('?')[0]; //returns an array even if there is no '?' so no need for extra checks
});

Handlebars.registerHelper('urlForCourseId', function (courseId) {
  return '/courses/' + courseId
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
