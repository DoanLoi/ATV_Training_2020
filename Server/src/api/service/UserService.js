import db from "../../config/connetpostgresQL"
import jwt from "jsonwebtoken"
import env from "../../config/vars"
import bcrypt from 'bcrypt'
import moment from "moment"
import { resolve } from "path"



const saltRounds=8;
let findUserById=(payload)=>{
    return new Promise (async(resolve,reject)=>{
        let user = await db.any('SELECT * from users where id= $1',[payload.id]);
        resolve(user[0]);
    })
}
let findUserByAccount=(email)=>{
    return new Promise (async(resolve,reject)=>{
        let user = await db.any('SELECT * from users where username= $1',[email]);
        resolve(user[0]);
    })
}

let createUser=(newUser)=>{
    let {name,username,start,type,role}=newUser;
    return new Promise(async(resolve,reject)=>{
        try {
            let defaultPassword='1';
            let hashPassword=await bcrypt.hash(defaultPassword, saltRounds);
            let user=await db.one('INSERT INTO users(name,role,username,password,type,start) VALUES ($1,$2,$3,$4,$5,$6) RETURNING name,id,start,username,type,role',[
              name,role,username,hashPassword,type,start
            ]);
            resolve(user);
        } catch (error) {
            console.log(error);
            reject(error);
        }
     
      

        
    })
}


let updateUser=(newUser)=>{
    return new Promise(async(resolve,reject)=>{
        let user=await db.any('UPDATE users SET name=$1,phone=$2,email=$3,address=$4,gender=$5 where id=$6 RETURNING *'
        ,[newUser.name,newUser.phone,newUser.email,newUser.address,newUser.gender,newUser.id]);
        // console.log(user);
        resolve(user[0])
    }).catch(err=>{
        reject(err);
    })
}

let findEducationByID=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let education= await db.any('SELECT * from education where internid=$1',[id]);
        resolve(education);
    }).catch(err=>{
        reject(err);
    })
}


let addEducation=(id,newEducation)=>{
    return new Promise(async(resolve,reject)=>{
        let education= await db.any('INSERT INTO education(internid,school,class,start,finish) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [id,newEducation.school,newEducation.class,newEducation.start,newEducation.finish]);
        resolve(education);
    }).catch(err=>{
        reject(err);
    })
}

let delEducation=(id)=>{
    return new Promise(async(resolve,reject)=>{
        await db.any('DELETE FROM education where id=$1',[id]);
        resolve(true);
    }).catch(err=>{
        reject(err);
    })
}
let updatePassword=(newPassword,id)=>{
    return new Promise(async(resolve,reject)=>{
         let hashPassword=await  bcrypt.hash(newPassword, saltRounds);
         let user=await db.any('UPDATE users SET password=$1 where id=$2 RETURNING *',[hashPassword,id]);
         resolve(user[0]);
    })
}
let getListUser=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let listUser=await db.any('SELECT name,id,start,username,type,role from users');
            resolve(listUser);
        } catch (error) {
            reject(error);
        }
       
    })
}
let deleteUser=(id)=>{
    return new Promise(async(resolve,reject)=>{
        await db.any('DELETE FROM users where id=$1',[id]);
        resolve(true);
    }).catch(err=>{
        reject(err);
    })
}

let getListIntern=(id)=>{
    return new Promise(async(resolve,reject)=>{
      let idTeam=await db.any('SELECT id from teams where leaderid=$1',[id]);
      if(idTeam.length>0){
        let listIntern=await db.any('SELECT * from userofteam where teamid=$1',[idTeam[0].id]);
        resolve({
            interns:listIntern,
            teamID:idTeam[0].id
        });
      }else{
         let newTeamID=await db.any('INSERT INTO teams(leaderid) values ($1) RETURNING id',[id]);
          resolve({
              interns:[],
              teamID:newTeamID[0].id

          });
      }
    }).catch(err=>{
        reject(err);
    })
}
let searchUser=(keyword)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            keyword=keyword+"%";
            let role="Intern"
            let internHaveTeam=await db.any('SELECT DISTINCT internid FROM userofteam')
            let idInternHaveTeam=internHaveTeam.map(intern=>{
              return intern.internid
            })
            let users=await db.any('SELECT name,id,start,username,type,role from users where name LIKE $1 AND role=$2 AND id NOT IN  ($3:csv)',[keyword,role,idInternHaveTeam]);
            resolve(users)
        } catch (error) {
            reject(error)
        }
       
    })
}
let addInternToTeam=(newIntern,teamid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let today=moment();
            let intern=await db.any('INSERT INTO userofteam values ($1,$2,$3,$4,$5,$6) RETURNING *',[
                newIntern.id,teamid,today,newIntern.username,newIntern.type,newIntern.name
            ])
            resolve(intern[0])
        } catch (error) { 
            reject(error);
        }
    })
}
let delInternFromTeam=(id)=>{
    return new Promise(async(resolve,reject)=>{
        await db.any('DELETE FROM userofteam where internid=$1',[id]);
        resolve(true);
    }).catch(err=>{
        reject(err);
    })
}
let getSalariesOfTeam=(id)=>{
    return new Promise(async(resolve,reject)=>{
      let idTeam=await db.any('SELECT id from teams where leaderid=$1',[id]);
      if(idTeam.length>0){
        let listSalary=await db.any('SELECT name,S.* from salary S,users where users.id=S.internid and S.teamid=$1',[idTeam[0].id]);
        resolve({
            salaries:listSalary,
            teamID:idTeam[0].id
        });
      }else{
         let newTeamID=await db.any('INSERT INTO teams(leaderid) values ($1) RETURNING id',[id]);
          resolve({
              salaries:[],
              teamID:newTeamID[0].id

          });
      }
    }).catch(err=>{
        reject(err);
    })
}
let searchInternToAddSalary=(keyword,teamid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            keyword=keyword+"%";
            let users=await db.any('SELECT userofteam.teamid,userofteam.internid,userofteam.name,salary.salaryaday FROM userofteam LEFT JOIN salary ON userofteam.internid=salary.internid where userofteam.name LIKE $1 AND userofteam.teamid=$2 AND salary.start IS NULL',[keyword,teamid]);
            resolve(users);
        } catch (error) {
            reject(error);
        }
       
    })
}
//Thêm salary cho intern
const addSalaryForIntern=(internid,salary,teamid)=>{
    return new Promise(async(resolve,reject)=>{
            let today=moment()
            db.any('INSERT INTO salary values ($1,$2,$3,$4) ',[internid,today,salary,teamid]).then( async (v)=>{
                let intern= await db.any('SELECT name,S.* from salary S,users where users.id=S.internid and S.internid=$1',[internid])
                resolve(intern[0]) 
            }).catch(error=>{
                reject(error)
            })
           
       
    })
}
let delSalaryOfTeam=(id)=>{
    return new Promise(async(resolve,reject)=>{
        await db.any('DELETE FROM salary where internid=$1',[id]);
        resolve(true);
    }).catch(err=>{
        reject(err);
    })
}
let saveTimeDraft=(id,timeline)=>{
    return new Promise(async(resolve,reject)=>{
            try {
                console.log(timeline)
                let month=moment().format('M')
                db.any("DELETE FROM timeworkdraft where internid=$1 and  DATE_PART('month',start )=$2",[id,month])
                let newTimelinePromise=timeline.map(async (day)=>{
                    let eventDay=await db.any('INSERT INTO timeworkdraft VALUES ($1,$2,$3,$4) RETURNING title,start,allday',[id,day.start,true,day.title])
                    return eventDay[0]
                })
                let newTimeline=Promise.all(newTimelinePromise)
                resolve(newTimeline)
            } catch (error) {
               reject(error)
            }
            
    })
}
let getTimeDraft=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let month=moment().format('M')
        console.log(id)
        let timeline=await db.any("SELECT title,start,allday from timeworkdraft where internid=$1 AND DATE_PART('month',start )=$2 ",[id,month])
        resolve(timeline)
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
    updatePassword:updatePassword,
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