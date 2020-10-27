import api from "../../service/api"
import toastr from 'toastr'
import { user } from "./user";
export const leader={
    namespaced: true,
    state:()=>({
        listIntern:[],
        resultSearchUser:[],
        isLoading:true,
        teamID:'',
        listSalary:[]
    }),
    mutations: {
        setListIntern(state,interns){
            state.listIntern=interns;
        },
        setTeamID(state,teamID){
            state.teamID=teamID;
        },
        setListInternWhenAdd(state,intern){
            state.listIntern=[...state.listIntern,intern]
        },
        setResultSearchUser(state,users){
            state.resultSearchUser=users;
        },
        setListSalary(state,salaries){
            state.listSalary=salaries;
        },
        setListSalarynWhenAdd(state,intern){
            state.listSalary=[...state.listSalary,intern]
        }
        
    },
    actions: {
        //Lấy danh sách intern trong nhóm
        async getInternsOfTeam({commit,state}){
            try {
                let result=await api.get('/getListIntern');
                let {interns,teamID}=result.data;
                console.log(interns);
                commit('setListIntern',interns);
                commit('setTeamID',teamID);
            } catch (error) {
                
            }
           
        },
        //Xóa intern khỏi nhóm
        async delInternFromTeam({dispatch,commit},id){
            try {
                await api.post("/delInternFromTeam",{id});
                dispatch('getInternsOfTeam')
                toastr.success('Xóa intern khỏi nhóm thành công',"DONE");
            } catch (error) {
                toastr.error('Xóa intern khỏi nhóm thất bại','ERROR');
            }
        },
        //Tìm kiếm Intern theo keyword để thêm vào nhóm
        async searchUser({commit},{keyword}){
            try {
                let result=await api.post('/searchUser',{keyword});
                let users=result.data;
                commit('setResultSearchUser',users);
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
        //Thêm intern vào nhóm
        async addInternToTeam({commit},{newIntern,teamid}){
            try {
                console.log(teamid);
                let result=await api.post('/addInternToTeam',{newIntern,teamid});
                let intern=result.data;
                commit('setListInternWhenAdd',intern);
                return true;
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
        //Lấy danh sách trợ cấp của nhóm
        async getSalariesOfTeam({commit,state}){
            try {
                let result=await api.get('/getSalariesOfTeam');
                let {salaries,teamID}=result.data;
                commit('setListSalary',salaries);
                commit('setTeamID',teamID);
            } catch (error) {
                console.log(error.response.data.message);
            }
           
        },
        //Tìm kiếm intern để thêm trợ cấp
        async searchInternToAddSalary({commit,state},{keyword}){
            try {
                let teamid=state.teamID
                let result=await api.post('/searchInternToAddSalary',{keyword,teamid});
                let users=result.data;
                commit('setResultSearchUser',users);
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
                //Thêm trợ cấp cho intern
        async addSalaryForIntern({commit},{internid,salary,teamid}){
            try {
                let result=await api.post('/addSalaryForIntern',{internid,salary,teamid});
                let intern=result.data;
                commit('setListSalarynWhenAdd',intern);
                return true;
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
    //Xóa trợ cấp
        async delSalaryOfTeam({dispatch,commit},id){
            try {
                await api.post("/delSalaryOfTeam",{id});
                dispatch('getSalariesOfTeam')
                toastr.success('Xóa thành công',"DONE");
            } catch (error) {
                toastr.error('Xóa thất bại','ERROR');
            }
        },
        async saveTimeDraft({commit}){
            try {
                let result=await api.post('/saveTimeDraft')
                toastr.success("Lưu lịch thành công",'Success');
            } catch (error) {
                let {message}=error.response.data;  
                toastr.error(message,'Error');
            }
        }


    }
}