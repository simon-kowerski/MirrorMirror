document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const snapButton = document.getElementById('snap');
  const particlesContainer = document.getElementById('particles-js');

  // Connect to the Socket.IO server
  const socket = io();

  // Request camera access and stream it to the video element
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.error("Error accessing the camera:", err);
        alert("Unable to access the camera. Please check permissions.");
      });
  } else {
    alert("Camera access is not supported on your browser.");
  }

  // Function to trigger the particle effect.
  function startParticleEffect() {
    if (particlesContainer) {
      particlesContainer.style.opacity = 1;
      setTimeout(function () {
        particlesContainer.style.opacity = 0;
      }, 1000);
    } else {
      console.warn("particlesContainer not found!");
    }
  }

  snapButton.addEventListener('click', function () {
    // Check video dimensions for debugging
    console.log("Video dimensions:", video.videoWidth, video.videoHeight);
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.error("Video not ready – dimensions are 0.");
      return;
    }
    
    // Set canvas size to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a data URL (PNG image)
    const imageData = canvas.toDataURL('image/png');
    
    // Log the imageData length for debugging (should be a long string)
    console.log("Image data length:", imageData.length);
    
    // Send the snapshot to the server via Socket.IO
    socket.emit('newImage', imageData);
    console.log("Snapshot taken and sent!");

    // Clear the canvas (optional)
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Trigger the particle effect
    startParticleEffect();
  });
});
