
const mongoose=require("mongoose");

require("dotenv").config();


exports .connect=()=>{
    // console.log("i am not present");

    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((error) => {
        console.log("Error in DB connection:");
        console.error(error.message); // Log error message
        console.error("Full Error:", error); // Log the full error object
        process.exit(1);
    });

}