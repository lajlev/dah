var searchParams = new URLSearchParams(window.location.search);
var crdLat = "";
var crdLon = "";

if(  searchParams.has('phone') == true ){
  phoneNumber = searchParams.get('phone');
  localStorage.setItem("DahPhoneNumber",phoneNumber);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $('#errors').append("Geolocation is not supported by this browser.");
  }
}

$(function () {  
  $('#findLocation').click(function(e){
    e.preventDefault();
    $(this).addClass('disabled');
    getLocation();
  });
});

function showPosition(position) {
  
  crdLat = position.coords.latitude;
  crdLon = position.coords.longitude;
  
  localStorage.setItem("DahCrdLat",crdLat);
  localStorage.setItem("DahCrdLon",crdLon);

  (function loop() {
    setTimeout(function () {
      if(crdLat) {
        window.location.replace("registration-number.html");
      }
      loop()
    }, 1000);
  }());
}

$('#sendRegistrationNumber').click(function(e){
  localStorage.setItem("DahRegistrationNumber",$('#registrationNumber').val());
  $(this).addClass('disabled');
  sendToSlack();
  e.preventDefault();
  
});

function locationValue(){
  if(localStorage.getItem("DahCrdLat")!==null) {
    return "http://www.google.com/maps/place/" + localStorage.getItem("DahCrdLat") + "," + localStorage.getItem("DahCrdLon")
  } else {
    return "Location not available"
  }
}

function sendToSlackSuccess() {
  setTimeout(function () {
    window.location.replace("complete.html");
  }, 1000);
}

function sendToSlack() {
  var url = "https://hooks.slack.com/services/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";
  $.ajax({
      data: 'payload=' + JSON.stringify({
        "attachments": [
          {
            "color": "#F50A37",
            "title": "RSA Request",
            "fields": [
              {
                "title": "Phone number",
                "value": localStorage.getItem("DahPhoneNumber"),
                "short": true
              },
              {
                "title": "Registration number",
                "value": localStorage.getItem("DahRegistrationNumber"),
                "short": true
              },
              {
                "title": "Show location",
                "value": locationValue(),
                "short": true
              },
              {
                "title": "Source",
                "value": "Via Web",
                "short": true
              }
            ]        
          } 
        ]
      }),
      dataType: 'json',
      processData: false,
      success: sendToSlackSuccess(), 
      type: 'POST',
      url: url
  });
}