this.mmooc = this.mmooc || {};

this.mmooc.tinyMCEEditor = (function () {

    function getGroupNames(userGroups) {
        let groupNames = [];
        for (let i = 0; i < userGroups.length; i++){
            groupNames.push(userGroups[i].name);
        }
        return groupNames;
    }

    function hyphenateGroupNames(groupNames) {
        const regExp = /\s+/g;
        let hyphenatedGroupNames = [];
        for (let i = 0; i < groupNames.length; i++){
            const trimmedName = groupNames[i].trim();
            const hyphenatedName = trimmedName.replace(regExp, "-");
            hyphenatedGroupNames.push(hyphenatedName);
        }
        return hyphenatedGroupNames;
    }

    function hashtagGroupNames(hyphenatedGroupNames) {
        let hashtaggedGroupNames = [];
        for (let i = 0; i < hyphenatedGroupNames.length; i++){
            const hashtaggedGroupName = "#" + hyphenatedGroupNames[i];
            hashtaggedGroupNames.push(hashtaggedGroupName)
        }
        return hashtaggedGroupNames;
    }

    function htmlDecode(encoded) {
        const doc = new DOMParser().parseFromString(encoded, "text/html");
        return doc.documentElement.textContent;
    }

    return {
        injectGroupHashtags: function (userGroups) {
            const groupNames = getGroupNames(userGroups);
            const hyphenatedGroupNames = hyphenateGroupNames(groupNames);
            const hashtaggedHyphenatedGroupNames = hashtagGroupNames(hyphenatedGroupNames);
            const joinedNames = hashtaggedHyphenatedGroupNames.join(" ").toString() + "";
            const htmlElementWithGroupNames = "<p>&nbsp;</p><p>&nbsp;</p><p><span style=\"font-size: 10pt; color: gray;\">" + joinedNames + "</span></p>";
            
            const rawContent = tinyMCE.activeEditor.getContent();
            const decodedContent = htmlDecode(rawContent);
            if (decodedContent.search(joinedNames) === -1) {
                tinyMCE.activeEditor.setContent(rawContent + htmlElementWithGroupNames);
            }
        }
    }
})();
