this.mmooc = this.mmooc || {};

this.mmooc.kpas = (function() {
    return {
        showInfo: function(groups) {
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
        createMunicipalityDiagram: function(courseId, groupsInfo) {
            if (groupsInfo.municipalityId === undefined || courseId === undefined) {
                return null;
            }
            var graphicId = "#kommune-statistikk";
            var iframeSrc = "https://server/kpas/kpas.html?version=KPAS_IFRAME_VERSION&courseId=" + courseId + "&municipalityId=" +  groupsInfo.municipalityId;
            var html = "<iframe id='kpas' src='" + iframeSrc + "' height='600' width='100%'></iframe>";
            if($(graphicId).length == 0) {
                return;
            }
            $(graphicId).html(html);
            return null;
        },
        createCountyDiagram: function(courseId, groupsInfo) {
            if (groupsInfo.countyId === undefined || courseId === undefined) {
                return null;
            }
            var graphicId = "#fylke-statistikk";
            if($(graphicId).length == 0) {
                return;
            }
            var iframeSrc = "https://server/kpas/kpas.html??version=KPAS_IFRAME_VERSION&courseId=" + courseId + "&countyId=" +  groupsInfo.countyId;
            var html = "<iframe id='kpas' src='" + iframeSrc + "' height='600' width='100%'></iframe>";
            if($(graphicId).length == 0) {
                return;
            }
            $(graphicId).html(html);
            return null;
        },
    }
})();

