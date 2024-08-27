import Joi from "joi";
import { USERS } from "../../../../configs/constant.js";
export const createUserValidation = (req,res,next)=>{
    const {body} = req;// dòng lệnh này lấy dữ liệu từ body của request
    const schema = Joi.object({
        name: Joi.string().required().messages(
            {
                'string.empty': 'Tên không được để trống',
                'any.required': 'Tên không được để trống',
                'string.base': 'Tên phải là một chuỗi',
                'string.max': 'Tên không được quá 50 ký tự',
            }
        ),
        age: Joi.number().min(1).required().messages({
            'number.base':'Tuoi phai la so',
            'number.empty':'Tuoi khong duoc de trong',
            'number.min':'Tuoi phai lon hon 0',
            'any.required':'Tuoi la truong bat buoc'
        }),
        phone: Joi.number().required().messages({
            'string.base':'So dien thoai phai la chuoi',
            'string.empty':'So dien thoai khong duoc de trong',
            'any.required':'So dien thoai la truong bat buoc'
        }),
        gender: Joi.number().valid(USERS.gender.male, USERS.gender.female).optional().messages({
            'number.base':'Gioi tinh phai la so',
            'number.valid':'Gioi tinh chi nhan 1 hoac 2',
            'any.required':'Gioi tinh la truong bat buoc',
        }),
        email: Joi.string().email().required().messages({
            'string.base':'Email phai la chuoi',
            'string.empty':'Email khong duoc de trong',
            'string.email':'Email khong dung dinh dang',
            'any.required':'Email la truong bat buoc'
        }),
        password: Joi.string().required().messages({
            'string.base':'Mat khau phai la chuoi',
            'string.empty':'Mat khau khong duoc de trong',
            'any.required':'Mat khau la truong bat buoc'
        }),
        level: Joi.number().valid(USERS.level.admin,USERS.level.super_admin,USERS.level.user).optional().messages({
            'number.base':'Quyen phai la so',
            'number.valid':'Quyen chi nhan 1 hoac 2',
            'any.required':'Quyen la truong bat buoc'
        }),
    })
    const result = schema.validate(body);// phải có result ở đây để validate xác thực dữ liệu xem có lỗi gì không
    if(result.error){
        return res.json({
            error:result.error.details[0].message
        })
    }
    next();// phai co next de cho controller xu ly tiep
}