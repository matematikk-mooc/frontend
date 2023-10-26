import '../../vue/design/reveal.scss';

export default (function() {
    function reveal() {
        onElementRendered(
            '#content .user_content.enhanced,#content .show-content.enhanced',
            function() {


                const elements = document.querySelectorAll('#content .user_content.enhanced,#content .show-content.enhanced');

                const expandMore = SERVER + 'vector_images/expand_more.svg';
                const expandLess = SERVER + 'vector_images/expand_less.svg';

                elements.forEach(($content) => {
                    let strSetNum = 0;
                    let tableFound = false;
                        // Locate the next uob-reveal table
                        const tables = Array.from($content.querySelectorAll('table'));
                        let $table = null;
                        let tableCells = null;
                        for (let i = tables.length - 1; i >= 0; i--) {
                            $table = null;
                            const table = tables[i];
                            tableCells = table.querySelectorAll('tbody > tr > td');
                            if (tableCells.length > 0 && tableCells[0].textContent.includes('[uob-reveal]')) {
                                $table = table;
                            }
                        tableFound = $table !== null;
                        if (tableFound) {
                            strSetNum++;
                            let div = document.createElement('div');
                            div.classList.add('custom-reveal-wrapper');
                            for (let _idx = 1; _idx < Array.from(tableCells).length; _idx++) {
                                var strAnchor = 'set' + strSetNum + 'reveal';
                                if (_idx % 2) {
                                    const button = document.createElement('p');
                                    button.innerHTML = '<a href="#' + strAnchor + '" class="custom-reveal-button"></a>';
                                    div.appendChild(button);
                                    button.children[0].appendChild(document.createTextNode(tableCells[_idx].textContent.trim()));
                                    let buttonImg = document.createElement('img');
                                    buttonImg.classList.add('custom-reveal-button-img');
                                    buttonImg.src = expandMore;
                                    button.children[0].appendChild(buttonImg);
                                }

                                if ((_idx + 1) % 2) {
                                    const contentDiv = document.createElement('div');
                                    contentDiv.id = strAnchor;
                                    contentDiv.className = 'custom-reveal-content';
                                    div.appendChild(contentDiv);
                                    let children = tableCells[_idx].cloneNode(true)
                                    contentDiv.appendChild(children);
                                }
                            }
                            $table.parentNode.insertBefore(div, $table);

                            // Remove original table
                            $table.remove();
                        }
                    }

                    // Initialize reveal contents
                    var $revealBody = $content.querySelectorAll('.custom-reveal-button');

                    $revealBody.forEach(function (el) {
                        var strSelector = el.href;
                        if (strSelector !== null) {
                            var iHashPos = strSelector.lastIndexOf('#');
                            if (iHashPos >= 0) {
                                let t = document.querySelector(strSelector.slice(iHashPos)).style.display = 'none';
                            }
                        }
                    });

                    // Initialize reveal buttons
                    var $revealButton = $content.querySelectorAll('.custom-reveal-button');

                    $revealButton.forEach(function (button) {
                        button.addEventListener('click', function (event) {
                            var $button = event.currentTarget;
                            var body = $button.getAttribute('href');
                            $button.querySelector('.custom-reveal-button-img').src = $button.querySelector('.custom-reveal-button-img').src === expandMore ? expandLess : expandMore;
                            var options;

                            if (document.querySelector(body).style.display !== 'none') {
                                document.querySelector(body).style.display = 'none';
                                var hideLink = document.querySelector(body + ' .hide_youtube_embed_link');
                                if (hideLink) {
                                    hideLink.click();
                                }
                                options = { icons: { secondary: 'ui-icon-triangle-1-e' } };
                            } else {
                                document.querySelector(body).style.display = 'block';
                                options = { icons: { secondary: 'ui-icon-triangle-1-s' } };
                            }

                            // You can dispatch a custom event here instead of 'resize'
                            setTimeout(function () {
                                window.dispatchEvent(new Event('resize'));
                            }, 200);

                            event.preventDefault();
                        });
                    });
                });
            });
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
                reveal();
                });
            }
        }
    })();
