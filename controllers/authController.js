const { mongoose } = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

//registration controller 
const registerController = async (req,res) => {
    try {
        const { userName, email, password, address, phone, answer }=req.body;
        //check for data 
        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(404).send({
                success:false,
                message:"data not found or plese provided all required fields"
            });
        }

        //cheack for excting user
        const exctingUser = await userModel.findOne({email});
        if(exctingUser){
            return res.status(400).send({
                success: false,
                message: "email allready registered please login"
            });
        }

        //hash
        let salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create user || save user with hashed password 
        const user = await userModel.create({
            userName,
             email, 
             password:hashPassword, 
             address, 
             phone,
             answer
            });

        //send data || show data 
        res.status(201).send({
            success: true,
            message:"user register succefully",
            data: user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in register API",
            error
        })
    }
};

//login controller
const loginController = async (req,res) => {
    try {
        //validition
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "please provide email or password"
            });
        }
        
        //check 
        const userFound = await userModel.findOne({email:email}).select("+password");
        if(!userFound){
            return res.status(404).send({
                success: false,
                message: "user not found please provided currect email"
            });
        }

        //check password is currect
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch){
            return res.status(400).send({
                success: false,
                message: "password is not matched"
            });
        }

        //token 
        const token = JWT.sign({id:userFound._id}, process.env.JWT_SECRET, {
            expiresIn:"7d"
        });
        //hide password
        const safeData = userFound.toObject();
        delete safeData.password;
        //send data 
        res.status(201).send({
            success: true,
            message: "user found",
            data: safeData,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in login API",
            error
        })
    }
};

module.exports = { 
    registerController,
    loginController

 };