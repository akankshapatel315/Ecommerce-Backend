const expressServer= require("express");
const dbConnect = require("../src/config/dbConnection")
const cors= require("cors");
const mainRouterr= require("./Routers/index")
const stripee = require('stripe')(process.env.API_KEY);

const app = expressServer();

const port = process.env.PORT || 3000;

app.use(cors());


app.use(mainRouterr)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

dbConnect.mongoConn()