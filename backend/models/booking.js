const  mongoose   = require("mongoose");

const bookingSchema  =  new  mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel",
        required:true,
        index:true
    },
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true,
        index:true
    },
    statusCheck:{
        type:String,
        enum:["pending" ,  "booked" ,  "cancelled"],
        default:"pending"
    },
    bookingDate:{
        type:Date,
        default : Date.now
    },
    cancelledAt:{
        type:Date,
        default : null
    },
    checkIn:{
        type:Date ,
        required:true
    },
    checkOut:{
        type: Date,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
        min: 0
    }
}, {timestamps : true});


//  check the  check  in  time  before  checkout  

bookingSchema.pre("save", function(next){
    if(this.checkOut <= this.checkIn)
    {
       return next(new Error("checkOut must be after checkIn"));
    }
    next()
})

module.exports = mongoose.model("Booking" ,  bookingSchema);


