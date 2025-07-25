const mongoose = require('mongoose');
const foodModel = require('../models/foodModel');


//controllers
//create food controller
const createFoodController = async (req,res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            resturnat,
            rating,
            ratingCount
        } = req.body;
        if(!title || !description || !price || !resturnat){
            return res.status(401).send({
                success: false,
                message: "please provided title || description || price || resturent"
            });
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            resturnat,
            rating,
            ratingCount
        });
        await newFood.save();
        res.status(201).send({
            success: true,
            message: "food is added",
            food: newFood
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in create food API"
        });
    }
};


//get all food 
const getAllFoodController = async (req,res) => {
    try {
        const allFood = await foodModel.find({});
        if(!allFood){
            return res.status(401).send({
                success: false,
                message: "foods not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "foods found",
            foods: allFood
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: 'internal server error || error in get all food API'
        });
    }
};

//get food by id
const getFoodByIdController = async (req,res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                success: false,
                message: "please provided mongoose type id"
            });
        }

        const food = await foodModel.findById(id);
        if(!food){
            return res.status(404).send({
                success: false,
                message: `food with id:- ${id} is not present`
            });
        }
        res.status(200).send({
            success: true,
            message: `food found with id:-${id}`,
            food: food
        })
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in get food by id API"
        });
    }
};

//get food by resturent
const getFoodByResturent = async (req,res) => {
    try {
        const resturentID = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(resturentID)){
            return res.status(404).send({
                success: false,
                message: "please provided mongoos type id"
            });
        }

        const food = await foodModel.findOne({resturnat:resturentID});
        if(!food){
            return res.status(401).send({
                success: false,
                message: "food with this resturent id is not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "food with this resturent id found",
            food: food
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in get food by resturent id API"
        });
    }
};

//update food by food id
const updateFoodByIdController = async (req,res) => {
    try {
       const foodId = req.params.id;
       if(!mongoose.Types.ObjectId.isValid(foodId)){
        return res.status(401).send({
            success: false,
            message: "id is not type of mongoose"
        });
       } 

       const food = await foodModel.findById(foodId);
       if(!food){
        return res.status(404).send({
            success: false,
            message: "food with this id is not found"
        });
       }
       const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            rating,
            ratingCount
       } = req.body;

       const updatedFood = await foodModel.findByIdAndUpdate(foodId,
        {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            rating,
            ratingCount
        },
        {new: true}
       );

       res.status(200).send({
        success: true,
        message: "food with this id updated successfully",
        updatedFood : updatedFood
       })
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in get update food by id API"
        });
    }
};

//delete food by id 
const deleteFoodByID = async (req,res) => {
    try {
        const foodId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(foodId)){
            return res.status(404).send({
                success: false,
                message: 'plese provided mongoose type id'
            });
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success: false,
                message: `food is not found`
            });
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: 'food with this id deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in get delete food by id API"
        });
    }
};



module.exports ={
    createFoodController,
    getAllFoodController,
    getFoodByIdController,
    getFoodByResturent,
    updateFoodByIdController,
    deleteFoodByID
};