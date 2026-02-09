
const adminOnly  =  async (req, res, next)=>{

        try
        {
              if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: user not attached to request",
            });
            }
            if(req.user.role !== "owner")
            {
                return res.status(401).json({
                    success:false,
                    message:"access denied| you dont  have the  permision"
                });
            }
            next();
        }catch(err)
        {
            return res.status(500).json({
                success:false,
                message:'Internal server error',
                error:err.message
            });
        }
}


module.exports = adminOnly;  