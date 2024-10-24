const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.URI;
module.exports = async ()=>{
    try{
        await mongoose.connect(url);
        console.log("databse connect successfull");
    }catch(err){
        console.log(err);
    }
}