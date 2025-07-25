const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getCategoryController, updateCategoryById, deleteCategoryById } = require('../controllers/categoryController');

//catagory router
//create category
router.post('/createCategory', authMiddleware, createCategoryController)
//get all category
router.get('/getCategory', getCategoryController)
//update category by id
router.put('/updateCategory/:id', authMiddleware, updateCategoryById);
//delete category by id
router.delete('/delete/:id', authMiddleware, deleteCategoryById);

module.exports = router;