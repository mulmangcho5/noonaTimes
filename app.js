const API_KEY = 'f36eca93f670483399b76a2befb0db58'
let news = [];

const getLatestNews = async() => {
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    const url = new URL(`https://noonatimess.netlify.app/`);


    const response = await fetch(url);
    console.log("rrr", response);

    const data = await response.json();
    news= data.articles

    console.log("news", news);
}


getLatestNews()