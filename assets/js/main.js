/*
Chart JS
*/
const ctx = document.getElementById("temperatureChart").getContext("2d");

let chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Current Temperature"],
    datasets: [
      {
        label: "Temperature",
        data: [0], // Initialize with a default value of 0
        backgroundColor: "#FF5733", // Red to mimic a thermometer
        borderColor: "#FF5733",
        borderWidth: 1,
        barThickness: 15, // Adjust the thickness of the bars
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set the minimum temperature
        max: 50, // Set the maximum temperature
        title: {
          display: true,
          text: "Temperature (°C)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw + " °C";
          },
        },
      },
      // Custom plugin to draw the indicator
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        const dataset = chart.data.datasets[0];
        const value = dataset.data[0]; // Get the latest temperature value
        const x = chart.getDatasetMeta(0).data[0].x; // X position of the bar
        const y = chart.getDatasetMeta(0).data[0].y; // Y position of the bar

        // Draw an indicator line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, chart.scales.y.getPixelForValue(value)); // Line to the exact value
        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue"; // Color of the line
        ctx.stroke();
        ctx.restore();

        // Draw a label for the exact value
        ctx.save();
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`${value} °C`, x + 10, y - 10); // Position of the label
        ctx.restore();
      },
    },
  },
});

export { chart }
/*
ApexChart
*/

// CH4
var ch4Options = {
  series: [0], // Default value for CH4
  chart: { height: 350, type: "radialBar", offsetY: -10 },
  plotOptions: {
    radialBar: {
      startAngle: -160,
      endAngle: 160,
      dataLabels: {
        name: { fontSize: "16px", offsetY: 120 },
        value: {
          offsetY: 0,
          fontSize: "22px",
          formatter: function (val) {
            return val + " ppm";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: { shade: "dark", stops: [0, 50, 65, 91] },
  },
  stroke: { dashArray: 4 },
  labels: ["CH4"],
};

// CO2
var co2Options = {
  series: [0], // Replace with fetched CO2 value
  chart: {
    height: 350,
    type: "radialBar",
    offsetY: -10,
  },
  plotOptions: {
    radialBar: {
      startAngle: -160,
      endAngle: 160,
      dataLabels: {
        name: {
          fontSize: "16px",
          color: undefined,
          offsetY: 120,
        },
        value: {
          offsetY: 0,
          fontSize: "22px",
          color: undefined,
          formatter: function (val) {
            return val + " ppm";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: {
    dashArray: 4,
  },
  labels: ["CO2"],
};

// C0
var coOptions = {
  series: [0], // Replace with fetched CO value
  chart: {
    height: 350,
    type: "radialBar",
    offsetY: -10,
  },
  plotOptions: {
    radialBar: {
      startAngle: -160,
      endAngle: 160,
      dataLabels: {
        name: {
          fontSize: "16px",
          color: undefined,
          offsetY: 120,
        },
        value: {
          offsetY: 0,
          fontSize: "22px",
          color: undefined,
          formatter: function (val) {
            return val + " ppm";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: {
    dashArray: 4,
  },
  labels: ["CO"],
};

// PM 2.5
var fineOptions = {
  chart: {
    height: 280,
    type: "radialBar",
  },
  series: [], // Replace with your fetched PM2.5 value
  colors: ["#6495ED"], // Blue color for PM2.5
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      track: {
        background: "#333",
        startAngle: -135,
        endAngle: 135,
      },
      dataLabels: {
        name: {
          show: true,
          fontSize: "22px",
          color: "#888",
          offsetY: -10,
          text: "PM2.5",
        },
        value: {
          formatter: function (val) {
            return parseFloat(val).toFixed(2) + " µg/m³"; // Add unit µg/m³
          },
          color: "#111",
          fontSize: "20px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      gradientToColors: [],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "butt",
  },
  labels: ["PM2.5 "],
};

// PM 10
var pmOptions = {
  series: [0], // Initial series value, can be set to 0 or any default
  chart: {
    height: 350,
    type: "radialBar",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 225,
      hollow: {
        margin: 0,
        size: "70%",
        background: "#fff",
      },
      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "17px",
        },
        value: {
          formatter: function (val) {
            return parseFloat(val).toFixed(2) + " µg/m³"; // Add unit µg/m³
          },
          color: "#111",
          fontSize: "20px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: [], // Default color for PM10
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["PM10"],
};

// Humidity
var humidityOptions = {
  chart: {
    height: 280,
    type: "radialBar",
  },
  series: [0], // Initial humidity value
  colors: ["#20E647"],
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      track: {
        background: "#333",
        startAngle: -135,
        endAngle: 135,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: "30px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      gradientToColors: ["#87D4F9"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "butt",
  },
  labels: ["Humidity"],
};

// Wind Speed Gauge
var windSpeedOptions = {
  series: [0],
  chart: {
    height: 250,
    type: "radialBar",
    offsetY: -10,
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: "16px",
          color: undefined,
          offsetY: 120,
        },
        value: {
          offsetY: 76,
          fontSize: "22px",
          color: undefined,
          formatter: function (val) {
            return val + " m/s";
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: {
    dashArray: 4,
  },
};

var windSpeedChart = new ApexCharts(
  document.querySelector("#windSpeedGauge"),
  windSpeedOptions
);
windSpeedChart.render();

var humidityChart = new ApexCharts(
  document.querySelector("#humidityChart"),
  humidityOptions
);
humidityChart.render();

var pmChart = new ApexCharts(document.querySelector("#pmChart"), pmOptions);
pmChart.render();

var finechart = new ApexCharts(
  document.querySelector("#fineChart"),
  fineOptions
);
finechart.render();

var cochart = new ApexCharts(document.querySelector("#coChart"), coOptions);
cochart.render();

var co2chart = new ApexCharts(document.querySelector("#co2Chart"), co2Options);
co2chart.render();

var methchart = new ApexCharts(
  document.querySelector("#methChart"),
  ch4Options
);
methchart.render();


window.methchart = methchart; // Expose the chart globally
window.coChart = cochart;
window.co2Chart = co2chart;
window.fineChart = finechart;
window.pmChart = pmChart;
window.humidityChart = humidityChart;
window.windSpeedChart = windSpeedChart;
