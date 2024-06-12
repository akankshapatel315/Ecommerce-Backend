// authRoutes.js

const server = require('express');
const userRouter = require('../Routers/userRouters');

const mainRouter = server.Router();

mainRouter.use(userRouter)

module.exports = mainRouter;
