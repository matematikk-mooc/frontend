this["mmooc"] = this["mmooc"] || {};
this["mmooc"]["templates"] = this["mmooc"]["templates"] || {};

this["mmooc"]["templates"]["activitystream"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n    <li class=\""
    + escapeExpression((helper = helpers.checkReadStateFor || (depth0 && depth0.checkReadStateFor),options={hash:{},data:data},helper ? helper.call(depth0, depth0, options) : helperMissing.call(depth0, "checkReadStateFor", depth0, options)))
    + "\"><a href=\""
    + escapeExpression((helper = helpers.findRightUrlFor || (depth0 && depth0.findRightUrlFor),options={hash:{},data:data},helper ? helper.call(depth0, depth0, options) : helperMissing.call(depth0, "findRightUrlFor", depth0, options)))
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "<br><span class=\"mmooc-notification-type\">"
    + escapeExpression((helper = helpers.localize || (depth0 && depth0.localize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "localize", (depth0 && depth0.type), options)))
    + "</span></a></li>\n";
  return buffer;
  }

  buffer += "<ul id=\"mmooc-notifications\">\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.activities), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</ul>\n\n<a href=\"#\" id=\"mmooc-notifications-showall\">Vis alle</a>";
  return buffer;
  });

this["mmooc"]["templates"]["backbutton"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"mmooc-back-button\">\n    <a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n</div>\n";
  return buffer;
  });

this["mmooc"]["templates"]["courselist"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n            <div id=\"course_";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"mmooc-size-1of3\">\n                <div class=\"mmooc-course-list-item\">\n                    <div class=\"mmooc-course-list-heading\">\n                        <h2><a href=\""
    + escapeExpression((helper = helpers.urlForCourseId || (depth0 && depth0.urlForCourseId),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.id), options) : helperMissing.call(depth0, "urlForCourseId", (depth0 && depth0.id), options)))
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></h2>\n                    </div>\n\n                    <div class=\"mmooc-course-list-description\">\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.syllabus_body), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n\n                    <div class=\"mmooc-course-list-button\">\n                        <a href=\""
    + escapeExpression((helper = helpers.urlForCourseId || (depth0 && depth0.urlForCourseId),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.id), options) : helperMissing.call(depth0, "urlForCourseId", (depth0 && depth0.id), options)))
    + "\" class=\"btn rounded ";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.course_progress), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Gå til kursside</a>\n                    </div>\n\n                    <div class=\"mmooc-course-list-progress\">\n						";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.course_progress), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </div>\n            </div>\n\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n\n							";
  if (helper = helpers.syllabus_body) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.syllabus_body); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n						";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.requirement_count), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += " ";
  stack1 = (helper = helpers.ifEquals || (depth0 && depth0.ifEquals),options={hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.requirement_completed_count), (depth0 && depth0.requirement_count), options) : helperMissing.call(depth0, "ifEquals", (depth0 && depth0.requirement_completed_count), (depth0 && depth0.requirement_count), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return " btn-done ";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.requirement_count), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                                <div class=\"mmooc-progress-bar";
  stack1 = (helper = helpers.ifEquals || (depth0 && depth0.ifEquals),options={hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.requirement_completed_count), (depth0 && depth0.requirement_count), options) : helperMissing.call(depth0, "ifEquals", (depth0 && depth0.requirement_completed_count), (depth0 && depth0.requirement_count), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                                    <div class=\"mmooc-progress-bar-inner\" style=\"width:"
    + escapeExpression((helper = helpers.percentage || (depth0 && depth0.percentage),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.requirement_completed_count), (depth0 && depth0.requirement_count), options) : helperMissing.call(depth0, "percentage", (depth0 && depth0.requirement_completed_count), (depth0 && depth0.requirement_count), options)))
    + "%\">\n                                    </div>\n                                </div>\n							";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return " mmooc-progress-bar-done";
  }

  buffer += "<div class=\"mmooc-course-list\">\n    <h1 class=\"xl\">Mine kurs</h1>\n    <div class=\"mmooc-row\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.courses), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  });

this["mmooc"]["templates"]["coursemenu"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "<span class=\"h1-sub-heading\">";
  if (helper = helpers.subtitle) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.subtitle); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>";
  return buffer;
  }

function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                <li class=\"mmooc-course-tab ";
  stack1 = (helper = helpers.ifEquals || (depth0 && depth0.ifEquals),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.title), (depth1 && depth1.selectedMenuItem), options) : helperMissing.call(depth0, "ifEquals", (depth0 && depth0.title), (depth1 && depth1.selectedMenuItem), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><a href=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<div id=\"mmooc-course-tabs-container\">\n    <div id=\"mmooc-course-tabs-container-inner\">\n\n        <h1>";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subtitle), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <ul class=\"mmooc-course-tabs\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.menuItems), {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n</div>";
  return buffer;
  });

this["mmooc"]["templates"]["courseprogress"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return " mmooc-progress-bar-done";
  }

  buffer += "<div class=\"mmooc-course-progress\">\n    <div>\n        <div class=\"mmooc-course-progress-label\">Din kursprogresjon:</div>\n        <div class=\"mmooc-course-progress-bar\">\n            <div class=\"mmooc-progress-bar";
  stack1 = (helper = helpers.ifAllModulesCompleted || (depth0 && depth0.ifAllModulesCompleted),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.modules), options) : helperMissing.call(depth0, "ifAllModulesCompleted", (depth0 && depth0.modules), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                <div class=\"mmooc-progress-bar-inner\" style=\"width:"
    + escapeExpression((helper = helpers.percentageForModules || (depth0 && depth0.percentageForModules),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.modules), options) : helperMissing.call(depth0, "percentageForModules", (depth0 && depth0.modules), options)))
    + "%\">\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>";
  return buffer;
  });

this["mmooc"]["templates"]["groupdiscussionheader"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"mmooc-group-header\">\n    <div id=\"mmooc-group-members\">\n        <div class=\"mmooc-back-button\">\n            <a href=\"/groups/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/discussion_topics\">Tilbake til "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n        </div>\n    </div>\n    <div id=\"mmooc-group-links\">\n        <p>\n            <b>Videorom for gruppa:</b> <a target=\"_new\" href=\"https://connect.uninett.no/gruppe";
  if (helper = helpers.groupId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.groupId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">https://connect.uninett.no/gruppe";
  if (helper = helpers.groupId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.groupId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n        </p>\n    </div>\n\n</div>";
  return buffer;
  });

this["mmooc"]["templates"]["groupheader"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <div class=\"mmooc-group-member\">\n                    <div class=\"mmooc-group-member-avatar\" style=\"background-image: url('";
  if (helper = helpers.avatar_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.avatar_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "')\"></div>\n                    <div class=\"mmooc-group-member-link\">\n                        <a href=\"/about/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n                    </div>\n                </div>\n            ";
  return buffer;
  }

  buffer += "<div class=\"mmooc-back-button\">\n    <a href=\""
    + escapeExpression((helper = helpers.urlForCourseId || (depth0 && depth0.urlForCourseId),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.courseId), options) : helperMissing.call(depth0, "urlForCourseId", (depth0 && depth0.courseId), options)))
    + "/groups\">Tilbake til kursgrupper</a>\n</div>\n<div id=\"mmooc-group-header\">\n    <div id=\"mmooc-group-members\">\n        <p><b>Gruppemedlemmer</b></p>\n\n        <div class=\"mmooc-group-members-list\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n    <div id=\"mmooc-group-links\">\n        <p>\n            <b>Videorom for gruppa:</b> <a target=\"_new\" href=\"https://connect.uninett.no/gruppe";
  if (helper = helpers.groupId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.groupId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">https://connect.uninett.no/gruppe";
  if (helper = helpers.groupId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.groupId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n        </p>\n    </div>\n\n</div>";
  return buffer;
  });

this["mmooc"]["templates"]["moduleitems"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <div class=\"header\">\n            ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n        </div>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <ul class=\"mmooc-module-items\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n        ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                    <li class=\"mmooc-module-item mmooc-module-item-icon\">\n                        <a class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isCurrent), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\"";
  if (helper = helpers.html_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.html_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                            <span class=\"mmooc-module-item-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n                            <span class=\"mmooc-module-items-icons-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1);
  stack1 = (helper = helpers.ifItemIsCompleted || (depth0 && depth0.ifItemIsCompleted),options={hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.completion_requirement), options) : helperMissing.call(depth0, "ifItemIsCompleted", (depth0 && depth0.completion_requirement), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n                               href=\"";
  if (helper = helpers.html_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.html_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                                <i class=\"icon-"
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.type), options)))
    + "\"></i>\n                            </span>\n                        </a>\n                    </li>\n                ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "active";
  }

function program6(depth0,data) {
  
  
  return " done";
  }

  buffer += "<nav aria-label=\"content\" role=\"navigation\">\n\n    <div class=\"mmooc-module-items-back-to-course-button mmooc-back-button\">\n        <a href=\""
    + escapeExpression((helper = helpers.urlForCourseId || (depth0 && depth0.urlForCourseId),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.courseId), options) : helperMissing.call(depth0, "urlForCourseId", (depth0 && depth0.courseId), options)))
    + "\">Tilbake til kursforsiden</a>\n    </div>\n\n    ";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.module), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</nav>";
  return buffer;
  });

this["mmooc"]["templates"]["modules"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n        <div class=\"mmooc-module\">\n            <h2 class=\"light\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n            <a href=\""
    + escapeExpression((helper = helpers.urlForFirstNoneCompleteItem || (depth0 && depth0.urlForFirstNoneCompleteItem),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.items), options) : helperMissing.call(depth0, "urlForFirstNoneCompleteItem", (depth0 && depth0.items), options)))
    + "\" class=\"btn rounded ";
  stack1 = (helper = helpers.ifAllItemsCompleted || (depth0 && depth0.ifAllItemsCompleted),options={hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.items), options) : helperMissing.call(depth0, "ifAllItemsCompleted", (depth0 && depth0.items), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Gå til modul</a>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " btn-done ";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <ul class=\"mmooc-module-items-icons\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n                        <li class=\"mmooc-module-item-icon\"><a class=\"mmooc-module-items-icons-";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = (helper = helpers.ifItemIsCompleted || (depth0 && depth0.ifItemIsCompleted),options={hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.completion_requirement), options) : helperMissing.call(depth0, "ifItemIsCompleted", (depth0 && depth0.completion_requirement), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" href=\"";
  if (helper = helpers.html_url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.html_url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" title=\""
    + escapeExpression((helper = helpers.localize || (depth0 && depth0.localize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "localize", (depth0 && depth0.type), options)))
    + ": ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"><i class=\"icon-"
    + escapeExpression((helper = helpers.lowercase || (depth0 && depth0.lowercase),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.type), options) : helperMissing.call(depth0, "lowercase", (depth0 && depth0.type), options)))
    + "\"></i></a></li>\n                    ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "done";
  }

  buffer += "<div class=\"mmooc-modules\">\n    <h2 class=\"h3\">Kursmoduler</h2>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.modules), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["mmooc"]["templates"]["navigateToPreviousPage"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<nav class=\"mmooc-module-items-back-to-course-button mmooc-back-button\">\n    <span href=\"#\" onclick=\"mmooc.util.goBack()\">\n        ";
  if (helper = helpers.linkText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.linkText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n    </span>\n</nav>";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/account-picker"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <option value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n      ";
  return buffer;
  }

  buffer += "<div>\n  <form>\n    <select name=\"account\">\n      <option value=\"\">Choose the account...</option>\n      ";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.accounts) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.accounts); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.accounts) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n  </form>\n</div>\n";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/assign-process"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <tr id=\"mmpf-assign-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <td>";
  if (helper = helpers.group_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.group_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      <td>";
  if (helper = helpers.user_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      <td class=\"status waiting\">Waiting</td>\n    ";
  return buffer;
  }

  buffer += "<table>\n  <thead>\n    <tr>\n      <th>Group ID</th>\n      <th>Student ID</th>\n      <th>Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.assigns), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n<table>\n\n";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/assign"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form>\n  <dl>\n    <dt><label for=\"csv\">Upload CSV file</label></dt>\n    <dd><input type=\"file\" name=\"csv\"></dd>\n  </dl>\n  <input type=\"submit\"/>\n</form>\n\n<div class=\"side-information\">\n  <h3>Decription of CSV format</h3>\n  <p>First line of the file must be the name of the columns. Column separators are commas. Fields optionally encloused by double quotes (\").\n  <dl>\n    <dt>group_id [Integer]\n    <dd>The group ID\n    <dt>user_id [String]\n    <dd>The FEIDE user ID\n  </dl>\n</div>\n\n";
  });

this["mmooc"]["templates"]["powerfunctions/group-category"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n          <option value=\"\">No group sets defined for account</option>\n        ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <option value=\"\">Choose a group set</option>\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.categories), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n            <option value=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\n          ";
  return buffer;
  }

  buffer += "<form>\n  <ol>\n    <li class=\"step-1\">\n      <select name=\"category\"  onchange=\"$('.step-2').css('display', 'list-item')\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.categories), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </select>\n    <li class=\"step-2\"><input type=\"file\" name=\"csv\"  onchange=\"$('.step-3').css('display', 'list-item')\">\n    <li class=\"step-3\"><input type=\"submit\"/>\n  </ol>\n</form>\n\n<div class=\"side-information\">\n  <h3>Decription of CSV format</h3>\n  <p>First line of the file must be the name of the columns. Column separators are commas. Fields optionally encloused by double quotes (\").\n  <dl>\n    <dt>name [String]\n    <dd>The name of the group\n    <dt>description [String]\n    <dd>A description of the group\n  </dl>\n</div>\n";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/groups-process"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <tr id=\"mmpf-group-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <td>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      <td>";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      <td class=\"status waiting\">Waiting</td>\n    ";
  return buffer;
  }

  buffer += "<table>\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Description</th>\n      <th>Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    ";
  options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}
  if (helper = helpers.groups) { stack1 = helper.call(depth0, options); }
  else { helper = (depth0 && depth0.groups); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
  if (!helpers.groups) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n<table>\n\n";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/head"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"mmooc-power-functions\">\n  <h1 class=\"xl\">Power Functions</h1>\n  <h2>";
  if (helper = helpers.heading) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.heading); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h2>\n  <p><a href=\"/?mmpf\">Back</a></p>\n\n";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/list-groups"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <p>No groups found for account</p>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <table>\n    <tr><th>ID</th><th>Name</th><th>Description</th></tr>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </table>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <tr>\n        <td>";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      </tr>\n    ";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/logins-process"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <tr id=\"mmpf-logins-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <td>";
  if (helper = helpers.user_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.user_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      <td>";
  if (helper = helpers.login_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.login_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n      <td class=\"status waiting\">Waiting</td>\n    ";
  return buffer;
  }

  buffer += "<table>\n  <thead>\n    <tr>\n      <th>User ID</th>\n      <th>Login ID</th>\n      <th>Status</th>\n    </tr>\n  </thead>\n  <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.logins), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n<table>\n";
  return buffer;
  });

this["mmooc"]["templates"]["powerfunctions/logins"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form>\n  <dl>\n    <dt><label for=\"csv\">Upload CSV file</label></dt>\n    <dd><input type=\"file\" name=\"csv\"></dd>\n  </dl>\n  <input type=\"submit\"/>\n</form>\n\n<div class=\"side-information\">\n  <h3>Decription of CSV format</h3>\n  <p>First line of the file must be the name of the columns. Column separators are commas. Fields optionally encloused by double quotes (\").\n  <dl>\n    <dt>current_id [String]\n    <dd>The current FEIDE user ID \n    <dt>new_id [String]\n    <dd>The new  FEIDE user ID\n  </dl>\n</div>\n\n";
  });

this["mmooc"]["templates"]["powerfunctions/main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"mmooc-pf-list\">\n  <div id=\"mmooc-pf-list-group-btn\" class=\"item\">List groups</div>\n  <div id=\"mmooc-pf-group-btn\" class=\"item\">Create groups</div>\n  <div id=\"mmooc-pf-assign-btn\" class=\"item\">Assign students to groups</div>\n  <div id=\"mmooc-pf-logins-btn\" class=\"item\">Add new logins</div>\n</div>\n";
  });

this["mmooc"]["templates"]["powerfunctions/tail"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "</div>\n";
  });

this["mmooc"]["templates"]["usermenu"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<ul id=\"user-menu\">\n    <li class=\"mmooc-menu-item\">\n        <a href=\"#\" class=\"mmooc-menu-item-title\">Varsler <i class=\"icon-mini-arrow-down\"></i><span id=\"mmooc-notification-count\"></span></a>\n        <div class=\"mmooc-menu-item-drop\" id=\"mmooc-activity-stream\">\n        </div>\n    </li>\n    <li class=\"mmooc-menu-item\">\n        <a href=\"/conversations\" class=\"mmooc-menu-item-title\">Innboks <span id=\"mmooc-unread-messages-count\"></span></a>\n    </li>\n    <li class=\"mmooc-menu-item\">\n        <a href=\"#\" class=\"mmooc-menu-item-title\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.display_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <i class=\"icon-mini-arrow-down\"></i></a>\n        <div class=\"mmooc-menu-item-drop\">\n            <ul>\n                <li><a href=\"/profile/settings\">Innstillinger</a></li>\n                <li><a href=\"/logout\">Logg ut</a></li>\n            </ul>\n        </div>\n    </li>\n</ul>\n";
  return buffer;
  });

this["mmooc"]["templates"]["waitIcon"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"fountainG\">\n    <div id=\"fountainG_1\" class=\"fountainG\">\n    </div>\n    <div id=\"fountainG_2\" class=\"fountainG\">\n    </div>\n    <div id=\"fountainG_3\" class=\"fountainG\">\n    </div>\n    <div id=\"fountainG_4\" class=\"fountainG\">\n    </div>\n    <div id=\"fountainG_5\" class=\"fountainG\">\n    </div>\n    <div id=\"fountainG_6\" class=\"fountainG\">\n    </div>\n    <div id=\"fountainG_7\" class=\"fountainG\">\n    </div>\n    <div id=\"fountainG_8\" class=\"fountainG\">\n    </div>\n</div>";
  });
this.mmooc=this.mmooc||{};

this.mmooc.api = function() {
    var _urlToTypeMapping = [];

    _urlToTypeMapping['quizzes'] = 'Quiz';
    _urlToTypeMapping['assignments'] = 'Assignment';
    _urlToTypeMapping['discussion_topics'] = 'Discussion';


    return {
        _ajax: typeof $   !== "undefined" ? $   : {},

        _env:  typeof ENV !== "undefined" ? ENV : {},

        _location: typeof document !== "undefined" ? document.location : {search:"", href:""},

        _uriPrefix: "/api/v1",

        _defaultError: function (event, jqxhr, settings, thrownError) {
            console.log(event, jqxhr, settings, thrownError);
        },

        _sendRequest: function(method, options) {
            var error    = options.error || this._defaultError;
            var uri      = this._uriPrefix + options.uri;
            var params   = options.params || {};
            var callback = options.callback;
            method(uri, params, callback).fail(error);
        },

        _get: function(options) {
            this._sendRequest(this._ajax.get, options);
        },

        _post: function(options) {
            this._sendRequest(this._ajax.post, options);
        },

        getCurrentModuleItemId : function() {
            var paramName = "module_item_id";
            var q = "" + this._location.search;
            if (typeof q === "undefined" || q.indexOf(paramName) == -1) {
                return null;
            }

            var moduleId = q.substring(q.indexOf(paramName) + paramName.length + 1, q.length);
            if (moduleId.indexOf("&") != -1) {
                moduleId = moduleId.substring(0, moduleId.indexOf("&"));
            }

            return parseInt(moduleId, 10);
        },

        getCurrentContentId : function() {
            var q = "" + this._location.pathname;

            var moduleId = q.substring(q.indexOf(paramName) + paramName.length + 1, q.length);
            if (moduleId.indexOf("&") != -1) {
                moduleId = moduleId.substring(0, moduleId.indexOf("&"));
            }

            return parseInt(moduleId, 10);
        },

        getCurrentTypeAndContentId: function() {
            var regexp = /\/courses\/\d+\/\w+\/\d+/;

            if (regexp.test("" + this._location.pathname)) {
                var tmp = this._location.pathname.split("/");
                if (tmp.length >= 5) {
                    var type = _urlToTypeMapping[tmp[3]];
                    var contentId = parseInt(tmp[4], 10);
                    return { contentId: contentId, type: type};
                }
            }
            return null;
        },


        getEnrolledCourses: function(callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/courses",
                "params":   { "include": ["syllabus_body" , "course_progress"] }
            });
        },

        /* FIXME Regarding include items: This parameter suggests that
         * Canvas return module items directly in the Module object
         * JSON, to avoid having to make separate API requests for
         * each module when enumerating modules and items. Canvas is
         * free to omit 'items' for any particular module if it deems
         * them too numerous to return inline. Callers must be
         * prepared to use the List Module Items API if items are not
         * returned.
         */
        getModulesForCurrentCourse: function(callback, error) {
            var courseId = this.getCurrentCourseId();
            this.getModulesForCourseId(callback, error, courseId);
        },

        getModulesForCourseId: function(callback, error, courseId) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/courses/" + courseId + "/modules",
                "params":   { "include": ["items"] }
            });
        },

        getCurrentCourseId: function() {
            var currentUrl = "" + this._location.pathname;
            var matches = currentUrl.match(/\/courses\/(\d+)/);
            if (matches != null) {
                return parseInt(matches[1], 10);
            } else if (this._env.group) {
                // Group pages does not contain course id in URL, but is available via JavaScript variable
                return this._env.group.context_id;
            } else if ($("#section-tabs-header-subtitle").size() > 0) {
                // Group subpages contains course id only in a link
                var tmp = $("#section-tabs-header-subtitle").attr("href").split("/");
                if (tmp.length == 3) {
                    return parseInt(tmp[2], 10);
                }
            }

            return null;
        },

        getCourse: function(courseId, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/courses/" + courseId,
                "params":   {  }
            });
        },

        getCurrentGroupId: function() {
            var currentUrl = "" + this._location.pathname;
            var matches = currentUrl.match(/\/groups\/(\d+)/);
            if (matches != null) {
                return parseInt(matches[1], 10);
            }
            return null;
        },

        getGroup: function(groupId, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/groups/" + groupId,
                "params":   {}
            });
        },

        getGroupMembers: function(groupId, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/groups/" + groupId + "/users",
                "params":   {"include": ["avatar_url"] }
            });
        },

        getCurrentModule: function(callback, error) {
            var currentModuleItemId = this.getCurrentModuleItemId();
            var currentTypeAndContentId = null;
            if (currentModuleItemId == null) {
                currentTypeAndContentId = this.getCurrentTypeAndContentId();
                if (currentTypeAndContentId == null) {
                    return;
                }
            }

            this.getModulesForCurrentCourse(function(modules) {
                for (var i = 0; i < modules.length; i++) {
                    var module = modules[i];
                    var items = module.items;
                    for (var j = 0; j < items.length; j++) {
                        var item = items[j];
                        if (item.id == currentModuleItemId || (currentTypeAndContentId != null && currentTypeAndContentId.contentId == item.content_id && currentTypeAndContentId.type == item.type)) {
                            item.isCurrent = true;
                            callback(module);
                            return;
                        }
                    }
                }

            }, error);
        },

        getRoles : function() {
            return this._env.current_user_roles;
        },

        getUser : function() {
            return this._env.current_user;
        },

        getUserProfile : function(callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/users/self/profile",
                "params":   { }
            });
        },

        getActivityStreamForUser: function(callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/users/self/activity_stream",
                "params":   { }
            });
        },

        currentPageIsAnnouncement: function() {
            return ($("#section-tabs").find("a.announcements.active").size() == 1);
        },

        currentPageIsModuleItem: function() {
            if (this.getCurrentModuleItemId() != null || this.getCurrentTypeAndContentId() != null) {
                return true;
            } else {
                return false;
            }
        },

        getUnreadMessageSize: function() {
          return parseInt(document.getElementsByClassName('unread-messages-count')[0].innerHTML);
        },

        getAccounts: function(callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/accounts",
                "params":   { }
            });

        },

        getUsersForAccount: function(account, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/accounts/" + account + "/users",
                "params":   { }
            });
        },

        getGroupCategoriesForAccount: function(account, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/accounts/" + account + "/group_categories",
                "params":   { }
            });

        },


        getGroupsForAccount: function(account, callback, error) {
            this._get({
                "callback": callback,
                "error":    error,
                "uri":      "/accounts/" + account + "/groups",
                "params":   { }
            });
        },


        createGroup: function(params, callback, error) {
            this._post({
                "callback": callback,
                "error":    error,
                "uri":      "/group_categories/" + params.category + "/groups",
                "params":   {
                    name: params.name,
                    description: params.description,
                    is_public: false,
                    join_level: 'invitation_only'
                }
            });
        },

        createGroupMembership: function(gid, uid, callback, error) {
            this._post({
                "callback": callback,
                "error":    error,
                "uri":      "/groups/" + gid + "/memberships",
                "params":   { user_id: uid }
            });

        },


        createUserLogin: function(params, callback, error) {
            this._post({
                "callback": callback,
                "error":    error,
                "uri":      "/accounts/" + params.account_id + "/logins",
                "params":   { user_id: params.user_id }
            });
        }
    };
}();

if (typeof module !== "undefined" && module !== null) {
    module.exports = this.mmooc.api;
}

this.mmooc=this.mmooc||{};


this.mmooc.badges = function() {

    function resizeIframe() {
        mmooc.util.adaptHeightToIframeContentForId('tool_content_wrapper', 'tool_content');
    };
    return {
        initPage: function() {
            resizeIframe();

            var resizeTimer;
            $(window).resize(function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(resizeIframe, 42);
            });

        },

        claimBadge: function(OpenBadges, urls, callBack) {
            OpenBadges.issue_no_modal(urls, callBack);
        }
    }
}();

this.mmooc=this.mmooc||{};


this.mmooc.courseList = function() {
    return {
        listCourses: function(parentId) {
            mmooc.api.getEnrolledCourses(function (courses) {
                if (document.getElementsByClassName('reaccept_terms').length === 0) {

                    var sortedCourses = mmooc.util.arraySorted(courses, "course_code"),
                        html = mmooc.util.renderTemplateWithData("courselist", {courses: sortedCourses});
                    document.getElementById(parentId).innerHTML = html;

                    var createCallBackForId = function(id) {
                        return function(modules) {
                            if (mmooc.courseList.isCourseCompleted(modules)) {
                                var $course = $("#course_" + id);
                                $course.find('.mmooc-course-list-button .btn').addClass('btn-done');
                                $course.find('.mmooc-progress-bar').addClass('mmooc-progress-bar-done');
                            }
                        };
                    };

                    var error = function(error) {
                        console.error("error calling api, skip over this course", error);
                    };

                    $(sortedCourses).each(function() {
                        var success =  createCallBackForId(this.id);
                        mmooc.api.getModulesForCourseId(success, error, this.id);
                    });
                }
            });
        },
        showAddCourseButton : function() {
            $(document).ajaxSuccess(function () {
                // Move canvas Start new course button, since we hide its original location
                var button = $('#start_new_course');
                if (button.size() > 0) {
                    $('#content').append(button);
                }
            });
        },
        isCourseCompleted: function(modules) {
            for (var i = 0; i < modules.length; i++) {
                var module = modules[i];
                for (var j = 0; j < module.items.length; j++) {
                    var item = module.items[j];
                    if (item.completion_requirement && !item.completion_requirement.completed) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
}();

this.mmooc=this.mmooc||{};


this.mmooc.coursePage = function() {

    return {

        listModulesAndShowProgressBar: function() {
            mmooc.api.getModulesForCurrentCourse(function(modules) {
                var progressHTML = mmooc.util.renderTemplateWithData("courseprogress", {modules: modules});
                document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', progressHTML);

                var modulesHTML = mmooc.util.renderTemplateWithData("modules", {modules: modules});
                document.getElementById('course_home_content').insertAdjacentHTML('beforebegin', modulesHTML);
            });
        }

    };
}();

this.mmooc=this.mmooc||{};


this.mmooc.enroll = function() {

    return {
        changeButtonText: function() {
            var enrollForm = $("#enroll_form");
            enrollForm.find(".btn").text("Gå til Mine kurs");
            enrollForm.find(".btn-primary").hide();
        }
    };
}();

mmooc = mmooc || {};

mmooc.greeting = function () {

    function redesignPage() {
        $('#wrapper').addClass('diploma-page');
    }

    function fixLinkToModules($content) {
        if ($content.find(".alert li > a").size() <= 0) {
            return;
        }

        redesignPage();
        mmooc.api.getModulesForCurrentCourse(function (modules) {
            var firstItemPerModule = {};
            for (var i in modules) {
                firstItemPerModule[modules[i].id] = modules[i].items[0];
            }

            $('.alert li > a').each(function () {
                var oldPath = $(this).attr('href');
                var moduleNumber = /courses\/\d+\/modules\/(\d+)/.exec(oldPath);
                if (moduleNumber.length > 0) {
                    $(this).attr('href', firstItemPerModule[moduleNumber[1]].html_url);
                }
            });

        });
    }

    return {
        enableGreetingButtonIfNecessary: function ($content) {
            // Erlends diploma
            var $diplomaButton = $content.find(".sikt-diploma-button");
            var $formIdDiv = $content.find(".sikt-diploma-formId");
            var $nameEntryIdDiv = $content.find(".sikt-diploma-nameEntryId");
            var $emailEntryIdDiv = $content.find(".sikt-diploma-emailEntryId");

            if ($diplomaButton.length && $formIdDiv.length && $nameEntryIdDiv.length && $emailEntryIdDiv.length) {
                $diplomaButton.button().click(function () {
                    if ($diplomaButton.hasClass('btn-done')) {
                        return;
                    }

                    $('#info').html(mmooc.util.renderTemplateWithData("waitIcon", {}));

                    var formId = $formIdDiv.text();
                    var nameEntryId = $nameEntryIdDiv.text();
                    var emailEntryId = $emailEntryIdDiv.text();
                    var str1 = "https://docs.google.com/forms/d/";
                    var str2 = "/formResponse";
                    var googleurl = str1.concat(formId, str2);

                    str1 = "entry.";
                    var nameEntry = str1.concat(nameEntryId);
                    var emailEntry = str1.concat(emailEntryId);

                    mmooc.api.getUserProfile(function (profile) {
                        var values = {};
                        values[nameEntry] = profile.name;
                        values[emailEntry] = profile.primary_email;

                        $.ajax({
                            url: googleurl,
                            data: values,
                            type: "POST",
                            dataType: "xml",
                            complete: function (jqXHR) {
                                switch (jqXHR.status) {
                                    case 0:
                                        str1 = "Diplom ble sendt til denne eposten:";
                                        var s = str1.concat(profile.primary_email);
                                        $('#info').html(s);
                                        $diplomaButton.addClass('btn-done');
                                        break;
                                    default:
                                        $('#info').addClass('error');
                                        $('#info').html("En feil oppstod. Ta kontakt med matematikkmooc@iktsenteret.no for &aring; f&aring; hjelp.");
                                }
                            }
                        }); //End Google callback
                    }); //End Canvas user profile callback
                }); //End diploma button clicked
                redesignPage();
            } //End if valid diploma fields

            fixLinkToModules($content);
        }
    }
}();

this.mmooc=this.mmooc||{};


this.mmooc.groups = function() {
    function interceptLinkToGroupPageForHref(href, event) {
        if (/\/groups\/\d+$/.test(href)) {
            event.preventDefault();
            location.href = href + '/discussion_topics';
        }
    }

    return {
        interceptLinksToGroupPage: function() {
            $("#content").on('click', '.student-group-title a', function(event) {
                var href= $(this).attr("href");
                interceptLinkToGroupPageForHref(href, event);
            });

            $("#right-side").on('click', '.group_list a', function(event) {
                var href= $(this).attr("href");
                interceptLinkToGroupPageForHref(href, event);
            });
        },

        showGroupHeader: function() {
            var courseId = mmooc.api.getCurrentCourseId();
            var groupId = mmooc.api.getCurrentGroupId();
            if (groupId != null) {
                mmooc.api.getGroupMembers(groupId, function(members) {
                    var headerHTML = mmooc.util.renderTemplateWithData("groupheader", {groupId: groupId, courseId: courseId, members: members});
                    document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', headerHTML);
                });
            }
        },

        changeGroupListURLs: function(href) {
          if (/\/groups(\/)?$/.test(href) || /(\/groups(\??([A-Za-z0-9\=\&]{0,})))$/.test(href)) {
            var list = $('.context_list li a');
            list.each(function(i) {
              this.setAttribute('href', this.getAttribute('href') + '/discussion_topics');
            });
            return true;
          }

          return false;
        }
    };
}();

this.mmooc=this.mmooc||{};


this.mmooc.menu = function() {

    function _renderCourseMenu(course, selectedMenuItem, title) {
        var menuItems = [];

        var courseId = course.id;

        menuItems[menuItems.length] = {"title": "Kursforside", url: "/courses/" + courseId};
        menuItems[menuItems.length] = {"title": "Kunngjøringer", url: "/courses/" + courseId + "/announcements"};
        menuItems[menuItems.length] = {"title": "Diskusjoner", url: "/courses/" + courseId + "/discussion_topics"};
        menuItems[menuItems.length] = mmooc.menu.extractBadgesLinkFromPage();

        var subtitle = course.name;
        if (title == null) {
            title = course.name;
            subtitle = "";
        }

        var html = mmooc.util.renderTemplateWithData("coursemenu", {course: course, menuItems: menuItems, selectedMenuItem: selectedMenuItem, title: title, subtitle: subtitle });
        document.getElementById('header').insertAdjacentHTML('afterend', html);
    }


    function createStyleSheet () {
        var style = document.createElement("style");

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        document.head.appendChild(style);

        return style.sheet;
    }

    var stylesheet = createStyleSheet();

    return {
        listModuleItems: function() {
            mmooc.api.getCurrentModule(function(module) {
                var courseId = mmooc.api.getCurrentCourseId();
                var html = mmooc.util.renderTemplateWithData("moduleitems", {module: module, courseId: courseId});
                document.getElementById('left-side').insertAdjacentHTML('afterbegin', html);
            });
        },
        showLeftMenu: function() {
            stylesheet.insertRule("body.with-left-side #main { margin-left: 305px !important }", stylesheet.cssRules.length);
            stylesheet.insertRule(".with-left-side #left-side { display: block !important }", stylesheet.cssRules.length);
        },

        showTeacherAdminMenu: function() {
            if (mmooc.util.isTeacherOrAdmin()) {
                this.showLeftMenu();

                $("#section-tabs-header").show();
                $("nav[aria-label='context']").show();
                $("#edit_discussions_settings").show();
                $("#availability_options").show();
                $("#group_category_options").show();
                $("#editor_tabs").show();

                // Done via CSS since content is loaded using AJAX
                stylesheet.insertRule("body.pages .header-bar-outer-container { display: block }", stylesheet.cssRules.length);
                stylesheet.insertRule("#discussion-managebar { display: block }", stylesheet.cssRules.length);
            }

            var roles = mmooc.api.getRoles();
            if (roles != null && roles.indexOf('admin') != -1) {
                // Admin needs original canvas Course dropdown to access site admin settings
                $("#courses_menu_item").show();

                // Admin needs more profile settings
                $(".add_access_token_link").show();
                $("body.profile_settings").find("#content > table, #content > h2, #content > p").show();
            } else {
                document.getElementById('menu').insertAdjacentHTML('afterbegin', '<li class="menu-item"><a href="/" class="menu-item-no-drop">Kurs</a></li>');
            }
        },

        hideRightMenu: function() {
            $("#right-side").hide();
            $("body").removeClass('with-right-side');
        },

        showUserMenu: function() {
            var menu = document.getElementById('menu');
            if (menu !=  null) {
                var html = mmooc.util.renderTemplateWithData("usermenu", {user: mmooc.api.getUser()});
                menu.insertAdjacentHTML('afterend', html);

                var msgBadge = $("#mmooc-unread-messages-count");
                if (mmooc.api.getUnreadMessageSize() === 0) {
                  msgBadge.hide();
                }
                else {
                  msgBadge.html(mmooc.api.getUnreadMessageSize());
                  msgBadge.show();
                }

                mmooc.api.getActivityStreamForUser(function(activities) {
                    var unreadNotifications = 0;
                    for (var i = 0; i < activities.length; i++) {
                        if (mmooc.menu.checkReadStateFor(activities[i])) {
                            unreadNotifications++;
                        }
                    }

                    var badge = $("#mmooc-notification-count");
                    if (unreadNotifications == 0) {
                        badge.hide();
                    } else {
                        badge.html(unreadNotifications);
                        badge.show();
                    }

                    document.getElementById('mmooc-activity-stream').innerHTML = mmooc.util.renderTemplateWithData("activitystream", {activities: activities});

                    var notifications = $("#mmooc-notifications").find("li");
                    if (notifications.size() == 0) {
                        $("#mmooc-notifications").hide();
                    } else {
                        $("#mmooc-notifications").show();
                    }

                    var showAllItems = $("#mmooc-notifications-showall");
                    if (notifications.size() > 10) {
                        notifications.slice(10).addClass("hidden");

                        showAllItems.click(function() {
                            notifications.removeClass("hidden");
                            showAllItems.hide();
                        });
                    } else {
                        showAllItems.hide();
                    }

                });
            }
        },

        showCourseMenu: function(courseId, selectedMenuItem, title) {
            $("body").addClass("with-course-menu");
            mmooc.api.getCourse(courseId, function(course) {
                _renderCourseMenu(course, selectedMenuItem, title);
            });
        },

        showBackButton: function(url, title) {
            var buttonHTML = mmooc.util.renderTemplateWithData("backbutton", {url: url, title: title});
            document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', buttonHTML);
        },

        showGroupHeader: function() {
            var groupId = mmooc.api.getCurrentGroupId();
            var groupHeaderHTML = mmooc.util.renderTemplateWithData("backbutton", {groupId: groupId});
            document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', groupHeaderHTML);
        },

        showDiscussionGroupMenu: function() {
            var groupId = mmooc.api.getCurrentGroupId();
            if (groupId != null) {
                mmooc.api.getGroup(groupId, function(group) {
                    // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
                    var title = mmooc.util.getPageTitleAfterColon();
                    mmooc.menu.showCourseMenu(group.course_id, "Grupper", title);

                    var headerHTML = mmooc.util.renderTemplateWithData("groupdiscussionheader", { group: group});
                    document.getElementById('content-wrapper').insertAdjacentHTML('afterbegin', headerHTML);
                });
            }
        },

        checkReadStateFor: function (activity) {
            return activity.read_state === false;
        },

        extractBadgesLinkFromPage: function () {
            var href = $('li.section:contains("BadgeSafe")').find('a').attr('href');
            return {"title": mmooc.i18n.Badgesafe, url: href};
        },

        injectGroupsPage: function() {
          $('#courses_menu_item').after('<li class="menu-item"><a href="/groups" class="menu-item-no-drop">Grupper</a></li>');
        }
    };
}();

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

        changeTranslations : function() {
            $("a.submit_assignment_link").text('Lever besvarelse');
        },

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
        }
    };
}();

this.mmooc=this.mmooc||{};

this.mmooc.powerFunctions = function() {
  var rootId = undefined;
  var accountID = undefined;

  function _render(template, heading, data) {
    var html =
          mmooc.util.renderTemplateWithData('powerfunctions/head', {heading: heading}) +
          mmooc.util.renderTemplateWithData(template, data) +
          mmooc.util.renderTemplateWithData('powerfunctions/tail', {});
      document.getElementById(rootId).innerHTML = html;
    }

  function _readFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function(event){
      callback(event.target.result);
    };
    reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
    reader.readAsText(file);
  }

  function _success(row) {
    return function () {
      $("td.status", row).removeClass("waiting").addClass("ok").text("OK");
    };
  }

  function _error(row) {
    return function (jqXHR, textStatus, errorThrown ) {
      $("td.status", row).removeClass("waiting").addClass("failed").
        text("Failed: " + errorThrown + ": " + JSON.parse(jqXHR.responseText).errors[0].message);
    };
  }

  function _setUpSubmitHandler(callback) {
    $('input[type="submit"]').click(function() {
      var file = $('input:file')[0].files.item(0);
      _readFile(file, function(content) {
        callback(content);
      });
      return false;
    });
  }

  function _renderGroupView() {
    mmooc.api.getGroupCategoriesForAccount(accountID, function(categories) {
      _render("powerfunctions/group-category",
              "Create groups",
              {categories: categories});
      _setUpSubmitHandler(_processGroupFile);
    });
  }

  function _processGroupFile(content) {
    var groups = $.csv.toObjects(content);
    var params = {
      account: accountID,
      category: document.getElementsByName("category")[0].value
    };
    _render("powerfunctions/groups-process",
            "Processing group creations",
            {groups: groups});
    for (var i = 0; i < groups.length; i++) {
      var row = $("#mmpf-group-"+i);
      params.name = groups[i].name;
      params.description = groups[i].description;
      mmooc.api.createGroup(params, _success(row), _error(row));
    }
  }

  function _renderListGroupsView() {
    mmooc.api.getGroupsForAccount(accountID, function(groups) {
      _render("powerfunctions/list-groups",
              "List groups",
              {groups: groups});
    });
  }


  function CreateNewLoginsTask() {

    function _renderView() {
        _render("powerfunctions/logins",
                "Add new logins to students",
                {});
    }

    function _processFile(content) {
      var logins = $.csv.toObjects(content);
      _render("powerfunctions/logins-process",
              "Processing new logins",
              {logins: logins});
      for (var i = 0; i < logins.length; i++) {
        _processItem(i, logins[i]);
      }
    }

    function _processItem(i, login) {
      var uid = "sis_user_id:" + encodeURIComponent(login.current_id);
      var lid = login.new_id;
      var row = $("#mmpf-logins-"+i);
      var params = {
        user_id: uid,
        login_id: lid,
        account_id: accountID
      };
      mmooc.api.createUserLogin(params, _success(row), _error(row));
    }

    return {
      run: function() {
        _renderView();
        _setUpSubmitHandler(_processFile);
      }
    };
  }


  function AssignStudentsToGroupsTask() {

    function _renderView() {
      _render("powerfunctions/assign",
              "Assign students to groups",
              {});
    }

    function _processFile(content) {
      var assigns = $.csv.toObjects(content);
      _render("powerfunctions/assign-process",
              "Processing assigning student to groups",
              {assigns: assigns});
      for (var i = 0; i < assigns.length; i++) {
        _processItem(i, assigns[i]);
      }
    }

    function _processItem(i, assignment) {
      var gid = assignment.group_id;
      // According to the API documentation the SIS params should be
      // encoded, but this fails. Was:
      // encodeURIComponent(assignment.user_id);
      var uid = "sis_user_id:" + assignment.user_id;
      var row = $("#mmpf-assign-"+i);
      mmooc.api.createGroupMembership(gid, uid, _success(row), _error(row));
    }

    return {
      run: function() {
        _renderView();
        _setUpSubmitHandler(_processFile);
      }
    };
  }

  function AccountPicker() {
    function _setAccountID() {
      accountID = $('select[name="account"] option:selected').val();
    }

    return {
      run: function(params) {
        mmooc.api.getAccounts(function(accounts) {
          _render("powerfunctions/account-picker",
                  "Choose account",
                  {accounts: accounts});
          $('select[name="account"]').change(function() {
            _setAccountID();
            params.nextStep();
          });
        });

      }
    };
  }

  function Menu() {
    function _setUpClickHandlers() {
      $("#mmooc-pf-list-group-btn").click(function() {
        _renderListGroupsView(rootId);
      });
      $("#mmooc-pf-group-btn").click(function() {
        _renderGroupView(rootId);
      });
      $("#mmooc-pf-assign-btn").click(function() {
        new AssignStudentsToGroupsTask().run();
      });
      $("#mmooc-pf-logins-btn").click(function() {
        new CreateNewLoginsTask().run();
      });
    }

    return {
      run: function() {
        _render("powerfunctions/main", {});
        _setUpClickHandlers();
      }
    };
  }

  return {
    show: function(parentId) {
      rootId = parentId;
      new AccountPicker().run({nextStep: function () {
        new Menu().run();
      }});
    }
  };
}();

this.mmooc=this.mmooc||{};


this.mmooc.routes = function() {
    function Route(paths, queryStrings, handler) {
        if (paths != null) {
            this.paths = paths instanceof Array ? paths : [paths];
        } else {
            this.paths = null;
        }

        if (queryStrings != null) {
            this.queryStrings = queryStrings instanceof Array ? queryStrings : [queryStrings];
        } else {
            this.queryStrings = null;
        }

        this.handler = handler;
        this.isAlreadyHandled = false;
    }

    var routes = [];

    return {
        addRouteForPath: function(path, handler) {
            routes.push(new Route(path, null, handler));
        },
        addRouteForQueryString: function(queryString, handler) {
            routes.push(new Route(null, queryString, handler));
        },

        addRouteForPathOrQueryString: function(path, queryString, handler) {
            routes.push(new Route(path, queryString, handler));
        },

        performHandlerForUrl: function(location) {
            var path = location.pathname;
            var queryString = location.search;

            for (var i = 0; i < routes.length; i++) {
                var route = routes[i];
                if (route.paths != null) {
                    for (var j = 0; j < route.paths.length; j++) {
                        if (route.paths[j].test(path) && !route.isAlreadyHandled) {
                            route.isAlreadyHandled = true;
                            route.handler();
                        }
                    }
                }

                if (route.queryStrings != null) {
                    for (var k = 0; k < route.queryStrings.length; k++) {
                        if (route.queryStrings[k].test(queryString) && !route.isAlreadyHandled) {
                            route.isAlreadyHandled = true;
                            route.handler();
                            return;
                        }
                    }
                }
            }
        }
    };
}();

if (typeof module !== "undefined" && module !== null) {
    module.exports = this.mmooc.routes;
}

Handlebars.registerHelper('lowercase', function(str) {
    return ("" + str).toLowerCase();
});

Handlebars.registerHelper('uppercase', function(str) {
    return ("" + str).toUpperCase();
});

Handlebars.registerHelper('percentage', function(number1, number2) {
    if (number2 == 0) {
        return 0;
    }
    return Math.round(number1*100/number2);
});

Handlebars.registerHelper('ifEquals', function(var1, var2, options) {
    if (var1 == var2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper('ifGreaterThan', function(value1, value2, options) {
    if (value1 > value2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});


Handlebars.registerHelper('urlForCourseId', function(courseId) {
    return "/courses/" + courseId;
});

Handlebars.registerHelper('urlForGroupId', function(groupId) {
    return "/groups/" + groupId + "/discussion_topics";
});



Handlebars.registerHelper('ifItemIsCompleted', function(completion_requirement, options) {

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

    return Math.round((completed*100)/total);
});

Handlebars.registerHelper('urlForFirstNoneCompleteItem', function(items) {
    if (items != null && items != undefined && items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.completion_requirement && !item.completion_requirement.completed) {
                return item.html_url;
            }
        }

        return items[0].html_url;
    }

    return null;
});

Handlebars.registerHelper('findRightUrlFor', function(activity) {
    return activity.type === 'Submission' ? '/courses/' + activity.course_id + '/grades' : activity.html_url;
});

Handlebars.registerHelper('checkReadStateFor', function(activity) {
    return mmooc.menu.checkReadStateFor(activity) ? "unread" : "";
});
this.mmooc = this.mmooc || {};


this.mmooc.util = function () {
    return {
        renderTemplateWithData: function (template, data) {
            var html = "";
            try {
                html = mmooc.templates[template](data);
            } catch (e) {
                console.log(e);
            }

            return html;

        },

        getPageTitleBeforeColon: function () {
            // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
            var title = document.title;
            if (title.indexOf(":")) {
                title = title.substring(0, title.indexOf(":"));
            }
            return title;
        },

        getPageTitleAfterColon: function () {
            // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
            var title = document.title;
            if (title.indexOf(":")) {
                title = title.substring(title.indexOf(":") + 1, title.length);
            }
            return title;
        },

        arraySorted: function (array, elementToSort) {
            if (Object.prototype.toString.call(array) === '[object Array]' && elementToSort) {
                return array.sort(function (a, b) {
                    if (a.hasOwnProperty(elementToSort) && b.hasOwnProperty(elementToSort)) {
                        var field1 = a[elementToSort].toLocaleLowerCase();
                        var field2 = b[elementToSort].toLocaleLowerCase();
                        return field1.localeCompare(field2, 'nb', {usage: 'sort'});
                    }
                    return 0;
                });
            }
            return array;
        },

        goBack: function (e) {//http://stackoverflow.com/questions/9756159/using-javascript-how-to-create-a-go-back-link-that-takes-the-user-to-a-link-i
            var defaultLocation = "https://server";
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
                (typeof(document.referrer) !== "string" || document.referrer === "")
            ) {
                window.setTimeout(function () {
                    // redirect to default location
                    window.location.href = defaultLocation;
                }, 1000); // set timeout in ms
            }
            if (e) {
                if (e.preventDefault)
                    e.preventDefault();
                if (e.preventPropagation)
                    e.preventPropagation();
            }
            return false; // stop event propagation and browser default event
        },

        adaptHeightToIframeContentForId: function (containerId, frameId) {

            var scrollHeight = Number(document.getElementById(frameId).contentWindow.document.body.scrollHeight) + 20;
            document.getElementsByClassName(containerId)[0].style.height = scrollHeight + "px";
        },

        isTeacherOrAdmin: function() {
            var roles = mmooc.api.getRoles();
            return roles != null
                && (roles.indexOf('teacher') != -1
                    || roles.indexOf('admin') != -1);
        }

    };
}();


this.mmooc=this.mmooc||{};


this.mmooc.i18n = {
    'Assignment' : 'Oppgave',
    'Discussion' : 'Diskusjon',
    'Quiz' : 'Prøve',
    'Page' : 'Innholdsside',
    'ExternalUrl' : 'Ekstern lenke',
    'ExternalTool' : 'Eksternt verktøy',
    'File' : 'Fil',
    'Announcement' : 'Kunngjøring',
    'DiscussionTopic': 'Diskusjon',
    'Conversation': 'Innboksmelding',
    'Message': 'Oppgavevarsel',
    'Submission': 'Innlevering',
    'AssessmentRequest': 'Vurderingsforespørsel',
    'Conference': 'Conference',
    'Collaboration': 'Collaboration',
    'LinkBack': 'Tilbake til forrige side',
    'Badgesafe': 'Utmerkelser'
};

$(document).ready(function() {
    mmooc.routes.addRouteForPath(/\/$/, function() {
        mmooc.menu.hideRightMenu();
        var parentId = 'content'
        if (document.location.search === "?mmpf") {
            mmooc.powerFunctions.show(parentId);
        } else {
            mmooc.courseList.listCourses(parentId);
            mmooc.courseList.showAddCourseButton();
        }
    });

    mmooc.routes.addRouteForQueryString(/invitation=/, function() {
    });

    mmooc.routes.addRouteForPath(/\/login$/, function() {
        $('#register_link').html("<i>Trenger du en konto?</i><b>Klikk her.</b>");
    });

    mmooc.routes.addRouteForPath(/\/courses$/, function() {
        mmooc.menu.hideRightMenu();
        mmooc.courseList.listCourses('content');
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+$/, function() {
        mmooc.coursePage.listModulesAndShowProgressBar();
        mmooc.groups.interceptLinksToGroupPage();

        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Kursforside', null);
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/announcements$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Kunngjøringer', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/discussion_topics$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Diskusjoner', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/groups$/, function() {
        mmooc.groups.interceptLinksToGroupPage();
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/users$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, '', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper', mmooc.util.getPageTitleBeforeColon());
    });

    mmooc.routes.addRouteForPath(/\/groups\/\d+\/discussion_topics$/, function() {
        var courseId = mmooc.api.getCurrentCourseId();
        mmooc.menu.showCourseMenu(courseId, 'Grupper', mmooc.util.getPageTitleAfterColon());
        mmooc.groups.showGroupHeader();
    });

    mmooc.routes.addRouteForPath([/\/groups\/\d+\/discussion_topics\/\d+$/, /\/groups\/\d+\/discussion_topics\/new$/], function() {
        mmooc.menu.showDiscussionGroupMenu();
    });

    mmooc.routes.addRouteForPath([/\/courses\/\d+\/discussion_topics\/\d+/, /\/courses\/\d+\/discussion_topics\/new/], function() {
        // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
        var title = mmooc.util.getPageTitleAfterColon();

        if (!mmooc.util.isTeacherOrAdmin()) {
            mmooc.menu.hideRightMenu();
        }

        // Announcements are some as type of discussions, must use a hack to determine if this is an announcement
        var courseId = mmooc.api.getCurrentCourseId();
        if (mmooc.api.currentPageIsAnnouncement()) {
            mmooc.menu.showCourseMenu(courseId, 'Kunngjøringer', title);
            mmooc.menu.showBackButton("/courses/" + courseId + "/announcements", "Tilbake til kunngjøringer");
        } else if (mmooc.api.getCurrentModuleItemId() == null) {
            // Only show course menu if this discussion is not a module item
            // Note detection if this is a module item is based on precense of query parameter
            mmooc.menu.showCourseMenu(courseId, 'Diskusjoner', title);
            mmooc.menu.showBackButton("/courses/" + courseId + "/discussion_topics", "Tilbake til diskusjoner");
        }
    });

    mmooc.routes.addRouteForPathOrQueryString([/\/courses\/\d+\/assignments\/\d+/, /\/courses\/\d+\/quizzes\/\d+/], /module_item_id=/, function() {
        mmooc.menu.showLeftMenu();
        mmooc.menu.listModuleItems();
        mmooc.pages.modifyMarkAsDoneButton();
        mmooc.pages.changeTranslations();
    });

    mmooc.routes.addRouteForPath(/\/courses\/\d+\/external_tools\/\d+$/, function() {
        function isBadgesafePage() {
            function extractPluginNumber(input) {
                 return input.substring(input.lastIndexOf('/') + 1);
            }

            var badgesafeUrl = mmooc.menu.extractBadgesLinkFromPage().url;

            return extractPluginNumber(badgesafeUrl) === extractPluginNumber(window.location.pathname);
        };

        if (isBadgesafePage()) {
            var courseId = mmooc.api.getCurrentCourseId();
            mmooc.menu.showCourseMenu(courseId, 'Utmerkelser', 'Utmerkelser');
        }
    });

    mmooc.routes.addRouteForPath([/\/pages/], function() {
        mmooc.pages.showBackLinkIfNecessary();
    });



    mmooc.routes.addRouteForQueryString(/enrolled=1/, function() {
        mmooc.enroll.changeButtonText();
    });

    try {
        mmooc.menu.showTeacherAdminMenu();
        mmooc.menu.showUserMenu();
    } catch (e) {
        console.log(e);
    }

    try {
        mmooc.routes.performHandlerForUrl(document.location);
    } catch (e) {
        console.log(e);
    }

    try {
      mmooc.menu.injectGroupsPage();
    }
    catch(e) {
      console.log(e);
    }

    mmooc.groups.changeGroupListURLs(document.location.href);

    mmooc.pages.showBackToAssignmentLink(document.location.href);


});


RegExp.escape=function(s){return s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');};(function($){'use strict'
$.csv={defaults:{separator:',',delimiter:'"',headers:true},hooks:{castToScalar:function(value,state){var hasDot=/\./;if(isNaN(value)){return value;}else{if(hasDot.test(value)){return parseFloat(value);}else{var integer=parseInt(value);if(isNaN(integer)){return null;}else{return integer;}}}}},parsers:{parse:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var data=[];var entry=[];var state=0;var value=''
var exit=false;function endOfEntry(){state=0;value='';if(options.start&&options.state.rowNum<options.start){entry=[];options.state.rowNum++;options.state.colNum=1;return;}
if(options.onParseEntry===undefined){data.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){data.push(hookVal);}}
entry=[];if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;options.state.colNum=1;}
function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'){endOfValue();endOfEntry();break;}
if(/^\r$/.test(m0)){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});if(entry.length!==0){endOfValue();endOfEntry();}
return data;},splitLines:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
var entries=[];var state=0;var entry='';var exit=false;function endOfLine(){state=0;if(options.start&&options.state.rowNum<options.start){entry='';options.state.rowNum++;return;}
if(options.onParseEntry===undefined){entries.push(entry);}else{var hookVal=options.onParseEntry(entry,options.state);if(hookVal!==false){entries.push(hookVal);}}
entry='';if(options.end&&options.state.rowNum>=options.end){exit=true;}
options.state.rowNum++;}
var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);match=RegExp(matchSrc,'gm');csv.replace(match,function(m0){if(exit){return;}
switch(state){case 0:if(m0===separator){entry+=m0;state=0;break;}
if(m0===delimiter){entry+=m0;state=1;break;}
if(m0==='\n'){endOfLine();break;}
if(/^\r$/.test(m0)){break;}
entry+=m0;state=3;break;case 1:if(m0===delimiter){entry+=m0;state=2;break;}
entry+=m0;state=1;break;case 2:var prevChar=entry.substr(entry.length-1);if(m0===delimiter&&prevChar===delimiter){entry+=m0;state=1;break;}
if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');case 3:if(m0===separator){entry+=m0;state=0;break;}
if(m0==='\n'){endOfLine();break;}
if(m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal quote [Row:'+options.state.rowNum+']');}
throw new Error('CSVDataError: Illegal state [Row:'+options.state.rowNum+']');default:throw new Error('CSVDataError: Unknown state [Row:'+options.state.rowNum+']');}});if(entry!==''){endOfLine();}
return entries;},parseEntry:function(csv,options){var separator=options.separator;var delimiter=options.delimiter;if(!options.state.rowNum){options.state.rowNum=1;}
if(!options.state.colNum){options.state.colNum=1;}
var entry=[];var state=0;var value='';function endOfValue(){if(options.onParseValue===undefined){entry.push(value);}else{var hook=options.onParseValue(value,options.state);if(hook!==false){entry.push(hook);}}
value='';state=0;options.state.colNum++;}
if(!options.match){var escSeparator=RegExp.escape(separator);var escDelimiter=RegExp.escape(delimiter);var match=/(D|S|\n|\r|[^DS\r\n]+)/;var matchSrc=match.source;matchSrc=matchSrc.replace(/S/g,escSeparator);matchSrc=matchSrc.replace(/D/g,escDelimiter);options.match=RegExp(matchSrc,'gm');}
csv.replace(options.match,function(m0){switch(state){case 0:if(m0===separator){value+='';endOfValue();break;}
if(m0===delimiter){state=1;break;}
if(m0==='\n'||m0==='\r'){break;}
value+=m0;state=3;break;case 1:if(m0===delimiter){state=2;break;}
value+=m0;state=1;break;case 2:if(m0===delimiter){value+=m0;state=1;break;}
if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
throw new Error('CSVDataError: Illegal State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');case 3:if(m0===separator){endOfValue();break;}
if(m0==='\n'||m0==='\r'){break;}
if(m0===delimiter){throw new Error('CSVDataError: Illegal Quote [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}
throw new Error('CSVDataError: Illegal Data [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');default:throw new Error('CSVDataError: Unknown State [Row:'+options.state.rowNum+'][Col:'+options.state.colNum+']');}});endOfValue();return entry;}},toArray:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var state=(options.state!==undefined?options.state:{});var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,state:state}
var entry=$.csv.parsers.parseEntry(csv,options);if(!config.callback){return entry;}else{config.callback('',entry);}},toArrays:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1}};data=$.csv.parsers.parse(csv,options);if(!config.callback){return data;}else{config.callback('',data);}},toObjects:function(csv,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.headers='headers'in options?options.headers:$.csv.defaults.headers;options.start='start'in options?options.start:1;if(config.headers){options.start++;}
if(options.end&&config.headers){options.end++;}
var lines=[];var data=[];var options={delimiter:config.delimiter,separator:config.separator,onParseEntry:options.onParseEntry,onParseValue:options.onParseValue,start:options.start,end:options.end,state:{rowNum:1,colNum:1},match:false};var headerOptions={delimiter:config.delimiter,separator:config.separator,start:1,end:1,state:{rowNum:1,colNum:1}}
var headerLine=$.csv.parsers.splitLines(csv,headerOptions);var headers=$.csv.toArray(headerLine[0],options);var lines=$.csv.parsers.splitLines(csv,options);options.state.colNum=1;if(headers){options.state.rowNum=2;}else{options.state.rowNum=1;}
for(var i=0,len=lines.length;i<len;i++){var entry=$.csv.toArray(lines[i],options);var object={};for(var j in headers){object[headers[j]]=entry[j];}
data.push(object);options.state.rowNum++;}
if(!config.callback){return data;}else{config.callback('',data);}},fromArrays:function(arrays,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.escaper='escaper'in options?options.escaper:$.csv.defaults.escaper;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in arrays){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}},fromObjects2CSV:function(objects,options,callback){var options=(options!==undefined?options:{});var config={};config.callback=((callback!==undefined&&typeof(callback)==='function')?callback:false);config.separator='separator'in options?options.separator:$.csv.defaults.separator;config.delimiter='delimiter'in options?options.delimiter:$.csv.defaults.delimiter;config.experimental='experimental'in options?options.experimental:false;if(!config.experimental){throw new Error('not implemented');}
var output=[];for(i in objects){output.push(arrays[i]);}
if(!config.callback){return output;}else{config.callback('',output);}}};$.csvEntry2Array=$.csv.toArray;$.csv2Array=$.csv.toArrays;$.csv2Dictionary=$.csv.toObjects;})(jQuery);
// ==========================================================================================
// This code was copied and adapted on January 27th 2015 from:
// https://s3.amazonaws.com/SSL_Assets/bham/uob/uob7.js 
// The functionality in the file is documented here:
// https://birmingham.instructure.com/courses/3915/pages/faq-jquery-in-canvas
// ==========================================================================================
// UOB7.JS
//
// Generic top-level script for University of Birmingham's Canvas implementation. This
// script, which requires jQuery and the jQuery.UI, carries out the following tasks:
//
// 		Adds FindIt@Bham link to Help Corner
// 		Hides "Report a Problem" Zendesk option from all but sub-account admins
// 		Enables accordions
// 		Enables tabs
// 		Enables reveal buttons
// 		Enables regexp reveals
//		Enables boxes
//		Hides forgot-password link on login page
//		Adds Google viewer previews to compatible file links
//		Add strap line for Canvas Gallery
//
// Most code is implemented within a $(document).load() to ensure that jQuery and the
// jQuery UI are both available, especially in Internet Explorer.
// 
//
// ==========================================================================================


$(document).load(

	$(function() {
		// -----------------------------------------------------------------------------------
		// Declare veriables that are used for multiple tasks.
		// -----------------------------------------------------------------------------------
		var i;
		var strSetNum = 0;

		// -----------------------------------------------------------------------------------
		// Add UoB enhancements to rich content displayed in courses.
		// -----------------------------------------------------------------------------------
		onPage(/\/(courses|groups)\/\d+/, function() {
			uobAddComponents();
		});
	})
)


// --------------------------------------------------------------------------------
// uobAddComponents
//
// This function will enable the following UoB components:
// 		accordions
// 		tabs
// 		reveal buttons
// 		regexp reveals
//		boxes (header, box, tip, info, warning, question)
//		previews
// --------------------------------------------------------------------------------

function uobAddComponents() {
	onElementRendered("#content .user_content.enhanced,#content .show-content.enhanced", function($content) {


		// ================================================================================
		// Show non-uob-component tables
		//
		// Show standard tables that are not UoB controls i.e. tables that do not include
		// the string "[uob-" in the first cell.
		// --------------------------------------------------------------------------------

		var $tables = $content.find("table:hidden").not("td:first(:contains('[uob-'))");
		$tables.show();


		// ================================================================================
		// Accordian (Part 1/2)
		//
		// Convert up to 10 uob-accordion tables to format required for accordions.
		// --------------------------------------------------------------------------------

		for (i = 0; i < 10; i++) {
			// Locate the next uob-accordion table.
			$table = $content.find("table").has("table > tbody > tr > td:contains([uob-accordion])").last();

			// Break loop if no more accordions are to be displayed.
			if ($table.length != 1) break;

			// Convert table into HTML for an accordian.
			$table.before("<div class='uob-accordion'></div>");

			$table.find("tbody:first > tr:gt(0) > td").each(function(_idx, _item) {
				if ((_idx + 1) % 2) {
					// Add heading 4 for accordion bar.
					$table.prev().append("<h4></h4>");
					$table.prev().children().last().append($(_item).text().trim());
				}

				if (_idx % 2) {
					// Add div for accordion content.
					$table.prev().append("<div></div>");
					$table.prev().children().last().append($(_item).contents());
				}
			});

			// Remove original table from the DOM
			$table.remove();
		}


		// ================================================================================
		// Tabs (Part 1/2)
		//
		// Convert up to 10 uob-tabs tables to format required for tabs.
		// --------------------------------------------------------------------------------

		strSetNum = 0;

		for (i = 0; i < 10; i++) {
			// Locate the next uob-tabs table.
			$table = $content.find("table").has("table > tbody > tr > td:contains([uob-tabs])").last();

			// Break loop if no more tabs are to be displayed.
			if ($table.length != 1) break;

			// Convert table into a set of tabs.
			$table.before("<div class='uob-tabs'><ul></ul></div>");
			strSetNum++;

			$table.find("tbody:first > tr:gt(0) > td").each(function(_idx, _item) {
				var strAnchor = "set" + strSetNum + "tab" + ((_idx - (_idx % 2)) / 2);

				if ((_idx + 1) % 2) {
					// Add list item for the tab label.
					var strHTML = "<li><a href=\"#" + strAnchor + "\">" + $(_item).text().trim() + "</a></li>";
					$table.prev().find("ul").first().append(strHTML);
				}

				if (_idx % 2) {
					// Add div for the tab content.
					$table.prev().append("<div id=\"" + strAnchor + "\"></div>");
					$("#" + strAnchor).append($(_item).contents());
				}
			});

			// Remove original table from the DOM
			$table.remove();
		}


		// ================================================================================
		// Reveal (Part 1/2)
		//
		// Convert up to 10 uob-reveal tables to format required for reveals.
		// ................................................................................

		strSetNum = 0;

		for (i = 0; i < 10; i++) {
			// Locate the next uob-reveal table
			var $table = $content.find("table").has("table > tbody > tr > td:contains([uob-reveal])").last();

			// Break loop if no more reveal tables are to be converted.
			if ($table.length != 1) break;

			// Convert table into a reveal
			strSetNum++;

			$table.find("tbody:first > tr:gt(0) > td").each(function(_idx, _item) {
				var strAnchor = "set" + strSetNum + "reveal" + ((_idx - (_idx % 2)) / 2);

				if ((_idx + 1) % 2) {
					// Add new reveal button immediately before table
					$table.before("<p><a href=\"#" + strAnchor + "\" class=\"uob-reveal-button\"></a></p>");
					$table.prev().children().append($(_item).text().trim());
				}

				if (_idx % 2) {
					// Add new reveal content immediately before table
					$table.before("<div id=\"" + strAnchor + "\" class=\"uob-reveal-content\"></div>");
					$table.prev().append($(_item).contents());
				}
			});

			// Remove original table
			$table.remove();
		}


		// ================================================================================
		// RegExp (Part 1/1)
		//
		// Convert up to 10 uob-regexp tables to format required for regexps.
		// --------------------------------------------------------------------------------

		strSetNum = 0;

		for (i = 0; i < 10; i++) {
			// Locate the next uob-regexp table
			var $table = $content.find("table").has("table > tbody > tr > td:contains([uob-regexp])").last();

			// Break loop if no more regexp tables are to be converted.
			if ($table.length != 1) break;

			// Convert table into a regexps
			strSetNum++;

			// Generate HTML for input and button/anchor controls, and add to the DOM.
			var strAnchor = "RE" + strSetNum;

			var strHTML = "<p><input id=\"input" + strAnchor + "\" class=\"uob-regexp-input\" type=\"text\" size=\"40\" />&nbsp;<a href=\"#" + strAnchor + "\" id=\"button" + strAnchor + "\" class=\"uob-regexp-button\">Check Answer</a></p>";
			strHTML += "<div id='content" + strAnchor + "'></div>";
			$table.before(strHTML);

			// Store regular expressions in button and create DIVs to store the contents.
			$table.find("tbody:first > tr:gt(0) > td").each(function(_idx, _item) {
				var strValue = $(_item).html();
				var strIndex = ((_idx - (_idx % 2)) / 2);

				if ((_idx + 1) % 2) {		// set RegExp
					strValue = $(_item).text().trim();
					$("#button" + strAnchor).attr("regexp" + strIndex, strValue);
				}

				if (_idx % 2) {			// set Content
					//$("#data" + strAnchor).attr("content" + strIndex, strValue);
					strHTML = "<div id=\"data" + strAnchor + "ID" + strIndex + "\" class=\"uob-regexp-content\"></div>";
					$("#content" + strAnchor).append(strHTML);
					$("#data" + strAnchor + "ID" + strIndex).append($(_item).contents());
				}
			});

			// Store IDs of input and button to button and input respectively.
			$("#button" + strAnchor).attr("regexpInput", "input" + strAnchor);
			$("#input" + strAnchor).attr("regexpButton", "button" + strAnchor);

			// Store default selection in button.
			$("#button" + strAnchor).attr("regexpData", "data" + strAnchor + "ID0");
			$("#button" + strAnchor).attr("regexpDataRoot", "data" + strAnchor + "ID");

			// Remove original table
			$table.remove();
		}


		// ================================================================================
		// Accordian (Part 2/2)
		//
		// Accordions will be contained within elements with a uob-accordion class and
		// headings will be restricted to h4 tags.
		// --------------------------------------------------------------------------------

		// Initialise accordions
		var $accordion = $content.find(".uob-accordion");

		if ($accordion.length) {
			$accordion.accordion({
				icons: null,
				heightStyle: "content",
				header: "> h4",
				collapsible: true,
				active: false,
				beforeActivate: function( event, ui ) {
					ui.oldPanel.find(".hide_youtube_embed_link").click();
				}
			});
		}


		// ================================================================================
		// Tabs (Part 2/2)
		//
		// Tabs will be contained within elements with a uob-tabs class.
		// --------------------------------------------------------------------------------

		// Initialise tabs
		var $tabs = $content.find(".uob-tabs");

		if ($tabs.length > 0) {
			$tabs.tabs({
				active: 0,
				collapsible: false,
				heightStyle: "content",
				beforeActivate: function( event, ui ) {
					ui.oldPanel.find(".hide_youtube_embed_link").click();
				}
			});
		}


		// ================================================================================
		// Reveal (Part 2/2)
		//
		// The uob-reveal-button and uob-reveal-content classes are required for reveals.
		// ................................................................................

		// Initialise reveal contents.
		var $revealBody = $content.find(".uob-reveal");

		if ($revealBody.length) {
			for (i = 0; i < $revealBody.length; i++) {
				var strSelector = $revealBody[i].href;
				var iHashPos = strSelector.lastIndexOf("#");

				if (iHashPos >= 0) {
					$(strSelector.slice(iHashPos + 1)).css("display", "none");
				}
			};
		}

        mmooc.greeting.enableGreetingButtonIfNecessary($content);

		// Initialise reveal buttons.
		var $revealButton = $content.find(".uob-reveal-button");

		if ($revealButton.length) {
			$revealButton.button({ icons: { secondary: "ui-icon-triangle-1-e" } })
				.click(function(event) {
					var $button = $(this);
					var body = $button.attr("href");
					var options;

					if ($(body).css("display") != "none") {
						$(body).slideUp(400);
						$(body).find(".hide_youtube_embed_link").click();
						options = { icons: { secondary: "ui-icon-triangle-1-e" } };
					} else {
						$(body).slideDown(400);
						options = {	icons: { secondary: "ui-icon-triangle-1-s" } };
					}

					$button.button("option", options);
					return(false);
				});
		}


		// ================================================================================
		// RegExp (Part 2/2)
		//
		// The uob-regexp-input, uob-regexp-button, uob-regexp-content classes are required
		// for regexp.
		// --------------------------------------------------------------------------------

		// Initialise regexp inputs.
		var $regexpInput = $content.find(".uob-regexp-input");

		if ($regexpInput.length) {
			$regexpInput.focus(function(event) {
				var $input = $(this);
				var $button = $("#" + $input.attr("regexpButton"));

				var strData = $button.attr("regexpData");
				var strDataRoot = $button.attr("regexpDataRoot");

				if (strData != "") {
					var $data = $("#" + strData);
					var options;

					// Hide current display if visible
					if ($data.css("display") != "none") {
						$data.slideUp(400);
						$data.find(".hide_youtube_embed_link").click();
						options = { icons: { secondary: "ui-icon-triangle-1-e" } };
						$button.button("option", options);
						$button.attr("regexpData", "");
					}
				}
			});
		}

		// Initialise regexp buttons.
		var $regexpButton = $content.find(".uob-regexp-button");

		if ($regexpButton.length) {
			$regexpButton.button({ icons: { secondary: "ui-icon-triangle-1-e" } })
				.click(function(event) {
					var $button = $(this);
					var $input = $("#" + $button.attr("regexpInput"));

					var strData = $button.attr("regexpData");
					var strDataRoot = $button.attr("regexpDataRoot");
					if (strData == "") strData = strDataRoot + "0";
					var $data = $("#" + strData);
					var options;

					// Hide current display if visible
					if ($data.css("display") != "none") {
						$data.slideUp(400);
						options = { icons: { secondary: "ui-icon-triangle-1-e" } };
						$button.button("option", options);
						$button.attr("regexpData", "");
					} else {
						// Locate content to be displayed
						var strInput = $input.val();

						// Loop through regexp looking for a match and identify content.
						for (i = 0; i < 100; i++) {
							var strRegExp = $button.attr("regexp" + i);

							if (strRegExp == undefined || strRegExp.length == 0)
								break;

							var re = new RegExp("^" + strRegExp.trim() + "$");

							if (strRegExp == "default" || re.test(strInput)) {
								$button.attr("regexpData", "" + strDataRoot + i);
								$data = $("#" + strDataRoot + i);
								break;
							}
						}

						$data.slideDown(400);
						options = {	icons: { secondary: "ui-icon-triangle-1-s" } };
						$button.button("option", options);
						return(false);
					}
				});
		}


		// ================================================================================
		// Rating
		//
		// A rating will be constructed using radio buttons.
		// See http://www.fyneworks.com/jquery/star-rating/
		// --------------------------------------------------------------------------------

		// Convert uob-rating table to format required for ratings.
		var $ratingTable = $content.find("table").has("table > tbody > tr > td:contains([uob-rating])");

		if ($ratingTable.length) {
			// Cut table from the DOM
			$ratingTable.remove();

			// Determine is user is more than a student.
			var isTeacher = false;

			hasAnyRole("teacher", "admin", function() {
				isTeacher = true;
			});

			// Add rating control to DOM
			var strParams = "?page_loc=" + encodeURIComponent(location.pathname);
			strParams += "&page_title=" + encodeURIComponent(document.title);
			strParams += "&user_id=" + ENV.current_user_id;
			strParams += "&user_name=" + encodeURIComponent(ENV.current_user.display_name);
			var strRating = "<iframe src=\"https://www.vampire.bham.ac.uk/canvas/rating.aspx" + strParams + "\" width=\"100%\" height=\"32\"></iframe>";
			strRating = "<div id='uob-rating-container-x'>" + strRating + "</div>";
			$content.append(strRating);
		}


		// ================================================================================
		// Boxes
		//
		// Create boxes from all tables with the codes: uob-tip, uob-info, uob-warning,
		// uob-header and uob-question.
		// --------------------------------------------------------------------------------

		aBoxTags = ["uob-tip", "uob-info", "uob-warning", "uob-header", "uob-question", "uob-quote", "uob-box"];

		for (var i = 0; i < aBoxTags.length; i++) {
			var strTag = aBoxTags[i];
			var $boxTable = $content.find("table").has("table > tbody > tr > td:contains([" + strTag + "])");

			if ($boxTable.length) {
				$boxTable.each(function(_idx, _item) {
					// Add new container immediately before table
					$table = $(_item);

					if (strTag == "uob-header")
						$table.before("<h2 class=\"" + strTag + "\"></h2>");
					else if (strTag == "uob-quote")
						$table.before("<div class=\"" + strTag + "\"><div class=\"uob-quote99\" /></div>");
					else
						$table.before("<div class=\"" + strTag + "\"></div>");

					// Move content from table to container
					$table.prev().append($table.find("tr:eq(1) > td:eq(0)").contents());

					// Remove original table
					$table.remove();
				});
			}
		}


		// ================================================================================
		// Previews
		//
		// This code will append preview buttons immediately after each file link in the
		// content of a page. File links are identified by the instructure_file_link class.
		// When clicked the first time, the preview button will call a function to complete
		// the DOM changes, which are not possible before the DOM manipulation carried out
		// within Canvas is complete. The new HTML for the preview button will be similar
		// to the following:
		//
		// <a href="javascript:uobShowPreviewDocument(0)" title="Preview example.pdf" id="uobPreview0">
		//     <img src="/images/preview.png" alt="Preview example.pdf">
		// </a>
		// --------------------------------------------------------------------------------

		$content.find(".instructure_file_link_holder.link_holder").has("a").each(function(_idx, _item) {
			// Initialise varibles
			var $item = $(_item);
			var $anchor = $(_item).find('a').filter(':first');
			var strHref = $anchor.attr('href') || "";	// if href is not found, set strHref to an empty string.
			var iScribd = $(_item).find('.instructure_scribd_file_holder').length || 0;

			if (iScribd > 0) {
				strHref = "";
			}

			if (strHref.length > 0) {
				// Obtain ID of the file (index is 4 or 6 respectivelly for non-draft and draft modes)
				var file_id = strHref.split('/')[strHref.indexOf("/courses") == 0 ? 4 : 6];

				// Use Canvas API to obtain information about the file being linked.
				$.get('/api/v1/files/' + file_id, function(_d) {

					// Check that the file type is compatible with the Google viewer.
					if ($.isPreviewable(_d['content-type'], 'google') === 1) {

						// Initialise variables
						var displayName = _d['display_name'];

						// Create anchor element for the link. Note, _idx is used to make each
						// link unique. The file_id cannot be used in case when the same file
						// link appears more than once on a page.
						var $a = $(document.createElement('a'))
							.attr('href', 'javascript:uobShowPreviewDocument(' + _idx + ')')
							.attr('title', 'Preview ' + displayName)
							.attr('id', 'uobPreview' + _idx)
							.data('href2', strHref);

						// Create preview icon for the link
						var $img = $(document.createElement('img'))
							.attr('src', '/images/preview.png')
							.attr('alt', 'Preview ' + displayName);

						// Combine the preview icon with the anchor and add them to the DOM.
						$a.append($img);
						$anchor.after($a);
						//$(_item).append($a);
					}
				});
			}
		});


		// ================================================================================
		// Refresh after publish/unpublish
		//
		// Add dummy callback function to detect when the page is published or unpublished.
		// The callback function will constantly check for the div and refresh the UoB
		// components if the div is missing.
		// --------------------------------------------------------------------------------

		// Create dummy div and add it to the DOM
		var $div = $(document.createElement('div')).attr('id', 'uob-components-loaded');
		$content.append($div);

		// Set callback to test for missing div, as occurs when pages are published/unpublished.
		onElementMissing("#uob-components-loaded", function($identity) {
			uobAddComponents();
		});


		// ================================================================================
		// --------------------------------------------------------------------------------

	});
}


// --------------------------------------------------------------------------------
// uobShowPreviewDocument
//
// This function will amend a preview link so that when it is clicked, it will
// display documents using the Google viewer. This function will only be called
// once for each preview link, the first time it is clicked. When amended, the link
// is moved into the SPAN element with a "link_holder" class which should
// immediately precede the link. The preview link is given a new href attribute,
// the "scribd_file_preview_link" class and the click event will be triggered.
// --------------------------------------------------------------------------------

function uobShowPreviewDocument(iFileID) {
	// Initialise object variables to simplify the code. $target is the preview link
	// and $holder is the preceding or parent SPAN element (if it exists).
	var $target = $('#uobPreview' + iFileID);
	var $holder = $target.prev('span.link_holder');

	if ($holder.length == 0) {
		$holder = $target.parent('span.link_holder');
	}

	// Check that preceding element is a SPAN with the "link_holder" class.
	if ($holder.length) {

		// Move the anchor element into the preceeding span element
		$holder.append($target);

		// Replace href value, add the "scribd_file_preview_link" class and click.
		$target
			.attr('href', $target.data('href2'))
			.addClass('scribd_file_preview_link')
			.click();
	}
}


// --------------------------------------------------------------------------------
// Instructure/rpflorence functions
//
// (see http://youtu.be/ag6mxnBMTnQ and https://gist.github.com/rpflorence/5817898)
// Functions slightly amended and onElementMissing function added.
// --------------------------------------------------------------------------------

function onPage(regex, fn) {
  if (location.pathname.match(regex)) fn();
}


function hasAnyRole(/* role1, role2..., cb */) {
	var roles = [].slice.call(arguments, 0);
	var cb = roles.pop();

	if (typeof ENV != "object") return cb(false);
	if (typeof ENV.current_user_roles != "object") return cb(false);
	if (ENV.current_user_roles == null) return cb(false);

	for (var i = 0; i < roles.length; i++) {
		if (ENV.current_user_roles.indexOf(roles[i]) !== -1) return cb(true);
	}

	return cb(false);
}


function isUser(id, cb) {
	cb(ENV.current_user_id == id);
}


function onElementRendered(selector, cb, _attempts) {
	var el = $(selector);
	_attempts = ++_attempts || 1;
	if (el.length) return cb(el);
	if (_attempts >= 60) return;

	setTimeout(function() {
		onElementRendered(selector, cb, _attempts);
	}, 200);
}


function onElementMissing(selector, cb) {
	var el = $(selector);
	if (!el.length) return cb(el);

	setTimeout(function() {
		onElementMissing(selector, cb);
	}, 700);
}


function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");

	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}

	return(false);
}