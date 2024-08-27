import userModel from "../../models/user.model.js";
import  crypto  from "crypto";
class UserController{
    index(req,res){
        res.send("user index");
    }
    async store(req,res){
        try {
            const {body} = req;
            let password = body.password || "12345678";
            password = crypto.createHmac('sha256','12345678').update(password).digest('hex');
            const user = await userModel.create({
                ...body,
                password,
            })
        } catch (error) {
            return res.json(
                {
                    error: error.message
                }
            );
        }
    }
}
export default UserController;