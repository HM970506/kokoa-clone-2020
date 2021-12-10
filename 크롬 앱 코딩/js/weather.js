const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const cloth = document.querySelector("#cloth span:first-child");
const API_KEY="630b5303f9175771e71dd96d35fa650c";

const CLOTH=["민소매, 반팔, 반바지", "반팔, 얇은 셔츠, 면바지",
"얇은 가디건, 청바지", "얇은 니트, 맨투맨, 가디건", "자켓, 가디건, 스타킹",
"자켓, 트렌치코트, 니트", "코트, 히트택, 니트",
"패딩, 코트, 목도리"];

function onGeoOk(position) { //js가 geolocation 접속성공시 자동으로 주는 값
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(url).then((response)=>response.json()).then((data)=>{

        city.innerText = data.name;
        let maxTemp=KtoC(data.main.temp_max);
        let minTemp=KtoC(data.main.temp_min);
        weather.innerText = `${data.weather[0].main} / ${minTemp}℃ ~ ${maxTemp}℃`;
        console.log(data);
        cloth.innerHTML="추천 옷차림: "+CLOTH[WhatCloth(KtoC(data.main.tem))];
    }); 

  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }

  function KtoC(tem){
    return (parseInt(tem)-273.15).toFixed(0);
  }

  function WhatCloth(tem){
    if(tem>=28) return 0;
    else if(tem>=23) return 1;
    else if(tem>=20) return 2;
    else if(tem>=17) return 3;
    else if(tem>=12) return 4;
    else if(tem>=9) return 5;
    else if(tem>=5) return 6;
    else return 7;
  }
  
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); //성공시 함수, 에러시 함수
