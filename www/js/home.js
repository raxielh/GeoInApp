$(function()
{
   
  $("#map").css("height", screen.height-80);

});

//alert(screen.width + " x " + screen.height) 


function salir(){
  $.confirm({
      title: 'Confirm!',
      content: 'Simple confirm!',
      buttons: {
          confirmar: function () {
            firebase.auth().signOut().then(function(){
                location.href ="entrar.html";
            }).catch(function(error){

            });
          },
          cancelar: function () {
          }
      }
  });
}

var map, infoWindow;
function initMap()
{
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 8.756917, lng: -75.879524},
    zoom:14 
  });
  
  infoWindow = new google.maps.InfoWindow;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(pos);
      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
