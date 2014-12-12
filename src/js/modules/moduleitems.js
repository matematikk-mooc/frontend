this.mmooc=this.mmooc||{};


this.mmooc.moduleItems = function() {
    return {
        listModuleItems: function(parentId) {
            mmooc.api.getCurrentModule(function(module) {
                var html = mmooc.util.renderTemplateWithData("moduleitems", module);
                document.getElementById(parentId).insertAdjacentHTML('beforeend', html);
            });
        }
    };
}();
