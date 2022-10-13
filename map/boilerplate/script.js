let singapore = [1.3521, 103.8198];
let map = L.map('map');
map.setView(singapore, 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' 
}).addTo(map); 

let markerClusterLayer = L.markerClusterGroup(); 
markerClusterLayer.addTo(map);

window.addEventListener("DOMContentLoaded", async function () {
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let coordinates = response.data.features[0].geometry.coordinates;
    for (let c of coordinates) {
        let lat = c[1];  
        let lng = c[0];
        let marker = L.marker([lat, lng]);
        marker.addTo(markerClusterLayer)
    }
});

setInterval(async function () {
    console.log("Time up")
    markerClusterLayer.clearLayers();  
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let coordinates = response.data.features[0].geometry.coordinates;
    for (let c of coordinates) {
        let lat = c[1];  
        let lng = c[0];
        let marker = L.marker([lat, lng]);
        marker.bindPopup(`<p>${lat}, ${lng}</p>`)
        marker.addTo(markerClusterLayer)
    }
}, 1000 * 30);