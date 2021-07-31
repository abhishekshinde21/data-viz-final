var svg = d3.select('#chartPossession').append('svg').attr("width", 760).attr("height", 560);

async function init() {
    // Acquire data
    data = await d3.csv("data/squad_possession.csv");
    // sort data
    data.sort(function (b, a) {
        return parseFloat(a.Poss) - parseFloat(b.Poss);
    });
    console.log("Data: ", data);

    // Setup dimensions
    var margin = 80;
    // var width = document.getElementById('chartOffense').clientWidth;
    // var height = document.getElementById('chartOffense').clientHeight;
    // temp dims
    var width = 600;
    var height = 400;

    // add tooltips to show descriptions (source: https://www.d3-graph-gallery.com/graph/scatter_tooltip.html)
    var tooltip = d3.select("#chartPossession")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#e9ecef") // color of jumbotron
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    var mouseover = function (d) {
        console.log("Mouse over")
        // let htmlToolTip = "<p><b><u>" + d.Squad + "</u></b></p>"
        //     + "<p><b>Total Touches: " + parseInt(d.Touches) + "</b></p>"
        //     + "<p><b>Carries: " + parseInt(d.Carries) + "</b></p>"
        //     + "<p><b>Progressive Distance: " + parseFloat(d.PrgDist) + "</b></p>";

        tooltip
            // .html(htmlToolTip)
            .style("opacity", 1)
            // .style("left", (d3.mouse(this)[0] + 80) + "px")
            // .style("top", (d3.mouse(this)[1] + 50) + "px")

    }

    var mousemove = function (d) {
        console.log("Mouse move")
        let htmlToolTip = "<p><b><u>" + d.Squad + "</u></b></p>"
        + "<p><b>Possession (%): " + parseFloat(d.Poss) + "</b></p>"
            + "<p><b>Total Touches: " + parseInt(d.Touches) + "</b></p>"
            + "<p><b>Carries: " + parseInt(d.Carries) + "</b></p>"
            + "<p><b>Progressive Distance: " + parseFloat(d.PrgDist) + "</b></p>";
        tooltip
            .html(htmlToolTip)
            .style("left", width * .5 + "px")
            .style("top", "50px")
    }

    // var mouseout = function (d) {
    //     console.log("Mouse Leave")
    //     tooltip
    //         .transition()
    //         .duration(500)
    //         .style("opacity", 0)
    // }

    // setup x, and y scales
    var x_scale = d3.scaleBand()
        .domain(data.map(function (d) { return d.Squad; }))
        .range([0, width])
        .padding(0.2);
    var y_scale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    // add attributes to the chart
    var chart = d3.select("svg")
        .attr("width", width + 2 * margin)
        .attr("height", height + 2 * margin)
        .append("g").attr("transform", "translate(" + margin + "," + margin + ")");
    chart.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x_scale(d.Squad); })
        .attr("y", function (d) { return y_scale(parseFloat(d.Poss)); })
        .attr("width", x_scale.bandwidth())
        .attr("height", function (d) { return height - y_scale(parseFloat(d.Poss)); })
        .style("fill", '#01288a')
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        // .on("mouseout", mouseout);

    // create x, y axis
    x_axis = d3.axisBottom(x_scale);
    y_axis = d3.axisLeft(y_scale);

    // add axes to chart
    d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(y_axis);
    d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
        .call(x_axis)
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
}