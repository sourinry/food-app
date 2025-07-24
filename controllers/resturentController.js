const { default: mongoose } = require('mongoose');
const resturentModel = require('../models/resturentModel');
//create resturent controller
const createResturentController = async (req,res) => {
    try {
        const {  
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpne,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        //validation
        if(!title || !foods || !coords){
            return res.status(401).send({
                success: false,
                message: "please provided titel or coords"
            });
        }
        const newResturent = new resturentModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpne,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });
        //save data
        await newResturent.save();
        res.status(201).send({
            success: true,
            message: "resturent is created successfully",
            resturent: newResturent
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal error || error in create resturent API"
        });
    }
};

//get all resturent controller
const getResturentController = async (req,res) => {
    try {
        const foundResturent = await resturentModel.find({});
        if(!foundResturent){
            return res.status(404).send({
                success: false,
                message: "resturent not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "resturent found",
            resturent: foundResturent
        });
        
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal error || error in get resturent API"
        });
    }
};

//get resturent by id 
const getResturentById = async (req,res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                success: false,
                message: "id is not mongoose type"
            });
        }
        const resturent = await resturentModel.findById({_id:id});
        if(!resturent){
            return res.status(404).send({
                success: false,
                message: `resturent with this ${id} is not exist`
            });
        }

        res.status(200).send({
            success: true,
            message: `resturent found with this ${id}`,
            resturent: resturent
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal error || error in get resturent by id API "
        });
    }
};

//delete resturent by id 
const deleteResturntById = async (req,res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send({
                success: false,
                message: `${id} is not a type of mongoose`
            });
        }

        await resturentModel.findByIdAndDelete({_id:id});
        res.status(200).send({
            success: true,
            message: `resturent with id:-${id} is deleted`
        });
        
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in delete resturent API"
        });
    }
};

module.exports = { 
    createResturentController,
    getResturentController,
    getResturentById,
    deleteResturntById
};