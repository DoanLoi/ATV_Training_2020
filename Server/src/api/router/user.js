import expess from "express"

import auth from '../controller/authController'
import user from "../controller/userController"

import passport from 'passport'
import { authorize } from "../middlewares/auth"
require("../../config/passport");

let router = expess.Router();
    router.post("/login", auth.signIn);
    router.post("/signup", auth.signUp)
    router.post("/getUser", authorize(), user.getUser);
    router.put("/updateUser", authorize(), user.updateUser);
    router.post("/addEducation", authorize(), user.addEducation);
    router.post("/delEducation", authorize(), user.delEducation);
    router.post("/updatePassword", authorize(), user.updatePassword);
    router.post("/addUser", authorize("Admin"), user.addUser);
    router.get("/getListUser", authorize("Admin"), user.getListUser);
    router.post("/deleteUser", authorize("Admin"), user.deleteUser);
    router.get("/getListIntern", authorize("Leader"), user.getListIntern);
    router.post("/searchUser", authorize("Leader"), user.searchUser);
    router.post("/addInternToTeam", authorize("Leader"), user.addInternToTeam);
    router.post("/delInternFromTeam", authorize("Leader"), user.delInternFromTeam)
    router.get("/getSalariesOfTeam", authorize(['Leader','Admin']), user.getSalariesOfTeam)
    router.post("/searchInternToAddSalary", authorize(["Leader",'Admin']), user.searchInternToAddSalary);
    router.post("/addSalaryForIntern", authorize(["Leader",'Admin']), user.addSalaryForIntern);
    router.post("/delSalaryOfTeam", authorize(["Leader"]), user.delSalaryOfTeam)
    router.post("/saveTimeDraft", authorize(["Intern"]), user.saveTimeDraft)
    router.post("/getTimeDraft", authorize(["Intern"]), user.getTimeDraft)
    

export default router;