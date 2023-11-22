
export function removeCanvasAnnouncementElements() {
    let toolbar = document.getElementById("discussion-toolbar");
    if (toolbar) {
        toolbar.remove();
    }
    let subEnteries = document.getElementById("discussion_subentries");
    if (subEnteries) {
        subEnteries.remove();
    }
    let replyArea = document.getElementsByClassName("discussion-entry-reply-area")[0];
    if (replyArea) {
        replyArea.remove();
    }

}
