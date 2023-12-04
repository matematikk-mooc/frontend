import "../../vue/design/re-styles/tooltip.scss";

export default (function() {

    function addTooltipStyling() {
        onElementRendered(
            "#content .user_content.enhanced,#content .show-content.enhanced",
            function (content) {
                // Regex to find tooltip elements in the content. Pattern: [text](tooltip)
                var re = /\[([^\]]*?)\]\(([^)]*?)\)/g;

                var tooltipElements = content.first().filter(function () {
                    return this.innerHTML.match(re);
                });
                console.log(tooltipElements)
                tooltipElements.each(function (i, el) {
                    var matches = re.exec(el.innerHTML);
                    let count = 0;
                    while (matches) {
                        console.log(el)

                        var tooltipSpan = document.createElement("span");
                        tooltipSpan.classList.add("tooltip");
                        tooltipSpan.id = "tooltip-" + count;

                        var textSpan = document.createElement("span");
                        textSpan.classList.add("tooltiptext-box");

                        var tooltipContent = document.createElement("span");
                        tooltipContent.classList.add("tooltiptext");
                        tooltipContent.innerHTML = matches[2];
                        textSpan.appendChild(tooltipContent);

                        var closeTooltip= document.createElement("img");
                        closeTooltip.src = SERVER + "tooltip_close.svg";
                        closeTooltip.classList.add("close-tooltip");
                        textSpan.appendChild(closeTooltip);

                        var questionMarkSpan = document.createElement("img");
                        questionMarkSpan.src = SERVER + "tooltip_help_outline.svg";
                        questionMarkSpan.classList.add("question-mark");

                        var underLineSpan = document.createElement("span");
                        underLineSpan.classList.add("tooltip-underline");
                        underLineSpan.innerHTML = matches[1];

                        tooltipSpan.appendChild(underLineSpan);
                        tooltipSpan.appendChild(questionMarkSpan);
                        tooltipSpan.appendChild(textSpan);


                        el.innerHTML = el.innerHTML.replace(matches[0], tooltipSpan.outerHTML);
                        matches = re.exec(el.innerHTML);
                        count++;
                    }
                    for (var j = 0; j < count; j++) {
                        var tooltip = document.getElementById("tooltip-" + j);
                        tooltip.addEventListener("click", function (e) {
                            e.stopPropagation();
                            var tooltipText = this.querySelector(".tooltiptext-box");
                            tooltipText.style.display = "flex";
                            tooltipText.style.flexDirection = "row";

                        });

                        var closeTooltip = tooltip.querySelector(".close-tooltip");
                        closeTooltip.addEventListener("click", function (e) {
                            e.stopPropagation();
                            var tooltipText = this.parentNode;
                            tooltipText.style.display = "none";
                        });
                    }

                });
            });
    }


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


function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts >= 60) return;

    setTimeout(function () {
      onElementRendered(selector, cb, _attempts);
    }, 200);
  }

  return {
    init: function () {
      onPage(/\/(courses|groups)\/\d+/, function () {
        addTooltipStyling();
      });
    }
}
})();
