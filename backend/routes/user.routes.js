const express = require('express');
const {upload} = require('../middlewares/multer.middlewares.js');
const {userSignup,userLogin,getUser,userUpdate,profileImageHandler } = require('../controllers/user.controllers.js');

const router = express.Router();

router.route('/signup')
.post(userSignup);

router.route('/login')
.post(userLogin);

router.get('/getUser',getUser);

router.put('/update',userUpdate);

router.post('/profileImage',upload.single('profileImage'),profileImageHandler);
module.exports = router;