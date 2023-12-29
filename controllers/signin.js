const bcrypt = require("bcrypt");
const userschema = require("../model/schema");
const jwt = require("jsonwebtoken");

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
        const existinguser = await userschema.findOne({ email });   // here existinguser is object which contain the ddta of user having 'email' this.
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
            let token=jwt.sign(payload,process.env.jwtscreat,{expiresIn:"5h,"})
            existinguser.token=token;
            user.password=undefined;

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

    }

}