var map;
var markers = [];
var marker = false;

function initMap(lati, long) {
  var options = {
    center: {
      lat: lati,
      lng: long,
    },
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.HYBRID,
  };
  map = new google.maps.Map(document.getElementById("terminalMap"), options);
  var coords = {
    lat: lati,
    lng: long,
  };
  document.getElementById("lat").value = lati;
  document.getElementById("lng").value = long;
  addMaker(coords);

  function addMaker(coords) {
    marker = new google.maps.Marker({
      position: coords,
      map: map,
      animation: google.maps.Animation.DROP,
    });
    markers.push(marker);
  }
}
