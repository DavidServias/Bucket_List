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

router.patch('/:id/update_status', userController.updateStatus);


module.exports = router;