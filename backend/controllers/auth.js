const validtor =  require("email-validator");
const  User =  require("../models/user");
const bcrypt  = require("bcrypt");
const generateAcessToken  =  require("../utilites/token");
//  here auth
const register  = async (req, res)=>{
    try
    {
        const {username , email, password , phone} = req.body;
        // validation  
        if(!username || !email  ||  !password )
        {
            return res.status(400).json({
                success:false,
                message:'add all the required  fields'
            });
        }
        if(!validtor.validate(email))
        {
            return res.status(400).json({
                success:false,
                message:"Please check the email formate"
            });
        }
        // check the user exist or not  
        const user  =  await  User.findOne({email});
        if(user)
        {
            return res.status(409).json({
                success:false,
                message:'Email already exist'
            });
        }

        //  hash the pass  
        const hashPassword  =  await bcrypt.hash(password , 10);
        if(!hashPassword)
            {
                return res.status(401).json({
                    success:false,
                    message:'password dint hashed'
                });
            }  


        // if not then create the  user  
        const newuser  = await User.create({
            username,
            email,
            password:hashPassword,
            phone
        })
        return res.status(201).json({
            success:true,
            message:'User created successfully',
            data:{
                username:newuser.username,
                email:newuser.email
            }
        })
    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        });
    }
}


// login  

const  login  = async (req, res)=>{
    try
    {
        const  {email , password} =  req.body;

        // validate
        if(!email || !password || !validtor.validate(email))
        {
            return res.status(400).json({
            success:false,
             message:"Please check the email formate || Please add all required fields"
            });
        }

        // check user  exist or not  
        const user  =  await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:'User not  found.Please do  login'
            });
        }

        const payload = {
            _id:user._id,
            role:user.role
        }

        // check the  password  
        const  isMatch  =  await bcrypt.compare(password , user.password);
        //  if  found then genrate the token  
        const accessToken  =  generateAcessToken(payload);

        return res.status(200).json({
            success:true,
           data:{
            "token":accessToken,
            "user":{
                "id":user._id,
                "name":user.username,
                "email":user.email,
                "role":user.role
            }
           }
        })

    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:'Internal server error',
            error:err.message
        });
    }
}

module.exports = {register ,login}