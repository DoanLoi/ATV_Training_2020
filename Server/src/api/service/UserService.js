import db from "../../config/connetpostgresQL"
import jwt from "jsonwebtoken"
import env from "../../config/vars"
import bcrypt from 'bcrypt'
import moment from "moment"
import {transMail} from "../untils/templateMailer"
import sendMail from "./emails/emailProvider"
import fsExtra from  "fs-extra"
import fs from 'fs'

const saltRounds=8;
let findUserById=(payload)=>{
    return new Promise (async(resolve,reject)=>{
        let user = await db.any('SELECT * from users where id= $1',[payload.id]);
        let result=user[0]
        if(result.cv){
            let CV=await fsExtra.readFile(`${result.cv}`)
            result.cv=CV
        }
        if(result.avatar){
            let avatar=await fsExtra.readFile(`${result.avatar}`)
            result.avatar=avatar
        }
        resolve(result);
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
            let defaultAvatar='src\\public\\avatar\\user.png'
            let hashPassword=await bcrypt.hash(defaultPassword, saltRounds);
            let user=await db.one('INSERT INTO users(name,role,username,password,type,start,avatar) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING name,id,start,username,type,role',
            [name,role,username,hashPassword,type,start,defaultAvatar]);
            resolve(user);
        } catch (error) {
            console.log(error);
            reject(error);
        }
     
      

        
    })
}


let updateUser=(newUser)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user=await db.any('UPDATE users SET name=$1,phone=$2,email=$3,address=$4,gender=$5 where id=$6 RETURNING *'
            ,[newUser.name,newUser.phone,newUser.email,newUser.address,newUser.gender,newUser.id]);
            // console.log(user);
            resolve(user[0])
        } catch (error) {
            reject(error);
        }
    
    })  
}
let uploadCV=(cv,id)=>{
    return new Promise(async(resolve,reject)=>{
        let user=await db.any('UPDATE users SET cv=$1 where id=$2 RETURNING *',[cv,id]);
        // console.log(user);
        resolve(user[0])
    }).catch(err=>{
        reject(err);
    })
}
let uploadAvatar=(avatar,id)=>{
    return new Promise(async(resolve,reject)=>{
        let oldAvatar=await db.any('SELECT avatar from users where id=$1',[id])
        let user=await db.any('UPDATE users SET avatar=$1 where id=$2 RETURNING *',[avatar,id]);
        if(oldAvatar[0].avatar!="src\\public\\avatar\\user.png"){
            fs.unlinkSync(oldAvatar[0].avatar)
        }
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
//Lấy tất cả các trợ cấp cho Intern 
let getAllSalary=()=>{
    return new Promise(async(resolve,reject)=>{
        let listSalary=await db.any('Select T.*,users.name as leader from users,teams,(SELECT name,S.* from salary S,users where users.id=S.internid) as T where T.teamid=teams.id and leaderid=users.id')
        resolve(listSalary)
    })
}
//Tìm kiếm trong nhóm các Intern để add salary quyền leader
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
//Tìm kiếm trong danh sách các Intern để add salary quyền admin
let searchInternToAddSalaryAdmin=(keyword,teamid)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            keyword=keyword+"%";
            let users=await db.any('SELECT userofteam.teamid,userofteam.internid,userofteam.name,salary.salaryaday FROM userofteam LEFT JOIN salary ON userofteam.internid=salary.internid where userofteam.name LIKE $1 AND salary.start IS NULL',[keyword]);
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
            let month=moment().format('MM-YYYY')
            db.any('INSERT INTO salary values ($1,$2,$3,$4) ',[internid,today,salary,teamid]).then( async (v)=>{
                let intern= await db.any('SELECT name,S.* from salary S,users where users.id=S.internid and S.internid=$1',[internid])
                resolve(intern[0]) 
            }).catch(error=>{
                reject(error)
            })
            db.any('INSERT INTO historysalary values ($1,$2,$3,$4,$5) ',[internid,today,salary,teamid,month])
           
       
    })
}
//Sửa salary của intern
let editSalaryOfIntern=(id,salary)=>{
    return new Promise(async(resolve,reject)=>{
        let today=moment()
        let month=moment().format('MM-YYYY')
        let teamId=await db.any('SELECT teamid from userofteam where internid=$1',[id])
        db.any('INSERT INTO historysalary VALUES($1,$2,$3,$4,$5)',[id,today,salary,teamId[0].teamid,month]).then(async(v)=>{
            await db.any('UPDATE salary SET start=$1,salaryaday=$2  where internid=$3',[today,salary,id]);
            resolve(true);
        }).catch(err=>{
            reject(err)
        })
    })
}
//Xóa trợ cấp
let delSalaryOfTeam=(id)=>{
    return new Promise(async(resolve,reject)=>{
        await db.any('DELETE FROM salary where internid=$1',[id]);
        await db.any('DELETE FROM historysalary where internid=$1',[id]);
        resolve(true);
    }).catch(err=>{
        reject(err);
    })
}
let saveTimeDraft=(id,timeline)=>{
    return new Promise(async(resolve,reject)=>{
            try {
                let month=moment().format('M')
                await db.any("DELETE FROM timeworkdraft where internid=$1 and  DATE_PART('month',start )=$2",[id,month])
                let newTimelinePromise=timeline.map(async (day)=>{
                    let eventDay=await db.any('INSERT INTO timeworkdraft VALUES ($1,$2,$3) RETURNING title,start',[id,day.start,day.title])
                    return eventDay[0]
                })
                let newTimeline=await Promise.all(newTimelinePromise)
                resolve(newTimeline)
            } catch (error) {
               reject(error)
            }   
            
    })
}
//Lấy bản nháp lịch làm việc
let getTimeDraft=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let month=moment().format('M')
        let timeline=await db.any("SELECT title,start from timeworkdraft where internid=$1 AND DATE_PART('month',start )=$2 ",[id,month])
        resolve(timeline)
    })
}
//Đăng kí lịch làm việc
let saveTimeWork=(id,timeline,name)=>{
    return new Promise(async(resolve,reject)=>{
            try {
                let month=moment().format('M')
               let timeDelete=await db.any("DELETE FROM timework where internid=$1 and  DATE_PART('month',start )=$2 RETURNING *",[id,month])
               
                let newTimelinePromise=timeline.map(async (day)=>{
                    let eventDay=await db.any('INSERT INTO timework VALUES ($1,$2,$3) RETURNING title,start',[id,day.start,day.title])
                    return eventDay[0]
                })
                let newTimeline=await Promise.all(newTimelinePromise)
                let content;
                if(timeDelete.length){
                    content='đã sửa'
                }else {
                    content='đã đăng kí'
                }
                let leader=await db.any('SELECT users.email,users.name from users,userofteam UT,teams Where  UT.internid=$1 AND teams.id=UT.teamid AND teams.leaderid=users.id',[id])
                sendMail(leader[0].email,transMail.subject,transMail.template(name,content,leader[0].name,month,'http://aloaloaloalo')).then(success=>{
                    resolve(newTimeline)
                }).catch(err=>{
                    reject(err)
                })
               
            } catch (error) {
               reject(error)
            }   
            
    })
}
//Lấy bản nháp lịch làm việc
let getTimeWork=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let month=moment().format('M')
        let timeline=await db.any("SELECT title,start from timework where internid=$1 AND DATE_PART('month',start )=$2 ",[id,month])
        resolve(timeline)
    })
}
//Lấy lịch làm việc của cả nhóm
let getTimeWorkOfTeam=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let month=moment().format('M')
        let result=await db.any("SELECT timework.*,users.name from users,userofteam UT,teams,timework Where DATE_PART('month',timework.start )=$1 AND teams.leaderid=$2 AND teams.id=UT.teamid AND UT.internid=timework.internid AND UT.internid=users.id",[month,id])
        let timeWork={}
        result.forEach(res=>{
            
            if(timeWork[res.name]){
                timeWork[res.name][moment(res.start).format('D')]=res.title
            }else{
                timeWork[res.name]=[]
                timeWork[res.name][moment(res.start).format('D')]=res.title

            }
        })
        resolve(timeWork)

    })

}
//Lấy lịch sử trợ cấp
let getHistorySalary=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let historySalary=await db.any('SELECT * from historysalary where internid=$1',[id])
        resolve(historySalary)
    })
}
//Lấy lịch để push lên slack
let getTimeWorkToSendSlack=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let allTeam=await db.any('SELECT id,leaderid,urlslack from teams')
        var now = moment();
        var monday = now.clone().weekday(1);
        var friday = now.clone().weekday(5);
        let timeWorkPromise=allTeam.map(async (team)=>{
            let time=await db.any('SELECT timework.*,users.name from users,userofteam UT,teams,timework Where  teams.leaderid=$1 AND teams.id=UT.teamid AND UT.internid=timework.internid AND UT.internid=users.id AND timework.start>=$2 AND timework.start<=$3',[team.leaderid,monday,friday])
            let timeWork={}
            time.forEach(res=>{
                
                if(timeWork[res.name]){
                    timeWork[res.name][moment(res.start).format('D')]=res.title
                }else{
                    timeWork[res.name]=[]
                    timeWork[res.name][moment(res.start).format('D')]=res.title
    
                }
            })
            team.timeWork=timeWork
            return team
        })
        let timeWork=await Promise.all(timeWorkPromise)
        resolve(timeWork)
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
    getTimeDraft:getTimeDraft,
    saveTimeWork:saveTimeWork,
    getTimeWork:getTimeWork,
    getTimeWorkOfTeam:getTimeWorkOfTeam,
    getHistorySalary:getHistorySalary,
    searchInternToAddSalaryAdmin:searchInternToAddSalaryAdmin,
    getAllSalary:getAllSalary,
    uploadCV:uploadCV,
    editSalaryOfIntern:editSalaryOfIntern,
    getTimeWorkToSendSlack:getTimeWorkToSendSlack,
    uploadAvatar:uploadAvatar
    
}