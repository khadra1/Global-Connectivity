// World countries bar chart
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
Plotly.newPlot("plot", data, layout);

// World map
async function drawChart(data1, year) {
  const topology = await fetch(
    'https://code.highcharts.com/mapdata/custom/world.topo.json'
  ).then(response => response.json());

  return Highcharts.mapChart('container-map', {
    chart: {
      map: topology,
      borderWidth: 1
    },

    colors: ['#004c6d', '#2d6484', '#4c7c9b', '#6996b3', '#86b0cc ', '#a3cbe5', '#c1e7ff]'],

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


const yearsRange = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
const differentDataKeys = Object.keys(alldata.tracedata)

function printBtn() {
  var myButtons=document.getElementById("myButtons");
  for (var i = 0; i < differentDataKeys.length; i++) {
    var temp=document.createElement("button");
    temp.innerHTML=differentDataKeys[i];
    temp.setAttribute("value",differentDataKeys[i])
    temp.setAttribute("onClick","drawLineChart(this.value)")
    myButtons.appendChild(temp);
  }
}
printBtn()
drawLineChart("Fixed-telephone subscriptions");
function drawLineChart(dataType) {
  let traceAfrica = {
    x: yearsRange,
    y: alldata.tracedata[dataType].Africa,
    mode: 'lines+markers',
    connectgaps: true,
    name: "Africa"
  };

  let traceAmericas = {
    x: yearsRange,
    y: alldata.tracedata[dataType].Americas,
    mode: 'lines',
    connectgaps: true,
    name: "Americas"
  };

  let traceArabStates = {
    x: yearsRange,
    y: alldata.tracedata[dataType].ArabStates,
    mode: 'lines+markers',
    connectgaps: true,
    name: "ArabStates"
  };

  let traceAsiaPacific = {
    x: yearsRange,
    y: alldata.tracedata[dataType]["Asia-Pacicific"],
    mode: 'lines',
    connectgaps: true,
    name: "AsiaPacific"
  };
  let traceCIS = {
    x: yearsRange,
    y: alldata.tracedata[dataType].CIS,
    mode: 'lines+markers',
    connectgaps: true,
    name: "CIS"
  };

  let traceEurope = {
    x: yearsRange,
    y: alldata.tracedata[dataType].Europe,
    mode: 'lines',
    connectgaps: true,
    name: "Europe"
  };

  let regionData = [traceAfrica, traceAmericas, traceArabStates, traceAsiaPacific, traceCIS, traceEurope];

  var layoutRegion = {
    title: dataType,
    showlegend: true
  };

  Plotly.newPlot('myDiv', regionData, layoutRegion);
}
function update_slider_value(x)
{
 document.getElementById("show_slider_value").innerHTML=x;
}

// Percentage of individuals using the Internet, by Gender
let genderTrace1 = {
  x: ['World', 'Africa', 'Americas', 'Arab States', 'Asia-Pacific', 'CIS', 'Europe'],
  y: genderData,
  marker: {color:["#004c6d","#6996b3","#c1e7ff"]
},
  name: 'Total',
  type: 'bar'
};

let genderTrace2 = {
  x: ['World', 'Africa', 'Americas', 'Arab States', 'Asia-Pacific', 'CIS', 'Europe'],
  y: genderData,
  marker: {color:["#004c6d","#6996b3","#c1e7ff"]
},
  name: 'Female',
  type: 'bar'
};

let genderTrace3 = {
  x: ['World', 'Africa', 'Americas', 'Arab States', 'Asia-Pacific', 'CIS', 'Europe'],
  y: genderData,
  marker: {color:["#004c6d","#6996b3","#c1e7ff"]
},
  name: 'Male',
  type: 'bar'
};


let dataGender = [genderTrace2,genderTrace1,genderTrace3];

let layoutGender = {barmode: 'group'};

Plotly.newPlot('gender-plot', dataGender, layoutGender);


// Percentage of individuals using the Internet, by Age
let ageTrace1 = {
  x: ['World', 'Africa', 'Americas', 'Arab States', 'Asia-Pacific', 'CIS', 'Europe'],
  y: ageData,
  marker: {color:["#004c6d","#6996b3","#c1e7ff"]
},
  name: 'Total',
  type: 'bar'
};

let ageTrace2 = {
  x: ['World', 'Africa', 'Americas', 'Arab States', 'Asia-Pacific', 'CIS', 'Europe'],
  y: ageData,
  marker: {color:["#004c6d","#6996b3","#c1e7ff"]
},
  name: 'Female',
  type: 'bar'
};

let ageTrace3 = {
  x: ['World', 'Africa', 'Americas', 'Arab States', 'Asia-Pacific', 'CIS', 'Europe'],
  y: ageData,
  marker: {color:["#004c6d","#6996b3","#c1e7ff"]
},
  name: 'Male',
  type: 'bar'
};

let dataAge = [ageTrace1, ageTrace2, ageTrace3];

let layoutAge = {barmode: 'group'};

Plotly.newPlot('age-plot', dataAge, layoutAge);