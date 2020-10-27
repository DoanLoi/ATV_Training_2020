import api from "../../service/api"
import toastr from 'toastr'
import { user } from "./user";
export const admin={
    namespaced: true,
    state:()=>({
        listUser:[]
    }),
    mutations: {
        setListUser(state,users){
            state.listUser=users;
        },
        setListUserWhenAdd(state,users){
            state.listUser=[...state.listUser,users]
        },
        deleteUser(state,id){
            let newListUser=state.listUser.filter(user=>{
                if(user.id !=id) return user;
            })
            state.listUser=newListUser;
        }
    },
    actions: {
        async getListUser({commit,state}){
            try {
                let result=await api.get('/getListUser');
                let users=result.data;
                commit('setListUser',users);
            } catch (error) {
                
            }
           
        },
        async addUser({commit},newUser){
            try {
            let result=await api.post('/addUser',{newUser});
            let user=result.data; 
            commit('setListUserWhenAdd',user);
            return true;
            } catch (error) {
                let {message}=error.response.data;
                toastr.error(message,'Error');
            }
        },
        async deleteUser({commit},id){
            try {
                await api.post("/deleteUser",{id});
                commit('deleteUser',id);
                toastr.success('Xóa user thành công',"DONE");
            } catch (error) {
                toastr.error('Xóa user thất bại','ERROR');
            }
        }
    }
}