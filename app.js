// Core Module
const path = require('path');
require('dotenv').config();
// External Module
const express = require('express');
const mongoose = require('mongoose');

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Body Parser
app.use(express.urlencoded({ extended: false }));

//  STATIC FILES (IMPORTANT: routes se pehle)
app.use(express.static(path.join(rootDir, 'public')));

// Routes
app.use(storeRouter);
app.use("/host", hostRouter);

// 404 Page
app.use(errorsController.pageNotFound);

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Database + Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(" Database connected");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(" Database connection error:", err);
  });
