
const expressRouter = require('express');
const paymentController = require('../Controllers/paymentController');

const paymentRouter = expressRouter.Router();

paymentRouter.post('/create-checkout-session', paymentController.customer);

module.exports = paymentRouter;
