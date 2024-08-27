import userModel from "../../models/user.model.js";
import  crypto  from "crypto";
import { hashMnacString } from "../../../../common/helper.js";
class UserController{
    index(req,res){
        res.send("user index");
    }
    async store(req,res){
        try {
            const {body} = req;
            let password = body.password || process.env.DEFAULT_PASSWORD;
            password = hashMnacString(password);
            const user = await userModel.create({
                ...body,
                password,
            })
            return res.json(
                {
                    user
                }
            );
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