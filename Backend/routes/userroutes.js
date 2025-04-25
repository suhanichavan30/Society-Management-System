const express=require('express');
const verifyjwt=require('../middlewares/authmiddleware.js')
const {registerUser,allowner,loginUser,logoutUser,refreshAccessToken} = require('../controllers/userController.js');
const router=express.Router();

router.route('/register').post(registerUser)
//so the url is ==localhost:3000/users/register


router.route('/login').post(loginUser)

router.route('/allowner').get(allowner)

router.route('/logout').post(verifyjwt,logoutUser)

router.route('/refresh-token').post(refreshAccessToken)
module.exports=router;
