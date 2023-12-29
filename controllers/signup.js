const bcrypt = require("bcrypt");
const userschema = require("../model/schema");
const jwt = require("jsonwebtoken");


// function for signup
exports.signup = async (req, res) => {
    try {

        // fetch the data from the frontend send by the client to server.
        const { name, password, role, email } = req.body();
        let encryptpassword;

        // check if email enter by the user is already exist or not.
        const existinguserdata = await userschema.findOne({ email });

        if (existinguserdata !== null) // if existinguserdata != NULL(if found  user)
        {
            return res.status(500).json({
                message: "user is already exist",
                success: false,
            })
        }


        // now try to hash to pasword using bcrypt library     
        const saltround = 10;
        try {
            encryptpassword = await bcrypt.hash(password, saltround)
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "there is some error in hashing the password",
            })
        }


        // Now create the entry of user in our database
        const createentry = await userschema.create({
            name, password: encryptpassword, role, email
        })

        return res.status(200).json({
            success: true,
            message: "user created successfully",
            data: createentry,

        })



    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "There is error in process of signup please try again later"
        })
    }

}

