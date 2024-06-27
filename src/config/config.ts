const dotenv = require("dotenv")
const path = require("path")
import { v2 as cloudinary } from 'cloudinary';

const envVar = dotenv.config({path:path.resolve("D:/Akanksha/EcommerceApp - Backend", `.env.${process.env.NODE_ENV}`)});

const cloudinaryVar = cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY // Click 'View Credentials' below to copy your API secret
});

module.exports={envVar,cloudinaryVar}