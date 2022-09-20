// World countries bar chart
let title = allData.filter1;

let trace1 = {
  x: allData.x,
  y: allData.y,
  marker: { color: "#004c6d" },
  type: "bar",
};
let data = [trace1];
let layout = {
  title: title,
  margin: {
    l: 50,
    r: 50,
    b: 60,
    t: 50,
    pad: 4,
  },
};
Plotly.newPlot("plot", data, layout);

function countDigits(number) {
  return parseInt(number).toString().length;
}

// World map
async function drawChart(data1, year) {
  console.log("data1=", data1);
  let avg = 0;
  data1.forEach((elem) => (avg += countDigits(elem.value)));
  //10,20,30,40
  //total number of element -> average length of digits = 2
  avg = parseInt(avg / data1.length);
  console.log("average ", avg);
  const topology = await fetch(
    "https://code.highcharts.com/mapdata/custom/world.topo.json"
  ).then((response) => response.json());
  let factor = Math.pow(10, avg); // 0 -> 100,
  return Highcharts.mapChart("container-map", {
    chart: {
      map: topology,
      borderWidth: 0,
      height: 490,
    },

    colors: [
      "#c1e7ff",
      "#a3cbe5",
      "#86b0cc",
      "#6996b3",
      "#4c7c9b",
      "#2d6484",
      "#004c6d",
    ],

    title: {
      text: title + " " + year,
    },

    mapNavigation: {
      enabled: true,
    },

    legend: {
      title: {
        text: "",
        style: {
          color:
            // theme
            (Highcharts.defaultOptions &&
              Highcharts.defaultOptions.legend &&
              Highcharts.defaultOptions.legend.title &&
              Highcharts.defaultOptions.legend.title.style &&
              Highcharts.defaultOptions.legend.title.style.color) ||
            "black",
        },
      },
      align: "left",
      verticalAlign: "bottom",
      floating: true,
      layout: "vertical",
      valueDecimals: 0,
      backgroundColor:
        // theme
        (Highcharts.defaultOptions &&
          Highcharts.defaultOptions.legend &&
          Highcharts.defaultOptions.legend.backgroundColor) ||
        "rgba(255, 255, 255, 0.85)",
      symbolRadius: 0,
      symbolHeight: 14,
    },

    colorAxis: {
      dataClassColor: "category",
      dataClasses: [
        {
          to: factor * 2,
        },
        {
          from: factor * 2,
          to: factor * 4,
        },
        {
          from: factor * 4,
          to: factor * 6,
        },
        {
          from: factor * 6,
          to: factor * 8,
        },
        {
          from: factor * 8,
          to: factor * 10,
        },
        {
          from: factor * 10,
        },
      ],
    },

    series: [
      {
        data: data1,
        joinBy: ["iso-a3", "code"],
        animation: true,
        name: "",
        states: {
          hover: {
            color: "#a4edba",
          },
        },
        tooltip: {
          valueSuffix: "",
        },
        shadow: false,
      },
    ],
  });
}

const yearsRange = [
  2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
  2018, 2019, 2020, 2021,
];
const differentDataKeys = Object.keys(allData.tracedata);

function printBtn() {
  var myButtons = document.getElementById("myButtons");
  for (var i = 0; i < differentDataKeys.length; i++) {
    var temp = document.createElement("button");
    temp.innerHTML = differentDataKeys[i];
    temp.setAttribute("value", differentDataKeys[i]);
    temp.setAttribute("onClick", "drawLineChart(this.value, this.id)");
    temp.classList.add("btn");
    temp.classList.add("internetBtn");
    id = `btn${i}`;
    temp.id = id;
    temp.classList.add("btn-secondary");
    myButtons.appendChild(temp);
  }
}

printBtn();
drawLineChart("Fixed-telephone subscriptions");
function drawLineChart(dataType, btnId) {
  let traceAfrica = {
    x: yearsRange,
    y: allData.tracedata[dataType].Africa,
    mode: "lines+markers",
    connectgaps: true,
    name: "Africa",
    marker: {
      color: "#004c6d",
      width: 0.2,
    },
  };

  let traceAmericas = {
    x: yearsRange,
    y: allData.tracedata[dataType].Americas,
    mode: "lines+markers",
    connectgaps: true,
    name: "Americas",
    marker: {
      color: "#2b6989",
      width: 0.2,
    },
  };

  let traceArabStates = {
    x: yearsRange,
    y: allData.tracedata[dataType].ArabStates,
    mode: "lines+markers",
    connectgaps: true,
    name: "ArabStates",
    marker: {
      color: "#4a86a5",
      width: 0.2,
    },
  };

  let traceAsiaPacific = {
    x: yearsRange,
    y: allData.tracedata[dataType]["Asia-Pacicific"],
    mode: "lines+markers",
    connectgaps: true,
    name: "AsiaPacific",
    marker: {
      color: "#68a6c3",
      width: 0.2,
    },
  };
  let traceCIS = {
    x: yearsRange,
    y: allData.tracedata[dataType].CIS,
    mode: "lines+markers",
    connectgaps: true,
    name: "CIS",
    marker: {
      color: "#86c6e1",
      width: 0.2,
    },
  };

  let traceEurope = {
    x: yearsRange,
    y: allData.tracedata[dataType].Europe,
    mode: "lines+markers",
    connectgaps: true,
    name: "Europe",
    marker: {
      color: "#a6e7ff",
      width: 0.2,
    },
  };

  let regionData = [
    traceAfrica,
    traceAmericas,
    traceArabStates,
    traceAsiaPacific,
    traceCIS,
    traceEurope,
  ];

  var layoutRegion = {
    title: dataType,
    showlegend: true,
  };

  Plotly.newPlot("line-chart", regionData, layoutRegion, {toImageButtonOptions: {
    filename: 'region_chart',
    width: 800,
    height: 600,
    format: 'svg'
  }});
  updateColor(btnId);
}

function updateColor(id) {
  var internetBtns = document.getElementsByClassName("internetBtn");
  for (var i = 0; i < internetBtns.length; i++) {
    internetBtns[i].classList.remove("btn-primary");
    internetBtns[i].classList.add("btn-secondary");
  }
  // btn = document.getElementById(id);
  // btn.classList.remove("btn-secondary");
  // btn.classList.add("btn-primary");
  // console.log(internetBtns);
}

function update_slider_value(x) {
  document.getElementById("show_slider_value").innerHTML = x;
}

function demo_charts() {}
let titleGender = "Percentage of individuals using the Internet, by sex";
let genderData = JSON.parse(allData.genderData);

let values = Object.values(genderData);

// Percentage of individuals using the Internet, by Gender
let genderTrace1 = {
  x: [
    "World",
    "Africa",
    "Americas",
    "Arab States",
    "Asia-Pacific",
    "CIS",
    "Europe",
  ],
  y: values.map((each) => each["% Total 2020"]),
  marker: { color: "#004c6d" },
  name: "% Total 2020",
  type: "bar",
};

let genderTrace2 = {
  x: [
    "World",
    "Africa",
    "Americas",
    "Arab States",
    "Asia-Pacific",
    "CIS",
    "Europe",
  ],
  y: values.map((each) => each["% Female 2020"]),
  marker: { color: "#6996b3" },
  name: "% Female 2020",
  type: "bar",
};

let genderTrace3 = {
  x: [
    "World",
    "Africa",
    "Americas",
    "Arab States",
    "Asia-Pacific",
    "CIS",
    "Europe",
  ],
  y: values.map((each) => each["% Male 2020"]),
  marker: { color: "#c1e7ff" },
  name: "% Male 2020",
  type: "bar",
};

let dataGender = [genderTrace1, genderTrace2, genderTrace3];

let layoutGender = {
  barmode: "group",
  showlegend: true,
  legend: {
    orientation: "h",
    xanchor: "center",
    yanchor: "bottom",
    y: 1.0,
    x: 0.5,
  },
  margin: {
    l: 50,
    r: 50,
    b: 60,
    t: 50,
    pad: 4,
  },
};

console.log("before");
Plotly.newPlot("gender-plot", dataGender, layoutGender, {toImageButtonOptions: {
  filename: 'gender_chart',
  width: 800,
  height: 600,
  format: 'svg'
}});



let ageData = JSON.parse(allData.ageData);
values = Object.values(ageData);
// Percentage of individuals using the Internet, by Age
let ageTrace1 = {
  x: [
    "World",
    "Africa",
    "Americas",
    "Arab States",
    "Asia-Pacific",
    "CIS",
    "Europe",
  ],
  y: values.map((each) => each["% Total 2020"]),
  marker: { color: "#004c6d" },
  name: "% Total 2020",
  type: "bar",
};

let ageTrace2 = {
  x: [
    "World",
    "Africa",
    "Americas",
    "Arab States",
    "Asia-Pacific",
    "CIS",
    "Europe",
  ],
  y: values.map((each) => each["% Youth(15-24) 2020"]),
  marker: { color: "#6996b3" },
  name: "% Youth(15-24) 2020",
  type: "bar",
};

let ageTrace3 = {
  x: [
    "World",
    "Africa",
    "Americas",
    "Arab States",
    "Asia-Pacific",
    "CIS",
    "Europe",
  ],
  y: values.map((each) => each["% Rest of Population 2020"]),
  marker: { color: "#c1e7ff" },
  name: "% Rest of Population 2020",
  type: "bar",
};

let dataAge = [ageTrace1, ageTrace2, ageTrace3];

let layoutAge = {
  barmode: "group",
  showlegend: true,
  legend: {
    orientation: "h",
    xanchor: "center",
    yanchor: "bottom",
    y: 1.0,
    x: 0.5,
  },
  margin: {
    l: 50,
    r: 50,
    b: 60,
    t: 50,
    pad: 4,
  },
};

Plotly.newPlot("age-plot", dataAge, layoutAge, {toImageButtonOptions: {
  filename: 'age_chart',
  width: 800,
  height: 600,
  format: 'svg'
}
});;
