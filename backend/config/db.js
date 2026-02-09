const  mongoose  =  require("mongoose");
const  connectDB  =  async ()=>{
    try{
        await  mongoose.connect(process.env.MONGO_URL )
        console.log("mongo db  is  connected !");

    }catch(err)
    {
        console.log("mongo db is  dissconnted !", err);
        
    }
}



module.exports = connectDB