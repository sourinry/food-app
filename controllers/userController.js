const userModel = require("../models/userModel");

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
            message: "internal server error || error in getUser API"
        })
    }
}


module.exports = { getUserController };