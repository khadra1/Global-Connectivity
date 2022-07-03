console.log("tracedata =" + alldata.tracedata)
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
          text: title + year
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

  
  // let yDataRegion = "Individuals using the Internet"
  let traceAfrica = {
      x: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
      y: alldata.tracedata.IndividualsusingtheInternet.Africa,
      mode: 'lines+markers',
      connectgaps: true
    };
    
    let traceAmericas = {
      x: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
      y: tracedata.yDataRegion.Americas,
      mode: 'lines',
      connectgaps: true
    };

  let traceArabStates = {
    x: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
    y: tracedata.yDataRegion.ArabStates,
    mode: 'lines+markers',
    connectgaps: true
  };
  
  let traceAsiaPacicific = {
    x: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
    y: tracedata.yDataRegion.Asia-Pacicific,
    mode: 'lines',
    connectgaps: true
  };
  let traceCIS = {
    x: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
    y: tracedata.yDataRegion.CIS,
    mode: 'lines+markers',
    connectgaps: true
  };
  
  let traceEurope = {
    x: [2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
    y: tracedata.yDataRegion.Europe,
    mode: 'lines',
    connectgaps: true
    };
    
    let regionData = [traceAfrica, traceAmericas,traceArabStates, traceAsiaPacific,traceCIS, traceEurope];
    
    var layoutRegion = {
      title: 'Individuals Using the Internet (millions)',
      showlegend: false
    };
    
    Plotly.newPlot('myDiv', regionData, layoutRegion);
  