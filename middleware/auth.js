const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next )=>{
    try {
        //in header format sending you need to send key-authorisation and value me likho -"bearerspace " with value in 
        //lets check here 
        console.log("cookies",req.cookies.token);
        console.log("body",req.body.token); 
        console.log("header",req.header("Authorisation"));
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        // const token=req.body.token;
        if(!token||token===undefined){

            return res.status(401).json({
                success:false,
                message:"token missing",
            })
        } 
        //verify then token how ?
        // console.log(token);
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            //is decode me us token se jo v value store kiya tha ussmay  tha is me store hojayega qk ye find achha krta h
            console.log(decode);
            //aage kya krna h
            req.user=decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
            
        }
        next();
        

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:" something went wrong ,while verifying the token",
        });
    }
}
//export make sure that after this call route handler go to next route handler as specified in get function
exports.isStudent=(req,res,next)=>{
    try {
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"this is a Protected route for Student",

            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User Role is not Matching",
        })
    }
}
exports.isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"this is a Protected route for Admin",

            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"User Role is not Matching",
        })
    }
}