import { map } from './map.js';
import { update_news_chart } from './news_pie_chart.js';
import {   generateEmotionBarChart} from './bar_chart.js';



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
    sessionStorage.setItem('df_reddit_posts', JSON.stringify(df_reddit_posts));

    df_reddit_comments = data['comments'];


  } catch (error) {
    // If an error occurs, log it to the console
    console.error(error);
  } finally {
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
  const ctx = document.getElementById('social_media_pie_chart').getContext('2d');

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: emotions_labels,
      datasets: [{
        label: 'Emotion/s',
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
  const randomArticles = document.getElementById("posts_list");
  let selected_number_to_get_random_posts = document.getElementById("selected_posts_number").value;
  randomArticles.innerHTML = ''
  for (let i = 0; i < selected_number_to_get_random_posts; i++) {
    // Select two random posts
    let random_num=Math.random()
    const post = df_reddit_posts[Math.floor(random_num * df_reddit_posts.length)];
    const comments = df_reddit_comments.filter(comment => comment["post_id"] === post["id"]);
    // Append posts and comments to the DOM
    randomArticles.appendChild(createPostElement(post,comments))
  }
}

function createPostElement(post, comments) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const postTitle = document.createElement("h2");
  postTitle.textContent = "Post";
  postContainer.appendChild(postTitle);

  const postAuthor = document.createElement("h3");
  postAuthor.classList.add("post-title");
  postAuthor.textContent = `Author: ${post.author}`;
  postContainer.appendChild(postAuthor);

  const postContent = document.createElement("div");
  postContent.classList.add("post-content");

  const postText = document.createElement("p");
  postText.classList.add("post-text");
  postText.textContent = post.text;
  postContent.appendChild(postText);

  const postEmotion = document.createElement("div");
  postEmotion.classList.add("post-emotion");
  postEmotion.textContent = `Classified emotion: ${post.emotion}`;
  postContent.appendChild(postEmotion);

  const commentsTitle = document.createElement("h2");
  commentsTitle.textContent = "Comments";
  postContent.appendChild(commentsTitle);

  const commentList = document.createElement("ul");
  commentList.classList.add("comment-list");

  comments.forEach(comment => {
    const commentItem = document.createElement("li");
    commentItem.classList.add("comment");

    const commentText = document.createElement("div");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.text;
    commentItem.appendChild(commentText);

    const commentEmotion = document.createElement("div");
    commentEmotion.classList.add("comment-emotion");
    commentEmotion.textContent = `Classified emotion: ${comment.emotion}`;
    commentItem.appendChild(commentEmotion);

    commentList.appendChild(commentItem);
  });

  postContent.appendChild(commentList);
  postContainer.appendChild(postContent);

  return postContainer;
}


// Add an event listener to the text box element
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  update_chart();
  map();
  update_news_chart();
  generateEmotionBarChart();
  
});



// Get the button element and the posts container element
const toggleButton = document.getElementById("posts_toggle_button");
const postsContainer = document.getElementById("posts_list");
toggleButton.innerHTML = "<i class='fas fa-chevron-up'></i>";

// Add a click event listener to the toggle button
toggleButton.addEventListener("click", function () {
  // Toggle the visibility of the posts container
  if (postsContainer.style.display === "none") {
    postsContainer.style.display = "block";
    toggleButton.innerHTML = "<i class='fas fa-chevron-up'></i>";
  } else {
    postsContainer.style.display = "none";
    toggleButton.innerHTML = "<i class='fas fa-chevron-down'></i>";
  }
});