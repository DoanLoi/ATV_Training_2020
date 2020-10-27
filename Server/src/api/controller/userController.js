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
const addUser=async(req,res,next)=>{
    try {
        let {newUser}=req.body;
        let user=await User.createUser(newUser)
        return res.status(200).send(user);
    } catch (error) {
        
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
const getListUser=async(req,res,next)=>{
    try {
        let listUser=await User.getListUser();
        return res.status(200).send(listUser);
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
const deleteUser=async(req,res)=>{
    try {
        let {id}=req.body;
        await User.deleteUser(id);
        return res.status(200).send(true);
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}


const getListIntern=async(req,res)=>{
    try {
        let {id}=req.user;
        let listIntern=await User.getListIntern(id);
        return res.status(200).send({
            interns:listIntern.interns,
            teamID:listIntern.teamID
        });
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
const searchUser=async(req,res,next)=>{
    try {
       let {keyword}=req.body; 
       let users=await User.searchUser(keyword);
       return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
const addInternToTeam=async(req,res,next)=>{
    try {
        let {newIntern,teamid}=req.body;
        let intern=await User.addInternToTeam(newIntern,teamid);
        return res.status(200).send(intern)
    } catch (error) {
        console.log(error);
        return next(new APIError({
            status:500,
            message:error.message
        }))
        
    }
}
//Xóa intern khỏi nhóm
const delInternFromTeam=async(req,res)=>{
    try {
        let {id}=req.body;
        await User.delInternFromTeam(id);
        return res.status(200).send(true);
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
//Lấy danh sách trợ cấp của team
const getSalariesOfTeam=async(req,res,next)=>{
    try {
        let {id}=req.user;
        let listSalary=await User.getSalariesOfTeam(id);
        return res.status(200).send({
            salaries:listSalary.salaries,
            teamID:listSalary.teamID
        });
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
const searchInternToAddSalary=async(req,res,next)=>{
    try {
       let {keyword,teamid}=req.body; 
       let users=await User.searchInternToAddSalary(keyword,teamid);
       return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
// Thêm salary cho intern
const addSalaryForIntern=async(req,res,next)=>{
    try {
        const {internid,salary,teamid}=req.body
        let intern=await User.addSalaryForIntern(internid,salary,teamid)
        return res.status(200).send(intern)
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
//Xóa trợ cấp của intern trong nhóm
const delSalaryOfTeam=async(req,res)=>{
    try {
        let {id}=req.body;
        await User.delSalaryOfTeam(id);
        return res.status(200).send(true);
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
//Lưu bản nháp lịch nên công ty
const saveTimeDraft=async(req,res,next)=>{
    try {
        let {id,timeline}=req.body
        let newTimeline=await User.saveTimeDraft(id,timeline)
        return res.status(200).send(newTimeline)
    } catch (error) {  
        console.log(error)
        return next(new APIError({
            status:500,
            message:"Lỗi Server"
        }))
    }
}
//Lấy lịch làm việc nháp của tháng hiện tại
const getTimeDraft=async(req,res,next)=>{
    try {
        let {id}=req.user
        let timeline=await User.getTimeDraft(id)
        return res.status(200).send(timeline)
    } catch (error) {
        return next(new APIError({
            status:500,
            message:"Lỗi Server"
        }))
    }
}
export default {
    getUser:getUser,
    updateUser:updateUser,
    addEducation:addEducation,
    delEducation:delEducation,
    updatePassword:updatePassword,
    addUser:addUser,
    getListUser:getListUser,
    deleteUser:deleteUser,
    getListIntern:getListIntern,
    searchUser:searchUser,
    addInternToTeam:addInternToTeam,
    delInternFromTeam:delInternFromTeam,
    getSalariesOfTeam:getSalariesOfTeam,
    searchInternToAddSalary:searchInternToAddSalary,
    addSalaryForIntern:addSalaryForIntern,
    delSalaryOfTeam:delSalaryOfTeam,
    saveTimeDraft:saveTimeDraft,
    getTimeDraft:getTimeDraft
    
}