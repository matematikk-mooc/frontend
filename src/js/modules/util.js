this.mmooc=this.mmooc||{};


this.mmooc.util = function() {
    return {
        renderTemplateWithData: function(template, data) {
            var html = "";
            try {
                html = mmooc.templates[template](data);
            } catch (e) {
                console.log(e);
            }

            return html;

        }
    };
}();

