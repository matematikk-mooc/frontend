var courseId = null;
var resizeDebounce = null;
const sortParam = {
    sortDirection: "ascending",
    sortField: "name"
};

function createDiagram(...options) {
    const [
        htmlElementId, data, column1name, column2name, previousSort
    ] = options;

    let diagramData = data;

    const MAX_WIDTH = 960;
    const MAX_X = 5;

    // These should match CSS
    const SMALL_BREAKPOINT = 768;
    const PREFFERED_COLUMN_WIDTH = {
        LARGE: 250,
        SMALL: 125
    };

    // If a rerender, keep track of previous sort
    const currentSort = previousSort || {};

    const container = d3.select(htmlElementId);
    const workingWidth = Math.min(MAX_WIDTH, container.node().offsetWidth);

    // Column 1 (name column) is given a set width
    const column1width = window.innerWidth > SMALL_BREAKPOINT ? PREFFERED_COLUMN_WIDTH.LARGE : PREFFERED_COLUMN_WIDTH.SMALL;
    // Rest of width is given to column 2
    const column2width = workingWidth - column1width;
    const cellWidth = column2width / MAX_X;

    const table = container.append("table")
        .attr("class", "table-kpas")
        .attr("width", workingWidth)
        .attr("role", "table");


    /* -------- HEADER -------- */
    const headers = [
        {
            name: column1name,
            sortDirection: "none",
            sortField: "name",
            id: "byKey",
            colspan: 1
        },
        {
            name: column2name,
            sortDirection: "none",
            sortField: "enrollment_percentage_category",
            id: "byValue",
            colspan: MAX_X
        }
    ];

    // If a rerender and previous render was sorted, sort this render the same
    if (currentSort.sortDirection && currentSort.sortField) {
        const previouslySorted = headers.find(header => header.sortField === currentSort.sortField);
        if (previouslySorted) {
            previouslySorted.sortDirection = currentSort.sortDirection;
        }
    }

    const thead = table.append("thead");
    // Names of columns
    const tableHeader = thead.append("tr")
        .attr("role", "row")
        .attr("class", "table-header");
    // Percentage ticks
    const tableTicks = thead.append("tr")
        .attr("class", "table-ticks")

    // To use aria-sort we need to add role and scope for html validation
    const th = tableHeader.selectAll("th")
        .data(headers)
        .enter()
        .append("th")
        .attr("class", "table-sort")
        .attr("colspan", d => d.colspan)
        .attr("role", "columnheader")
        .attr("scope", "col")
        .attr("aria-sort", d => d.sortDirection);


    // 0 -> 1-20%,  1 -> 21-40%
    const getPercentageRange = (index, stepSize = 20) => {
        if (index < 0) {
            return "0%";
        }

        let start = index * stepSize;
        start++;

        const stop = (index + 1) * stepSize;

        // After the – there is a U+200B, a zero width space, to make it break into two lines nicer
        return `${start}–​${stop}%`
    };

    // Once layout calculations are finished, save header height. Used to make header ticks sticky when scrolling
    window.requestAnimationFrame(() => {
        table.node().style.setProperty('--table-header-height', `${tableHeader.node().offsetHeight}px`);
    });

    // Create data array for percentage ticks
    const xTicks = [];
    for (let i = 0; i < MAX_X; i++) {
        xTicks.push(getPercentageRange(i));
    }

    tableTicks.selectAll("th")
        .data(["", ...xTicks])
        .enter()
        .append("th")
        .attr("width", cellWidth)
        .attr("colspan", 1)
        .text(d => d);


    // When sorting, get the needed translate amount to get from old position to new
    const getTranslatePosition = (d, el) => {
        const newIndex = diagramData.map(_d => _d.name).indexOf(d.name);

        const newOffsetTop = diagramData.reduce((acc, _d, i) => {
            if (i < newIndex) {
                acc += _d.rowHeight;
            }
            return acc;
        }, 0);


        const currentOffsetTop = el.getBoundingClientRect().top - el.parentElement.getBoundingClientRect().top;
        const translateAmount = newOffsetTop - currentOffsetTop;
        return translateAmount;
    };

    const sortRows = async () => {
        const rows = table.selectAll("tbody tr");
        await rows.transition()
            .duration(500)
            .style("border-color", "transparent")
            .style("transform", function (d) {
                return `translate3d(0,${getTranslatePosition(d, this)}px,0)`;
            })
            .end();

        window.requestAnimationFrame(function () {
            rows.style("transform", "translate3d(0,0px,0)")
                .style("border-color", null)
                .data(diagramData, d => d.name)
                .order();
        });
    };

    const handleSortClick = (headerEl, sortField) => {
        const header = d3.select(headerEl);
        const sort = header.attr("aria-sort");
        th.attr("aria-sort", "none");

        header.attr("aria-sort", () => {
            if (sort === "none" || sort === "ascending") return "descending";
            return "ascending";
        });

        // Save state for reuse when redrawing chart after resize
        currentSort.sortDirection = header.attr("aria-sort");
        currentSort.sortField = sortField;

        // Use d3.ascending / d3.descending function with array.sort to sort data array
        diagramData = diagramData.sort((a, b) => d3[header.attr("aria-sort")](a[sortField], b[sortField]));
        sortRows();
    };

    th.append("button")
        .attr("class", "column-sorter")
        .attr("id", d => d.id)
        .text(d => d.name)
        .on("click", function (event, d) {
            handleSortClick(this.parentNode, d.sortField);
        });

    /* ---------------------- */
    /* -------- BODY -------- */

    const tbody = table.append("tbody");
    const tr = tbody.selectAll("tr")
        .data(diagramData, d => d.name)
        .enter()
        .append("tr")
        .attr("style", d => `transform: translate3d(0,0px,0)`);

        
    const tooltip = container.append("div")
        .attr("id", "table-tooltip")
        .attr("class", "table-tooltip")
        .attr("role", "tooltip")
        .style("opacity", 0);

    // Create the name column
    tr.append("td").attr("class", "data name")
        .attr("width", column1width)
        .text(function (d) { return d.name });

    // Create the percent value column
    tr.append("td").attr("class", "data value")
        .attr("colspan", MAX_X)
        .attr("style", () => `background-size: ${cellWidth}px 100%`)
        .append("div")
        .attr("class", "bar")
        .attr("aria-label", function(d,i) {
            if(d.enrollment_percentage_category < 99) {
                return `Prosentkategori: ${getPercentageRange(d.enrollment_percentage_category - 1)}`
            }
            return `Dataene er skjult grunnet personvernhensyn.`;
        }) 
        .attr("style", function(d,i) {
            if(d.enrollment_percentage_category < 99) {
                return `width: ${cellWidth * d.enrollment_percentage_category}px;`;
            }
            return `background: #6d889d; border-radius: 50%; width: 10px; height: 10px;`;
        })
        .on("mouseover", function (event, d) {
            d3.select(this).attr("aria-describedby", "table-tooltip");
            tooltip.transition()
                .duration(200)
                .style("opacity", 1);
            if(d.enrollment_percentage_category < 99) {
                tooltipText = `Prosentkategori: ${getPercentageRange(d.enrollment_percentage_category - 1)}`;
            } else {
                tooltipText = "Dataene er skjult grunnet personvernhensyn."
            }
            tooltip.html(tooltipText)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 40) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).attr("aria-describedby", null);
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });


    const rowHeights = tr.nodes().reduce((acc, el, index) => {
        acc[diagramData[index].name] = el.getBoundingClientRect().height;
        return acc;
    }, {});

    // Add row height to each row object 
    diagramData = diagramData.map((d) => {
        d.rowHeight = rowHeights[d.name];
        return d;
    });

    // Redraw table with correct sizes on resize
    const handleResize = () => {
        window.removeEventListener("resize", resizeDebouneFn, true);
        table.remove();
        tooltip.remove();
        const newOptions = [...options];
        newOptions[1] = diagramData;

        if (previousSort) {
            newOptions.pop();
        }
        newOptions.push(currentSort);
        createDiagram(...newOptions);
    };

    // Debounce resize so we don't redraw on each event, but when finished resizing
    const resizeDebouneFn = function () {
        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(handleResize, 100);
    };
    window.addEventListener("resize", resizeDebouneFn, true);
    sendResizeMessage();
}
/// END 

function sendResizeMessage() {
    var parentResizeMessageMsg = {
        subject: "kpas.frameResize",
        height: window.document.body.offsetHeight + 50
    };
    window.parent.postMessage(JSON.stringify(parentResizeMessageMsg), '*');
}
//Parse href - not part of final implementation
function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
}
function urlParamsToObject() {
    if (document.location.search === '') return {};

    const search = location.search.substring(1);
    return parse_query_string(search);
}

function loadMunicipalityGraphic(courseId, municipalityId) {
    document.getElementById("graphic-name").innerHTML = "<span class='loading-gif'></span>";
    d3.json("https://statistics-api.azurewebsites.net/api/statistics/primary_schools/municipality/" + municipalityId + "/course/" + courseId)
    .then((result) => {
        document.getElementById("graphic-name").innerHTML = result.Result[0].municipality_name;
        const data = result.Result[0].schools;
        createDiagram("#graphic", data, "Skole", "Prosentkategori", sortParam);
    })
    .catch((error) => {
        if (error) {
            document.getElementById("graphic-name").innerHTML = error.message;
        }
    });
}
function loadCountyGraphic(courseId, countyId) {
    document.getElementById("graphic-name").innerHTML = "<span class='loading-gif'></span>";
    d3.json("https://statistics-api.azurewebsites.net/api/statistics/primary_schools/county/" + countyId + "/course/" + courseId)
    .then((result) => {
        document.getElementById("graphic-name").innerHTML = result.Result[0].county_name;
        const data = result.Result[0].municipalities;
        createDiagram("#graphic", data, "Kommune", "Prosentkategori", sortParam);
    })
    .catch((error) => {
        if (error) {
            document.getElementById("graphic-name").innerHTML = error.message;
        }
    });
}

function updateCountyGraphic() {
    var countyId = document.getElementById("fylke").value;
    if(countyId == "") {
        document.getElementById("graphic-name").innerHTML = "Vennligst oppgi et fylkesnummer.";
        return;
    }
    clearTimeout(resizeDebounce);
    d3.select("#table-tooltip").remove();
    d3.select(".table-kpas").remove();
    loadCountyGraphic(courseId, countyId);
}
function updateMunicipalityGraphic() {
    var municipalityId = document.getElementById("kommune").value;
    if(municipalityId == "") {
        document.getElementById("graphic-name").innerHTML = "Vennligst oppgi et kommunenummer.";
        return;
    }
    clearTimeout(resizeDebounce);
    d3.select("#table-tooltip").remove();
    d3.select(".table-kpas").remove();
    loadMunicipalityGraphic(courseId, municipalityId)
}

function loadGraphic() {
    const urlParamsObj = urlParamsToObject();
    const municipalityId = urlParamsObj && urlParamsObj['municipalityId'];
    const countyId = urlParamsObj && urlParamsObj['countyId'];
    //Course id is defined on global scope such that it is available for the update functions above.
    courseId = urlParamsObj && urlParamsObj['courseId'];
    const show = urlParamsObj && urlParamsObj['show'];

    if(show) {
        if(show == "kommune-statistikk") {
            document.getElementById("kommuneValg").style.display = "block";
        } else if (show == "fylke-statistikk") {
            document.getElementById("fylkeValg").style.display = "block";
        }
    } else if(courseId !== undefined) {
        if (municipalityId !== undefined) {
            loadMunicipalityGraphic(courseId, municipalityId);            
        }
        else if(countyId !== undefined) {
            loadCountyGraphic(courseId, countyId)
        }
    }
}


