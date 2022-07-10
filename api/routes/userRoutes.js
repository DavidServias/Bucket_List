const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
// const passport =require('passport');
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


//router.get('/login', passport.authenticate('google'));
router.get('/', userController.get_all_users);
router.get('/:id', userController.get_user_by_id);
router.post('/', userController.create_user);
router.delete('/:id', userController.delete_user);
router.post('/login', userController.get_user_by_identifier);
router.get('/:identifier/get_friends', userController.getFriends);
router.patch('/:identifier/add_friend', userController.addFriend);
router.get('/:identifier/find_friends', userController.findFriends);

router.patch('/:id/update_status', userController.updateStatus);


module.exports = router;