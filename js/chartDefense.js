var svg = d3.select('#chartDefense').append('svg').attr("width", 700).attr("height", 500);

async function init() {
    // Acquire data
    data = await d3.csv("data/squad_goalkeeping.csv");
    console.log("Data: ", data);
    let y_label = "Clean Sheet %";
    let x_label = "Goals Allowed";

    // setup dimensions
    var margin = 50;
    // var width = document.getElementById('chartOffense').clientWidth;
    // var height = document.getElementById('chartOffense').clientHeight;
    // temp dims
    var width = 600;
    var height = 400;

    // add tooltips to show descriptions (source: https://www.d3-graph-gallery.com/graph/scatter_tooltip.html)
    var tooltip = d3.select("#chartDefense")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#e9ecef")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    var mouseover = function (d) {
        tooltip
            .style("opacity", 1)
    }

    var mousemove = function (d) {
        let htmlToolTip = "<p><b><u>" + d.Squad + "</u></b></p>"
        + "<p><b>Goals Against: " + parseInt(d.GoA) + "</b></p>"
        + "<p><b>Clean Sheet %: " + parseFloat(d.CSPercentage) + "</b></p>"
        + "<p><b>Shots on Target Against: " + parseInt(d.SoTA) + "</b></p>"
        + "<p><b>Wins, Draws, Losses: " + parseInt(d.Wi) + ", " + parseInt(d.Dr) + ", " + parseInt(d.Lo) + "</b></p>"
        tooltip
            .html(htmlToolTip)
            .style("left", (d3.mouse(this)[0] + 80) + "px")
            .style("top", (d3.mouse(this)[1] + 50) + "px")
    }

    var mouseleave = function (d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    // setup x, and y scales
    var x_scale = d3.scaleLinear().domain([20, 80]).range([0, width]);
    var y_scale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    // add attributes to chart
    var chart = d3.select("svg")
        .attr("width", width + 2 * margin)
        .attr("height", height + 2 * margin)
        .append("g").attr("transform", "translate(" + margin + "," + margin + ")");
    chart.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x_scale(parseInt(d.GoA)); })
        .attr("cy", function (d) { return y_scale(parseFloat(d.CSPercentage)); })
        .attr("r", 10)
        .style('fill', '#01288a')
        .style("opacity", 0.3)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    // create x, y axis
    x_axis = d3.axisBottom(x_scale).tickFormat(d3.format("~s"));
    y_axis = d3.axisLeft(y_scale).tickFormat(d3.format("~s"));

    // add axes to chart
    d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(y_axis);
    d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
        .call(x_axis);

    // add labels to axes on chart
    d3.select("svg")
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 2 * margin)
        .text(x_label);
    d3.select("svg")
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", margin - 35)
        .attr("x", margin - 120)
        .text(y_label);

}