//D3 code from https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3

this.mmooc = this.mmooc || {};

//https://medium.com/@pointbmusic/youtube-api-checklist-c195e9abaff1
this.mmooc.kpas = (function() {
    var hrefPrefix = 'https://statistics-api.azurewebsites.net/api/statistics/';

    return {
        createDiagram : function(data, elementId, name) {
            var graphicId = name+ "-graphic".trim();
            var htmlCode = mmooc.util.renderTemplateWithData(
                'statistics',
                {name:name,
                graphicId:graphicId}
              );
              document
                .getElementById(elementId)
                .insertAdjacentHTML('afterbegin', htmlCode);

            //set up svg using margin conventions - we'll need plenty of room on the left for labels
            var margin = {
                top: 15,
                right: 25,
                bottom: 15,
                left: 250
            };
    
            var width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
    
            var svg = d3.select("#"+graphicId).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, d3.max(data, function (d) {
                    return d.enrollment_percentage_category;
                })]);
    
            var y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1)
                .domain(data.map(function (d) {
                    return d.name;
                }));
    
            //make y axis to show bar names
            var yAxis = d3.svg.axis()
                .scale(y)
                //no tick marks
                .tickSize(0)
                .orient("left");
    
            var gy = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
    
            var bars = svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("g")
    
            //append rects
            bars.append("rect")
                .attr("class", "bar")
                .attr("y", function (d) {
                    return y(d.name);
                })
                .attr("height", y.rangeBand())
                .attr("x", 0)
                .attr("width", function (d) {
                    return x(d.enrollment_percentage_category);
                });
    
            //add a value label to the right of each bar
            bars.append("text")
                .attr("class", "label")
                //y position of the label is halfway down the bar
                .attr("y", function (d) {
                    return y(d.name) + y.rangeBand() / 2 + 4;
                })
                //x position is 3 pixels to the right of the bar
                .attr("x", function (d) {
                    return x(d.enrollment_percentage_category) + 3;
                })
                .text(function (d) {
                    return d.enrollment_percentage_category;
                });   
        },
        showInfo: function(groups) {
            if(!groups.length) {
                return;
            }  
      
            $("#kpas-lti-info").show();
            $("#kpas-lti-warning").hide();
        },
        createMunicipalityDiagram: function(courseId, groupsInfo) {
            if (groupsInfo.municipalityId === undefined || courseId === undefined) {
                return null;
            }
            d3.json(hrefPrefix + "primary_schools/municipality/" + groupsInfo.municipalityId + "/course/" + courseId, function(error, result) {
                var data = result.Result[0].schools;
                if (error) {
                    throw error;
                }
    
                //sort bars based on value
                data = data.sort(function (a, b) {
                    return d3.ascending(a.enrollment_percentage_category, b.enrollment_percentage_category);
                })
    
                mmooc.kpas.createDiagram(data, "kommune-statistikk", result.Result[0].municipality_name);
            });
            return null;
        },
        createCountyDiagram: function(courseId, groupsInfo) {
            if (groupsInfo.countyId === undefined || courseId === undefined) {
                return null;
            }
            d3.json(hrefPrefix +"primary_schools/county/" + groupsInfo.countyId + "/course/" + courseId, function(error, result) {
                var data = result.Result[0].municipalities;
                if (error) {
                    throw error;
                }
    
                //sort bars based on value
                data = data.sort(function (a, b) {
                    return d3.ascending(a.enrollment_percentage_category, b.enrollment_percentage_category);
                })
    
                mmooc.kpas.createDiagram(data, "fylke-statistikk", result.Result[0].county_name);
            });
            return null;
        },
    }
})();
$.getScript('https://d3js.org/d3.v3.min.js');