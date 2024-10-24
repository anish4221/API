const mongoose = require("mongoose"); // import monggose 
// create schema  or deisgn for user 
const User = new mongoose.Schema(
  {
    name: { type:String, required: true }, //  { parameter: {type:(string number boll etc), required:(true or false)}}
    mobile: { type:Number, required: true },
    password: { type:String, required: true },
    email: { type:String, required: true },
    status: { type:Boolean, required: true },
  },
  {
    timestamps: true, // by default create created at and updated at
  }
);
module.exports =  mongoose.model("user",User); // create table  of the user and exports that model
// 