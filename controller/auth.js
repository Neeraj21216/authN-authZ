
const bcrypt=require("bcrypt");
const User=require("../model/User");
const jwt=require("jsonwebtoken");

// route handler signup'

exports.signup=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        //check if user already exist 
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(400).json({
                success:false,
                message:'User already Exist',  
            })
            
        }
        let hashedpassword;
        try {
            hashedpassword=await bcrypt.hash(password,10);
            //read the documentry for more info
            console.log("hello");

         
        } catch (er) {
            res.status(500).json({
                success:false,
                message:"Error in hashing password",
                error:er,
            })
            //retry strategy->hw
            //create entry for user    
            
        }
           const user=await User.create({
                name,email,password:hashedpassword,role
            })

            res.status(200).json({
                success:true,
                message:"User created successfully",

            })
    } catch (error) {   
        
        console.error(error);
        // console.lo
        res.status(500).json({
            success:false,
            message:"User can not be created please try again later",
        })
    }
}
//now go for login


exports.login=async (req,res) => {
    try {
        const {email,password}=req.body;
        //validate the email
        // console.log(email,password); 
        if(!email||!password){
          return   res.status(400).json({
                success:false,
                message:"please fill all the data carefully",

            })
        }
        //check for registered user 
        let  user=await User.findOne({email});
        // require("dotenv").config();
        // if user is not foud then return res 
        // console.log(user); 
        if(!user){
           return  res.status(401).json({
                success:false,
                message:"User is not registered ",
 
            });
                }
        
        const payload={
            email:user.email,
            id:user._id,
            role:user.role
        }
        if(await bcrypt.compare(password,user.password)){
            //instantiate token 
            // console.log("present");
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
           user=  user.toObject();
            user.token=token;
            user.password=undefined;
            //send the user as cookies not you are not updating anything 
            //cookie ->send name ,
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("neerajcookie",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"user Logged in succesfully",
            });
            // return res;  

        }
        else{
            return res.status(401).json({
                success:false,
                message:"password incorrect"
            })
        }

  

    } catch (error) {
      console.log(error);
      return res.status(400). json({
        success:false,
        message:"errro in logging ",
      }) ; 
    }
}

