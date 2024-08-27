import express from "express";
import UserController from "../../src/http/controllers/admins/user.controller.js";
import { createUserValidation } from "../../src/http/validations/admin/user.validate.js";
const userRouter = (app)=>{
    const userController = new UserController();
    const router = express.Router();
    router.get("/",userController.index);
    router.post("/",createUserValidation,userController.store)
    router.put("/:user_id",(req,res)=>{
        res.send("update user");
    })
    router.delete("/:user_id",(req,res)=>{
        res.send("delete user");
    })
    app.use("/user",router);
}
export  default userRouter;