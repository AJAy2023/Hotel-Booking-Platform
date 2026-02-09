const express = require("express");
const app  = express();
const  connectDB =  require("./config/db");
const auth =  require("./routers/authRouter");
require("dotenv").config()


connectDB();
const  PORT = process.env.PORT || 3000


app.use(express.json());

app.get('/', (req, res)=>{
    
    res.status(200).json({
        success:true,
        message:"server is  up !"
    });
})


app.use('/auth', auth);




app.use((req, res , next)=>{
    const error  =  new Error("route not  found");
    error.status = 400;
    next(error)
});


app.use((err, req, res, next)=>{
    res.status(err.status||500).json({
        success:false,
        error:err.message
    });
})

app.listen(PORT, ()=>{
    console.log(`the server is running  on the port : ${PORT}`);
})