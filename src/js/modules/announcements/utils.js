import { doc } from "prettier";

//For old canvas discussion design
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
// For new canvas discussion design
export function removeCanvasDiscussionElements() {
    if (ENV.active_context_tab == "announcements" ){
        // It should not be possible to reply to an announcement
        document.getElementsByClassName("discussion-topic-reply-button")[0].remove();
    }
    //Toolbar to sort and search discussion posts
    document.getElementsByClassName("css-13ln38u-view")[0].remove();

}
