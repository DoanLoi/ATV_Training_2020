import axios from 'axios'
import table from 'markdown-table'
import { format } from 'path'
import UserController from "../../controller/userController"
const sendSlack = async() => {
    let res=await UserController.getTimeWorkToSendSlack()
    res.forEach(async(team) => {
        let mTable = [];
        let dataHeader=['Name','2','3','4','5','6','7','CN']
        let names=Object.keys(team.timeWork)
        mTable.push(dataHeader)
        names.forEach(name=>{
            let row=formatTime(team.timeWork[name])
            row.unshift(name)
            mTable.push(row)            
        })
        let markdownTable = table(mTable, { padding: false });
        const payload = {
            blocks: [
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `Bang`
                        }
                    ]
                },
                {
                    type: "divider"
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "```" + markdownTable + "```"
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `worklog-summary-by-user|Goto QCD for detail`
                    }
                }
            ]
        };
        
        console.log(team.urlslack)
       await axios.post(team.urlslack, payload)
    });
   

 
}
const formatTime=(times)=>{
    let row=[]
    console.log(times)
    for (let i = 0; i < 7; i++) {
        
        if(!times[i]) row.push('Nghỉ')
        else if (times[i]=='Sáng') row.push('Sáng')
        else if (times[i]=='Chiều') row.push('Chiều')
        else row.push('Cả ngày')
        
    }
    return row
  
}
export default sendSlack