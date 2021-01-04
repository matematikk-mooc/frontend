this.mmooc = this.mmooc || {};

this.mmooc.kpas = (function() {
    return {
        showInfo: function(isTeacherOrAdmin, groups) {
            if(isTeacherOrAdmin) {
                return;
            }
            if(!groups.length) {
                $("#kpas-lti-warning").show();
                $("#kpas-lti-info").hide();
                return;
            }  
      
            $("#kpas-lti-warning").hide();
            $("#kpas-lti-info").show();
        },
        getJsonData : function(url, progressId, name, callback) {
            $(progressId).html("Laster statistikk for " + name + "<span class='loading-gif'></span>");
            d3.json(url)
            .on("progress", function() { 
                console.log("progress", d3.event.loaded); })
            .on("load", function(json) { 
                $(progressId).html("");
                console.log("success!"); callback(json) })
            .on("error", function(error) { 
                progressId.innerHTML = error
                console.log("failure!", error); })
            .get();
        },
        createDiagram: function(graphicId, isTeacherOrAdmin, courseId, groupsInfo) {
            if(courseId === undefined) {
                return null;
            }
            if($("#"+graphicId).length == 0) {
                return;
            }

            var iframeSrc = "https://server/kpas/kpas.html?version=KPAS_IFRAME_VERSION&courseId=" + courseId;
            if (isTeacherOrAdmin) {
                iframeSrc+="&show=" + graphicId;
            } else if((groupsInfo.municipalityId === undefined) || (groupsInfo.countyId === undefined)) {
                    return null;
            } else if(graphicId == "kommune-statistikk") {
                    iframeSrc += "&municipalityId=" +  groupsInfo.municipalityId;
            } else if(graphicId == "fylke-statistikk") {
                    iframeSrc += "&countyId=" +  groupsInfo.countyId;
            } else {
                return null;
            }

            var html = "<iframe id='kpas' src='" + iframeSrc + "' height='600' width='100%'></iframe>";
            $("#"+graphicId).html(html);
            return null;
        }
    }
})();

