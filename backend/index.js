const express = require("express");
const app  = express();
require("dotenv").config()
const  PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
    
    res.status(200).json({
        success:false,
        message:"server is  up !"
    });
})

app.listen(PORT, ()=>{
    console.log(`the server is running  on the port : ${PORT}`);
})