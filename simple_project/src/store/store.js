import Vue from "vue"
import Vuex from 'vuex'
import * as Firebase from 'firebase'
import { uuid } from 'uuidv4';
import 'firebase/firestore'
Vue.use(Vuex);
let config = {
    apiKey: "AIzaSyAcJPwcWUTKE8adRNUbsM_hgkRj6UqEDPo",
    authDomain: "managework-7c96e.firebaseapp.com",
    databaseURL: "https://managework-7c96e.firebaseio.com",
    projectId: "managework-7c96e",
    storageBucket: "managework-7c96e.appspot.com",
    messagingSenderId: "1033051969198",
    appId: "1:1033051969198:web:d7fb204782c0b7ae3f3f3f",
    measurementId: "G-BQVH43TLXQ"
    };
      
    let app = Firebase.initializeApp(config)
    let db = app.firestore()
    let worksRef=[];
    let table= db.collection('works');
    table.get()
    .then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
            let data={
                id:doc.id,
                name:doc.data().name,
                time:doc.data().time
            }
            worksRef.push(data);
        })
    })
    export const store= new Vuex.Store({
    state: {
        works:worksRef,
        checked:[]
   
    },
    mutations: {
        addWork(state,newWork){
            
            state.works.push(newWork);
        },
        deleteWork(state,index){
            state.works.splice(index,1);
         
        },

        updateChecked(state,value){
            let index=state.checked.indexOf(value);
            if( index ==-1){
                state.checked.push(value);
            }else{
                state.checked.splice(index,1);
            }
           
        },
    
        deleteAll(state){
            state.works=[];
        }
     
    }, 
    actions: {
        addWork({commit},newWork){
            let id=uuid();
            table.doc(id).set({
                name:newWork.name,
                time:newWork.time
            })
            .then(()=>{
                 newWork.id=id;
                 commit('addWork',newWork);
            })
           
            
        },
        deleteWork({commit},{index,id}){
            
            db.collection('works').doc(id).delete();
            commit('deleteWork',index);
  
                
        
        },
        updateWork({commit},newWork){
            db.collection('works').doc(newWork.id).update({
                name:newWork.name,
                time:newWork.time
            })

        },
        deleteAll({commit,state}){
            state.works.forEach(async work=>{
                await db.collection('works').doc(work.id).delete();
            })
            commit('deleteAll');
        },
        deleteMany({commit,dispatch,state}){
            state.checked.forEach(async id=>{
            
              
                await db.collection('works').doc(id).delete();
                let  index= state.works.findIndex(work=>work.id===id);
                commit('deleteWork',index);
                commit('updateChecked',id);
                    
            
              
            })
        }

    }
});
