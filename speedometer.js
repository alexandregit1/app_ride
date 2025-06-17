const speedElement = document.querySelector("#speed");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");

let watchID = null;
let currentRide = null;
startButton.addEventListener("click", () => {
  if (watchID) return; // Prevent multiple watches
  function handleSuccess(position) {
    speedElement.innerText = position.coords.speed
      ? (position.coords.speed * 3.6).toFixed(1)
      : "0";
  }
  function handleError(error) {
    console.error("Error occurred while retrieving position:", error);
  }
  const options = { enableHighAccuracy: true };
  watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options);
  currentRide = createNewRide();
  startButton.classList.add("d-none");
  stopButton.classList.remove("d-none");
});

stopButton.addEventListener("click", () => {
  navigator.geolocation.clearWatch(watchID);
  watchID = null;
  startButton.classList.remove("d-none");
  stopButton.classList.add("d-none");
});
