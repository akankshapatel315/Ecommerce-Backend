const dotenv = require("dotenv")
const path = require("path")

const envVar = dotenv.config({path:path.resolve("D:/Akanksha/EcommerceApp - Backend", `.env.${process.env.NODE_ENV}`)});

module.exports = {
  envVar
};


module.exports={envVar}