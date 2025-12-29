// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { mongoConnect } = require('./utils/databaseutil');
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
const MOUNGO_URL = "mongodb+srv://airbnbUser:Harsh123@airbnb.xxylmkm.mongodb.net/airbnb?retryWrites=true&w=majority";
mongoose.connect(MOUNGO_URL).then(() => {
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.log("Error was  started", err);

})
