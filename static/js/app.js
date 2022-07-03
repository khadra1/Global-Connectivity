console.log("alldata =" + alldata)
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


async function drawChart(data1, year) {
    const topology = await fetch(
          'https://code.highcharts.com/mapdata/custom/world.topo.json'
        ).then(response => response.json());
   
      return Highcharts.mapChart('container-map', {
        chart: {
          map: topology,
          borderWidth: 1
        },
  
        colors: ['#004c6d','#2d6484', '#4c7c9b' ,'#6996b3' , '#86b0cc ','#a3cbe5', '#c1e7ff]'],
  
        title: {
          text: title + " " + year
        },
  
        mapNavigation: {
          enabled: true
        },
  
        legend: {
          title: {
            text: '',
            style: {
              color: ( // theme
                Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.title &&
                Highcharts.defaultOptions.legend.title.style &&
                Highcharts.defaultOptions.legend.title.style.color
              ) || 'black'
            }
          },
          align: 'left',
          verticalAlign: 'bottom',
          floating: true,
          layout: 'vertical',
          valueDecimals: 0,
          backgroundColor: ( // theme
            Highcharts.defaultOptions &&
            Highcharts.defaultOptions.legend &&
            Highcharts.defaultOptions.legend.backgroundColor
          ) || 'rgba(255, 255, 255, 0.85)',
          symbolRadius: 0,
          symbolHeight: 14
        },
  
        colorAxis: {
          dataClasses: [{
            to: 3
          }, {
            from: 3,
            to: 10
          }, {
            from: 10,
            to: 30
          }, {
            from: 30,
            to: 100
          }, {
            from: 100,
            to: 300
          }, {
            from: 300,
            to: 100000000
          }, {
            from: 200000000
          }]
        },
  
        series: [{
          data: data1,
          joinBy: ['iso-a3', 'code'],
          animation: true,
          name: '',
          states: {
            hover: {
              color: '#a4edba'
            }
          },
          tooltip: {
            valueSuffix: ''
          },
          shadow: false
        }]
      });
    };
    
        let titleLine = alldata.filter1;
        let traceLine = {
        x: alldata.x,
        y: alldata.y,
        type: 'scatter'
        };
        let dataLine = [traceLine];
        let layoutLine = {
        title: titleLine
        };
        Plotly.newPlot("line-plot", dataLine,layout);
    

        let titlebBar = alldata.filter1;
        let traceBar = {
        x: alldata.x,
        y: alldata.y,
        type: 'scatter'
        };
        let dataBar = [traceBar];
        let layoutBar = {
        title: titleLine
        };
        Plotly.newPlot("bar-plot", dataBar,layoutBar);
    
        let titlePie = alldata.filter1;
        let tracePie = {
        x: alldata.x,
        y: alldata.y,
        type: 'scatter'
        };
        let dataPie = [tracePie];
        let layoutPie = {
        title: titleLine
        };
        Plotly.newPlot("pie-plot", dataPie,layoutPie);
