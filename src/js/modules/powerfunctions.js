this.mmooc=this.mmooc||{};

this.mmooc.powerFunctions = function() {
    function _render(rootId, template, data) {
        var html = mmooc.util.renderTemplateWithData(template, data);
        document.getElementById(rootId).innerHTML = html;
    }

    function _renderGroupCategoryOptions(el) {
        var account_id = $("option:selected", el).val();
        mmooc.api.getGroupCategoriesForAccount(account_id, function(categories) {
            if (categories.length === 0) {
                var html = "<option value=\"\">No category for account</option>";
                $("select[name='category']").html(html);
            }
        });
    }

    function _renderGroupView(rootId) {
        mmooc.api.getAccounts(function(accounts) {
            _render(rootId,
                    "powerfunctions-group-category",
                    {accounts: accounts});
            $('select[name="account"]').change(function() {
                _renderGroupCategoryOptions($(this));
            });
        });
    }

    function _renderAssignView(rootId) {
        _render(rootId, "powerfunctions-assign", {});
        $('input[type="submit"]').click(function() {
            return false;
        });

    }
    function _renderLoginsView(rootId) {
        _render(rootId,
                "powerfunctions-logins",
                {});
    }

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
            _render(parentId, "powerfunctions", {});
            _setUpClickHandlers(parentId);
        }

    };
}();
