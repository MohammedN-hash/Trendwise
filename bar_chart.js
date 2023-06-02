export function generateEmotionBarChart() {
    // Emotions array
    const emotions = ["anger", "disgust", "fear", "joy", "neutral", "sadness", "surprise", "optimism"];
  
    // Function to count emotions in a column
    const countEmotions = (column, list) => {
      const emotionCount = {};
  
      for (const item of list) {
        const emotion = item[column];
  
        if (emotion) {
          if (emotionCount[emotion]) {
            emotionCount[emotion]++;
          } else {
            emotionCount[emotion] = 1;
          }
        }
      }
  
      return emotionCount;
    };
  
    // Get lists from session storage
    const googleNewsList = JSON.parse(sessionStorage.getItem('google_news'));
    const techCrunchNewsList = JSON.parse(sessionStorage.getItem('techcrunch_news'));
    const wired_news_list = JSON.parse(sessionStorage.getItem('wired_news'));
    const reddit_posts_list= JSON.parse(sessionStorage.getItem('df_reddit_posts'));
  
    // Count emotions for each column in the lists
    const googleNewsEmotions = countEmotions('title_emotion', googleNewsList);
    const techCrunchNewsEmotions = countEmotions('title_emotion', techCrunchNewsList);
    const wired_newsEmotions = countEmotions('title_emotion', wired_news_list);
    const reddit_posts_listEmotions = countEmotions('emotion', reddit_posts_list);
  
    // Prepare data for the chart
    const chartData = {
      labels: ['Google news', 'Techcrunch news','Wired news','Reddit'],
      datasets: [],
    };
  
    // Convert emotion counts to datasets for the chart
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#80D742', '#FFD700'];
    const datasets = [];
  
    for (let i = 0; i < emotions.length; i++) {
      const emotion = emotions[i];
      const color = colors[i % colors.length];
      const googleNewsCount = googleNewsEmotions[emotion] || 0;
      const techCrunchNewsCount = techCrunchNewsEmotions[emotion] || 0;
      const wiredNewsCount = wired_newsEmotions[emotion] || 0;
      const reddit_posts_emotionsCount = reddit_posts_listEmotions[emotion] || 0;
  
      datasets.push({
        label: emotion,
        data: [googleNewsCount, techCrunchNewsCount,wiredNewsCount,reddit_posts_emotionsCount],
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      });
    }
  
    chartData.datasets = datasets;
  
    // Create the bar chart using Chart.js
    const ctx = document.getElementById('bar_chart').getContext('2d');
    new Chart(ctx, {
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
  