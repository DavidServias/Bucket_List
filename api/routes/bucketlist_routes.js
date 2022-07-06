const express = require('express');
const userController = require('../controllers/userController');
const bucketlistController = require('../controllers/bucketlistController');
const router = express.Router();


router.patch('/:user_identifier/add-liked-item', userController.addLikedItem);
router.patch('/:user_identifier/add-item', bucketlistController.addItem);
router.patch('/:user_identifier/:item_id/item-status', bucketlistController.updateItemStatus);
router.delete('/:user_identifier/:item_id/remove-item', bucketlistController.removeItem);


module.exports = router;