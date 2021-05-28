
function visFylkesStatistikk() {
    var fylkesNr = $("#fylker option[value='" + $("#fylke").val() + "']").attr("fylkesnr");
    clearTimeout(resizeDebounce);
    d3.select("#table-tooltip").remove();
    d3.select(".table-kpas").remove();
    loadCountyGraphic(360, fylkesNr);
}  

function visKommuneStatistikk() {
    var kommuneNr = $("#kommuner option[value='" + $("#kommune").val() + "']").attr("kommunenr");
    clearTimeout(resizeDebounce);
    d3.select("#table-tooltip").remove();
    d3.select(".table-kpas").remove();
    loadMunicipalityGraphic(360, kommuneNr);
}  

function loadFylker() {
    document.getElementById("allefylker").innerHTML = "<span class='loading-gif'></span>";
    fetch('https://kpas-lti.azurewebsites.net/api/nsr/counties')
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
    fetch('https://kpas-lti.azurewebsites.net/api/nsr/counties/' + fylkesNr + "/communities")
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
