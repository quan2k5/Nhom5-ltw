import { createComment, deleteComment, getFilterComments ,updateComment} from "@/api/Comment";
const comments={
    state:{
        comments:[],
    },
    mutations:{
        setComments:(state,payload)=>{
            state.comments=[];
            state.comments=payload;
        } 
    },
    actions:{
        createComment:async({state,commit},payload)=>{
            await createComment(payload);
            let arr=[...state.comments,payload];
            commit('setComments',arr);
        }, 
        getFilterComments:async({commit},payload)=>{
            const comments=await getFilterComments(payload);
            commit('setComments',comments);
        },
        updateComment:async({state,commit},payload)=>{
            await updateComment(payload);
            const arr=[...state.comments];
            const findNumber=arr.findIndex((item)=>item.id==payload.id);
            arr[findNumber]=payload;
            commit('setComments',arr);
        },
        deleteComment:async({state,commit},payload)=>{
            await deleteComment(payload); 
            const arr=[...state.comments];
            const findNumber=arr.findIndex((item)=>item.id==payload);
            arr.splice(findNumber,1);
            commit('setComments',arr);
        }
    }
}
export default comments;