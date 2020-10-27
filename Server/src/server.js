import server from "./config/express"
import env from "./config/vars"

server.listen(env.port,env.host,()=>{
    console.log('Hello DoanLoi');
    console.log('Server is running '+env.port);
})