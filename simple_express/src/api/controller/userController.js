import User from "../service/UserService"
import bcrypt from "bcrypt"
import APIError from "../untils/APIError"

const getUser= async(req,res)=>{
    try {
        let user=req.user;
        let education=await User.findEducationByID(user.id);
    
        return res.status(200).send({
            user:user,
            education:education
        });
    } catch (error) {
        
    }


}
const updateUser=async(req,res)=>{
    try {
        let user=await User.updateUser(req.body.newUser);
        return res.status(200).send({
            user:user
        });
    } catch (error) {
        
    }
}
const addEducation=async(req,res)=>{
    try {
        let education=await User.addEducation(req.user.id,req.body.newEducation);
        return res.status(200).send({
            education:education
        });
    } catch (error) {
        
    }
}
const delEducation=async(req,res)=>{
    try {
        console.log(req.body);
        await User.delEducation(req.body.id);
        return res.status(200).send(true);
    } catch (error) {
        
    }
}
const updatePassword=async(req,res,next)=>{
    try {
        let {curPassword,newPassword}=req.body;
        let user=await User.findUserById(req.user);
        let check=await bcrypt.compare(curPassword, user.password);
        console.log(check);
        if(check){
            await User.updatePassword(newPassword,req.user.id);
            return res.status(200).send(true);
        }
        throw new APIError({
            status: 401,
            message: 'Mật khẩu hiện tại không chính xác',
          });
      
    } catch (error) {
        console.log(error);
        return next(error);
    }
}
export default {
    getUser:getUser,
    updateUser:updateUser,
    addEducation:addEducation,
    delEducation:delEducation,
    updatePassword:updatePassword
}