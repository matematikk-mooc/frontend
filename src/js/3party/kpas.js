//D3 code from https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3

this.mmooc = this.mmooc || {};

//https://medium.com/@pointbmusic/youtube-api-checklist-c195e9abaff1
this.mmooc.kpas = (function() {
    var hrefPrefix = 'https://statistics-api.azurewebsites.net/api/statistics/';
    
    return {
        createDiagram : function(...options) {
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
/*            
            const sortRows = () => {
                table.selectAll("tbody tr")
                    .transition()
                    .duration(500)
                    .attr("style", function (d) {
                        return `border-color: transparent; transform: translate3d(0,${getTranslatePosition(d, this)}px,0)`;
                    })
                    .each("end", function (d, index) {
                        const self = this;
                        window.requestAnimationFrame(function () {
                            self.style.transform = "translate3d(0,0px,0)";
                            self.style.borderColor = null;
                            if (index === 0) {
                                table.selectAll("tbody tr")
                                    .data(data, d => d.name)
                                    .order();
                            }
                        })
                    })
            };            
*/        
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
                .attr("id", "table-kpas-tooltip")
                .attr("class", "table-kpas-tooltip")
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
                .attr("aria-label", d => `Prosentkategori: ${getPercentageRange(d.enrollment_percentage_category - 1)}`)
                .attr("style", d => `width: ${cellWidth * d.enrollment_percentage_category}px;`)
                .on("mouseover", function (event, d) {
                    var bx = document.getElementById("kpas-grafikk").getBoundingClientRect().x + 10;
                    var by = document.getElementById("kpas-grafikk").getBoundingClientRect().y + 10;
                    var x = event.pageX - window.scrollX;
                    var y = event.pageY - window.scrollY;

                    console.log("bx:"+bx + " by:"+by);
                    console.log("ex:"+event.pageX + " ey:"+event.pageY);
                    console.log("x:" +x + " y: " +y);
                    d3.select(this).attr("aria-describedby", "table-kpas-tooltip");
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                    tooltip.html(`Prosentkategori: ${getPercentageRange(d.enrollment_percentage_category - 1)}`)
                        .style("left", x + "px")
                        .style("top", y -40 + "px");
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
                mmooc.kpas.createDiagram(...newOptions);
            };
        
            // Debounce resize so we don't redraw on each event, but when finished resizing
            let resizeDebounce;
            const resizeDebouneFn = function () {
                clearTimeout(resizeDebounce);
                resizeDebounce = setTimeout(handleResize, 100);
            };
            window.addEventListener("resize", resizeDebouneFn, true);
        },

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
            .then((result) => {
                $(progressId).html("");
                callback(result);
            })
            .catch((error) => {
                if (error) {
                    progressId.innerHTML = error
                    console.log("failure!", error); 
                }
            });
    
/*
            .on("progress", function() { 
                console.log("progress", d3.event.loaded); })
            .on("load", function(json) { 
                $(progressId).html("");
                console.log("success!"); callback(json) })
            .on("error", function(error) { 
                progressId.innerHTML = error
                console.log("failure!", error); })
            .get();
*/            
        },
        createMunicipalityDiagram: function(courseId, groupsInfo) {
            if (groupsInfo.municipalityId === undefined || courseId === undefined) {
                return null;
            }
            var graphicId = "#kommune-statistikk";
            if($(graphicId).length == 0) {
                return;
            }
            var progressId = "#kommune-fremdrift";

            var url = hrefPrefix + "primary_schools/municipality/" + groupsInfo.municipalityId + "/course/" + courseId;
            mmooc.kpas.getJsonData(url, progressId, "kommunen", function(result) {
                var data = result.Result[0].schools;
    
                //sort bars based on value
                data = data.sort(function (a, b) {
                    return d3.ascending(a.name, b.name);
                })
    
                var kommuneNavnId = "#kommune-navn"
                if($(kommuneNavnId).length != 0) {
                    $(kommuneNavnId).html(result.Result[0].municipality_name);
                }
                mmooc.kpas.createDiagram(graphicId, data, "Skole", "Prosentkategori");
            });
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
            var progressId = "#fylke-fremdrift";
            var url = hrefPrefix +"primary_schools/county/" + groupsInfo.countyId + "/course/" + courseId;
            mmooc.kpas.getJsonData(url, progressId, "fylket", function(result) {
                var data = result.Result[0].municipalities;
    
                //sort bars based on value
                data = data.sort(function (a, b) {
                    return d3.ascending(a.name, b.name);
                })
    
                var fylkeNavnId = "#fylke-navn"
                if($(fylkeNavnId).length != 0) {
                    $(fylkeNavnId).html(result.Result[0].county_name);
                }
                mmooc.kpas.createDiagram(graphicId, data, "Kommune", "Prosentkategori");
            });
            return null;
        },
    }
})();
