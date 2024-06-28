const { default: mongoose } = require("mongoose");


const orderModel= new mongoose.Schema({
    resto_id:mongoose.Schema.Types.ObjectId,
    user_id:mongoose.Schema.Types.ObjectId,
    orderdetails:Array,
});

export const  orderSchema= mongoose.models.orders|| mongoose.model("orders",orderModel);