document.addEventListener("DOMContentLoaded", function() {
    const div = document.querySelector("#content");
    
    function showPosition(position) {
      var latlon = position.coords.latitude + "," + position.coords.longitude;

      var img_url = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false&key=YOUR_KEY";

      document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
    }
    
    function onSuccess(location) {
        div.innerText = location.coords.latitude + ", " + location.coords.longitude + ", " + location.coords.altitude + ", " + location.coords.heading;
        showPosition(location);
    }

    function onError(error) {
        div.innerText = "Geolocation supported but failed: " + error.message;
    }
    
    if (navigator.geolocation) {
        const options = {enableHighAccuracy: true};
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    } else {
        div.innerText = "Geolocation not supported";
    }
});
