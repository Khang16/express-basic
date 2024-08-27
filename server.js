import app from "./app.js";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/express_basic_try",{autoIndex:true}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log('Server started on port 3000');
});