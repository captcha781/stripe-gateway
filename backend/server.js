require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

const routes = require('./routes/main.routes')

const app = express();

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes)

mongoose.connect(process.env.MONGO_URI).then((val, err) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  app.listen(process.env.PORT, () => {
    console.log(`Server runs on port ${process.env.PORT}...`);
  });
});
