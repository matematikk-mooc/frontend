import settings from "../../../js/settings";
import api from "../../../js/api/api";
$(function() {
  // console.log("CANVABADGES: Loaded!");
  // NOTE: if pasting this code into another script, you'll need to manually change the
  // next line. Instead of assigning the value null, you need to assign the value of
  // the Canvabadges domain, i.e. "https://www.canvabadges.org". If you have a custom
  // domain configured then it'll be something like "https://www.canvabadges.org/_my_site"
  // instead.
  // var protocol_and_host = null; Overridden because of the comment above
  //Some small changes has been made to this script so it is displayed also on the about/<user id> page and /profile/settings page.
  //The original is here: https://www.canvabadges.org/canvas_profile_badges.js
  if (settings.useCanvaBadge) {
    //Only run this code if it is set to be used in the settings
    var protocol_and_host = settings.CanvaBadgeProtocolAndHost; //'https://canvabadges-beta-iktsenteret.bibsys.no' - this is where the Canva Badge certificate is stored.;
    var isProfilePage = false;
    var user_id;
    if (!protocol_and_host) {
      var $scripts = $('script');
      $('script').each(function() {
        var src = $(this).attr('src');
        if (src && src.match(/canvas_profile_badges/)) {
          var splits = src.split(/\//);
          protocol_and_host = splits[0] + '//' + splits[2];
        }
        var prefix = src && src.match(/\?path_prefix=\/(\w+)/);
        if (prefix && prefix[1]) {
          protocol_and_host = protocol_and_host + '/' + prefix[1];
        }
      });
    }
    if (!protocol_and_host) {
      console.log(
        "CANVABADGES: Couldn't find a valid protocol and host. Canvabadges will not appear on profile pages until this is fixed."
      );
    }
    var match = location.href.match(/\/(users|about)\/(\d+)$/);
    if (!match) {
      match = location.href.match(/\/profile\/settings$/);
      isProfilePage = true;
    }
    if (match && protocol_and_host) {
      console.log('CANVABADGES: This page shows badges! Loading...');
      if (isProfilePage) {
        user_id = api.getUser().id;
      } else {
        user_id = match[2];
      }

      var domain = location.host;
      var url =
        protocol_and_host +
        '/api/v1/badges/public/' +
        user_id +
        '/' +
        encodeURIComponent(domain) +
        '.json';
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url,
        success: function(data) {
          console.log('CANVABADGES: Data retrieved!');
          if (data.objects && data.objects.length > 0) {
            console.log('CANVABADGES: Badges found! Adding to the page...');
            var $box = $('<div/>', { style: 'margin-bottom: 20px;' });
            $box.append("<h2 class='border border-b'>Badges</h2>");
            for (idx in data.objects) {
              var badge = data.objects[idx];
              var $badge = $('<div/>', { style: 'float: left;' });
              var link =
                protocol_and_host +
                '/badges/criteria/' +
                badge.config_id +
                '/' +
                badge.config_nonce +
                '?user=' +
                badge.nonce;
              var $a = $('<a/>', { href: link });
              $a.append(
                $('<img/>', {
                  src: badge.image_url,
                  style: 'width: 72px; height: 72px; padding-right: 10px;'
                })
              );
              $badge.append($a);
              $box.append($badge);
            }
            $box.append($('<div/>', { style: 'clear: left' }));
            $(
              '#edit_profile_form,fieldset#courses,.more_user_information + div, #update_profile_form'
            ).after($box);
          } else {
            console.log(
              'CANVABADGES: No badges found for the user: ' +
                user_id +
                ' at ' +
                domain
            );
          }
        },
        error: function(err) {
          console.log('CANVABADGES: Badges failed to load, API error response');
          console.log(err);
        },
        timeout: 5000
      });
    } else {
      console.log("CANVABADGES: This page doesn't show badges");
    }
  }
});
