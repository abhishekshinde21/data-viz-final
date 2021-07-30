var width = document.getElementById('chartOffense').clientWidth;
//this allows us to collect the width of the div where the SVG will go.
var height = document.getElementById('chartOffense').clientHeight;
//I like to use the golden rectangle ratio if they work for my charts.

var svg = d3.select('#chartOffense').append('svg').attr("width", 700).attr("height", 500);
//We add our svg to the div area


//We will build a basic function to handle window resizing.
function resize() {
    width = document.getElementById('chartOffense').clientWidth;
    height = document.getElementById('chartOffense').clientHeight;
    d3.select('#chartOffense svg')
      .attr('width', width)
      .attr('height', height);
}

window.onresize = resize;
//Call our resize function if the window size is changed.

async function init() {
    // Acquire data
    data = await d3.csv("data/squad_standard.csv");
    console.log("Data: ", data);
    let y_label = "Goals";
    let x_label = "Assists";

    // setup dimensions
    var margin = 50;
    var left_margin = 70;
    // var width = document.getElementById('chartOffense').clientWidth;
    // var height = document.getElementById('chartOffense').clientHeight;
    // temp dims
    var width = 600;
    var height = 400;

    // setup x, and y scales
    var x_scale = d3.scaleLinear().domain([0,80]).range([0, width]);
    var y_scale = d3.scaleLinear().domain([0,100]).range([height, 0]);

    // add attributes to chart
    var chart = d3.select("svg").attr("width", width + 2*margin).attr("height", height + 2*margin).append("g").attr("transform","translate(" + margin + "," + margin + ")");
    chart.selectAll("circle").data(data).enter().append("circle").attr("cx", function(d) {return x_scale(parseInt(d.Ast));}).attr("cy", function(d) {return y_scale(parseInt(d.Gls));}).attr("r", 5).style('fill', '#01288a').style("opacity", 0.3);

    // create x, y axis
    x_axis = d3.axisBottom(x_scale).tickFormat(d3.format("~s"));
    y_axis = d3.axisLeft(y_scale).tickFormat(d3.format("~s"));

    // add axes to chart
    d3.select("svg").append("g").attr("transform", "translate(" + margin + "," + margin + ")").call(y_axis);
    d3.select("svg").append("g").attr("transform", "translate(" + margin + "," + (height+margin) + ")").call(x_axis);

    // add labels to axes on chart
    d3.select("svg").append("text").attr("text-anchor", "end").attr("x", width).attr("y", height + 2*margin ).text("Assists");
    d3.select("svg").append("text").attr("text-anchor", "end").attr("y", height*.2).attr("x", 0.5*margin).text("Goals");

}