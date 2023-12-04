
import api from '../api/api';
import util from './util';

export default (function() {
  function interceptLinkToGroupPageForHref(href, event) {
    if (/\/groups\/\d+$/.test(href)) {
      event.preventDefault();
      location.href = href + '/discussion_topics';
    }
  }

  return {
    interceptLinksToGroupPage: function() {
      $('#content').on('click', '.student-group-title a', function(event) {
        var href = $(this).attr('href');
        interceptLinkToGroupPageForHref(href, event);
      });

      $('#right-side').on('click', '.group_list a', function(event) {
        var href = $(this).attr('href');
        interceptLinkToGroupPageForHref(href, event);
      });

      //20180906ETH Vi ønsker diskusjonsvisning som default for lærere også.
      $('#content-wrapper').on('click', '.visit-group', function(event) {
        var href = $(this).attr('href');
        interceptLinkToGroupPageForHref(href, event);
      });
    },
    interceptLinksToTeacherGroupPage: function() {
      //20180906ETH Vi ønsker diskusjonsvisning som default for lærere også.
      $('#left-side').on('click', '.ui-menu-item a', function(event) {
        var href = $(this).attr('href');
        interceptLinkToGroupPageForHref(href, event);
      });
    },

    changeGroupListURLs: function(href) {
      if (
        /\/groups(\/)?$/.test(href) ||
        /(\/groups(\??([A-Za-z0-9\=\&]{0,})))$/.test(href)
      ) {
        var list = $('.context_list li a');
        list.each(function(i) {
          this.setAttribute(
            'href',
            this.getAttribute('href') + '/discussion_topics'
          );
        });
        return true;
      }

      return false;
    },
  };
})();
