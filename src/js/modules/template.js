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
    for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        for (var j = 0; j < module.items.length; j++) {
            var item = module.items[j];
            if (item.completion_requirement && !item.completion_requirement.completed) {
                return options.inverse(this);
            }
        }
    }

    return options.fn(this);
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