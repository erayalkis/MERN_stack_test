const express = require("express");
const mongoose = require("mongoose");
const dbURI = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const app = express();

const PORT = process.env.port || 5000;

try {
  mongoose.connect(dbURI, { useNewUrlParser: true }).then(() => console.log("Connected to MongoDB successfully"))
} catch(e) {
  console.log("An error occured during connection to MongoDB:");
  console.log(e);
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get("/", (req, res) => res.send("Hello, World!"));
app.use("/api/users", users);
app.use("/api/tweets", tweets);