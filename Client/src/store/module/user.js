import api from "../../service/api"
import toastr from 'toastr'
import vm from "../../main"
export const user={
    namespaced: true,
    state:()=>({
        user:{},
        education:{}
    }),
    mutations:{
        setUser(state,user){
          state.user=user;
           
        },
        setEducation(state,education){
            state.education=[...state.education,...education]
             
        },
        delEducation(state,id){
            let newEducations=state.education.filter(edu=>{
                if(edu.id !=id) return edu;
            })
            state.education=newEducations;
        }
    },
    actions: {
       async getUser({commit}){
           try {
           
            let user=await api.post('/getUser');
            commit('setUser',user.data.user);
            commit('setEducation',user.data.education);
           } catch (error) {
               console.log(error.response.data  )
           }
     
         
        },
        async updateUser({commit},newUser){
            try {
                
                let user=await api.put('/updateUser',{newUser});
                console.log(user);
                commit('setUser',user.data.user);
                toastr.success("Cập nhật thông tin thành công",'Success');
            } catch (error) {
                toastr.error("Cập nhật thất bại",'Error');
            }
            
           
             
        },
        async addEducation({commit},newEducation){
            try {
                console.log(newEducation);
                let res=await api.post('/addEducation',{newEducation});
                commit('setEducation',res.data.education);
                toastr.success("Thêm thành công",'Success');
            } catch (error) {
                console.log(error);
                toastr.error("Thêm thất bại",'Error');
            }
            
           
             
            },
            async delEducation({commit},id){
                try {
                    await api.post('/delEducation',{id});
                    commit('delEducation',id);
                    toastr.success("Xóa thành công",'Success');
                } catch (error) {
                    console.log(error);
                    toastr.error("Thêm thất bại",'Error');
                }
                
               
                 
            },
            async updatePassword({commit},{curPassword,newPassword}){
                try {
                let result=await api.post('/updatePassword',{curPassword,newPassword});
                 return result;
                } catch (error) {
                    
                    let {message}=error.response.data;
                    toastr.error(message,'Error');
                }
                
               
                 
            }
            
       
       

    }
}