this.mmooc=this.mmooc||{};


this.mmooc.powerFunctions = function() {
    return {
        show: function(parentId) {
            var html = mmooc.util.renderTemplateWithData("powerfunctions", {});
            document.getElementById(parentId).innerHTML = html;
        }

    };
}();
