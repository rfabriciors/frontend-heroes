var url_api = document.querySelector('input#api_url');
var key_api = document.querySelector('input#api_key');
var btn_result = document.querySelector('input#btn_consult');
var resultado = document.querySelector('div#div_result');
var resultado2 = document.querySelector('div#div_result2');
var section = document.querySelector('section');

// var flask_api_host = 'flaskapihost';
var flask_api_host = 'flask-service';
var flask_url =  'http://' + flask_api_host + ':5000/api';

btn_result.addEventListener('click',getResult);
/*
    var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
*/
var request = new XMLHttpRequest();

function getResult() {  // Faz a requisição a API
    // request.open('GET', 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
    request.open('GET', flask_url);
    console.log(flask_url);
    request.responseType = 'json';
    request.send();
}

request.onload = function () {
    // Do something with the retrieved data ( found in xmlhttp.response )
    var respostaJSON = request.response;
    populateHeader(respostaJSON);  // Preenche cabeçalho
    populateHerois(respostaJSON);  // Preenche a relação de heróis
};   

function populateHeader(JsonObj){

    var headerH1 = document.createElement('h1');
    headerH1.textContent = JsonObj['squadName'];
    resultado.appendChild(headerH1);

    var myPara = document.createElement('p');
    myPara.textContent = 'HomeTown: ' + JsonObj['homeTown'] +' // Formed: ' + JsonObj['formed'];

    console.log(JsonObj['homeTown']);
    resultado2.appendChild(myPara);
}

function populateHerois(JsonObj){
    var heroes = JsonObj['members'];
    for(var i=0;i<heroes.length;i++){
        console.log(`Nome: ${heroes[i].name}, Idade: ${heroes[i].age}, Identidade Secreta: ${heroes[i].secretIdentity}`);
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');

        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpowers:';

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
        
        var power = heroes[i]['powers'];
        for(var j=0;j<power.length;j++){
            console.log(`\t${power[j]}`);
            var listItem = document.createElement('li');
            listItem.textContent = power[j];
            myList.appendChild(listItem);
        }
    }
}