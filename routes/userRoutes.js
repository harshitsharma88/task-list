const express=require('express');
const router= express.Router();
const User=require('../controller/user')

router.get('/',User.home);

router.post('/signup',User.signUp);

router.post('/login',User.logIn);

module.exports=router;