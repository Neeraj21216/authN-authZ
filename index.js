//express intantitate
const express=require("express");
const app = express();
const cookieParser = require("cookie-parser"); // Import the middleware

app.use(cookieParser()); // Initialize and use it
app.use(express.json());


require("dotenv").config();
const PORT=process.env.PORT||4000;

//port find kro  
const user=require("./routes/user");
// //something wil 
  
app.use("/api/v1",user);
require("./config/database").connect();
                 
app.listen(PORT,()=>{
    //aage kya krna h 
    console.log(`app started sucessfullyat port ${PORT}`);

})