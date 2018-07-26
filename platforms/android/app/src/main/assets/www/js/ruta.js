var map; 

  $('#fondo_load').show();
  $('#load').show();

      function initMap() {

        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 8.752067, lng: -75.879829}
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

        var geo_options = {
          enableHighAccuracy: true, 
          maximumAge        : 30000, 
          timeout           : 27000
        };
        function geo_error() {
          alert("Sorry, Gps no activo.");
        }


          navigator.geolocation.watchPosition(function(position) {

            calculateAndDisplayRoute(directionsService, directionsDisplay,position.coords.latitude,position.coords.longitude,getParameterByName('lat'),getParameterByName('lon'));

          }, geo_error, geo_options);

        
            $('#fondo_load').hide();
            $('#load').hide();
      }


      function calculateAndDisplayRoute(directionsService, directionsDisplay,lat,lon,latd,lond) {
        directionsService.route({
          origin: new google.maps.LatLng(lat,lon),
          destination: new google.maps.LatLng(latd,lond),
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

