import '../../vue/design/accordion.scss';

export default (function() {
    function accordion() {
        onElementRendered(
            '#content .user_content.enhanced,#content .show-content.enhanced',
            function() {

              const expandMore = SERVER + 'vector_images/expand_more.svg';
              const expandLess = SERVER + 'vector_images/expand_less_blue.svg';

              let tables = document.querySelectorAll('table');
              let $table = null;

              for (let j = tables.length - 1; j >= 0; j--) {
                $table = null
                if (tables[j].textContent.includes('[uob-accordion]') || tables[j].textContent.includes('[udir-accordion]') ){
                  $table = tables[j];
                }

                  // Break loop if no more accordions are to be displayed.
                if ($table){


                // Create a div for the custom accordion.
                let customAccordion = document.createElement('div');
                customAccordion.className = 'custom-accordions';
                $table.parentNode.insertBefore(customAccordion, $table);

                let rows = $table.querySelectorAll('tbody tr');
                for (let j = 1; j < rows.length; j ++) {
                  let columns = rows[j].querySelectorAll('td');
                  // Add a button for accordion header.
                  let button = document.createElement('button');
                  button.className = 'custom-accordion';
                  customAccordion.appendChild(button);
                  button.appendChild(document.createTextNode(columns[0].textContent.trim()));
                  let buttonImg = document.createElement('img');
                  buttonImg.classList.add('custom-accordion-img');
                  buttonImg.src = expandMore;
                  button.appendChild(buttonImg);

                  // Add a div for accordion content.
                  let panel = document.createElement('div');
                  panel.className = 'custom-accordion-panel';
                  customAccordion.appendChild(panel);
                  panel.appendChild(columns[1]);
                }

                // Remove the original table from the DOM
                $table.parentNode.removeChild($table);
              }
            }
              let customAccordions = document.querySelectorAll('.custom-accordion');
              for (let i = 0; i < customAccordions.length; i++) {
                customAccordions[i].addEventListener('click', function(event) {
                  event.preventDefault();
                  let img = this.querySelector('img');
                  img.src = img.src === expandMore ? expandLess : expandMore;
                  this.classList.toggle('active');
                  let panel = this.nextElementSibling;
                  panel.classList.toggle('active');

                  setTimeout(function () {
                    window.dispatchEvent(new Event('resize'));
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
