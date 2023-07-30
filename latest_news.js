// latest_news.js
document.addEventListener("DOMContentLoaded", function () {
    const genreSelector = document.getElementById("genre");
    const newsList = document.getElementById("news-list");
    let offset = 0;
    const limit = 10;

    genreSelector.addEventListener("change", () => {
        offset = 0; // Reset offset when genre changes
        fetchAndRenderNews();
    });

    window.addEventListener("scroll", () => {
        // Load more news when user scrolls to the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            offset += limit;
            fetchAndRenderNews(true);
        }
    });

    async function fetchAndRenderNews(loadMore = false) {
        const selectedCategory = genreSelector.value; // Use selectedCategory instead of selectedGenre
        const response = await fetch(`http://localhost:8000/latest-news/?category=${selectedCategory}&offset=${offset}&limit=${limit}`); // Use "category" instead of "genre"
        const articles = await response.json();

        if (loadMore) {
            // Append new articles when loading more
            appendNews(articles);
        } else {
            // Replace existing news with new articles
            newsList.innerHTML = "";
            renderNews(articles);
        }
    }

    function renderNews(articles) {
        if (articles.length === 0) {
            newsList.innerHTML = "<p>No news articles found for the selected category.</p>";
            return;
        }

        articles.forEach((article) => {
            const articleElement = createArticleElement(article);
            newsList.appendChild(articleElement);
        });
    }

    function appendNews(articles) {
        if (articles.length === 0) {
            // No more articles to load
            return;
        }

        articles.forEach((article) => {
            const articleElement = createArticleElement(article);
            newsList.appendChild(articleElement);
        });
    }

    function createArticleElement(article) {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");

        const sourceElement = document.createElement("p");
        sourceElement.classList.add("source");
        sourceElement.textContent = `Source: ${article.source}`;
        articleElement.appendChild(sourceElement);

        const titleElement = document.createElement("a");
        titleElement.classList.add("title");
        titleElement.textContent = article.title;
        titleElement.href = article.link;
        articleElement.appendChild(titleElement);

        const contentElement = document.createElement("p");
        contentElement.classList.add("content");
        contentElement.textContent = article.content;
        articleElement.appendChild(contentElement);

        const publishedElement = document.createElement("p");
        publishedElement.classList.add("published");
        publishedElement.textContent = `Published: ${article.published}`;
        articleElement.appendChild(publishedElement);

        return articleElement;
    }

    // Fetch initial news
    fetchAndRenderNews();
});
