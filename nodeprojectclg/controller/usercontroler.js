const { response } = require("express");
const usermodel = require("../model/usermodel");// initialize usermodel
const postmodel = require("../model/postmodel");//initialize postmodel
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secrectkey = process.env.JWTKEY;
class Usercontroller {
  async print(req, res) {
    return res.status(200).json({
      status: true,
      msg: "HELLO I AM RUNNING",
    });
  }
  // creating routes
  async usercreate(req, res) {
    console.log(req.body); //  this will gives you undefined untill you install packadge bodypaser which pass the values of body to req.body
    const { name, mobile, email } = req.body; // data capture from user
    // jab databse ka transaction start hua
    const password1 = "123456";
    let password = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    console.log(password);
    try {
      const usercreate = await usermodel.create({
        name: name,
        mobile: mobile,
        email: email,
        password: bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(10)), // funtion that encrypt my password
        status: true,
      });
      console.log(usercreate); // print userdata which is created to the server
      if (usercreate && usercreate._id) {
        return res.status(200).json({
          status: true,
          password: password,
          msg: "User create successfull",
        });
      } else {
        return res.status(200).json({
          status: fale,
          msg: "User create failed",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        status: false,
        msg: "User create failed",
      });
    }
  }
  // user login
  async userlogin(req, res) {
    const { mobile, password } = req.body;
    try {
      // check user exit or not

      let checkuser = await usermodel.findOne({
        mobile: mobile,
        status: true, //  we find only users those are active status
      });
      // if user exits  then we check the password
      if (checkuser && checkuser._id) {
        // means user exits  now check the password
        let checkpassword = bcrypt.compareSync(password, checkuser.password); // this gives value true or false
        // this comparesync takes two value -> one value is the user input password and 2nd one is the encrypted which we compare
        if (checkpassword) {
          // now if user password compare true then we send status true and send a token for user next request
          // token take three values 1-> the value we want to store in token 2>token key and 3.>token validity
          let token = jwt.sign(
            {
              id: checkuser._id,
            },
            secrectkey,
            {
              expiresIn: "24h",
            }
          );
          if (token) {
            // if token created then we send repose with token other wise send response with false server error
            return res.status(200).json({
              status: true,
              msg: "Userlogin successfull",
              token: token,
            });
          } else {
            return res.json({
              status: false,
              msg: "Server is busy lease try later",
            });
          }
        } else {
          return res.json({
            status: false,
            msg: "Incorrect id password",
          });
        }
      }
    } catch (err) {
        return res.json({
          status: false,
          msg: "Server error please try later",
        });
    }
  }
  // user post
  // initilize post model
  async userpost(req, res) {
    const { content, img,token } = req.body;
    try {
        // here token is we get from the login time
      // 1st verify the token and check user exit or not
      let verify =await  Usercontroller.verifytoken(token);
      console.log(verify); // pass the value to verify our token  with parameter token
      // if(verify then we will go to check the userdetails otherwise return token not valid)
      if(verify.status){
        // check user to verify the user exit or not iif user exit then only user create post
        let checkuser  = await usermodel.findOne({
        _id: verify.id,
        status: true, //  we find only users those are active status
      });
      if(checkuser){
        // now user can create post
        let postcreate = await postmodel.create({
            content:content,
            img:"null",
            status:true,
            like:0,
            userid:checkuser._id
        });
        // if post create then only we send response post is created otherwise not
        if(postcreate && postcreate._id){
            return res.json({
                status:true,
                msg:"Post created successfully"
            });
        }else{
            return res.json({
                status:false,
                msg:"Post creation failed"
            })
        }
      }else{
        return res.json({
            status:false,
            msg:"User does not exits or inactive"
        })
      }
      }else{
        return res.json({
            status:false,
            msg:"token not valid"
        })
      }
    } catch (err) {
        console.log(err)
        return res.json({
          status: false,
          msg: "Server error please try later",
        });
    }
  }
  // post show
  async postshow(req,res){
    try{
        let posts = await postmodel.find({
            status:true
        }).sort({createdAt:-1}); // this sort function send all the post  which one created at latest
        if(posts&&posts.length>0){
            return res.json({
              status: true,
              msg: "Post fetch successfull",
              posts: posts,
              totalpost: posts.length,
            });
        }else{
            return res.json({
                status:false,
                msg:"Post fetch failed"
            })
        }
    }catch(err){
        return res.json({
            status:false,
            msg:"Please try later"
        })
    }
  }

  // function that verify our token 
   static async verifytoken(token){
    try{
        return new Promise((resolve, reject) => {
          jwt.verify(token, secrectkey, (err, data) => {
            if (!err) {
              console.log(data);
              resolve({ id: data.id, status: true });
            } else {
              resolve({ id: "", status: false });
            }
          });
        });
    }catch(err){
        return { id: "", status: false };
    }
    
  }

}
module.exports = new Usercontroller();
