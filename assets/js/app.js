// app.js
import { chart } from "./main.js";

const channelID = "2689684";
const readAPIKey = "BHMUEZAHDWBFSLS0"; // If required
const url = `https://api.thingspeak.com/channels/${channelID}/feeds.json?api_key=${readAPIKey}&results=1`;

// Function to fetch data from ThingSpeak
async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        // Check if feeds exist and have entries
        if (data.feeds && data.feeds.length > 0) {
            const latestEntry = data.feeds[0]; // Get the latest entry from the feed

            // Extract and parse relevant values
            const ch4 = parseFloat(latestEntry.field1);
            const co = parseFloat(latestEntry.field2);
            const co2 = parseFloat(latestEntry.field3);
            const pm25 = parseFloat(latestEntry.field4);
            const pm10 = parseFloat(latestEntry.field5);
            const temperature = parseFloat(latestEntry.field6);
            console.log("Fetched Temperature:", temperature); // Log the temperature
            const humidity = parseFloat(latestEntry.field7);
            console.log("Fetched Humidity:", humidity);
            //const windSpeed = parseFloat(latestEntry.field8);
            //const windDirection = parseFloat(latestEntry.field9);

            // Call updateCharts with the new values only if valid data is present
            if (!isNaN(ch4)) updateCH4(ch4);
            if (!isNaN(co2)) updateC2(co2);
            if (!isNaN(co)) updateCO(co);
            if (!isNaN(temperature)) updateTemperature(temperature);
            if (!isNaN(pm10)) updatePM10(pm10);
            if (!isNaN(pm25)) updatePM25(pm25);
            if (!isNaN(humidity)) updateHumidity(humidity);
        } else {
            console.error('No feeds available in the response:', data);
        }
    } catch (error) {
        console.error("Error fetching data from ThingSpeak:", error);
    }
}


function updateTemperature(temperature) {
  if (chart) {
    if (chart.data.datasets[0] && Array.isArray(chart.data.datasets[0].data)) {
      // Update chart data
      chart.data.datasets[0].data[0] = temperature;
      
      // Add temperature value display in the chart
      chart.options.plugins.datalabels = {
        anchor: 'center',
        align: 'center',
        color: '#000',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: function(value) {
          return value + '°C';
        }
      };
      
      // Update the description
      const descriptionElement = document.getElementById('temperatureDescription');
      if (descriptionElement) {
        descriptionElement.textContent = getTemperatureDescription(temperature);
      }
      
      chart.update();
    } else {
      console.error("Invalid chart data structure.");
    }
  } else {
    console.error("Chart instance is not defined.");
  }
}

function getTemperatureDescription(temperature) {
  // Convert to Fahrenheit for checking against the heat index thresholds
  const tempF = (temperature * 9/5) + 32;

  if (tempF >= 125) {
    return "Temperature is extremely dangerous! Heat stroke is highly likely. Stay indoors and seek cool environment immediately.";
  } 
  else if (tempF >= 103) {
    return "Dangerous temperature! Heat cramps or heat exhaustion likely, and heat stroke possible. Minimize outdoor exposure and stay hydrated.";
  }
  else if (tempF >= 90) {
    return "Exercise extreme caution! Heat stroke, heat cramps, or heat exhaustion possible with prolonged exposure. Limit outdoor activities.";
  }
  else if (tempF >= 80) {
    return "Caution advised: Fatigue possible with prolonged exposure. Take regular breaks and stay hydrated when outdoors.";
  }
  else {
    return "Normal temperature conditions. Comfortable for outdoor activities.";
  }
}



function updateHumidity(humidity) {
    // Ensure humidity is a valid number and not negative
    humidity = Math.max(0, humidity || 0); // Set to 0 if null/undefined
  
    // Default to empty values
    let description = "No humidity data available.";
    let backgroundColor = "#D3D3D3"; // Default to light gray
  
    // Set color and description based on humidity levels
    if (humidity < 40) {
      description =
        "The air is too dry. This can cause issues with bacteria, viruses, asthma, respiratory infections, and ozone production. Consider using a humidifier.";
      backgroundColor = "#FF0000"; // Red
    } else if (humidity >= 40 && humidity <= 60) {
      description =
        "The humidity is at an optimal level. This range is best for health and comfort.";
      backgroundColor = "#808080"; // Light gray
    } else {
      description =
        "The humidity is too high. This can promote growth of bacteria, viruses, fungi, and mites, and may exacerbate asthma. Consider using a dehumidifier.";
      backgroundColor = "#000000"; // Black
    }
  
    // Update the chart data
    humidityChart.updateOptions({
      series: [humidity], // Update series with the new humidity value
    });
  
    // Update the chart color
    humidityChart.updateOptions({
      colors: [backgroundColor], // Update color for the radial bar
    });
  
    // Update the description on the page
    document.getElementById("humidityDescription").textContent = description;
  }

function updatePM25(pm25) {
    // Ensure PM2.5 is a valid number and not negative
    pm25 = Math.max(0, pm25 || 0); // Set to 0 if null/undefined
  
    // Default to empty values
    let pm25Description = "No Fine Matter data available.";
    let pm25Color = "#D3D3D3"; // Default to light gray for PM2.5
  
    // Set PM2.5 description and color based on value
    if (pm25 < 25) {
      pm25Description = "Fine Matter levels are good.";
      pm25Color = "#20E647"; // Green
    } else if (pm25 < 50) {
      pm25Description = "Fine Matter levels are fair.";
      pm25Color = "#FFFF00"; // Yellow
    } else if (pm25 < 100) {
      pm25Description = "Fine Matter levels are poor.";
      pm25Color = "#FF7F00"; // Orange
    } else if (pm25 < 300) {
      pm25Description = "Fine Matter levels are very poor.";
      pm25Color = "#FF0000"; // Red
    } else {
      pm25Description = "Fine Matter levels are extremely poor.";
      pm25Color = "#800000"; // Dark Red
    }
  
    // Update the PM2.5 chart data and color
    fineChart.updateOptions({
      series: [pm25], // Update series with the new PM2.5 value
      colors: [pm25Color], // Update color for the PM2.5 radial bar
    });
  
    // Update the PM2.5 description on the page (fixed to match correct ID)
    document.getElementById("fineDescription").textContent = pm25Description;
  }

function updatePM10(pm10) {
    // Ensure PM10 is a valid number and not negative
    pm10 = Math.max(0, pm10 || 0); // Set to 0 if null/undefined
  
    // Default to empty values
    let pm10Description = "No Coarse Matter data available.";
    let pm10Color = "#D3D3D3"; // Default to light gray for PM10
  
    // Set PM10 description and color based on value
    if (pm10 < 40) {
      pm10Description = "Coarse Matter levels are good.";
      pm10Color = "#20E647"; // Green
    } else if (pm10 < 80) {
      pm10Description = "Coarse Matter levels are fair.";
      pm10Color = "#FFFF00"; // Yellow
    } else if (pm10 < 120) {
      pm10Description = "Coarse Matter levels are poor.";
      pm10Color = "#FF7F00"; // Orange
    } else if (pm10 < 300) {
      pm10Description = "Coarse Matter levels are very poor.";
      pm10Color = "#FF0000"; // Red
    } else {
      pm10Description = "Coarse Matter levels are extremely poor.";
      pm10Color = "#800000"; // Dark Red
    }
  
    // Update the PM10 chart data and color
    pmChart.updateOptions({
      series: [pm10], // Update series with the new PM10 value
      colors: [pm10Color], // Update color for the PM10 radial bar
    });
  
    // Update the PM10 description on the page
    const descriptionElement = document.getElementById("pmDescription");
    if (descriptionElement) {
      descriptionElement.textContent = pm10Description;
    } else {
      console.error("Element with ID 'pmDescription' not found.");
    }
  }

function updateCO(co) {
    // Ensure CO is a valid number and not negative
    co = Math.max(0, co || 0); // Set to 0 if null/undefined
  
    // Default values
    let coDescription = "No CO data available.";
    let coColor = "#D3D3D3"; // Default color
  
    // Set CO description and color based on value
    if (co < 5) {
      coDescription = "CO levels are good.";
      coColor = "#20E647"; // Green
    } else if (co < 10) {
      coDescription = "CO levels are fair.";
      coColor = "#FFFF00"; // Yellow
    } else if (co < 15) {
      coDescription = "CO levels are poor.";
      coColor = "#FF7F00"; // Orange
    } else {
      coDescription = "CO levels are high.";
      coColor = "#FF0000"; // Red
    }
  
    // Update the CO chart data and color
    coChart.updateOptions({
      series: [co], // Update series with the new CO value
      colors: [coColor], // Update color for the CO radial bar
    });
  
    // Update the CO description on the page
    document.getElementById("coDescription").textContent = coDescription;
  }

function updateC2(co2) {
    // Ensure CO₂ is a valid number and not negative
    co2 = Math.max(0, co2 || 0); // Set to 0 if null/undefined

    // Default values
    let co2Description = "No CO₂ data available.";
    let co2Color = '#D3D3D3'; // Default color

    // Set CO₂ description and color based on value
    if (co2 < 400) {
        co2Description = "CO₂ levels are good.";
        co2Color = '#20E647'; // Green
    } else if (co2 < 800) {
        co2Description = "CO₂ levels are fair.";
        co2Color = '#FFFF00'; // Yellow
    } else if (co2 < 1200) {
        co2Description = "CO₂ levels are poor.";
        co2Color = '#FF7F00'; // Orange
    } else {
        co2Description = "CO₂ levels are high.";
        co2Color = '#FF0000'; // Red
    }

    // Update the CO₂ chart data and color
    window.co2Chart.updateOptions({
        series: [co2], // Update series with the new CO₂ value
        colors: [co2Color] // Update color for the CO₂ radial bar
    });

    // Update the CO₂ description on the page
    document.getElementById('co2Description').textContent = co2Description;
}

function updateCH4(ch4) {
    // Ensure CH₄ is a valid number and not negative
    ch4 = Math.max(0, ch4 || 0); // Set to 0 if null/undefined

    // Default values
    let ch4Description = "No CH₄ data available.";
    let ch4Color = '#D3D3D3'; // Default color

    // Set CH₄ description and color based on value
    if (ch4 < 10) {
        ch4Description = "CH₄ levels are good.";
        ch4Color = '#20E647'; // Green
    } else if (ch4 < 50) {
        ch4Description = "CH₄ levels are fair.";
        ch4Color = '#FFFF00'; // Yellow
    } else if (ch4 < 75) {
        ch4Description = "CH₄ levels are poor.";
        ch4Color = '#FF7F00'; // Orange
    } else {
        ch4Description = "CH₄ levels are high.";
        ch4Color = '#FF0000'; // Red
    }

    // Update the CH₄ chart data and color
    methchart.updateOptions({
        series: [ch4], // Update series with the new CH₄ value
        colors: [ch4Color] // Update color for the CH₄ radial bar
    });

    // Update the CH₄ description on the page
    document.getElementById('methDescription').textContent = ch4Description;
}

function updateWindSpeed(speed) {
  let color, label, description;

  if (speed === null || speed === undefined) {
    color = "#CCCCCC"; // Gray
    label = "No Data";
    description = "";
    speed = 0; // Set to 0 for visual indication
  } else if (speed < 1) {
    color = "#0000FF"; // Blue
    label = "Calm";
    description = "Calm wind. Smoke rises vertically with little if any drift.";
  } else if (speed <= 3) {
    color = "#4169E1"; // Royal Blue
    label = "Light Air";
    description =
      "Direction of wind shown by smoke drift, not by wind vanes. Little if any movement with flags. Wind barely moves tree leaves.";
  } else if (speed <= 7) {
    color = "#00FFFF"; // Cyan
    label = "Light Breeze";
    description =
      "Wind felt on face. Leaves rustle and small twigs move. Ordinary wind vanes move.";
  } else if (speed <= 12) {
    color = "#00FF00"; // Green
    label = "Gentle Breeze";
    description =
      "Leaves and small twigs in constant motion. Wind blows up dry leaves from the ground. Flags are extended out.";
  } else if (speed <= 18) {
    color = "#7FFF00"; // Chartreuse
    label = "Moderate Breeze";
    description =
      "Wind moves small branches. Wind raises dust and loose paper from the ground and drives them along.";
  } else if (speed <= 24) {
    color = "#00FF7F"; // Spring Green
    label = "Fresh Breeze";
    description =
      "Large branches and small trees in leaf begin to sway. Crested wavelets form on inland lakes and large rivers.";
  } else if (speed <= 31) {
    color = "#32CD32"; // Lime Green
    label = "Strong Breeze";
    description =
      "Large branches in continuous motion. Whistling sounds heard in overhead or nearby power and telephone lines. Umbrellas used with difficulty.";
  } else if (speed <= 38) {
    color = "#FFFF00"; // Yellow
    label = "Near Gale";
    description =
      "Whole trees in motion. Inconvenience felt when walking against the wind.";
  } else if (speed <= 46) {
    color = "#FFD700"; // Gold
    label = "Gale";
    description =
      "Wind breaks twigs and small branches. Wind generally impedes walking.";
  } else if (speed <= 54) {
    color = "#FFA500"; // Orange
    label = "Strong Gale";
    description =
      "Structural damage occurs, such as chimney covers, roofing tiles blown off, and television antennas damaged. Ground is littered with many small twigs and broken branches.";
  } else if (speed <= 63) {
    color = "#FF4500"; // Orange Red
    label = "Whole Gale";
    description =
      "Considerable structural damage occurs, especially on roofs. Small trees may be blown over and uprooted.";
  } else if (speed <= 75) {
    color = "#FF0000"; // Red
    label = "Storm Force";
    description =
      "Widespread damage occurs. Larger trees blown over and uprooted.";
  } else {
    color = "#FF1493"; // Deep Pink
    label = "Hurricane Force";
    description =
      "Severe and extensive damage. Roofs can be peeled off. Windows broken. Trees uprooted. RVs and small mobile homes overturned. Moving automobiles can be pushed off the roadways.";
  }

  // Update chart with new color and label
  windSpeedChart.updateOptions({
    colors: [color],
    labels: [label], // Update the chart label with wind speed category
  });

  // Update series with new speed
  windSpeedChart.updateSeries([speed]);

  // Update the description on the page
  document.getElementById("windSpeedDescription").innerHTML = description;
}

function updateWindDirection(direction) {
  let cardinalDirection, description;

  if (direction === null || direction === undefined) {
    cardinalDirection = "No Data";
    description = "No wind direction data available.";
    direction = 0; // Set to 0 for visual indication
  } else if (direction >= 337.5 || direction < 22.5) {
    cardinalDirection = "N";
    description =
      "Wind is coming from the North. This could bring cooler temperatures from polar regions.";
  } else if (direction >= 22.5 && direction < 67.5) {
    cardinalDirection = "NE";
    description =
      "Wind is coming from the Northeast. This often brings dry and cool air.";
  } else if (direction >= 67.5 && direction < 112.5) {
    cardinalDirection = "E";
    description =
      "Wind is coming from the East. This might bring in maritime air from the ocean.";
  } else if (direction >= 112.5 && direction < 157.5) {
    cardinalDirection = "SE";
    description =
      "Wind is coming from the Southeast. This could bring warm and moist air.";
  } else if (direction >= 157.5 && direction < 202.5) {
    cardinalDirection = "S";
    description =
      "Wind is coming from the South. This often brings warmer temperatures.";
  } else if (direction >= 202.5 && direction < 247.5) {
    cardinalDirection = "SW";
    description =
      "Wind is coming from the Southwest. This might bring in warm and dry air.";
  } else if (direction >= 247.5 && direction < 292.5) {
    cardinalDirection = "W";
    description =
      "Wind is coming from the West. This could bring changes in weather patterns.";
  } else if (direction >= 292.5 && direction < 337.5) {
    cardinalDirection = "NW";
    description =
      "Wind is coming from the Northwest. This often brings cooler and drier air.";
  }

  // Update compass arrow direction
  const compassArrow = document.getElementById("compass-arrow");
  if (compassArrow) {
    compassArrow.style.transform = `translate(-50%, -100%) rotate(${direction}deg)`;
  }

  // Update the description on the page
  const descriptionElement = document.getElementById(
    "windDirectionDescription"
  );
  if (descriptionElement) {
    descriptionElement.innerHTML = description;
  }
}

window.onload = function() {
// Call fetchData periodically (e.g., every 18 seconds)
setInterval(fetchData, 18000);

// Initial fetch when the page loads
fetchData();
}
