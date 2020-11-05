import api from "../../service/api"
import toastr from 'toastr'
import { user } from "./user";
export const admin = {
    namespaced: true,
    state: () => ({
        listUser: [],
        timeWorks: [],
        listSalary: [],
        resultSearchUser: []
    }),
    mutations: {
        setListUser(state, users) {
            state.listUser = users;
        },
        setListUserWhenAdd(state, users) {
            state.listUser = [...state.listUser, users]
        },
        deleteUser(state, id) {
            let newListUser = state.listUser.filter(user => {
                if (user.id != id) return user;
            })
            state.listUser = newListUser;
        },
        setListSalary(state, salaries) {
            state.listSalary = salaries
        },
        setResultSearchUser(state, users) {
            state.resultSearchUser = users;
        },
    },
    actions: {
        async getListUser({ commit, state }) {
            try {
                let result = await api.get('/getListUser');
                let users = result.data;
                commit('setListUser', users);
            } catch (error) {

            }

        },
        async addUser({ commit }, newUser) {
            try {
                let result = await api.post('/addUser', { newUser });
                let user = result.data;
                commit('setListUserWhenAdd', user);
                return true;
            } catch (error) {
                let { message } = error.response.data;
                toastr.error(message, 'Error');
            }
        },
        async deleteUser({ commit }, id) {
            try {
                await api.post("/deleteUser", { id });
                commit('deleteUser', id);
                toastr.success('Xóa user thành công', "DONE");
            } catch (error) {
                toastr.error('Xóa user thất bại', 'ERROR');
            }
        },
        //Lấy danh sách trợ cấp của công ty
        async getSalaries({ commit, state }) {
            try {
                let result = await api.get('/getSalaries');
                let { data } = result;
                console.log(result)
                commit('setListSalary', data);
            } catch (error) {
                console.log(error.response.data.message);
            }

        },
        //Tìm kiếm intern để thêm trợ cấp
        async searchInternToAddSalary({ commit, state }, { keyword }) {
            try {
                let result = await api.post('/searchInternToAddSalary', { keyword });
                let users = result.data;
                commit('setResultSearchUser', users);
            } catch (error) {
                console.log(error.response.data.message);
            }
        },
        //Thêm trợ cấp cho intern
        async addSalaryForIntern({dispatch,commit }, { internid, salary, teamid }) {
            try {
                let result = await api.post('/addSalaryForIntern', { internid, salary, teamid });
                dispatch('getSalaries')
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        //Xóa trợ cấp
        async delSalaryOfTeam({ dispatch, commit }, id) {
            try {
                await api.post("/delSalaryOfTeam", { id });
                dispatch('getSalaries')
                toastr.success('Xóa thành công', "DONE");
            } catch (error) {
                toastr.error('Xóa thất bại', 'ERROR');
            }
        },
    }
}