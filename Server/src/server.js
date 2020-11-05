import server from "./config/express"
import env from "./config/vars"
import sendSlack from "./api/service/slack/slackProvider"
var schedule = require('node-schedule');
// 00 00 08 * * 1

server.listen(env.port,env.host,()=>{
    // ss mm hh dom MM DD
    schedule.scheduleJob('00 00 09 * * 1', function(){
        console.log('The answer to life, the universe, and everything!');
        sendSlack()
      });
    console.log('Hello DoanLoi');
    console.log('Server is running '+env.port);
})