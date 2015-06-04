this.mmooc=this.mmooc||{};


this.mmooc.powerFunctions = function() {
    function _renderGroupView(rootId) {
        mmooc.api.getAccounts(function(accounts) {
            var html = mmooc.util.renderTemplateWithData("powerfunctions-group-category",
                                                         {accounts: accounts});
            document.getElementById(rootId).innerHTML = html;
        });

    }

    function _renderAssignView(rootId) {}
    function _renderLoginsView(rootId) {}

    function _setUpClickHandlers(rootId) {
        $("#mmooc-pf-group-btn").click(function() {
            _renderGroupView(rootId);
        });
        $("#mmooc-pf-assign-btn").click(function() {
            _renderAssignView(rootId);
        });
        $("#mmooc-pf-logins-btn").click(function() {
            _renderLoginsView(rootId);
        });
    }

    return {
        show: function(parentId) {
            var html = mmooc.util.renderTemplateWithData("powerfunctions", {});
            document.getElementById(parentId).innerHTML = html;
            _setUpClickHandlers(parentId);
        }

    };
}();
