import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
 async function hashPassword(password) {
    const hashedPassword=await hash(password,12);
    return hashedPassword;
}

 function generateToken(tokenData) {
    const token=sign({...tokenData},process.env.JSON_SECRET,{
        expiresIn:"1h"
    })
    return token;
}
function verifyToken(token) {
    try{
        
    const verifyResult=verify(token,process.env.JSON_SECRET);
    return verifyResult;
    }catch{
        return false;
    }
}

async function verifyPassword(password,hashedPassword) {
    const isValid=await compare(password,hashedPassword);
    return isValid;
}
export {hashPassword,generateToken ,verifyToken,verifyPassword} ;