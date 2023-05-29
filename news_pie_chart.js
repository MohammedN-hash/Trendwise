

// declare a variable to store the data
let wired_news;
let techcrunch_news;
let google_news;
// declare a variable to store the chart object
let chart;
// declare a variable to store the emotions and emotion count
let emotions_labels = ["anger", "disgust", "fear", "joy", "neutral", "sadness", "surprise", "optimism"]
let data_count = [0, 0, 0, 0, 0, 0, 0, 0];

async function get_data(topic, from_date, to_date, limit = 20) {
  // Set default values if limit is empty or not provided
  if (!limit || isNaN(limit)) {
    limit = 20;
  }

  try {
    // Show the loading Circle
    const loadingCircle = document.getElementById("loading_news_pie");
    loadingCircle.style.display = "block";

    const encodedTopic = encodeURIComponent(topic);
    const url = `http://localhost:8000/get_news?query=${encodedTopic}&from_date=${from_date}&to_date=${to_date}&limit=${limit}`;
    const response = await fetch(url);
    // Convert the response data to JSON format
    const data = await response.json();
    console.log(data);

    // Extract the three news lists from the JSON data
    google_news = data['google_news'];
    sessionStorage.setItem('google_news', JSON.stringify(google_news));
    wired_news = data['wired_news'];
    sessionStorage.setItem('wired_news', JSON.stringify(wired_news));
    techcrunch_news = data['techcrunch_news'];
    sessionStorage.setItem('techcrunch_news', JSON.stringify(techcrunch_news));

    console.log(wired_news)
  } catch (error) {
    // If an error occurs, log it to the console
    console.error(error);
  } finally {
    // Hide the loading Circle
    const loadingCircle = document.getElementById("loading_news_pie");
    loadingCircle.style.display = "none";
  }
}


async function count_emotions_with_labels(emotionsdata_list) {


  emotionsdata_list.forEach(emotionsdata => {
    const count = emotions_labels.map(label => emotionsdata.filter(val => val['title_emotion'] === label).length);

    for (let i = 0; i < data_count.length; i++) {
      data_count[i] += count[i];
    }
  });

  return data_count;
}



export async function update_news_chart() {

  // Get the value of the data
  let topic = document.getElementById("topic").value;
  let limit = document.getElementById("N_posts").value;

  let from_date = document.getElementById("from").value;
  let to_date = document.getElementById("to").value;



  await get_data(topic, from_date, to_date, limit);
  await count_emotions_with_labels([google_news,wired_news,techcrunch_news]);



  console.log(data_count)
  console.log('sdkfjlaskjfnglfsad')




  if (chart) {
    chart.destroy();
  }
  // Create the chart
  const ctx = document.getElementById('news_pie_chart').getContext('2d');

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: emotions_labels,
      datasets: [{
        label: 'Person/s',
        data: data_count,
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
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 201, 86, 0.5)',
          'rgba(54, 162, 236, 0.5)',
          'rgba(255, 206, 89, 0.5)',
          'rgba(255, 218, 86, 0.5)',
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
        text: 'News Analysis'
      }
    }
  });
  add_random_article(3)
}



function add_random_article(number_of_articles) {
  const randomArticles = document.getElementById("randome_news_articles");

  let selected_articles = [];
  
  // Select random articles
  for (let i = 0; i < number_of_articles; i++) {
    const article1 = google_news[Math.floor(Math.random() * google_news.length)];
    const article2 = techcrunch_news[Math.floor(Math.random() * techcrunch_news.length)];
    const article3 = wired_news[Math.floor(Math.random() * wired_news.length)];
    selected_articles.push(article1, article2, article3);
  }
  
  let html_content = '';
  
  for (const article of selected_articles) {
    // Append posts and comments to the DOM
    html_content += `
      <h1>Title: ${article.title}</h1>
      <p>title_emotion: ${article.title_emotion}</p>
      <p>Body: ${article.content}</p>
      <p>body emotion: ${article.content_emotion}</p>
      <p>link: ${article.link}</p>
    `;
  }
  
  randomArticles.innerHTML = html_content;
}



