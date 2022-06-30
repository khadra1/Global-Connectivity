console.log(alldata.Region)
let title = alldata.filter1;
let trace1 = {
x: alldata.x,
y: alldata.y,
type: 'bar'
};
let data = [trace1];
let layout = {
title: title
};
Plotly.newPlot("plot", data,layout);