document.addEventListener("DOMContentLoaded", function() {
    const div = document.querySelector("#content");
    
    function onSuccess(location) {
        div.innerText = location.coords;
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
