//D3 code from https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3

this.mmooc = this.mmooc || {};

//https://medium.com/@pointbmusic/youtube-api-checklist-c195e9abaff1
this.mmooc.kpas = (function() {
    var hrefPrefix = 'https://statistics-api.azurewebsites.net/api/statistics/';
    
    return {
        getLeftMargin(data) {
            var l = 0;
            for(var i = 0; i < data.length; i++) {        
                l = Math.max(data[i].name.length, l);
            }
            return l*10;
        },
        drawChart() {

        },
        createDiagram(...options) {
            const [
                htmlElementId, data, column1name, column2name, sort
            ] = options;
            const MAX_WIDTH = 960;
        
            const currentSort = sort || {};
        
            const container = d3.select(htmlElementId);
        
            const workingWidth = Math.min(MAX_WIDTH, container.node().offsetWidth);
        
            const column1width = window.innerWidth > 768 ? 250 : 125;
            const column2width = workingWidth - column1width;
        
            const table = container.append("table")
                .attr("class", "table-kpas")
                .attr("width", workingWidth)
                .attr("role", "table");
        
            const maxX = d3.max(data, d => d.enrollment_percentage_category);
            const x = d3.scale.linear()
                .range([0, column2width])
                .domain([
                    0,
                    maxX
                ]);
            // Get the needed translate amount to get from old position to new
            const getTranslatePosition = (d, el) => {
                const newIndex = data.map(_d => _d.name).indexOf(d.name);
        
                const newOffsetTop = data.reduce((acc, _d, i) => {
                    if (i < newIndex) {
                        acc += _d.rowHeight;
                    }
                    return acc;
                }, 0);
        
        
                const currentOffsetTop = el.getBoundingClientRect().top - el.parentElement.getBoundingClientRect().top;
                const translateAmount = newOffsetTop - currentOffsetTop;
                return translateAmount;
            };
        
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
                    colspan: maxX
                }
            ];
            if (currentSort.sortDirection && currentSort.sortField) {
                const previouslySorted = headers.find(header => header.sortField === currentSort.sortField);
                if (previouslySorted) {
                    previouslySorted.sortDirection = currentSort.sortDirection;
                }
            }
        
            const thead = table.append("thead");
            const tableHeader = thead.append("tr")
                .attr("role", "row")
                .attr("class", "table-header");
            const tableTicks = thead.append("tr")
                .attr("class", "table-ticks")
        
            // To use aria-sort we need to add role and scope for html validation
            const th = tableHeader.selectAll("th")
                .data(headers)
                .enter()
                .append("th")
                .attr("colspan", d => d.colspan)
                .attr("role", "columnheader")
                .attr("scope", "col")
                .attr("aria-sort", d => d.sortDirection);
        
            const xTicks = [];
            for (let i = 0; i < maxX; i++) {
                xTicks.push(`${i * 20}–${(i + 1) * 20}%`);
            }
        
            window.requestAnimationFrame(() => {
                table.node().style.setProperty('--table-header-height', `${tableHeader.node().offsetHeight}px`);
            });
            const theadRowHeight = tableHeader.node().offsetHeight;
        
            tableTicks.selectAll("th")
                .data(["", ...xTicks])
                .enter()
                .append("th")
                .attr("width", x(1))
                .attr("colspan", 1)
                .text(d => d);
        
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
        
                data.sort((a, b) => d3[header.attr("aria-sort")](a[sortField], b[sortField]));
                sortRows();
            };
        
            th.append("button")
                .attr("id", d => d.id)
                .text(d => d.name)
                .on("click", function (d) {
                    handleSortClick(this.parentNode, d.sortField);
                });
        
            /* ---------------------- */
            /* -------- BODY -------- */
        
            const tbody = table.append("tbody");
            const tr = tbody.selectAll("tr")
                .data(data, d => d.name)
                .enter()
                .append("tr")
                .attr("style", d => `transform: translate3d(0,0px,0)`)
        
            // Create the name column
            tr.append("td").attr("class", "data name")
                .attr("width", column1width)
                .text(function (d) { return d.name });
        
            // Create the percent value column
            tr.append("td").attr("class", "data value")
                .attr("colspan", maxX)
                .attr("style", () => `background-size: ${x(1)}px 100%`)
                .append("div")
                .attr("class", "bar")
                .attr("style", d => `width: ${x(d.enrollment_percentage_category)}px;`);
        
        
            const rowHeights = tr[0].reduce((acc, el, index) => {
                acc[data[index].name] = el.getBoundingClientRect().height;
                return acc;
            }, {});
        
            data.map((d) => {
                d.rowHeight = rowHeights[d.name];
                return d;
            });
        
            const handleResize = () => {
                window.removeEventListener("resize", resizeDebouneFn, true);
                table.remove();
        
                const newOptions = [...options];
                if (sort) {
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
