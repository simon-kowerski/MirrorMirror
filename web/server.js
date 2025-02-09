const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const { exec } = require("child_process");
const multer = require("multer");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

let storedText = "";

// Ensure necessary directories exist
const savedImagesDir = path.join(__dirname, "saved_images");
const generatedImagesDir = path.join(__dirname, "web/generated_images");

[savedImagesDir, generatedImagesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, savedImagesDir); // Saves images in "saved_images/"
    },
    filename: (req, file, cb) => {
        cb(null, "userImage.png"); // Overwrites existing file
    }
});
const upload = multer({ storage });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Serve static files from generated_images directory
app.use("/generated_images", express.static(generatedImagesDir));

// Serve the main HTML page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "structure.html"));
});

// Store received text
app.post("/save-text", (req, res) => {
    storedText = req.body.text;
    console.log("Stored Text:", storedText);
    res.json({ message: "Text received and stored!", storedText });
});

// Handle image upload and save it to "saved_images/"
app.post("/save-image", upload.single("image"), (req, res) => {
    console.log("Image received and saved to:", req.file.path);
    res.json({ message: "Image saved successfully", filePath: req.file.path });
});

// Serve real-time image updates using Socket.IO
io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("newImage", (data) => {
        console.log("Received new image");
        socket.broadcast.emit("newImage", data);
    });

    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

// Route to run a Python script inside a virtual environment
app.post("/run-script", (req, res) => {
    console.log("Executing Python script inside virtual environment...");

    // Define the virtual environment Python path
    const pythonExecutable = process.platform === "win32" 
        ? path.join(__dirname, "..", ".venv", "Scripts", "python.exe")  // Windows
        : path.join(__dirname, "venv", "bin", "python3");  // macOS/Linux

    exec(`${pythonExecutable} ../script.py`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        console.log(`Python script output: ${stdout}`);
        res.json({ message: "Python script executed", output: stdout });
    });
});

app.use("/generated_images", express.static(path.join(__dirname, "/generated_images")));

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
