document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("btn");
    const imageElement = document.getElementById("displayedImage"); // The image element

    const outputImage = document.getElementById("outputImage");
    
    function refreshImage() {
        // Prevent browser caching by appending a timestamp
        outputImage.src = `generated_images/output.png?timestamp=${new Date().getTime()}`;
    }

    // Refresh image every 3 seconds
    setInterval(refreshImage, 3000);

    downloadButton.addEventListener("click", function () {
        downloadButton.style.display = "none";
        if (imageElement.src) {
            fetch(imageElement.src)
                .then(res => res.blob()) // Convert image to Blob
                .then(blob => {
                    const formData = new FormData();
                    formData.append("image", blob, "userImage.png");

                    console.log("Sending image to server...");

                    // Send the image to the backend
                    fetch("/save-image", {
                        method: "POST",
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Image saved:", data.filePath);

                        // Step 2: Wait 5 seconds before calling Python script
                        setTimeout(() => {
                            console.log("5 seconds passed. Triggering Python script...");

                            fetch("/run-script", { method: "POST" })
                                .then(response => response.json())
                                .then(data => console.log("Python script output:", data))
                                .catch(error => console.error("Error:", error));

                        }, 1000);
                    })
                    .catch(error => console.error("Error uploading image:", error));
                });
        } else {
            console.error("No image found!");
        }
        downloadButton.style.display = "block";
    });
});