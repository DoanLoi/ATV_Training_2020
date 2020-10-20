export const slider={
    namespaced: true,
    state:()=>({
        activeSlider:true,
        marginLeft:260
    }),
    mutations:{
        changeShowSlider(state){
            if(state.activeSlider){
                state.marginLeft=50;
            }else{
                state.marginLeft=260;
            }
            state.activeSlider=!state.activeSlider;
           
        }
    },
    actions: {
        changeShowSlider({commit}){
            commit('changeShowSlider');
    }
       
       

    }
}