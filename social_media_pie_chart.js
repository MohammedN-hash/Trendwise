import { map } from './map.js';
import { update_news_chart } from './news_pie_chart.js';


// declare a variable to store the data
let df_reddit_posts;
let df_reddit_comments;
let data_count = [0, 0, 0, 0, 0, 0, 0, 0];
// declare a variable to store the chart object
let chart;

let emotions_labels = ["anger", "disgust", "fear", "joy", "neutral", "sadness", "surprise", "optimism"]
sessionStorage.setItem('emotions_labels', JSON.stringify(emotions_labels));

async function get_data(topic, from_date, to_date, number_posts = 10, number_comments = 10) {
  // Set default values if number_posts or number_comments is empty or not provided
  if (!number_posts || isNaN(number_posts)) {
    number_posts = 10;
  }
  if (!number_comments || isNaN(number_comments)) {
    number_comments = 5;
  }

  try {
    // Show the loading Circle
    const loadingCicrle = document.getElementById("social_media_loading_pie");
    loadingCicrle.style.display = "block";

    // Make an HTTP request to a local server
    const response = await fetch(`http://localhost:8000/social_networks?query=${topic}&from_date=${from_date}&to_date=${to_date}&subreddit=All&post_limit=${number_posts}&comment_limit=${number_comments}`);

    // Convert the response data to JSON format
    const data = await response.json();

    // Extract the two lists from the JSON data
    df_reddit_posts = data['posts'];
    df_reddit_comments = data['comments'];


  } catch (error) {
    // If an error occurs, log it to the console
    console.error(error);
  }finally{
    // hide the loading Circle
    const loadingCicrle = document.getElementById("social_media_loading_pie");
    loadingCicrle.style.display = "none";
    
  }
}



async function count_emotions_with_labels(emotionsdata_list) {

  emotionsdata_list.forEach(emotionsdata => {
    const count = emotions_labels.map(label => emotionsdata.filter(val => val['emotion'] === label).length);

    for (let i = 0; i < data_count.length; i++) {
      data_count[i] += count[i];
    }

  });
  sessionStorage.setItem('social_networks_count', JSON.stringify(emotions_labels,data_count));
  return data_count;
}


async function update_chart() {

  // Get the value of the data
  let topic = document.getElementById("topic").value;
  let number_posts = document.getElementById("N_posts").value;
  let number_comments = document.getElementById("N_comments").value;
  let from_date = document.getElementById("from").value;
  let to_date = document.getElementById("to").value;

  if (chart) {
    chart.destroy();
  }
  const encoded_topic = encodeURIComponent(topic);

  await get_data(encoded_topic, from_date, to_date, number_posts, number_comments);
  await count_emotions_with_labels([df_reddit_posts, df_reddit_comments])



  // Create the chart
  const ctx = document.getElementById('sentiment-chart').getContext('2d');

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
        text: 'Social Media Sentiment Analysis'
      }
    }
  });
  addRandomPostsAndComments()
}



function addRandomPostsAndComments() {
  const randomArticles = document.getElementById("RandomeArticles");

  // Select two random posts
  const post1 = df_reddit_posts[Math.floor(Math.random() * df_reddit_posts.length)];
  const post2 = df_reddit_posts[Math.floor(Math.random() * df_reddit_posts.length)];

  // Filter comments for each post
  const comments1 = df_reddit_comments.filter(comment => comment["post_id"] === post1['id']);
  const comments2 = df_reddit_comments.filter(comment => comment["post_id"] === post2["id"]);

  // Append posts and comments to the DOM
  randomArticles.innerHTML = `
  <div class="random-articles">
  <h2 class="section-title">Random posts</h2>
  
  <div class="post-container">
    <h2>Post<h2>
    <h3 class="post-title">Author: ${post1.author}</h3>
    <div class="post-content">
      <p class="post-text">${post1.text}</p>
      <div class="post-emotion">Classfied emotion: ${post1.emotion}</div>
      <h2>Comments<h2>

      <ul class="comment-list">
        ${comments1.map(comment => `
        <li class="comment">
          <div class="comment-text">${comment.text}</div>
          <div class="comment-emotion">Classfied emotion: ${comment.emotion}</div>
        </li>`)}
      </ul>
    </div>
  </div>
  
  <div class="post-container">
    <h2>Post<h2>

    <h3 class="post-title">${post2.author}</h3>
    <div class="post-content">
      <p class="post-text">${post2.text}</p>
      <div class="post-emotion">Classfied emotion: ${post2.emotion}</div>
      <h2>Comments<h2>

      <ul class="comment-list">
        ${comments2.map(comment => `
        <li class="comment">
          <div class="comment-text">${comment.text}</div>
          <div class="comment-emotion">Classfied emotion: ${comment.emotion}</div>
        </li>`)}
      </ul>
    </div>
  </div>
</div>
  `;
}



// Add an event listener to the text box element
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  update_chart();
  map();
  update_news_chart();
});



