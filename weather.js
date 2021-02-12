const weather=document.querySelector(".js-weather");

const API_KEY = "9d2fec1a4eeffe743c5c9f3b7028854e";
const COORDS='coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature=json.main.temp;
        const place=json.name;
        weather.innerText=`${temperature}℃  @${place}`;
    });
};//units=metric(미터법으로 변경), then은 완전 호출한 다음에 실행

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

function handleGeoSuccess(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude:latitude,
        longitude:longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
};

function handleGeoError(){
    console.log("Can't access geo location");
};

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    } else {
        const parseCoords=JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);//network패널에 weather파일 생성(해당 위치의 날씨 API 파일)
    }
};

function init(){
    loadCoords();
};

init();