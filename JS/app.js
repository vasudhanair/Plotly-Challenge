//global variable
var data;

//init function to fill in the select option

function init() {
  d3.json("JS/data/samples.json").then(dataInitial => {
    data = dataInitial;
    var selectValues = dataInitial.names;

    var selectOpt = d3.select("#selDataset");

    selectValues.forEach(value => {
      selectOpt
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
  });
}

//start filling the data inside the select option
init();

//

d3.selectAll("#selDataset").on("change", plotFunctions);

function plotFunctions() {
  var valueSelect = d3.select("#selDataset").node().value;
  demographicFunc(valueSelect);
  panelPlot(valueSelect);
  demographicFunc(valueSelect);
  bubbleChart(valueSelect);
  gaugeChart(valueSelect);
}

function demographicFunc(valueSelect) {
  var filterValue2 = data.samples.filter(value => value.id == valueSelect);
  var ouid = filterValue2.map(v => v.otu_ids);
  ouid = treatOuid(ouid[0].slice(0, 10));
  var valueX = filterValue2.map(v => v.sample_values);
  valueX = valueX[0].slice(0, 10);

  var out_label = filterValue2.map(v => v.otu_labels);
  var names = treatBacName(out_label[0]).slice(0, 10);
  // console.log(ouid);
  // console.log(valueX);
  // console.log(out_label);
  // console.log(names);

  // Create the Trace
  var trace = {
    x: valueX,
    y: ouid,
    text: names,
    type: "bar",
    orientation: "h"
  };

  var layout = {
    yaxis: {
      autorange: "reversed"
    }
  };
  // Create the data array for the plot
  var dataV = [trace];

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", dataV, layout);
}

function panelPlot(valueSelect) {
  //   console.log(valueSelect);
  var filterValue = data.metadata.filter(value => value.id == valueSelect);

  var divValue = d3.select(".panel-body");
  divValue.html("");
  divValue.append("p").text(`id: ${filterValue[0].id}`);
  divValue.append("p").text(`ethnicity: ${filterValue[0].ethnicity}`);
  divValue.append("p").text(`gender: ${filterValue[0].gender}`);
  divValue.append("p").text(`age: ${filterValue[0].age}`);
  divValue.append("p").text(`location: ${filterValue[0].location}`);
  divValue.append("p").text(`bbtype: ${filterValue[0].bbtype}`);
  divValue.append("p").text(`wfreq: ${filterValue[0].wfreq}`);
}

function bubbleChart(valueSelect) {
  var filterValue3 = data.samples.filter(value => value.id == valueSelect);
  var ouid = filterValue3.map(v => v.otu_ids);
  ouid = ouid[0];
  var valueY = filterValue3.map(v => v.sample_values);
  valueY = valueY[0];

  var out_label = filterValue3.map(v => v.otu_labels);
  out_label = treatBacName(out_label[0]);

  var trace1 = {
    x: ouid,
    y: valueY,
    mode: "markers",
    marker: {
      color: ouid,
      size: valueY
    },
    text: out_label
  };

  var data2 = [trace1];

  var layout = {
    showlegend: false,
    xaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bubble", data2, layout);
}