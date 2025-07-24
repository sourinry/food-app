const bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");
const { default: mongoose } = require('mongoose');

//get uses controller 
const getUserController = async (req,res) => {
    try {
        console.log(req.user.id); // check whats in the payload
        /*const { id } = req.user;
        if(!id){
            return res.status(401).send({
                success: false,
                message: "id is not fund in payload"
            });
        }*/
        const user = await userModel.findById({_id:req.user.id});
        if(!user){
            return res.send(404).send({
                success: false,
                message: "user not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "authincation done",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in getUser API",
            error
        })
    }
};


//update user controller
const updateUserController = async (req,res) => {
    try {
        const userFound = await userModel.findById({_id:req.user.id});
        if(!userFound){
            return res.status(404).send({
                success: false,
                message: "user not found"
            });
        }
        //update
        const { userName, address, phone } = req.body;
        if(userName) userFound.userName=userName;
        if(address) userFound.address=address;
        if(phone) userFound.phone=phone;
        //user save
        await userFound.save();
        res.status(200).send({
            success: true,
            message: "update done",
            userFound
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: " internal server error || error in update user by id API",
            error
        });
    }
};

//reset password controller
const resetPasswordController = async (req,res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if(!email || !newPassword || !answer){
            return res.status(401).send({
                success: false,
                message: "please provided email or newPassword or answer"
            });
        }
        const user = await userModel.findOne({email, answer}).select("+password");
        if(!user){
            return res.status(404).send({
                success: false,
                message: "user not found"
            });
        }
        //hashing
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        //save password
        user.password = hashPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "password reset successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in reset password API"
        });
    }
};

//update password controller 
const updatePasswordController = async (req,res) => {
    try {
        //find user
        const user = await userModel.findById({_id:req.user.id}).select("+password");
        if(!user){
            return res.status(404).send({
                success: false,
                message: "user not found"
            });
        }
        //get data from user
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword){
            return res.status(401).send({
                success: false,
                message: "please provided oldPassword or NewPassword"
            });
        }
        //compare
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: "password is not match please provided currect password"
            });
        }
        //hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        //save data
        user.password = hashPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "password update successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in update password API"
        });
    }
};

//delete user controller
const deleteUsercontroller = async (req,res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).send({
                success: false,
                message: "please provided mongoose type id"
            });
        }

        await userModel.findByIdAndDelete({_id:id});
        res.status(201).send({
            success: true,
            message: "user deleted successfull"
        });
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in delete user API"
        });
    }
};

//export
module.exports = { 
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePasswordController,
    deleteUsercontroller
    };