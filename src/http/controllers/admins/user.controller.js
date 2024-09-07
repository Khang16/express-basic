import userModel from "../../models/user.model.js";
import { hashMnacString } from "../../../../common/helper.js";
import { PAGINATE_OPTIONS } from "../../../../configs/constant.js";
import { UserService } from "../../../../service/user.service.js";

class UserController {
    constructor(){
        this.userService = new UserService();
    }
    async index(req, res) {
        try {
            const { 
                keyword, 
                gender, 
                level,
                page = PAGINATE_OPTIONS.page,
                limit = PAGINATE_OPTIONS.limit
            } = req.query;

            const conditons = {};

            if (keyword) {
                conditons.$or = [
                    { name: new RegExp(`${keyword}`, 'i') },
                    { email: new RegExp(`${keyword}`, 'i') },
                    { phone: new RegExp(`${keyword}`, 'i') },
                ];
            }

            if (gender) {
                conditons.gender = gender;
            }
            if (level) {
                conditons.level = level;
            }
            // const users = await userModel.find(conditons);

            const [users,totalUsers] = await Promise.all([
                userModel.find(conditons).skip((page - 1) * limit).limit(limit),
                userModel.countDocuments(conditons)
            ])

            return res.json(
                users
            );
        } catch (error) {
            return res.json(
                {
                    error: error.message
                }
            )
        }
    }
    async store(req, res) {
        try {
            const { body } = req;
            let password = body.password || process.env.DEFAULT_PASSWORD;
            password = hashMnacString(password);
            const user = await this.userService.store({
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

    async update(req, res) {
        try {
            const { body } = req;
            const userId = req.params.user_id;
            const user = await this.userService.update(
                userId,
                body,
                {
                    new: true,
                }
            )
            return res.json(

                user

            );
        } catch (error) {
            return res.json(
                {
                    error: error.message
                }
            );
        }
    }

    async show(req, res) {
        try {
            const userId = req.params.user_id;
            const user = await this.userService.show(userId);
            return res.json(user);
        } catch (error) {
            return res.json(
                {
                    error: error.message
                }
            );
        }
    }

    async delete(req, res) {
        try {
            const userId = req.params.user_id;
            const user = await this.userService.delete(userId);
            return res.json(!!user);
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