this.mmooc=this.mmooc||{};


this.mmooc.util = function() {
    return {
        renderTemplateWithData: function(template, data) {
            return mmooc.templates[template](data);
        }
    };
}();

