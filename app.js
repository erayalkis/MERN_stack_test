const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get("/", (req, res) => res.send("Hello, World!"));