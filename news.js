<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="css/uikit.min.css">
</head>

<body>
    <div class="uk-navbar-container">
        <div class="uk-container uk-container-large">
            <nav class="uk-navbar">
                <div class="uk-navbar-left">
                    <div class="uk-navbar-item uk-logo uk-text-bold">
                        NewsPaper
                    </div>
                </div>
                <div class="uk-navbar-right">
                    <span id="userName" class="uk-margin-right uk-text-capitalize">
                        rolf hegdal
                    </span>
                    <img id="userImg" style="height: 50px; width: 50px" src="https://randomuser.me/api/portraits/thumb/men/17.jpg" class="uk-border-circle">
                </div>
            </nav>
        </div>
    </div>



    <div class="uk-container uk-container-large">
        <div uk-grid class="uk-padding-large uk-padding-remove-horizontal uk-grid-divider">
                <main>
                    <h2 class="uk-margin-bottom">Персональная лента новостей</h2>
                    <hr class="uk-margin-medium-bottom">
                    <div id="news" uk-grid="masonry: true" class="uk-child-width-1-2">
                    </div>
                </main>
        </div>
    </div>



    <script src="js/uikit.min.js"></script>
    <script src="js/uikit-icons.min.js"></script>


    <script>
        'use strict';
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://randomuser.me/api/`, true);
        xhr.send();
        xhr.addEventListener('readystatechange', function(){
            if (xhr.status == 200 && xhr.readyState == 4){
                let response = JSON.parse(xhr.responseText).results[0];
                userName.innerHTML = response.name.first + " " +response.name.last + " [" + response.email + "]";
                userImg.src = response.picture.thumbnail;
            }
        })

        let xhr_ad = new XMLHttpRequest();
        xhr_ad.open("GET", `http://37.77.104.246/api/ads/getbanners_json.php`, true);
        xhr_ad.send();
        xhr_ad.addEventListener('readystatechange', function(){
            if (xhr_ad.status == 200 && xhr_ad.readyState == 4){
                let response = JSON.parse(xhr_ad.responseText);
                for (let elem of response){
                    let newElem = document.createElement('IMG')
                    newElem.src = elem;
                    newElem.style.marginBottom = "20px";
                    ads.appendChild(newElem);
                }
            }
        })

        let xhr_news = new XMLHttpRequest();
        xhr_news.open("GET", `http://newsapi.org/v2/top-headlines?country=ru&apiKey=d7f41a32c26b4bbfb596d58b1a54c766`, true,);
        xhr_news.send();
        xhr_news.addEventListener('readystatechange', function(){
            if (xhr_news.status == 200 && xhr_news.readyState == 4){
                let response = JSON.parse(xhr_news.responseText).articles;
                for (let article of response){
                    createArticle(article.source.name, article.title, article.description, article.url, article.urlToImage);
                }
            }
        })

        function createArticle(name, title, description, url, img_url) {
            let text = `
            <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <h3 class="uk-card-title">
                                    ${title}
                                </h3>
                                <img
                                    src="${img_url}">
                                <p class="uk-text-meta">
                                    Источник: <span>${name}</span>
                                </p>
                                <p>
                                    ${description}
                                </p>
                                <a href="${url}" class="uk-button uk-button-primary"
                                    target="_blank">Читать источник...</a>
                            </div>
                        </div>
            `;
            news.innerHTML = text;
        }
    </script>
</body>

</html>
