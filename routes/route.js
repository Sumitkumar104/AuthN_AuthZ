const express=require("express");
const router=express.Router();

const {signup}=require("../controllers/signup");
const {signin}=require("../controllers/signin")

// now we import the middlerware
const {isadmin,isstudent,auth}=require("../middlewares/mymidware");

router.post("/signin",signin);
router.post("/signup",signup);

// so here we have protected route one is only for student and other is only for admin.
// auth and isstudent are our two middleware working when we make http request for server.
router.get("/student",auth,isstudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to student portal"
    });
})
router.get("/admin",auth,isadmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to admin portal"
    });
})

// this route only made for testing
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to test portal"
    });
})
module.exports=router;