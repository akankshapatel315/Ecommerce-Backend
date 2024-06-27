// authRoutes.js

const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/imgupload', userController.photoUpload);


module.exports = router;
