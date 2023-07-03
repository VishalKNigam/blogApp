const express = require("express");
const { UserModel } = require("../Models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
UserRouter.post("/register", async (req, res) => {
  const { email, pass, role } = req.body;
  try {
    const isAlreadyRegistered = await UserModel.findOne({email});
    if(isAlreadyRegistered){
        res.json({msg: "User has been Already registered"});
    }
    bcrypt.hash(pass, 5, async(err, hash) => {
        
        if(err){
            console.log(err);
            res.json({err: err})
        }
      const user = new UserModel({ email, pass:hash, role });
      await user.save();
      console.log(user);
      res.status(200).json({msg: `New User with the email::--${user.email} has been registered sucessfully!`});
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
});

UserRouter.post("/login", async (req, res) => {
    const {email,pass,role} = req.body;
  try {
    let user = await UserModel.findOne({email});
    if(user){
        let decode = bcrypt.compare(pass, user.pass,(err)=>{
            if(err){
                console.log(err)
                res.json({err: err})
            }else{
                let token = jwt.sign({role:user.role}, "masai", {expiresIn: 3600});
                res.json({msg: `${user.email}:- logged In`, Token:token})
            }
        } )
        
    }else{
        res.json({msg: "User has not been registered yet!"})
    }

  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
  }
});

module.exports = { UserRouter };
