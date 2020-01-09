document.addEventListener("DOMContentLoaded", function() {

    const gps = document.querySelector("#gps");
    const acc = document.querySelector("#acc");
    const video = document.querySelector("#video");

    function onGeolocated(location) {
        console.log("Successfully geolocated: " + location.coords.latitude + ", " + location.coords.longitude + ", " + location.coords.altitude + ", " + location.coords.heading);
        gps.innerText = location.coords.latitude + ", " + location.coords.longitude + ", " + location.coords.altitude + ", " + location.coords.heading;
    }

    function onGeolocationFailed(error) {
        console.log("Error while geolocating: " + error.code + ", " + error.message);
        gps.innerText = "Geolocation supported but failed: " + error.message;
    }

    if (navigator.geolocation) {
        console.log("Geolocation API supported");
        const options = {enableHighAccuracy: true};
        navigator.geolocation.getCurrentPosition(onGeolocated, onGeolocationFailed, options);
    } else {
        console.log("Geolocation API unsupported");
        gps.innerText = "Geolocation not supported";
    }

    if (window.DeviceMotionEvent === undefined) {
        console.log("Accelerometer API unsupported");
        acc.innerText = "Accelerometer API unsupported";
    } else {

        function accelerometerUpdate(event) {

           const aX = event.accelerationIncludingGravity.x * 10;
           const aY = event.accelerationIncludingGravity.y * 10;
           const aZ = event.accelerationIncludingGravity.z * 10;

           acc.innerHTML = aX + "<br>" + aY + "<br>" + aZ;
        }

        window.addEventListener("devicemotion", accelerometerUpdate, true);
    }

    function hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    if (hasGetUserMedia()) {
        console.log('Camera API supported');

        const constraints = {
          video: {
              facingMode: 'environment'
          },
          audio: false
        };

        const video = document.querySelector('video');

        navigator.mediaDevices.getUserMedia(constraints).
          then((stream) => {video.srcObject = stream});

        function gotDevices(deviceInfos) {
            for (const info of deviceInfos) {
                console.log(info);
            }
          // for (let i = 0; i !== deviceInfos.length; ++i) {
          //   const deviceInfo = deviceInfos[i];
          //   const option = document.createElement('option');
          //   option.value = deviceInfo.deviceId;
          //   if (deviceInfo.kind === 'audioinput') {
          //     option.text = deviceInfo.label ||
          //       'microphone ' + (audioSelect.length + 1);
          //     audioSelect.appendChild(option);
          //   } else if (deviceInfo.kind === 'videoinput') {
          //     option.text = deviceInfo.label || 'camera ' +
          //       (videoSelect.length + 1);
          //     videoSelect.appendChild(option);
          //   } else {
          //     console.log('Found another kind of device: ', deviceInfo);
          //   }
          // }
        }
        navigator.mediaDevices.enumerateDevices().then(gotDevices)

    } else {
        console.log('Camera API unsupported');
    }
});
