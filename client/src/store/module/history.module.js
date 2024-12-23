import { createHistory1,getFilterHistory } from "@/api/History";
const histories={
    state:{
        histories:[],
        currentHistory:{},
    },
    mutations:{
        setHistories:(state,payload)=>{
            state.histories=[];
            state.histories.push(...payload);
        },
        setCurrentHistory:(state,payload)=>{
            state.currentHistory=payload;
        }
    },
    actions:{
        createHistory1:async({state,commit},payload)=>{
            await createHistory1(payload);
            let arr=[...state.histories];
            arr.push(payload);
            commit('setHistories',arr);
        },
        getCurrentHistory:async({state,commit},payload)=>{
            const history=await getFilterHistory(payload);
            commit('setCurrentHistory',history[0]);
        },
        getHistories:async({commit},payload)=>{
            const histories=await getFilterHistory(payload);
            commit('setHistories',histories);
        }
    }
}
export default histories;