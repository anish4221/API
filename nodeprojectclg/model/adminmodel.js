const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    name: { type:String, required: true },
    mobile: { type:Number, required: true },
    password: { type:String, required: true },
    email: { type:String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports =  mongoose.model("admin",Admin);// export admin schema
