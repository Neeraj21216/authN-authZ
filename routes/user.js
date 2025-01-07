const express = require("express");
const router = express.Router();

// Import controller
const { signup,login } = require("../controller/auth");
const{auth ,isStudent,isAdmin}=require("../middleware/auth");

// Define routes
router.post("/signup", signup);
console.log("hii");

router.post("/login",login);
// protected routes
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the Protected route for students",
    })
}) 
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the Protected route for test",
    })
}) 
  
router.get("/Admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the Protected route for Admin",
    })
})
module.exports = router;
