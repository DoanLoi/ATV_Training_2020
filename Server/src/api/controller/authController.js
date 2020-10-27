import User from "../service/UserService"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import env from "../../config/vars"
let signUp=async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await User.findUserByAccount(email);
        console.log(user);
        if(!user){
            await User.createUser(email,password);
            return res.status(200).send('Success');
               

        }
     
        
    } catch (error) {
        return res.status(500).status(error);
    }
}
let signIn=async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await User.findUserByAccount(email);
        if(!user){
            return res.status(401).send('Tài khoản không tồn tại');
        }
        else{
            bcrypt.compare(password, user.password,async function(err, result) {
               if(!result){
                return res.status(401).send('Mật khẩu không chính xác');
               }
               else {
                let token=await jwt.sign(user, env.sercet);
                return res.status(200).send(token);
               }
            });
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}

let getUser=async(req,res,next)=>{
    try {
        throw error;
        return res.status(200).send(req.user);
    } catch (error) {
        next({status:403,message:'Not Found User'});
    }
    r
}

export default {
    signIn:signIn,
    getUser:getUser,
    signUp:signUp
}