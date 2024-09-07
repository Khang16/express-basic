import userModel from '../src/http/models/user.model.js';

export class UserService {
    async index(query) {
        try {
            const users = await userModel.find(query)
            return users;
        }
        catch (error) {
            throw error

        }
    }
    async store(data) {
        try {
            const user = await userModel.create(data)

            return user;
        } catch (error) {
            throw error
        }
    }

    async update(id, data) {
        try {
            const user = await userModel.findByIdAndUpdate(id, data, { new: true })

            return user;
        } catch (error) {
            throw error
        }
    }

    async show(id) {
        try {
            const user = await userModel.findById(id)

            return user;
        } catch (error) {
            throw error
        }
    }

    async delete(id) {
        try {
            const user = await userModel.findByIdAndDelete(id)

            return user;
        }
        catch (error) {
            throw error
        }
    }
}
