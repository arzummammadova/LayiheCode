import mongoose from "mongoose";
import "dotenv/config"



const url=process.env.MONGO_URI
mongoose.connect(url).then(()=>{
    console.log("conncetin to mongd ")
}).catch(()=>{
    console.log("error to connect ")
})