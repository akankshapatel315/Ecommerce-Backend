const express = require("express");
const dbConnect = require("../src/config/dbConnection")
const cors= require("cors");
const mainRouter= require("./Routers/index")
import {Response,Request}  from "express"
const stripee = require('stripe')('sk_test_51PVaDt083iHcWeEmzSJVT17dEeFWFZljOakBG3HcKOf8arwRy5bu0HIuzEhe8FeI0uNGLeMtRgcOVkKVewKRoMDL00WQ63LtDJ');

const app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

app.use(mainRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

dbConnect.mongoConn()