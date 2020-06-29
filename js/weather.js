const catIcon = L.icon({iconUrl: 'img/catIcon.png', iconSize:[38, 38], iconAnchor: [19, 38]});
const mymap = L.map('map');
const marker = L.marker([0, 0], {icon: catIcon}).addTo(mymap);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

function weather () {
  navigator.geolocation.getCurrentPosition(async (event) => {
    mymap.setView([event.coords.latitude, event.coords.longitude], 13);
    marker.setLatLng([event.coords.latitude, event.coords.longitude]).update();
    const url = "http://api.weatherstack.com/current?access_key=efd350a8ef4ecf4affd3c61c0ad9dea3&query=";
    try {
      const response = await fetch(url + event.coords.latitude + ',' + event.coords.longitude);
      if (response.ok){
        const json = await response.json(),
          weather = json.current.weather_icons[0],
          degrees = json.current.temperature,
          time = json.current.observation_time,
          humidity = json.current.humidity;
        document.getElementById("weather").src = weather;
        document.getElementById("degrees").innerText = degrees;
        document.getElementById("time").innerText = time;
        document.getElementById("humidity").innerText = humidity;
      }
    } catch (e) {
      alert("Не удалось получить данные о погоде");
    }
  }, () => {
    alert("Не удалось получить текущую позицию. Возможно стоит проверить настройки геолокации")
  }, {enableHighAccuracy: true});
}
weather();
setInterval(weather, 60*1000);
