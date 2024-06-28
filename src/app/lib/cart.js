const { default: mongoose } = require("mongoose");


const cartModel= new mongoose.Schema({
    resto_id:mongoose.Schema.Types.ObjectId,
    user_id:mongoose.Schema.Types.ObjectId,
    food_id:mongoose.Schema.Types.ObjectId,
    quantity:{
        type:Number,
        default:1,
        required:true
    },
    menu: {
        require:true,
        type: Object,
    }
});

export const  cartSchema= mongoose.models.carts|| mongoose.model("carts",cartModel);