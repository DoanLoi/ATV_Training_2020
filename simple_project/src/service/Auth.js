import axios from 'axios'
let signIn=(username,password)=>{
   let token= axios.post('http://localhost:2108/login',
    {
        username:username,
        password:password
    })
    return token;
}
export default {
    signIn:signIn
}