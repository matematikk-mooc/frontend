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

    function _accountID() {
        return $('select[name="account"] option:selected').val();
    }

    function _renderGroupCategoryOptions() {
        mmooc.api.getGroupCategoriesForAccount(_accountID(), function(categories) {
            var html = "";
            if (categories.length === 0) {
                html = "<option value=\"\">No group sets defined for account</option>";
            }
            else {
                html = html + "<option value=''>Choose a group set</option>";
                for (var i = 0; i < categories.length; i++) {
                    html = html + "<option value=" + categories[i].id + ">" + categories[i].name + "</option>";
                }
            }
            $("select[name='category']").html(html);
        });
    }

    function _renderGroupView() {
        mmooc.api.getAccounts(function(accounts) {
            _render("powerfunctions/group-category",
                    {accounts: accounts});
            $('select[name="account"]').change(function() {
                _renderGroupCategoryOptions();
            });
            _setUpSubmitHandler(_processGroupFile);
        });
    }

    function _success(row) {
        return function () {
            $("td.status", row).removeClass("waiting").addClass("ok").text("OK");
        };
    }

    function _error(row) {
        return function (jqXHR, textStatus, errorThrown ) {
            $("td.status", row).removeClass("waiting").addClass("failed").
                text("Failed: " + errorThrown + ": " + JSON.parse(jqXHR.responseText).errors[0].message);
        };
    }

    function _setUpSubmitHandler(callback) {
        $('input[type="submit"]').click(function() {
            var file = $('input:file')[0].files.item(0);
            _readFile(file, function(content) {
                callback(content);
            });
            return false;
        });
    }

    function _processGroupFile(content) {
        var groups = $.csv.toObjects(content);
        var params = {
            account: document.getElementsByName("account")[0].value,
            category: document.getElementsByName("category")[0].value
        };
        _render("powerfunctions/groups-process", {groups: groups});
        for (var i = 0; i < groups.length; i++) {
            var row = $("#mmpf-group-"+i);
            params.name = groups[i].name;
            params.description = groups[i].description;
            mmooc.api.createGroup(params, _success(row), _error(row));
        }
    }

    function _processAssignFile(content) {
        var assigns = $.csv.toObjects(content);
        _render("powerfunctions/assign-process", {assigns: assigns});
        for (var i = 0; i < assigns.length; i++) {
            var gid = assigns[i]["group_id"];
            var uid = assigns[i]["user_id"];
            var row = $("#mmpf-assign-"+gid+"-"+uid);
            mmooc.api.createGroupMembership(gid, uid, _success(row), _error(row));
        }
    }

    function _processLoginsFile(content) {
        var logins = $.csv.toObjects(content);
        _render("powerfunctions/logins-process", {logins: logins});
        for (var i = 0; i < logins.length; i++) {
            var uid = logins[i]["user_id"];
            var lid = logins[i]["login_id"];
            var row = $("#mmpf-logins-"+uid);
            var params = {
                user_id: uid,
                login_id: lid,
                account_id: _accountID()
            };
            mmooc.api.createUserLogin(params, _success(row), _error(row));
        }
    }

    function _renderAssignView() {
        _render("powerfunctions/assign", {});
        _setUpSubmitHandler(_processAssignFile);
    }

    function _renderLoginsView() {
        mmooc.api.getAccounts(function(accounts) {
            _render("powerfunctions/logins", {accounts: accounts});
            _setUpSubmitHandler(_processLoginsFile);
        });
    }

    function _renderListGroupsView() {
      mmooc.api.getAccounts(function(accounts) {
        _render("powerfunctions/list-groups",
                {accounts: accounts});
        $('select[name="account"]').change(function() {
          _renderGroupListItems();
        });
      });
    }

  function _renderGroupListItems() {
    mmooc.api.getGroupsForAccount(_accountID(), function(groups) {
      var html = "";
      if (groups.length === 0) {
        html = "No groups found for account";
      }
      else {
        html = "<table>"
          + "<tr><th>ID</th><th>Name</th><th>Description</th></tr>";
        for (var i = 0; i < groups.length; i++) {
          html = html + "<tr><td>" + groups[i].id + "</td><td>" + groups[i].name + "</td><td>" + groups[i].description + "</td></tr>";
        }
        html = html + "</table>"
      }
      $("#mmpf-group-result").html(html);
    });
  }

    function _setUpClickHandlers() {
        $("#mmooc-pf-list-group-btn").click(function() {
            _renderListGroupsView(rootId);
        });
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
            _render("powerfunctions/main", {});
            _setUpClickHandlers();
        }

    };
}();
