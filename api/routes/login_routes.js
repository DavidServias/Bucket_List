const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.post('/handler', loginController.handle_login);
router.get('/favicon.ico', loginController.whoAreYou);

module.exports = router;