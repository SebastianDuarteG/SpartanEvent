"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/event.model");



//controller functions to render content in ejs/html pages




module.exports = {
//export the functions
  };
