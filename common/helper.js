// tái sử dụng các function
import crypto from "crypto";
export const hashMnacString = (string, alogorithm = 'sha1')=>{
    return crypto.createHmac(alogorithm,process.env.PRIVATE_KEY)
    .update(string)
    .digest('hex')
}