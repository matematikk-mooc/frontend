// This file contains functions that filter courses based on the filters selected by the user
function filter(courses, filters) {
    let filteredCourses = []
    if(filters.length == 0){
        return courses;
    }
    courses.forEach(course =>{
        if(course.course_settings){
            course.course_settings.course_filter.forEach(courseFilter => {
                for (const item of filters) {
                    if (item.id === courseFilter.filter.id) {
                        if(!filteredCourses.includes(course)){
                            filteredCourses.push(course);
                        }
                        break;
                    }
                }
            })
        }
    })
    return filteredCourses;
}

export function filterCourses(courses, filters){
    let targets = filters.filter(filter => filter.type == 'TARGET')
    let categories = filters.filter(filter => filter.type == 'CATEGORY')
    let coursesToView = []
    let targetCourses = []

    if (targets.length != 0) {
        targetCourses = filter(courses, targets)
        coursesToView = filter(targetCourses, categories)
    }
    else {
        coursesToView = filter(courses, categories)
    }
    return coursesToView;



}
