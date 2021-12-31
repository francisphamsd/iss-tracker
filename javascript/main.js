// Get map
const map = L.map("map").setView([0, 0], 1);
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

// Get marker

const issIcon = L.icon({
  iconUrl: "../img/iss-icon.png",
  iconSize: [50, 50],
  iconAnchor: [25, 25],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);
// Get data

const lat = document.getElementById("lat");
const lon = document.getElementById("lon");
const vel = document.getElementById("vel");
const alt = document.getElementById("alt");
const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";
const followISS = document.getElementById("follow");

async function getData() {
  const response = await fetch(iss_url);
  const data = await response.json();
  const { latitude, longitude, velocity, altitude } = data;
  marker.setLatLng([latitude, longitude]);
  lat.textContent = latitude.toFixed(3);
  lon.textContent = longitude.toFixed(3);
  vel.textContent = velocity.toFixed(0);
  alt.textContent = altitude.toFixed(0);

  // Follow the I.S.S
  followISS.addEventListener("click", () => {
    if (followISS.checked) {
      map.setView([latitude, longitude], 3);
    } else if (followISS.checked == false) {
      map.setView([0, 0], 1);
    }
  });
}
getData();
setInterval(getData, 1000);
