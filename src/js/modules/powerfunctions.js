this.mmooc=this.mmooc||{};

this.mmooc.powerFunctions = function() {
    var rootId = undefined;

    function _render(template, data) {
        var html = mmooc.util.renderTemplateWithData(template, data);
        document.getElementById(rootId).innerHTML = html;
    }

    function _readFile(file, callback) {
        var reader = new FileReader();
        reader.onload = function(event){
            callback(event.target.result);
        };
        reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
        reader.readAsText(file);
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

    function _renderGroupView() {
        mmooc.api.getAccounts(function(accounts) {
            _render("powerfunctions-group-category",
                    {accounts: accounts});
            $('select[name="account"]').change(function() {
                _renderGroupCategoryOptions($(this));
            });
        });
    }

    function _processAssignFile(file) {
        _readFile(file, function(content) {
            var assigns = $.csv.toObjects(content);
            _render("powerfunctions/assign-process", {assigns: assigns});
            for (var i = 0; i < assigns.length; i++) {
                var gid = assigns[i]["group_id"];
                var uid = assigns[i]["user_id"];
                var row = $("mmpf-assign-"+gid+"-"+uid);
                mmooc.api.createGroupMembership(
                    gid, uid,
                    function () {
                        $("td.status", row).removeClass("waiting").addClass("ok").text("OK");
                    },
                    function () {
                        debugger;
                        $("td.status", row).removeClass("waiting").addClass("failed").text("Failed");
                    }
                );
            }
        });
    }

    function _renderAssignView() {
        _render("powerfunctions-assign", {});
        $('input[type="submit"]').click(function() {
            var file = $('input:file')[0].files.item(0);
            _processAssignFile(file);
            return false;
        });

    }
    function _renderLoginsView() {
        _render("powerfunctions-logins",
                {});
    }

    function _setUpClickHandlers() {
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
            rootId = parentId;
            //_render("powerfunctions", {});
            _renderAssignView();
            //_setUpClickHandlers();
        }

    };
}();
