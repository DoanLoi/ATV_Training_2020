import api from "../../service/api"
import toastr from 'toastr'
import axios from "axios";

export const user={
    namespaced: true,
    state:()=>({
        user:{},
        education:{},
        timeWork:[],
        timeDraft:[]
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
        },
        setTimeWork(state,timeWork){
            state.timeWork=timeWork
        },
        setTimeDraft(state,timeWork){
            state.timeDraft=timeWork
        }

    },
    actions: {
       async getUser({commit}){
           try {
           
            let user=await api.post('/getUser');
            commit('setUser',user.data.user);
            commit('setEducation',user.data.education);
           } catch (error) {
               console.log(error.response.data)
           }
     
         
        },
        async updateUser({dispatch,commit},newUser){
            try {
                let user=await api.put('/updateUser',{newUser});
                // commit('setUser',user.data.user);
               
                dispatch("getUser")
                toastr.success("Cập nhật thông tin thành công",'Success');
             } catch (error) {
                toastr.error("Cập nhật thất bại",'Error');
            }
            
           
             
        },
        //Update Avatar
        async updateAvatar({dispatch,commit},{avatar}){
            try {
                var formData =new FormData();
                console.log(avatar)
                formData.append('avatar',avatar)
                let res=await api.post('/uploadAvatar',formData);
                dispatch('getUser')
                toastr.success("Thay ảnh đại diện thành công",'Success');
               
            } catch (error) {
                console.log(error);
                toastr.error("Thêm thất bại",'Error');
            }
        },
        //Upload CV 
        async uploadCV({dispatch,commit},CV){
            try {
                var formData =new FormData();
                formData.append('file',CV)
                let res=await api.post('/uploadCV',formData);

                   
                
                // commit('setUser',user.data.user);
               
            } catch (error) {
                console.log(error);
                toastr.error("Thêm thất bại",'Error');
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
                    toastr.error("Xóa thất bại",'Error');
                }
        },
        async updatePassword({commit},{curPassword,newPassword}){
            try {
                let result=await api.post('/updatePassword',{curPassword,newPassword});
                toastr.success("Thay đổi mật khẩu thành công",'Success');
                
                } catch (error) {
                    let {message}=error.response.data;
                    toastr.error(message,'Error');
                }
        },
        //Lưu bản nháp lịch làm việc
        async saveTimeDraft({commit},{id,timeline}){
            try {
                let result=await api.post('/saveTimeDraft',{id,timeline})
                let timeWork=result.data
                commit('setTimeDraft',timeWork)
                toastr.success("Lưu lịch thành công",'Success');
            } catch (error) {
                let {message}=error.response.data;  
                toastr.error(message,'Error');
            }
        },
        //Lấy bản nháp lịch làm việc
        async getTimeDraft({commit}){
            try {
                let result=await api.post('/getTimeDraft')
                let timeWork=result.data
                commit('setTimeDraft',timeWork)
               
            } catch (error) {
                let {message}=error.response.data;  
                toastr.error(message,'Error');
            }
        },
        //Đăng kí lịch chính thức
        async saveTimeWork({commit},{id,timeline}){
            try {
                let result=await api.post('/saveTimeWork',{id,timeline})
                let timeWork=result.data
                commit('setTimeWork',timeWork)
                toastr.success("Đăng kí lịch thành công",'Success');
            } catch (error) {
                let {message}=error.response.data;  
                toastr.error(message,'Error');
            }
        },
        //Lấy bản nháp lịch làm việc
        async getTimeWork({commit}){
            try {
                let result=await api.post('/getTimeWork')
                let timeWork=result.data
                commit('setTimeWork',timeWork)
               
            } catch (error) {
                let {message}=error.response.data;  
                toastr.error(message,'Error');
            }
        },

           
    }
}