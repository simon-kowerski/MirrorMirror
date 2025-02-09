document.addEventListener('DOMContentLoaded', function () {
  const socket = io();
  const displayedImage = document.getElementById('displayedImage');
  const downloadBtn = document.getElementById('downloadBtn');

  socket.on('newImage', function (data) {
    console.log("Received new image");
    console.log("Data URL:", data);  // For debugging: ensure this is a valid data URL
    // Set the image source to the received data URL
    if (displayedImage) {
      displayedImage.src = data;
    } else {
      console.error("displayedImage element not found!");
    }
  });
});
