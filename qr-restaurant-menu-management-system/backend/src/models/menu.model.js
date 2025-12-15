import mongoose from "mongoose"

const menuSchema=mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Menu=mongoose.model("Menu",menuSchema);

export default Menu;