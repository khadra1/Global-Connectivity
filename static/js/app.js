// console.log(alldata.dataWorld)
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


async function drawChart(data1) {
    const topology = await fetch(
          'https://code.highcharts.com/mapdata/custom/world.topo.json'
        ).then(response => response.json());
   
      return Highcharts.mapChart('container-map', {
        chart: {
          map: topology,
          borderWidth: 1
        },
  
        colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
          'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],
  
        title: {
          text: 'World Internet Usage'
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
            to: 1000
          }, {
            from: 1000
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


  //   Highcharts.chart('container-gender', {
  //     chart: {
  //         type: 'bar'
  //     },
  //     title: {
  //         text: 'Internet Usage By Gender'
  //     },
  //     subtitle: {
  //         text: 'Source: <a href="https://www.itu.int/en/ITU-D/Statistics/Pages/stat/default.aspx">Wikipedia.org</a>'
  //     },
  //     xAxis: {
  //         categories: ['World', 'Developed', 'Developing', 'Least Developed Countries(LLDCs)', 'Land Locked Developing Countries (LLDCs)', 'Small Island Developing States(SIDs)', 'Africa', 'America', 'Arab States', 'Asia Pacific', 'Commonwealth of Independent States CIS', 'Europe'],
  //         title: {
  //             text: null
  //         }
  //     },
  //     yAxis: {
  //         min: 0,
  //         title: {
  //             text: 'Percentage of Individuals Using internet, by sex (%)',
  //             align: 'high'
  //         },
  //         labels: {
  //             overflow: 'justify'
  //         }
  //     },
  //     tooltip: {
  //         valueSuffix: '% '
  //     },
  //     plotOptions: {
  //         bar: {
  //             dataLabels: {
  //                 enabled: true
  //             }
  //         }
  //     },
  //     legend: {
  //         layout: 'vertical',
  //         align: 'right',
  //         verticalAlign: 'top',
  //         x: -40,
  //         y: 80,
  //         floating: true,
  //         borderWidth: 1,
  //         backgroundColor:
  //             Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
  //         shadow: true
  //     },
  //     credits: {
  //         enabled: false
  //     },
  //     series: [{
  //         name: 'Total',
  //         data: [107, 31, 635, 203, 2]
  //     }, {
  //         name: 'Female',
  //         data: [133, 156, 947, 408, 6]
  //     }, {
  //         name: 'Male',
  //         data: [814, 841, 3714, 727, 31]
  //     }, {
          
  //     }]
  // });