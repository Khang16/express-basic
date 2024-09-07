import express from "express";
import UserController from "../../src/http/controllers/admins/user.controller.js";
import { createUserValidation,updateUserValidation,indexUserValidation } from "../../src/http/validations/admin/user.validate.js";
const userRouter = (app)=>{
    const userController = new UserController();
    const router = express.Router();
    router.get("/",indexUserValidation,userController.index);
    router.post("/",createUserValidation,userController.store.bind(userController))
    router.put("/:user_id",userController.update.bind(userController))
    router.delete("/:user_id",userController.delete.bind(userController))
    router.get("/:user_id",userController.show.bind(userController))
    app.use("/user",router);
}
export  default userRouter;