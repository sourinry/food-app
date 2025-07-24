const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturentController, getResturentController, getResturentById, deleteResturntById } = require('../controllers/resturentController');
const router = express.Router();

//route of all CURD opretion in resturent model
//create resturent
router.post('/createResturent', authMiddleware, createResturentController);
//get all resturent 
router.get('/getResturent', authMiddleware, getResturentController);
//resturent find by id
router.get('/getResturent/:id', authMiddleware, getResturentById);
//delete by id
router.delete('/delete/:id', authMiddleware, deleteResturntById)


module.exports = router;