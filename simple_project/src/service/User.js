import api from "./Api"

let getUser=async()=>{
    let user=await api.get('/user');
    return user;
}
export default {
    getUser:getUser
}