const express = require('express');
const { getUserController, 
    updateUserController, 
    resetPasswordController, 
    updatePasswordController 
    } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//get user 
router.get('/getUser', authMiddleware, getUserController);
//update
router.put('/updateUser', authMiddleware, updateUserController);
//password reset
router.post('/resetPassword', authMiddleware, resetPasswordController);
//password update 
router.post('/updatePassword', authMiddleware, updatePasswordController);


//exports
module.exports=router;