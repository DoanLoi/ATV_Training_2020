import api from "../../service/api"
import toastr from 'toastr'
import vm from "../../main"
export const auth={
    namespaced: true,
    state:()=>({
       token:localStorage.getItem('token')
    }),
    mutations:
    {
        setToken(state,token){
            state.token=token;
        },
        removeToken(state){
            state.token='';
        }
    },
    actions: {
        async signIn({commit},{email,password}){
            try {
                let token=await api.post('/login',{email,password});
                api.defaults.headers.common['Authorization'] = `Bearer ${token.data}`
                commit('setToken',token.data);
                localStorage.setItem('token',token.data);
                
                vm.$router.push({name:'Profile'})

            } catch (error) {
                toastr.error(error.response.data,'Error');
            }
        },
        logout({commit}){
            commit('removeToken');
            localStorage.removeItem('token');
            this.reset();
            vm.$router.replace({name:'Login'})

        }
    }
}