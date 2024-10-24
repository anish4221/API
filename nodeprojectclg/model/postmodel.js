const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    img: { type:String, required: true },
    content: { type:String, required: true },
    like: { type:Number, required: true,default:0 },
    status: { type:Boolean, required: true },
    userid:{type:String,required:true}
  },
  {
    timestamps: true,
  }
);
module.exports =  mongoose.model("post",Post);
