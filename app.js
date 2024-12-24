const express = require("express");
const app = express();
require('./config/connection')
const cors = require("cors");
const bodyParser = require("body-parser");

// const dbConnect = require("./config/connection");
// dbConnect();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const allRoutes = require("./routes/userRoutes");
app.use("/api", allRoutes);



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
