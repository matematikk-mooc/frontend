class CourseOptions {
    static delimitor() {
        return '::';
    }

    static hasOption(course, option) {
        if (course) {
            const code = course.course_code.toUpperCase();
            const upperCaseOption = option.toUpperCase();
            const delimitor = this.delimitor();

            return code.indexOf(delimitor + upperCaseOption + delimitor) > -1;
        }
        return false;
    }

    static hasOptionFunction(option) {
        return (course) => this.hasOption(course, option);
    }
}