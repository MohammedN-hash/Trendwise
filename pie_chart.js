// declare a variable to store the data
let dataset;
let dataCount;
// declare a variable to store the chart object
let chart;


async function getData() {

  try {
    const response = await fetch('http://localhost:8000/getAnalysis?query=Tesla&post_limit=3');
    const data = await response.json();
    const dataset = data.list1;
    const list2 = data.list2;
    const list3 = data.list3;
    return [list1, list2, list3];
  } catch (error) {
    console.error(error);
  }
}




async function updateChart() {
  // Get the value of the data
  const topic = document.getElementById("topic").value;
  if (chart) {
    chart.destroy();
  }
  if (!dataset) {
    await getData();
  }

  // Parse the CSV data using Papa Parse
  let parsedData = Papa.parse(dataset, { header: true });
  // Filter each label in a certin topic 
  let filteredData = parsedData.data.filter(row => row['Query'] === topic);
  const columnName = 'Label';
  const negative = filteredData.filter(val => val[columnName] == '0');
  const natural = filteredData.filter(val => val[columnName] == '2');
  const positive = filteredData.filter(val => val[columnName] == '4');
  // Count all filtered labeles
  const negative_count = negative.length;
  const natural_count = natural.length;
  const positive_count = positive.length;

  dataCount = [negative_count, natural_count, positive_count];

  // Create the chart
  const ctx = document.getElementById('sentiment-chart').getContext('2d');

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Negative", "Natural", "Positive"],
      datasets: [{
        label: 'Person/s',
        data: dataCount,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
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

  // Get sample topics 
  let Query = parsedData.data.map(row => row['Query']);
  let uniqueValues = [...new Set(Query)];
  let uniqueValueCount = uniqueValues.length;
  let randomValues = uniqueValues.sort(() => Math.random() - 0.5).slice(0, 5);
  // Show sample topics 
  const RandomeExamples = document.getElementById("RandomeExamples");
  RandomeExamples.textContent = 'Randome examples: ' + randomValues.join(", ");


  // Get sample articles 
  const randomIndex = Math.floor(Math.random() * negative.length);

  let RandomePositiveArticles = positive[randomIndex]['Tweet'];
  let RandomeNegativeArticles = negative[randomIndex]['Tweet'];
  // Show sample topics 
  const RandomeArticlesPlaceHolder = document.getElementById("RandomeArticles");
  RandomeArticlesPlaceHolder.textContent = 'Randome postive: ' + RandomePositiveArticles+'                                            Randome negative '+RandomeNegativeArticles;

} 




// Add an event listener to the text box element
const textbox = document.getElementById("topic");
textbox.addEventListener("input", updateChart);

// Call getData initially to get the data at the begining
// getData()
// Call updateChart initially to display the chart based on the initial value of the text box
updateChart();
