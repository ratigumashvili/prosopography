var mylat = '42.000';
var mylong = '42.000';
var myzoom = '7';

var map = L.map('issMap').setView([mylat, mylong], myzoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.addControl(new L.Control.Fullscreen());

markers = [{
    "name": "<h6 class='map-title'>აბრსკილი</h6><a href='place-article.html'>დაწვრილებით</a>",
    "textContent": "",
    "lat": 42.7140,
    "lng": 41.4748
}, {
    "name": "<h6 class='map-title'>ახალი ათონი</h6><a href='place-article.html'>დაწვრილებით</a>",
    "textContent": "",
    "lat": 43.0017,
    "lng": 41.0278
}, {
    "name": "<h6 class='map-title'>პრომეთე</h6><a href='place-article.html'>დაწვრილებით</a>",
    "textContent": "",
    "lat": 42.3267,
    "lng": 42.5961
}






];



for (var i = 0; i < markers.length; ++i) {
    L.marker([markers[i].lat, markers[i].lng], {
        icon: new L.DivIcon({
            className: 'my-div-icon',
            html: '<span class="my-map-label">' + markers[i].textContent + '</span>'
        })
    }).addTo(map);

    L.marker([markers[i].lat, markers[i].lng]).addTo(map).bindPopup(markers[i].name);
}
