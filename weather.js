let loadButton = document.getElementById('load');
loadButton.onclick = () => {

//получить API Key https://home.openweathermap.org/api_keys
//строка:
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

async function success(position) {
    const lat = position.coords.latitude;//53.13; //
    const lon = position.coords.longitude;//4.11;//

    const APIkey = '7c871f23791e7e4646bb4bf648aca357';
    console.log('latitude' + lat);
    console.log('longitude ' + lon);


//// let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=48.30&lon=18.06&appid=7c871f23791e7e4646bb4bf648aca357`);
////  console.log(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7c871f23791e7e4646bb4bf648aca357`);

let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);
// let result1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=${APIkey}`);
//// console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`);

////  let result = fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIkey}`);
//// console.log('http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIkey}');
console.log(result);
let resJson = await result.json();
console.log(resJson);

let name = document.getElementById('name');
name.innerText =  resJson.name;

let temp = document.getElementById('temp');
temp.innerText =  (resJson['main']['temp']-273.15).toFixed(2) + '°';

let max_temp = document.getElementById('max_temp');
max_temp.innerText =  (resJson['main']['temp_max']-273.15).toFixed(2) + '°';

let min_temp = document.getElementById('min_temp');
min_temp.innerText =   (resJson['main']['temp_min']-273.15).toFixed(2) + '°';;

let feels_like = document.getElementById('feels_like');
feels_like.innerText =  (resJson['main']['feels_like']-273.15).toFixed(2) + '°';;

let humidity = document.getElementById('humidity');
humidity.innerText =  resJson['main']['humidity']+'%';

let icon = document.getElementById('icon');
const iconcode= resJson['weather'][0]['icon'];
icon.src =  `https://openweathermap.org/img/wn/${iconcode}@2x.png`;

let weatherdesc = document.getElementById('weatherdesc');
weatherdesc.innerText =  resJson['weather'][0]['description']

let winddeg = document.getElementById('winddeg');
winddeg.innerText =  resJson['wind']['deg']+'°'

let windspeed = document.getElementById('windspeed');
windspeed.innerText =  resJson['wind']['speed']

let rain = document.getElementById('rain');
rain.innerText =  resJson['rain']['1h']

    status.textContent = "";
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
