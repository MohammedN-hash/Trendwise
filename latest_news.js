const newsListElement = document.getElementById('news-list');
const genreSelectElement = document.getElementById('genre');

async function getLatestNews() {
    const genre = genreSelectElement.value;
    const response = await fetch(`http://localhost:8000/latest-news/?genre=${genre}`);
    const data = await response.json();
    displayNews(data);
}

function displayNews(newsData) {
    newsListElement.innerHTML = '';
    newsData.forEach(news => {
        const newsCard = createNewsCard(news);
        newsListElement.appendChild(newsCard);
    });
}

function createNewsCard(news) {
    const newsCard = document.createElement('div');
    newsCard.classList.add('news-card');

    const titleElement = document.createElement('h2');
    titleElement.textContent = news.title;

    const publishedElement = document.createElement('p');
    publishedElement.textContent = `Published: ${news.published}`;

    const contentElement = document.createElement('p');
    contentElement.textContent = news.content;

    const linkElement = document.createElement('a');
    linkElement.href = news.link;
    linkElement.textContent = 'Read more';

    newsCard.appendChild(titleElement);
    newsCard.appendChild(publishedElement);
    newsCard.appendChild(contentElement);
    newsCard.appendChild(linkElement);

    return newsCard;
}