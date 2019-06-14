const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const config = require("./config");

const app = express();

// подключаемся к базе данных
mongoose
  .connect(config.dbUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch(err => {
    console.log(err);
  });
mongoose.set("useFindAndModify", false);
// Настраиваем middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

// Настраиваем Route
const note = require("./routes/note");

app.use("/note", note);

// Подключаем сервер
app.listen(PORT, () => {
  console.log("Server running");
});
