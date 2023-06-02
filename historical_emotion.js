// Emotions array
const emotions = ["anger", "disgust", "fear", "joy", "neutral", "sadness", "surprise", "optimism"];
let barChart;
// Function to count emotions per date
function countEmotionsPerDate(list) {
  const emotionCounts = {};

  for (const item of list) {
    if (!item.published) {
      continue; // Skip items without the "published" property
    }

    const date = item.published.substring(0, 10); // Extract the date from the published property

    const emotionColumn = Object.keys(item).find(key => key === 'title_emotion' || key === 'emotion');

    if (emotionColumn) {
      const emotions = Array.isArray(item[emotionColumn]) ? item[emotionColumn] : [item[emotionColumn]]; // Convert single emotion to an array

      if (date && emotions) {
        if (!emotionCounts[date]) {
          emotionCounts[date] = {};
        }

        for (const e of emotions) {
          if (!emotionCounts[date][e]) {
            emotionCounts[date][e] = 0;
          }

          emotionCounts[date][e]++;
        }
      }
    }
  }

  return emotionCounts;
}


// Function to plot emotions per date for the selected platform
function plotEmotionsPerDate() {
  // Get the selected platform from the dropdown
  const selectedPlatform = platformDropdown.value;

  // Retrieve the corresponding list from session storage
  const list = JSON.parse(sessionStorage.getItem(selectedPlatform));

  // Count emotions per date
  const platformEmotions = countEmotionsPerDate(list);

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(platformEmotions),
    datasets: [],
  };

  // Convert emotion counts to datasets for the chart
  const colors = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(128, 215, 66, 0.6)', 'rgba(255, 215, 0, 0.6)'];

  let colorIndex = 0;
  for (const emotion of emotions) {
    const counts = Object.values(platformEmotions).map(emotionCounts => emotionCounts[emotion] || 0);

    chartData.datasets.push({
      label: emotion,
      data: counts,
      backgroundColor: colors[colorIndex],
      borderColor: colors[colorIndex],
      borderWidth: 1,
    });

    colorIndex = (colorIndex + 1) % colors.length;
  }

  // Destroy existing chart if it exists
  if (barChart) {
    barChart.destroy();
  }

  // Create the bar chart using Chart.js
  const ctx = document.getElementById('emotion_per_date_chart').getContext('2d');
  barChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Function to populate the platform dropdown
function populatePlatformDropdown() {
  const platformDropdown = document.getElementById('platform_dropdown'); // Get the dropdown element

  const platforms = Object.keys(sessionStorage).filter(key => key.endsWith('_news') || key.endsWith('_posts') || key.endsWith('_comments'));

  for (const platform of platforms) {
    const option = document.createElement('option');
    option.value = platform;
    option.text = platform.replace(/_/g, ' ');
    platformDropdown.appendChild(option);
  }
}

// Initialize the platform dropdown
populatePlatformDropdown();

// Listen for dropdown change event
const platformDropdown = document.getElementById('platform_dropdown'); // Get the dropdown element

platformDropdown.addEventListener('change', plotEmotionsPerDate);
