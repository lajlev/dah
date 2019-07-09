function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('#errors').append("Geolocation is not supported by this browser.");
  }
}

$(function () {
  let searchParams = new URLSearchParams(window.location.search);
  if(  searchParams.has('phone') == true ){
    let phonenumber = searchParams.get('phone');
    console.log("phone: " + phonenumber);
  }
  
  
  $('#findLocation').click(function(e){
    e.preventDefault();
    getLocation();
  });
});

$('#sendRegistrationNumber').click(function(){
  console.log("send registration number");
});

function showPosition(position) {
  var crdLat = "";
  var crdLon = "";
  crdLat = position.coords.latitude;
  crdLon = position.coords.longitude;
  console.log("Lat: " + crdLat);
  console.log("Lon: " + crdLon);

  (function loop() {
    setTimeout(function () {
      if(crdLat) {
        window.location.replace("registration-number.html");
      }
      loop()
    }, 1000);
  }());
}