import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 50
        },
        age:{
            type: Number,
            required: true,
            min :1,
        },
        phone:{
            type: String,
            required: true,
            unique: true,
            max:11,
            min:10,
        },
        gender:{
            type: String,
            enum: [1,2]
        },
        email:{
            type: String,
            required: true,
            unique: true,

        },
        password:{
            type: String,
            required:true,
            max:225,
        },
        level: {
            type: Number,
            enum: [1,2,3],
            default: 1,
        },
        created_by:{
            // người tạo
            type: ObjectId,
        },
        updated_by:{
            // người cập nhật
            type: ObjectId,
        },
        created_at:{
            // thời gian tạo
            type: Date,
            timestamps: true,
        },
        updated_at:{
            // thời gian cập nhật
            type: Date,
            timestamps:true,
        }

    },
    {
        timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
)
export default mongoose.model('User',userSchema,'users')