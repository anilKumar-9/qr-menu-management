import mongoose from "mongoose"

const menuitemSchema= mongoose.Schema({
    menuId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu",
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const Menuitem= mongoose.model("Menuitem",menuitemSchema);

export default Menuitem;

