import '../../vue/design/accordion.scss';

export default (function() {
    function accordion() {
        onElementRendered(
            '#content .user_content.enhanced,#content .show-content.enhanced',
            function($content) {

                for (i = 0; i < 10; i++) {
                    // Locate the next uob-accordion table.
                    let $table = $content
                      .find('table')
                      .has('table > tbody > tr > td:contains([uob-accordion])')
                      .last();

                    // Break loop if no more accordions are to be displayed.
                    if ($table.length != 1) break;

                    // Convert table into HTML for an accordian.
                    $table.before("<div class='custom-accordions'></div>");

                    $table.find('tbody:first > tr:gt(0) > td').each(function(_idx, _item) {
                      if ((_idx + 1) % 2) {
                        // Add heading 4 for accordion bar.
                        $table.prev().append('<button class="custom-accordion"><i class="uob-arrow-down"></i></button>');
                        $table
                          .prev()
                          .children()
                          .last()
                          .append(
                            $(_item)
                              .text()
                              .trim()
                          );
                      }

                      if (_idx % 2) {
                        // Add div for accordion content.
                        $table.prev().append('<div class="custom-accordion-panel"></div>');
                        $table
                          .prev()
                          .children()
                          .last()
                          .append($(_item).contents());
                      }
                    });

                    // Remove original table from the DOM
                    $table.remove();
                  }

                var acc = document.getElementsByClassName("custom-accordion");
                var i;

                for (i = 0; i < acc.length; i++) {
                  acc[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    this.firstElementChild.classList.toggle("active");
                    var panel = this.nextElementSibling;
                    panel.classList.toggle("active");
                    // if (panel.style.maxHeight){
                    //   panel.style.maxHeight = null;
                    // } else {
                    //   panel.style.maxHeight = panel.scrollHeight + "px";
                    // }
                    setTimeout(function () {
                      window.dispatchEvent(new Event('resize'));;
                   }, 200);

                  });
                }

            }
        );
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

    function onPage(regex, fn) {
        if (location.pathname.match(regex)) fn();
    }

    return {
        init: function() {
            onPage(/\/(courses|groups)\/\d+/, function() {
                accordion();
            });
        }
    }
})();