const getUserController = async (req,res) => {
    try {
        res.status(200).send({
            success: true,
            message: "authincation done"
        })

    } catch (error) {
        console.log(error);
        res.status(505).send({
            success: false,
            message: "internal server error || error in getUser API"
        })
    }
}


module.exports = { getUserController };