const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")
require('dotenv').config()
const validate = require("../verify/validtoken");
const { compare } = require("bcrypt");
const bcrypt = require("bcrypt")

// login
router.post("/", async (req, res) => {

    const username= req.body.username
    const password= req.body.password
    const email= req.body.email

  User.findOne({username:username}).then(
    user => {
        if (!user){
            return res.status(422).json({error:"username or password invalid"})
        }
        bcrypt.compare(password, user.password).then(same =>{
            if(same){
                const token = jwt.sign({_id:user._id}, process.env.JWT_S)
                res.json({token : token})
    
            }
            else{
                return res.status(422).json({error:"username or password invalid"})
        }})

        }
  )
  
});

//check if user is logged in

router.get("/loggedin",validate, async (req, res) => {

res.send("logged in")

})


module.exports = router;
