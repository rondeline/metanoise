const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3959;

console.log("Starting the server...");

// ✅ Serve all static files from the same directory
app.use(express.static(__dirname));

// ✅ Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve `picture.html` at the root `/`
app.get("/", (req, res) => {
    console.log("Request received at /");
    res.sendFile(path.join(__dirname, "picture.html"));
});

// ✅ Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// ✅ Handle CSV file saving
app.post("/save_responses", (req, res) => {
    console.log("Received POST request to save responses...");

    const csvData = req.body.csvData;
    const filePath = path.join(__dirname, "picture_responses.csv");

    if (!csvData) {
        return res.status(400).send("No CSV data received.");
    }

    // ✅ Append the new data to the CSV file
    fs.appendFile(filePath, `\n${csvData}`, (err) => {
        if (err) {
            console.error("Error saving CSV:", err);
            return res.status(500).send("Failed to save data.");
        }
        console.log("CSV data saved successfully.");
        res.send("Data saved successfully.");
    });
});

// ✅ Start the server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
});


