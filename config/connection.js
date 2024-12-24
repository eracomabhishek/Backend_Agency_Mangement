const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = `mongodb://${process.env.IP_PATH}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((error) => {
    console.error(error);
    console.log("Database connection error");
    process.exit(1);
  });