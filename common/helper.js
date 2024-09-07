// tái sử dụng các function
import crypto from "crypto";
import { PAGINATE_OPTIONS } from "../configs/constant.js";
export const hashMnacString = (string, alogorithm = 'sha1')=>{
    return crypto.createHmac(alogorithm,process.env.PRIVATE_KEY)
    .update(string)
    .digest('hex')
}
// Quy chuẩn là phải có 2 tham số truyền vào và trả về 1 object có 2 thuộc tính là status và data 
// status là 1 số nguyên và data là 1 object hoặc 1 mảng hoặc 1 string hoặc 1 số nguyên hoặc 1 boolean hoặc 1 null hoặc 1 undefined 

export const responseSuccess = (data,statusCode = 200 , messager = "success")=> {
    return {
        now: Date.now(),
        data,
        status: statusCode,
        message: messager
    }
}

export const responsePaginate = (data, total,page= PAGINATE_OPTIONS.page,limit = PAGINATE_OPTIONS.limit)=>{
    return{
        data,
        page: +page,
        limit: +limit,
        total_page: Math.ceil(total/limit),
    }
}

export const responseJson = (res,data, statusCode = 200)=>{
    return res.status(statusCode).json(data);
}

export const responseError = (errors, statusCode = 500)=>{
    const response = {
        now: Date.now(),
        status: statusCode,
        message: "error",
        errors:[],
        
    }

    if(typeof errors === "string"){
        response.errors = errors;
        return response;
    }


}

export const responseJoiError = (errors)=> {
    console.log(errors);
    
    const response = {
        now: Date.now(),
        status: 400,
        message: "",
        errors:[],
    }
    response.errors = errors.details.map(
        (error)=>{
            return{
                message: error.message,
                field: error.context.key,
                // context là object do joi tạo ra khi xảy ra lỗi validation
                // key là thuộc tính của object được validate
                // key cho biết chình xác thuộc tính nào trong schema không được pass qua validation

                value: errors._original[error.context.key]
                // _original là object gốc của object được validate

            }
        }
    )
    return response;
}


export const handlerError = (res,err)=>{
    const response = {
        now: Date.now(),
        status: 500,
        message: "Something went wrong",
        errors: process.env.NODE_ENV === "production" ? {} : err.stack,
        
    }
    return res.status(500).json(response);
}