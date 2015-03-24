this.mmooc = this.mmooc || {};


this.mmooc.util = function () {
    return {
        renderTemplateWithData: function (template, data) {
            var html = "";
            try {
                html = mmooc.templates[template](data);
            } catch (e) {
                console.log(e);
            }

            return html;

        },

        getPageTitleBeforeColon: function () {
            // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
            var title = document.title;
            if (title.indexOf(":")) {
                title = title.substring(0, title.indexOf(":"));
            }
            return title;
        },

        getPageTitleAfterColon: function () {
            // For discussion pages we only want the title to be "<discussion>" instead of "Discussion: <discussion>"
            var title = document.title;
            if (title.indexOf(":")) {
                title = title.substring(title.indexOf(":") + 1, title.length);
            }
            return title;
        },

        arraySorted: function (array, elementToSort) {
            if (Object.prototype.toString.call(array) === '[object Array]' && elementToSort) {
                return array.sort(function (a, b) {
                    if (a.hasOwnProperty(elementToSort) && b.hasOwnProperty(elementToSort)) {
                        var field1 = a[elementToSort].toLocaleLowerCase();
                        var field2 = b[elementToSort].toLocaleLowerCase();
                        return field1.localeCompare(field2);
                    }
                    return 0;
                });
            }
            return array;
        }

    };
}();

