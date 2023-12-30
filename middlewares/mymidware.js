const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req, res, next) => {
    try {

        const token = req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");
        //   or we can alse extract the token from the cookies.
        if (!token||token===undefined) {
            return res.status(401).json({
                success: false,
                message: "token  missing"
            })
        }

 
        // verified the token
        try {
            const decodetoken = jwt.verify(token, process.env.jwtscreat);
            // console.log(decodetoken);

            // decodetoken=decodetoken.toObject();
            // console.log(res.body);
            req.existinguser = decodetoken;
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "there  is problem in verification of token"
            })
        }

        // Token contains the paylaod {email,role,name} , a screat key and options.


        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({

            success: false,
            message: "there  is problem in auth middleware"
        })

    }

}

exports.isstudent = (req, res,next) => {
    try {
        if (jwt.verify(req.body.token, process.env.jwtscreat).role !== `student`) {
            return res.status(401).json({
                message: "this is protected route for only students",
                success: false
            })
        }
        next();
    }
    catch {
        console.log(jwt.verify(req.body.token, process.env.jwtscreat).role);
        return res.status(401).json({
            message: "your role is not identify",
            success: false
            
        })

    }
}


exports.isadmin = (req,res,next) => {
    try {
        if (req.existinguser.role !== "admin") {
            return res.status(401).json({
                message: "this is protected route for only admin",
                success: false
            })
        }
        next();
    }
    catch {
        return res.status(401).json({
            message: "your role is not identify",
            success: false
        })

    }
}