const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroler');
router.get('/v1/fetch/data',usercontroller.print);
router.post('/v1/create/user', usercontroller.usercreate); //  routes that create my users
router.post("/v1/login/user",usercontroller.userlogin); // routes for user login
router.post("/v1/post/create/user",usercontroller.userpost); // routes for post for users
router.get("/v1/post/fetch",usercontroller.postshow); // routes for fetch post 

module.exports = router;