this.mmooc=this.mmooc||{};


this.mmooc.badges = function() {

    var _frame_document = document.getElementById('tool_content').contentWindow.document;
    var $badges = $(_frame_document).find('#badge-wrap .row-fluid .span4');
    $badges.each(function (){
        $(this).hide();
        transformAndShow(this);
    });


    var transformAndShow = function (badgeView) {

    };


    return {
        initPage: function() {
            mmooc.util.adaptHeghtToIframeContentForId('tool_content');
        }
    }
}();
