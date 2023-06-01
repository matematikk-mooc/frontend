function urlParamsToObject() {
    if (document.location.search === '') return {};

    const search = location.search.substring(1);
    return parse_query_string(search);
}
function getCourseId() {
    const urlParamsObj = urlParamsToObject();
    //Course id is defined on global scope such that it is available for the update functions above.
    return urlParamsObj && urlParamsObj['courseId'];
}

function visFylkesStatistikk() {
    var fylkesNr = $("#fylker option[value='" + $("#fylke").val() + "']").attr("fylkesnr");
    var courseId = getCourseId();
    clearTimeout(resizeDebounce);
    d3.select("#table-tooltip").remove();
    d3.select(".table-kpas").remove();
    loadCountyGraphic(courseId, fylkesNr);
}  

function visKommuneStatistikk() {
    var kommuneNr = $("#kommuner option[value='" + $("#kommune").val() + "']").attr("kommunenr");
    var courseId = getCourseId();
    clearTimeout(resizeDebounce);
    d3.select("#table-tooltip").remove();
    d3.select(".table-kpas").remove();
    loadMunicipalityGraphic(courseId, kommuneNr);
}  

function loadFylker() {
    document.getElementById("allefylker").innerHTML = "<span class='loading-gif'></span>";
    fetch('https://kpas.kompetanse.udir.no/api/nsr/counties')
    .then(response => response.json())
    .then(data =>  {
        var html = '<input id="fylke" list="fylker">\
                    <datalist id="fylker">';
    
        data.result.forEach(o => {
            html += '<option value="' + o.Navn + '" fylkesnr="' + o.Fylkesnr + '">';
        });
        html += '</datalist></div>'
        document.getElementById('allefylker').innerHTML = html;
    });
}

function loadKommuner() {
    document.getElementById("allekommuner").innerHTML = "<span class='loading-gif'></span>";
    var fylkesNr = $("#fylker option[value='" + $("#fylke").val() + "']").attr("fylkesnr");
    fetch('https://kpas.kompetanse.udir.no/api/nsr/counties/' + fylkesNr + "/communities")
    .then(response => response.json())
    .then(data =>  {
      var html = '<input id="kommune" list="kommuner">\
                  <datalist id="kommuner">';
    
      data.result.forEach(o => {
            html += '<option value="' + o.Navn + '" Kommunenr="' + o.Kommunenr + '">';
      });
      html += '</datalist></div>'
      document.getElementById('allekommuner').innerHTML = html;
    });
}

$(document).on('change', '#fylke', function () {
    $("#visFylke").prop('disabled', false);
    loadKommuner();
});

$(document).on('change', '#kommune', function () {
    $("#visKommune").prop('disabled', false);
});
