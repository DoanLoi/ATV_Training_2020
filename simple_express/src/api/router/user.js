import expess from "express"

import auth from '../controller/authController'
import user from "../controller/userController"

import passport from 'passport'
import { authorize } from "../middlewares/auth"
require("../../config/passport");

let router = expess.Router();
    router.post("/login", auth.signIn);
    router.post("/signup", auth.signUp)
    router.post("/getUser", authorize("all"), user.getUser);
    router.put("/updateUser", authorize("all"), user.updateUser);
    router.post("/addEducation", authorize("all"), user.addEducation);
    router.post("/delEducation", authorize("all"), user.delEducation);
    router.post("/updatePassword", authorize("all"), user.updatePassword);

export default router;