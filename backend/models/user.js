const  mongoose =  require("mongoose");
const  userSchema  =  new  mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:10,
        maxLength:100,
        unique:true
    },
    role:{
        type:String,
        enum:['customer' , 'owner'],
        default:"customer"
    },
    phone:{
        type:Number,
        maxLength :10
    },
},{timestamps:true});


module.exports = mongoose.model("User", userSchema);