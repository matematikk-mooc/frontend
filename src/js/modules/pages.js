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

        moveMarkAsDoneButton: function() {
          var button = $("#mark-as-done-checkbox");
          var container = $("#mark-as-done-container");
          button.appendTo(container);
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
