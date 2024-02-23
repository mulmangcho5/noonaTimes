const API_KEY = 'f36eca93f670483399b76a2befb0db58'
let newsList = [];
const menus = document.querySelectorAll(".menus button")
const menus_M = document.querySelectorAll("#menu-list button")
menus.forEach(menu => menu.addEventListener("click", (e) => getNewsByCategory(e)))
menus_M.forEach(menu => menu.addEventListener("click", (e) => {
    getNewsByCategory(e);
    document.querySelector("#mySidenav").style.width = "0";
}))
let url = new URL(`https://noonatimess.netlify.app/top-headlines?&country=kr`);


const getNews = async () => {

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
            if(data.articles.length===0){
                throw new Error("결과가 없습니다.")
            }
            newsList = data.articles;
            render();
        } else {
            throw new Error(data.message)
        }

    } catch (error) {
        console.log("error : ", error.message);
        errorRender(error.message)
    }


}

const getLatestNews = async () => {
    // 실제api
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);

    // 과제용 누나api
    url = new URL(`https://noonatimess.netlify.app/top-headlines?&country=kr`);


    getNews();
}

const getNewsByCategory = async (e) => {
    const category = e.target.textContent.toLowerCase();
    // 실제api
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);

    // 과제용 누나api
    url = new URL(`https://noonatimess.netlify.app/top-headlines?&country=kr&category=${category}&apiKey=${API_KEY}`);

    getNews()
}

const getNewsByKeyword = async () => {
    const keyword = document.querySelector("#search-input").value;
    // 실제api
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`);

    // 과제용 누나api
    url = new URL(`https://noonatimess.netlify.app/top-headlines?&country=kr&q=${keyword}&apiKey=${API_KEY}`);

    getNews();
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

const errorRender = (errorMessage) => {
    const errorHtml = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`
  document.querySelector("#news-board").innerHTML = errorHtml;
}



getLatestNews()








// 사이드 메뉴
const openNav = () => {
    document.querySelector("#mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.querySelector("#mySidenav").style.width = "0";
};

// 검색창
const openSearchBox = () => {
    let inputArea = document.querySelector("#input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};