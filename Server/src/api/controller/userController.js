import User from "../service/UserService"
import bcrypt from "bcrypt"
import APIError from "../untils/APIError"
import fs from 'fs'


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
const getIntern= async(req,res)=>{
    try {
        let user=await User.findUserById(req.body)
        let education=await User.findEducationByID(req.body.id);
        user.education=education
        return res.status(200).send({user});
    } catch (error) {
        
    }


}
const updateUser=async(req,res,next)=>{
    try {
        let user=await User.updateUser(req.body.newUser);
        return res.status(200).send({
            user:user
        });
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
//upload CV
const uploadCV=async(req,res,next)=>{
    try {
        const processedFile = req.file
        let orgName = processedFile.originalname
        const fullPathInServ = processedFile.path
        const newFullPath = `${fullPathInServ}-${orgName}`;
        // console.log(newFullPath)
        // fs.renameSync(fullPathInServ, newFullPath);
        let cv=fullPathInServ
        let {id}=req.user
        let user=await User.uploadCV(cv,id) 
        return res.status(200).send({user})
    } catch (error) {
        console.log(error)
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
//Upload Avatar
const uploadAvatar=async(req,res,next)=>{
    try {
        const processedFile = req.file
        let orgName = processedFile.originalname
        const fullPathInServ = processedFile.path
        let avatar=fullPathInServ
        let {id}=req.user
        let user=await User.uploadAvatar(avatar,id) 
        return res.status(200).send({user})
    } catch (error) {
        console.log(error)
        return next(new APIError({
            status:500,
            message:error.message
        }))
    }
}
const addEducation=async(req,res)=>{
    try {
        let education=await User.addEducation(req.user.id,req.body.newEducation);
        return res.status(200).send({
            education:education
        });
    } catch (error) {
        return next(new APIError({
            status:500,
            message:error.message
        }))
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
       let {keyword,teamid}=req.body
       let {user}=req
       let users
       if(user.Role=='Leader'){
         users=await User.searchInternToAddSalary(keyword,teamid);
       }else{
        users=await User.searchInternToAddSalaryAdmin(keyword);
       }
       
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
//Sửa salary của intern
const editSalaryOfIntern=async(req,res,next)=>{
    try {
        let {id,salary}=req.body;
        await User.editSalaryOfIntern(id,salary);
        return res.status(200).send(true);
    } catch (error) {
        return next(new APIError({
            status:500,
            message:"Tháng này đã review lương"
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
//Đăng kí lịch làm việc theo tháng
const saveTimeWork=async(req,res,next)=>{
    try {
        let {id,timeline}=req.body
        let{name}=req.user
        let newTimeline=await User.saveTimeWork(id,timeline,name)
        return res.status(200).send(newTimeline)
    } catch (error) {  
        console.log(error)
        return next(new APIError({
            status:500,
            message:"Lỗi Server"
        }))
    }
}
//Lấy lịch làm việc đã đăng kí của tháng hiện tại
const getTimeWork=async(req,res,next)=>{
    try {
        let {id}=req.user
        let timeline=await User.getTimeWork(id)
        return res.status(200).send(timeline)
    } catch (error) {
        return next(new APIError({
            status:500,
            message:"Lỗi Server"
        }))
    }
}
//Lấy lịch làm việc của  nhóm trong tháng
const getTimeWorkOfTeam=async(req,res,next)=>{
    try {
        let {id}=req.user
        let timeline=await User.getTimeWorkOfTeam(id)
        return res.status(200).send(timeline)
    } catch (error) {
        return next(new APIError({
            status:500,
            message:"Lỗi Server"
        }))
    }
}
//Lấy lịch sử trợ cấp
const getHistorySalary=async(req,res,next)=>{
    try {
        let {id}=req.body
        let historySalary=await User.getHistorySalary(id)
        return res.status(200).send(historySalary)
    } catch (error) {
        return next(new APIError({
            status:500,
            message:"Lỗi Server"
        }))
    }
}
//Lấy danh sách trợ cấp của tất cả Intern
const getAllSalary=async(req,res,next)=>{
    try {
        let allSalary=await User.getAllSalary()
        return res.status(200).send(allSalary)
    } catch (error) {
        return next(new APIError({
            status:500,
            message:"Lỗi Server"
        }))
    }
}
//Lấy lịch để thông báo push lên slack
const getTimeWorkToSendSlack=async(req,res,next)=>{
    try {
        let time=await User.getTimeWorkToSendSlack()
        return time
    } catch (error) {
        
    }
}
export default {
    getUser:getUser,
    getIntern:getIntern,
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
    getTimeDraft:getTimeDraft,
    saveTimeWork:saveTimeWork,
    getTimeWork:getTimeWork,
    getTimeWorkOfTeam:getTimeWorkOfTeam,
    getHistorySalary:getHistorySalary,
    getAllSalary:getAllSalary,
    uploadCV: uploadCV,
    editSalaryOfIntern:editSalaryOfIntern,
    getTimeWorkToSendSlack:getTimeWorkToSendSlack,
    uploadAvatar:uploadAvatar
    
}