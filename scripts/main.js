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
  console.log("Lat: " + position.coords.latitude);
  console.log("Lon: " + position.coords.longitude);
  navigator.permissions && navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
    if(PermissionStatus.state == 'granted'){
      window.location.replace("registration-number.html");
    }else{
      console.log('denied');
    }
})
  
}