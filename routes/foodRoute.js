const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodController, getFoodByIdController, getFoodByResturent, updateFoodByIdController, deleteFoodByID } = require('../controllers/foodController');

const router = express.Router();

//routes
//create food 
router.post('/createFood', authMiddleware, createFoodController);
//get all food
router.get('/getAllFood', getAllFoodController);
//get single food by id
router.get('/getFoodById/:id', getFoodByIdController);
//get food by resturent
router.get('/getFoodByResturent/:id', getFoodByResturent)
//update food by id 
router.put('/updateFoodById/:id', authMiddleware, updateFoodByIdController);
//delete food by id
router.delete('/deleteFoodById/:id', authMiddleware, deleteFoodByID);




module.exports = router;