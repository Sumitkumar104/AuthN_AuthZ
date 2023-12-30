const bcrypt = require("bcrypt");
const user = require("../model/schema");
const jwt = require("jsonwebtoken");
const cookie=require("cookies");

require("dotenv").config();


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // if user forget to enter email or password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "enter the email or password properly"
            })
        }

        // check if enter email is not present in our database
        let existinguser = await user.findOne({ email });   // here existinguser is object which contain the ddta of user having 'email' this.
        if (existinguser === null) {
            return res.status(401).json({
                success: false,
                message: "this email is not registered "
            })

        }

        const payload={email:existinguser.email,
            role:existinguser.role,
            name:existinguser.name
        }
        // now if email enter is present in database we compare the passwords one that is user enter and other hich present in database in encrypted form
        if (await bcrypt.compare(password, existinguser.password))   // it means password match
        {
            // now genterate the json web token
            let token=jwt.sign(payload,process.env.jwtscreat,{expiresIn:"5h"})

            // add the jwt in user data in dB
            existinguser=existinguser.toObject(); 
            existinguser.token=token;
            existinguser.password=undefined; 


            // generate the cookie and send in response
            const options={
                expiresIn:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("myfirstcookie",token,options).status(200).json({
                success:true,
                message:"cookie genrate successfully",
                token,
                existinguser,
                    // message:"user signed in successfully",
            })

        }
        else {
            res.status(401).json({
                message: "password do not match",
                success: false
            })
        }

        // also used the .then and .catch function
        // await bcrypt.compare(password,existinguser.password).then(()=>{
        //   // after what operation are done ...
        // })
        // .catch((err)=>{
        //     console.error(err),
        //     res.status(401).json({
        //                 message:"password do not match",
        //                 success:false
        //             })

        // })

    }
    catch (err) {
        console.error(err),
            res.status(401).json({
                        message:"there is an error in signin problem please try again later",
                        success:false
                    })
    }

}