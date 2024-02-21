const API_KEY = 'f36eca93f670483399b76a2befb0db58'
let newsList = [];

const getLatestNews = async () => {
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    const url = new URL(`https://noonatimess.netlify.app/top-headlines?&country=kr`);


    const response = await fetch(url);
    console.log("rrr", response);

    const data = await response.json();
    newsList = data.articles

    console.log("news", newsList);
    render()
}


const render = () => {
    let newsHtml = newsList.map(news => `
    <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${news.urlToImage}"
                        alt="">
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${news.description}</p>
                    <div>${news.source.name} * ${news.publishedAt}</div>
                </div>
            </div>
    `).join("");


    document.querySelector("#news-board").innerHTML = newsHtml;
}




getLatestNews()