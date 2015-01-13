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
            var container = $("#mark-as-done-container");
            var input = container.find("input");
            var label = container.find("label");
            input.change(function() {
                updateButtonText(container, input, label);
            });

            updateButtonText(container, input, label);
            container.show();
        }
    };
}();
