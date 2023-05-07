// declare a variable to store the data
let df_reddit_posts;
let df_reddit_comments;
let dataCount = [0, 0, 0, 0, 0, 0, 0,0];
// declare a variable to store the chart object
let chart;

emotions_labels=["anger","disgust","fear","joy","neutral","sadness","surprise","optimism"]

async function getData() {

  try {
    // Make an HTTP request to a local server
    const response = await fetch('http://localhost:8000/getAnalysis?query=Tesla&post_limit=7&comment_limit=9');
    
    // Convert the response data to JSON format
    const data = await response.json();
    
    // Extract the two lists from the JSON data
    df_reddit_posts = data['posts'];
    df_reddit_comments = data['comments'];
    console.log(df_reddit_posts);
    console.log(df_reddit_comments);
    
  } catch (error) {
    // If an error occurs, log it to the console
    console.error(error);
  }
}


async function count_emotions_with_labels(emotionsdata_list) {

  emotionsdata_list.forEach(emotionsdata => {
    const count = emotions_labels.map(label => emotionsdata.filter(val => val['emotion'] === label).length);

    for (let i = 0; i < dataCount.length; i++) {
      dataCount[i] += count[i];
    }

  });
  console.log(dataCount);
  return dataCount;
}


async function updateChart() {
  // Get the value of the data
  const topic = document.getElementById("topic").value;
  if (chart) {
    chart.destroy();
  }
  
  await getData();
  await count_emotions_with_labels([df_reddit_posts,df_reddit_comments])
  


  // Create the chart
  const ctx = document.getElementById('sentiment-chart').getContext('2d');

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels:emotions_labels,
      datasets: [{
        label: 'Person/s',
        data: dataCount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 201, 86, 0.5)',
          'rgba(54, 162, 236, 0.5)',
          'rgba(255, 206, 89, 0.5)',
          'rgba(255, 218, 86, 0.5)',
          'rgba(253, 223, 87, 0.5)',
          'rgba(235, 246, 88, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 137, 1)',
          'rgba(54, 162, 239, 1)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(54, 162, 236, 0.5)',
          'rgba(54, 162, 234, 0.5)',
          'rgba(255, 206, 89, 0.5)',
          'rgba(253, 223, 87, 0.5)',
          'rgba(235, 246, 88, 0.5)',

        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Social Media Sentiment Analysis'
      }
    }
  });

} 




// Add an event listener to the text box element
const textbox = document.getElementById("topic");
textbox.addEventListener("input", updateChart);

// Call getData initially to get the data at the begining
getData()
// Call updateChart initially to display the chart based on the initial value of the text box
updateChart();
