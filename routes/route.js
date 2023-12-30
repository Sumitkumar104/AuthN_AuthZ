const express=require("express");
const router=express.Router();

const {signup}=require("../controllers/signup");
const {signin}=require("../controllers/signin")

router.post("/signin",signin);
router.post("/signup",signup);

module.exports=router;