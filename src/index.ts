const express = require("express");
const dbConnect = require("../src/config/dbConnection")
const cors= require("cors");
const {envVar,cloudinaryVar} = require('../src/config/config')
const mainRouter= require("./Routers/index")
import {Response,Request}  from "express"
import { v2 as cloudinary } from 'cloudinary';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(mainRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

dbConnect.mongoConn()
