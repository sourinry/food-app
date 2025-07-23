const JWT = require('jsonwebtoken');

module.exports = async(req, res, next ) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "token invalid"
                });
            }else{
                req.user = decode;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "error in AUTH || internal server error",
            error
        });
    }
}