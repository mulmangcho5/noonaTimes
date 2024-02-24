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

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;


const getNews = async () => {

    try {
        url.searchParams.set("page", page); //&page=page
        url.searchParams.set("pageSize", pageSize)

        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
            if (data.articles.length === 0) {
                throw new Error("결과가 없습니다.")
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationnder()
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


const paginationnder = () => {
    // totalResults
    // page
    // pageSize
    // groupSize

    // totalPages
    const totalPages = Math.ceil(totalResults / pageSize);

    // totalPages
    const pageGroup = Math.ceil(page / groupSize);

    // lastPage
    const lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }

    // firstPage
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHtml = `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHtml += `<li class="page-item ${i===page?"active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    paginationHtml += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>`

    document.querySelector(".pagination").innerHTML = paginationHtml;
    // <nav aria-label="Page navigation example">
    //     <ul class="pagination">
    //         <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //         <li class="page-item"><a class="page-link" href="#">1</a></li>
    //         <li class="page-item"><a class="page-link" href="#">2</a></li>
    //         <li class="page-item"><a class="page-link" href="#">3</a></li>
    //         <li class="page-item"><a class="page-link" href="#">Next</a></li>
    //     </ul>
    // </nav>

}

const moveToPage = (pageNum) => {
    console.log("pageNumber", pageNum);
    page = pageNum
    getNews()
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