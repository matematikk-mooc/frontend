this.mmooc = this.mmooc || {};

this.mmooc.badges = (() => {
  const resizeIframe = () => {
    mmooc.util.adaptHeightToIframeContentForId(
      'tool_content_wrapper',
      'tool_content'
    );
  };
  return {
    initPage() {
      resizeIframe();
      let resizeTimer;
      $(window).resize(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeIframe, 42);
      });
    },
    claimBadge(OpenBadges, urls, callBack) {
      OpenBadges.issue_no_modal(urls, callBack);
    }
  };
})();
