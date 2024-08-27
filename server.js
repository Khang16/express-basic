import { configDotenv } from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";
configDotenv();
mongoose.connect(process.env.MONGO_URI,{autoIndex:true}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log('Server started on port 3000');
});