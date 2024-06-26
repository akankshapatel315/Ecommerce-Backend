
const server = require('express');
const userRouter = require('../Routers/userRouters');
const paymentRoute = require('../Routers/paymentRouter');


const mainRouter = server.Router();

mainRouter.use(userRouter)
mainRouter.use(paymentRoute)


module.exports = mainRouter;
