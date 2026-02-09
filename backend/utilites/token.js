const jwt  =  require("jsonwebtoken");
require("dotenv").config();


function generateAcessToken(user)
{
    return jwt.sign({_id:user._id,  role:user.role},
        process.env.JWT_TOKEN,
        {expiresIn:'15m'}
    );
}






module.exports = generateAcessToken