// ==========================================================================================
// This code was copied and adapted on January 27th 2015 from:
// https://s3.amazonaws.com/SSL_Assets/bham/uob/uob7.js
// The functionality in the file is documented here:
// https://birmingham.instructure.com/courses/3915/pages/faq-jquery-in-canvas
// ==========================================================================================
// UOB7.JS
//
// Generic top-level script for University of Birmingham's Canvas implementation. This
// script, which requires jQuery and the jQuery.UI, carries out the following tasks:
//
// 		Adds FindIt@Bham link to Help Corner
// 		Hides "Report a Problem" Zendesk option from all but sub-account admins
// 		Enables accordions
// 		Enables tabs
// 		Enables reveal buttons
// 		Enables regexp reveals
//		Enables boxes
//		Hides forgot-password link on login page
//		Adds Google viewer previews to compatible file links
//		Add strap line for Canvas Gallery
//
// Most code is implemented within a $(document).load() to ensure that jQuery and the
// jQuery UI are both available, especially in Internet Explorer.
//
//
// ==========================================================================================

import multilanguage from "./multilanguage";
import vimeo from "./vimeo";

export default (function() {
  // -----------------------------------------------------------------------------------
  // Declare veriables that are used for multiple tasks.
  // -----------------------------------------------------------------------------------
  var i;
  var vimeoPlayerReady = false;
  var vimeoTranscriptInitialized = false;
  var uobInititalized = false;
  var strSetNum = 0;
  // --------------------------------------------------------------------------------
  // uobAddComponents
  //
  // This function will enable the following UoB components:
  // 		accordions
  // 		tabs
  // 		reveal buttons
  // 		regexp reveals
  //		boxes (header, box, tip, info, warning, question)
  //		previews
  // --------------------------------------------------------------------------------

  function uobAddComponents() {
    onElementRendered(
      "#content .user_content.enhanced,#content .show-content.enhanced",
      function ($content) {
        // Tooltip
        var re = /\[(.*?)\]\((.*?)\)/g;

        //20180828ETH Bare bytt ut innholdet i første user content. I diskusjoner er det
        //en user content for hvert innlegg, og mange av innleggene blir lastet inn etter
        //at koden vår har kjørt. Dersom vi skal støtte dette må vi ha en måte å vite når
        //alle innleggene er lastet inn på. Da kan man kjøre $content.each iterasjon.

        var $tooltipElements = $content.first().filter(function () {
          return this.innerHTML.match(re);
        });

        $tooltipElements.each(function (i, el) {
          $(this).html(
            $(this)
              .html()
              .replace(
                re,
                '<span class="tooltip tooltip-underline">$1<span class="tooltiptext">$2</span></span>'
              )
          );
        });

        // ================================================================================
        // Show non-uob-component tables
        //
        // Show standard tables that are not UoB controls i.e. tables that do not include
        // the string "[uob-" in the first cell.
        // --------------------------------------------------------------------------------

        var $tables = $content
          .find("table:hidden")
          .not("td:first(:contains('[uob-'))");
        $tables.show();

        // ================================================================================
        // RegExp (Part 1/1)
        //
        // Convert up to 10 uob-regexp tables to format required for regexps.
        // --------------------------------------------------------------------------------

        strSetNum = 0;

        for (i = 0; i < 10; i++) {
          // Locate the next uob-regexp table
          var $table = $content
            .find("table")
            .has("table > tbody > tr > td:contains([uob-regexp])")
            .last();

          // Break loop if no more regexp tables are to be converted.
          if ($table.length != 1) break;

          // Convert table into a regexps
          strSetNum++;

          // Generate HTML for input and button/anchor controls, and add to the DOM.
          var strAnchor = "RE" + strSetNum;

          var strHTML =
            '<p><input id="input' +
            strAnchor +
            '" class="uob-regexp-input" type="text" size="40" />&nbsp;<a href="#' +
            strAnchor +
            '" id="button' +
            strAnchor +
            '" class="uob-regexp-button">Check Answer</a></p>';
          strHTML += "<div id='content" + strAnchor + "'></div>";
          $table.before(strHTML);

          // Store regular expressions in button and create DIVs to store the contents.
          $table
            .find("tbody:first > tr:gt(0) > td")
            .each(function (_idx, _item) {
              var strValue = $(_item).html();
              var strIndex = (_idx - (_idx % 2)) / 2;

              if ((_idx + 1) % 2) {
                // set RegExp
                strValue = $(_item).text().trim();
                $("#button" + strAnchor).attr("regexp" + strIndex, strValue);
              }

              if (_idx % 2) {
                // set Content
                //$("#data" + strAnchor).attr("content" + strIndex, strValue);
                strHTML =
                  '<div id="data' +
                  strAnchor +
                  "ID" +
                  strIndex +
                  '" class="uob-regexp-content"></div>';
                $("#content" + strAnchor).append(strHTML);
                $("#data" + strAnchor + "ID" + strIndex).append(
                  $(_item).contents()
                );
              }
            });

          // Store IDs of input and button to button and input respectively.
          $("#button" + strAnchor).attr("regexpInput", "input" + strAnchor);
          $("#input" + strAnchor).attr("regexpButton", "button" + strAnchor);

          // Store default selection in button.
          $("#button" + strAnchor).attr(
            "regexpData",
            "data" + strAnchor + "ID0"
          );
          $("#button" + strAnchor).attr(
            "regexpDataRoot",
            "data" + strAnchor + "ID"
          );

          // Remove original table
          $table.remove();
        }



        // ================================================================================
        // RegExp (Part 2/2)
        //
        // The uob-regexp-input, uob-regexp-button, uob-regexp-content classes are required
        // for regexp.
        // --------------------------------------------------------------------------------

        // Initialise regexp inputs.
        var $regexpInput = $content.find(".uob-regexp-input");

        if ($regexpInput.length) {
          $regexpInput.focus(function (event) {
            var $input = $(this);
            var $button = $("#" + $input.attr("regexpButton"));

            var strData = $button.attr("regexpData");
            var strDataRoot = $button.attr("regexpDataRoot");

            if (strData != "") {
              var $data = $("#" + strData);
              var options;

              // Hide current display if visible
              if ($data.css("display") != "none") {
                $data.slideUp(400);
                $data.find(".hide_youtube_embed_link").click();
                options = { icons: { secondary: "ui-icon-triangle-1-e" } };
                $button.button("option", options);
                $button.attr("regexpData", "");
              }
            }
          });
        }

        // Initialise regexp buttons.
        var $regexpButton = $content.find(".uob-regexp-button");

        if ($regexpButton.length) {
          $regexpButton
            .button({ icons: { secondary: "ui-icon-triangle-1-e" } })
            .click(function (event) {
              var $button = $(this);
              var $input = $("#" + $button.attr("regexpInput"));

              var strData = $button.attr("regexpData");
              var strDataRoot = $button.attr("regexpDataRoot");
              if (strData == "") strData = strDataRoot + "0";
              var $data = $("#" + strData);
              var options;

              // Hide current display if visible
              if ($data.css("display") != "none") {
                $data.slideUp(400);
                options = { icons: { secondary: "ui-icon-triangle-1-e" } };
                $button.button("option", options);
                $button.attr("regexpData", "");
              } else {
                // Locate content to be displayed
                var strInput = $input.val();

                // Loop through regexp looking for a match and identify content.
                for (i = 0; i < 100; i++) {
                  var strRegExp = $button.attr("regexp" + i);

                  if (strRegExp == undefined || strRegExp.length == 0) break;

                  var re = new RegExp("^" + strRegExp.trim() + "$");

                  if (strRegExp == "default" || re.test(strInput)) {
                    $button.attr("regexpData", "" + strDataRoot + i);
                    $data = $("#" + strDataRoot + i);
                    break;
                  }
                }

                $data.slideDown(400);
                options = { icons: { secondary: "ui-icon-triangle-1-s" } };
                $button.button("option", options);
                return false;
              }
            });
        }

        // ================================================================================
        // Rating
        //
        // A rating will be constructed using radio buttons.
        // See http://www.fyneworks.com/jquery/star-rating/
        // --------------------------------------------------------------------------------

        // Convert uob-rating table to format required for ratings.
        var $ratingTable = $content
          .find("table")
          .has("table > tbody > tr > td:contains([uob-rating])");

        if ($ratingTable.length) {
          // Cut table from the DOM
          $ratingTable.remove();

          // Determine is user is more than a student.
          var isTeacher = false;

          hasAnyRole("teacher", "admin", function () {
            isTeacher = true;
          });

          // Add rating control to DOM
          var strParams = "?page_loc=" + encodeURIComponent(location.pathname);
          strParams += "&page_title=" + encodeURIComponent(document.title);
          strParams += "&user_id=" + ENV.current_user_id;
          strParams +=
            "&user_name=" + encodeURIComponent(ENV.current_user.display_name);
          var strRating =
            '<iframe src="https://www.vampire.bham.ac.uk/canvas/rating.aspx' +
            strParams +
            '" width="100%" height="32"></iframe>';
          strRating =
            "<div id='uob-rating-container-x'>" + strRating + "</div>";
          $content.append(strRating);
        }

        // ================================================================================
        // Previews
        //
        // This code will append preview buttons immediately after each file link in the
        // content of a page. File links are identified by the instructure_file_link class.
        // When clicked the first time, the preview button will call a function to complete
        // the DOM changes, which are not possible before the DOM manipulation carried out
        // within Canvas is complete. The new HTML for the preview button will be similar
        // to the following:
        //
        // <a href="javascript:uobShowPreviewDocument(0)" title="Preview example.pdf" id="uobPreview0">
        //     <img src="/images/preview.png" alt="Preview example.pdf">
        // </a>
        // --------------------------------------------------------------------------------

        $content
          .find(".instructure_file_link_holder.link_holder")
          .has("a")
          .each(function (_idx, _item) {
            // Initialise varibles
            var $item = $(_item);
            var $anchor = $(_item).find("a").filter(":first");
            var strHref = $anchor.attr("href") || ""; // if href is not found, set strHref to an empty string.
            var iScribd =
              $(_item).find(".instructure_scribd_file_holder").length || 0;

            if (iScribd > 0) {
              strHref = "";
            }

            if (strHref.length > 0) {
              // Obtain ID of the file (index is 4 or 6 respectivelly for non-draft and draft modes)
              var file_id =
                strHref.split("/")[strHref.indexOf("/courses") == 0 ? 4 : 6];

              // Use Canvas API to obtain information about the file being linked.
              $.get("/api/v1/files/" + file_id, function (_d) {
                // Check that the file type is compatible with the Google viewer.
                if ($.isPreviewable(_d["content-type"], "google") === 1) {
                  // Initialise variables
                  var displayName = _d["display_name"];

                  // Create anchor element for the link. Note, _idx is used to make each
                  // link unique. The file_id cannot be used in case when the same file
                  // link appears more than once on a page.
                  var $a = $(document.createElement("a"))
                    .attr(
                      "href",
                      "javascript:uobShowPreviewDocument(" + _idx + ")"
                    )
                    .attr("title", "Preview " + displayName)
                    .attr("id", "uobPreview" + _idx)
                    .data("href2", strHref);

                  // Create preview icon for the link
                  var $img = $(document.createElement("img"))
                    .attr("src", "/images/preview.png")
                    .attr("alt", "Preview " + displayName);

                  // Combine the preview icon with the anchor and add them to the DOM.
                  $a.append($img);
                  $anchor.after($a);
                  //$(_item).append($a);
                }
              });
            }
          });

        // ================================================================================
        // Refresh after publish/unpublish
        //
        // Add dummy callback function to detect when the page is published or unpublished.
        // The callback function will constantly check for the div and refresh the UoB
        // components if the div is missing.
        // --------------------------------------------------------------------------------

        // Create dummy div and add it to the DOM
        var $div = $(document.createElement("div")).attr(
          "id",
          "uob-components-loaded"
        );
        $content.append($div);

        // Set callback to test for missing div, as occurs when pages are published/unpublished.
        onElementMissing("#uob-components-loaded", function ($identity) {
          uobAddComponents();
        });

        // ================================================================================
        // --------------------------------------------------------------------------------

        //KURSP-279 Multilanguage must be run when content is ready
        try {
          // Call multilanguage.perform() last to catch all relevant DOM content
          // multilanguage.perform();
        } catch (e) {
          console.log(e);
        }

        if (vimeoPlayerReady && !vimeoTranscriptInitialized) {
          vimeoTranscriptInitialized = true;
          vimeo.init();
        }
        uobInititalized = true;
      }
    );
  }

  // --------------------------------------------------------------------------------
  // uobShowPreviewDocument
  //
  // This function will amend a preview link so that when it is clicked, it will
  // display documents using the Google viewer. This function will only be called
  // once for each preview link, the first time it is clicked. When amended, the link
  // is moved into the SPAN element with a "link_holder" class which should
  // immediately precede the link. The preview link is given a new href attribute,
  // the "scribd_file_preview_link" class and the click event will be triggered.
  // --------------------------------------------------------------------------------

  function uobShowPreviewDocument(iFileID) {
    // Initialise object variables to simplify the code. $target is the preview link
    // and $holder is the preceding or parent SPAN element (if it exists).
    var $target = $("#uobPreview" + iFileID);
    var $holder = $target.prev("span.link_holder");

    if ($holder.length == 0) {
      $holder = $target.parent("span.link_holder");
    }

    // Check that preceding element is a SPAN with the "link_holder" class.
    if ($holder.length) {
      // Move the anchor element into the preceeding span element
      $holder.append($target);

      // Replace href value, add the "scribd_file_preview_link" class and click.
      $target
        .attr("href", $target.data("href2"))
        .addClass("scribd_file_preview_link")
        .click();
    }
  }

  // --------------------------------------------------------------------------------
  // Instructure/rpflorence functions
  //
  // (see http://youtu.be/ag6mxnBMTnQ and https://gist.github.com/rpflorence/5817898)
  // Functions slightly amended and onElementMissing function added.
  // --------------------------------------------------------------------------------

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

  function isUser(id, cb) {
    cb(ENV.current_user_id == id);
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

  function onElementMissing(selector, cb) {
    var el = $(selector);
    if (!el.length) return cb(el);

    setTimeout(function () {
      onElementMissing(selector, cb);
    }, 700);
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }

    return false;
  }

  return {
    init: function () {
      // -----------------------------------------------------------------------------------
      // Add UoB enhancements to rich content displayed in courses.
      // -----------------------------------------------------------------------------------
      onPage(/\/(courses|groups)\/\d+/, function () {
        uobAddComponents();
      });
    },
    setVimeoPlayerReady: function () {
      vimeoPlayerReady = true;
      if (uobInititalized && !vimeoTranscriptInitialized) {
        vimeo.init();
        vimeoTranscriptInitialized = true;
      }
    },
  };
})();
