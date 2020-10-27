import express from 'express'
import userRouter from './user'



let initRouters=app=>{
   
     app.use("/",userRouter);
}
export default initRouters;