import db from "../../config/connetpostgresQL"
import jwt from "jsonwebtoken"
import env from "../../config/vars"
import bcrypt from 'bcrypt'
import { resolve } from "path";
import { rejects } from "assert";


const saltRounds=8;
let findUserById=(payload)=>{
    return new Promise (async(resolve,rejects)=>{
        let user = await db.any('SELECT * from users where id= $1',[payload.id]);
        resolve(user[0]);
    })
}
let findUserByAccount=(email)=>{
    return new Promise (async(resolve,rejects)=>{
        let user = await db.any('SELECT * from users where username= $1',[email]);
        resolve(user[0]);
    })
}

let createUser=(email,password)=>{
    return new Promise((resolve,rejects)=>{

        bcrypt.hash(password, saltRounds,async function(err, hashPassword) {
            let user= await db.one('INSERT INTO users(name,role,username,password) VALUES ($(email),$(hashPassword))',{email,hashPassword});
            resolve(user[0]);
        }).catch(err=>{
            rejects(err);
        })

        
    })
}


let updateUser=(newUser)=>{
    return new Promise(async(resolve,rejects)=>{
        let user=await db.any('UPDATE users SET name=$1,phone=$2,email=$3,address=$4,gender=$5 where id=$6 RETURNING *'
        ,[newUser.name,newUser.phone,newUser.email,newUser.address,newUser.gender,newUser.id]);
        // console.log(user);
        resolve(user[0])
    }).catch(err=>{
        rejects(err);
    })
}

let findEducationByID=(id)=>{
    return new Promise(async(resolve,rejects)=>{
        let education= await db.any('SELECT * from education where internid=$1',[id]);
        resolve(education);
    }).catch(err=>{
        rejects(err);
    })
}


let addEducation=(id,newEducation)=>{
    return new Promise(async(resolve,rejects)=>{
        let education= await db.any('INSERT INTO education(internid,school,class,start,finish) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [id,newEducation.school,newEducation.class,newEducation.start,newEducation.finish]);
        resolve(education);
    }).catch(err=>{
        rejects(err);
    })
}

let delEducation=(id)=>{
    return new Promise(async(resolve,rejects)=>{
        await db.any('DELETE FROM education where id=$1',[id]);
        resolve(true);
    }).catch(err=>{
        rejects(err);
    })
}
let updatePassword=(newPassword,id)=>{
    return new Promise(async(resolve,rejects)=>{
         let hashPassword=await  bcrypt.hash(newPassword, saltRounds);
         let user=await db.any('UPDATE users SET password=$1 where id=$2 RETURNING *',[hashPassword,id]);
         resolve(user[0]);
    })
}


export default {
    findUserById:findUserById,
    findUserByAccount:findUserByAccount,
    createUser:createUser,
    findEducationByID:findEducationByID,
    updateUser:updateUser,
    addEducation:addEducation,
    delEducation:delEducation,
    updatePassword:updatePassword
}