import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Owner",
    required:true
  },
  
  name :{
    type:String,
    required:true,
    trim:true,
    unique: true,
    index:true,
  },
  address:{
    type:String,
    required:true
  },
  contactNumber:{
    type:String,
    required:true
  },
  qrCodeUrl:{
    type:String,
  },
  isActive:{
    type:Boolean,
    default:true,
  }
},{timestamps:true});

const Restaurant=mongoose.model("Restaurant",restaurantSchema);
export default Restaurant;