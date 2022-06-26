const express = require('express');
const userController = require('../controllers/userController');
const bucketlistController = require('../controllers/bucketlistController');
const router = express.Router();


router.patch('/:id/add-liked-item', userController.addLikedItem);
router.patch('/:id/add-item', bucketlistController.addItem);

module.exports = router;