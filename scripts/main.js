function getLocation(){navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition):$("#errors").append("Geolocation is not supported by this browser.")}function showPosition(t){crdLat=t.coords.latitude,crdLon=t.coords.longitude,localStorage.setItem("DahCrdLat",crdLat),localStorage.setItem("DahCrdLon",crdLon),function t(){setTimeout(function(){crdLat&&window.location.replace("registration-number.html"),t()},1e3)}()}function locationValue(){return null!==localStorage.getItem("DahCrdLat")?"http://maps.google.com/maps?q="+localStorage.getItem("DahCrdLat")+","+localStorage.getItem("DahCrdLon"):"Location not available"}function sendToSlackSuccess(){setTimeout(function(){window.location.replace("complete.html")},1e3)}function sendToSlack(){$.ajax({data:"payload="+JSON.stringify({attachments:[{color:"#F50A37",title:"RSA Request",fields:[{title:"Phone number",value:localStorage.getItem("DahPhoneNumber"),short:!0},{title:"Registration number",value:localStorage.getItem("DahRegistrationNumber"),short:!0},{title:"Show location",value:locationValue(),short:!0},{title:"Source",value:"Via Web",short:!0}]}]}),dataType:"json",processData:!1,success:sendToSlackSuccess(),type:"POST",url:"https://hooks.slack.com/services/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"})}var searchParams=new URLSearchParams(window.location.search),crdLat="",crdLon="";1==searchParams.has("phone")&&(phoneNumber=searchParams.get("phone"),localStorage.setItem("DahPhoneNumber",phoneNumber)),$(function(){$("#findLocation").click(function(t){t.preventDefault(),$(this).addClass("disabled"),getLocation()})}),$("#sendRegistrationNumber").click(function(t){localStorage.setItem("DahRegistrationNumber",$("#registrationNumber").val()),$(this).addClass("disabled"),sendToSlack(),t.preventDefault()});
//# sourceMappingURL=main.js.map