this.mmooc = this.mmooc || {};

this.mmooc.tinyMCEEditor = (function () {

    function getGroupNames(userGroups) {
        let groupNames = [];
        for (let i = 0; i < userGroups.length; i++){
            console.log(userGroups[i].name);
            groupNames.push(userGroups[i].name)
        }
        return groupNames;
    }

    function hyphenateGroupNames(groupNames) {
        const regExp = /\s+/g;
        let hyphenatedGroupNames = [];
        for (let i = 0; i < groupNames.length; i++){
            const trimmedName = groupNames[i].trim();
            const hyphenatedName = trimmedName.replace(regExp, "-");
            hyphenatedGroupNames.push(hyphenatedName)
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

    return {
        injectGroupHashtags: function (userGroups) {
            const groupNames = getGroupNames(userGroups);
            const hyphenatedGroupNames = hyphenateGroupNames(groupNames);
            const hashtaggedHyphenatedGroupNames = hashtagGroupNames(hyphenatedGroupNames);
            const htmlElementWithGroupNames = "<p>&nbsp;</p><p>&nbsp;</p><p>" + hashtaggedHyphenatedGroupNames.join(" ") + "</p>";
            tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent() + htmlElementWithGroupNames);
        }
    }
})();