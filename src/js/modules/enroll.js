this.mmooc=this.mmooc||{};


this.mmooc.enroll = function() {

    return {
        changeButtonText: function() {
            var enrollForm = $("#enroll_form");
            enrollForm.find(".btn").text("Gå til Mine " + mmooc.i18n.CoursePlural);
            enrollForm.find(".btn-primary").hide();
        }
    };
}();
