var searchParams = new URLSearchParams(window.location.search);
var phonenumber = "";
var registrationNumber = "BC72646";
var crdLat = "";
var crdLon = "";
var result;

if(  searchParams.has('phone') == true ){
  phonenumber = searchParams.get('phone');
  console.log("phone: " + phonenumber);
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
    $(this).attr("disabled", true);
    getLocation();
  });
});

$('#sendRegistrationNumber').click(function(){
  console.log("send registration number");
});

function showPosition(position) {
  
  crdLat = position.coords.latitude;
  crdLon = position.coords.longitude;
  
  sendToSlack();

  (function loop() {
    setTimeout(function () {
      if(crdLat) {
        window.location.replace("registration-number.html");
      }
      loop()
    }, 1000);
  }());
}

function sendToSlack() {
  var url = "https://hooks.slack.com/services/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";
  var text = result;
  $.ajax({
      data: 'payload=' + JSON.stringify({
        "attachments": [
            {
                "color": "#F50A37",
                "title": "RSA Request",
                "fields": [
                    {
                        "title": "Phone number",
                        "value": phonenumber,
                        "short": true
                    },
            {
                        "title": registrationNumber,
                        "value": "value",
                        "short": true
                    },
                    {
                        "title": "Show direction",
                        "value": "http://www.google.com/maps/place/" + crdLat + "," + crdLon,
                        "short": true
                    },
            {
                        "title": "Show location",
                        "value": "value",
                        "short": true
                    }
                ]        
        }
        ]
      }),
      dataType: 'json',
      processData: false,
      type: 'POST',
      url: url
  });
}