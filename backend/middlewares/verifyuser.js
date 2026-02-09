const  jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const verifyuser = async (req, res , next)=>{
    try{

        const headertoken  =  req.headers?.authorization;
        if(!headertoken || !headertoken.startsWith("Bearer "))
        {
            return res.status(401).json({
                success:false,
                message:'token not  found|| unathorized user'
            });
        }
        //const token  
        const token  =  headertoken.split(" ")[1];   
        const decode  =  jwt.verify(token ,  process.env.JWT_TOKEN);
        const user  =  await User.findById(decode._id);
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"User is  not found"
            });
        }
        req.user = user;
        next()
    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'Internal server error',
            error:err.message
        });
    }
}



module.exports = verifyuser;