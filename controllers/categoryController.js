const { default: mongoose } = require('mongoose');
const categoryModel = require('../models/categoryModel');

//cerate category controller 
const createCategoryController = async (req,res) => {
    try {
        const { title, imageUrl } = req.body;
        if(!title){
            return res.status(404).send({
                success: false,
                message: "please provided category titel"
            });
        }
        const newCategoy = new categoryModel({title, imageUrl});
        await newCategoy.save();
        res.status(201).send({
            success: true,
            message: "category is created",
            category: newCategoy
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal error || error in create category API"
        });
    }
};


//get categoy
const getCategoryController = async (req,res) => {
    try {
        const getCategory = await categoryModel.find({});
        if(!getCategory){
            return res.status(404).send({
                success: false,
                message: "category not found"
            });
        }

        res.status(201).send({
            success: true,
            message: "category found",
            categorys: getCategory
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in get category API"
        });
    }
};

//update category by id
const updateCategoryById = async (req,res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).send({
                success: false,
                message: `${id} is not a type of mongoose`
            });
        }
        const { title, imageUrl } = req.body;
        const updateCategory = await categoryModel.findByIdAndUpdate(id, 
            {title, imageUrl}, 
            {new: true}
        );
        res.status(200).send({
            success: true,
            message: `category with id:- ${id} updated`,
            updatedCategory: updateCategory
        })
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in update category by id API"
        });
    }
};

//delete by id
const deleteCategoryById = async (req,res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                success: false,
                message: `id:-${id} is not a mongoose type id`
            });
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: `category with id:-${id} is deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in delete category by id API "
        });
    }
};


module.exports = {
    createCategoryController,
    getCategoryController,
    updateCategoryById,
    deleteCategoryById
}