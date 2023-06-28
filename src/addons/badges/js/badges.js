import badgeView from "../templates/badgeView.hbs"
import constants from "./constants";
import util from "../../../js/modules/util";

export default (function() {

    return {
      initPage: function() {
        let self = this
        if (!parent.util.isTeacherOrAdmin()) {
          $('#badge-wrap').addClass('hide');
          var $badges = $(document).find('#badge-wrap .row-fluid .span4');
          var redesignedBadges = [];

          $badges.each(function() {
            redesignedBadges.push(self.applyNewDesign($(this)));
            $(this).remove();
          });

          self.displayElements(redesignedBadges);
          $('body').attr('style', 'margin: 0 !important;');
          $('head').append('<base target="_parent"/>');
        } else {
          $('#badge-wrap').attr('style', 'display: block');
        }
        this.notifyParentAndSetSize();
      },

      applyNewDesign: function($element) {
        let self = this
        var complete =
          $element
            .find(
              ":contains('You have completed the modules required to achieve this badge.')"
            )
            .size() > 0;
        var badgeIds = self.extractIdsFromString(
          $element.find('.thumbnail a').attr('onclick')
        );
        var criteria = $element.find('p:first').html();
        var link =
          'badge-details.php?badge_id=' +
          badgeIds.badgeId +
          '&CLIKEY=' +
          badgeIds.clickey +
          '&course_id=' +
          badgeIds.courseId +
          '&user_id=' +
          badgeIds.userId;

        return {
          complete: complete,
          badgeImage: complete
            ? $element.find('.thumbnail a img').attr('src')
            : constants.BADGE_LOCKED_IMAGE_URL,
          name: $element.find('.thumbnail h3').html(),
          criteria: criteria,
          link: link,
          courseId: badgeIds.courseId,
          backpack: this.backpack(complete, $element)
        };
      },

      displayElements: function(elements) {
        var templates = util.renderTemplateWithData(badgeView, {
          badges: elements,
          total: elements.length,
          completed_amount: elements.filter(function(e) {
            return e.complete;
          }).length
        });
        var vel = 200;

        $('#badge-wrap').before(templates);

        function toggleSelected($element) {
          $element.siblings().removeClass('selected');
          $element.addClass('selected');
        }
        $('.show-all').click(function() {
          toggleSelected($(this));
          $('.badge-list .badge-view').show(vel);
        });

        $('.show-unlocked').click(function() {
          toggleSelected($(this));
          $('.badge-list .badge-view.locked').hide(vel);
          $('.badge-list .badge-view:not(.locked)').show(vel);
        });

        $('.show-locked').click(function() {
          toggleSelected($(this));
          $('.badge-list .badge-view:not(.locked)').hide(vel);
          $('.badge-list .badge-view.locked').show(vel);
        });

        $('.claim').click(this.handleBackPackClick);
      },

      notifyParentAndSetSize: function() {
        this.initPage();
      },

      handleBackPackClick: function() {
        var badgeUrl = jQuery(this).attr('badge-url');
        var badgeName = jQuery(this).attr('badge-name');
        var badgeEarner = jQuery(this).attr('badge-earner');
        var award = jQuery(this).attr('award-id');

        function handleResults(errors, successes) {
          var badgeDetails = ', ' + badgeName + ', ' + badgeEarner + ', ';
          function notifyBadges(data) {
            jQuery.ajax({
              url: '/badgesafe/record-issued-badges.php',
              type: 'POST',
              data: data
            });
          }

          if (errors.length > 0) {
            var error = 'ERROR';
            notifyBadges({
              data: error + badgeDetails + JSON.stringify(errors),
              error: error
            });
          }
          if (successes.length > 0) {
            jQuery('#badge-btn-' + award).html(
              '<a href="#" class="disabled">Exported</a>'
            );
            notifyBadges({
              data: 'SUCCESS' + badgeDetails + badgeUrl,
              award: award
            });
          }
        }

        this.claimBadge(OpenBadges, [badgeUrl], handleResults);
      },

      backpack: function(complete, element) {
        var btn = element.find('p[id*=badge-btn-]')[0];
        if (complete && btn && btn.childNodes[0]) {
          btn.childNodes[0].setAttribute('class', 'claim');
          return {
            active: true,
            button: btn.innerHTML,
            awardId: btn.childNodes[0].getAttribute('award-id')
          };
        }
        return {
          active: false
        };
      },

      extractIdsFromString: function(string) {
        var args = string.match(/(\d+)/g);
        if (args.length === 4) {
          return {
            badgeId: args[0],
            clickey: args[1],
            courseId: args[2],
            userId: args[3]
          };
        } else {
          return {
            badgeId: '',
            clickey: '',
            userId: '',
            courseId: ''
          };
        }
      }
    };
  })();
