import {getFilterQuestions,createQuestion, updateQuestion, deleteQuestion} from "@/api/Question";
const questions={
    state:{
       questions:[],
       allQuestions:[],
    },
    mutations:{
        getAllQuestions:(state,payload)=>{
            state.allQuestions=[];
            state.allQuestions=payload;
        },
        getFilterQuestions:(state,payload)=>{
            state.questions=[];
            state.questions=payload;
        }
    },
    actions:{
        getAllQuestions:async({commit},payload)=>{
            const exams=await getFilterQuestions(payload);
            commit('getAllQuestions',exams);
        },
        getFilterQuestions:async({commit},payload)=>{
            console.log(11111111111111,payload);
            const exams=await getFilterQuestions(payload);
            commit('getFilterQuestions',exams);
        },
        createQuestion:async({state,commit},payload)=>{
            await createQuestion(payload.question);
            let arr1=[...state.allQuestions,payload.question];
            commit('getAllQuestions',arr1);
            if(payload.page==true){    
                let arr2=[...state.questions,payload.question];
                commit('getFilterQuestions',arr2);
            }
        },
        updateQuestion:async({state,commit},payload)=>{
            await updateQuestion(payload);
            let arr1=[...state.questions];
            let findNumber1=arr1.findIndex((item)=>{
                return item.id==payload.id;
            })
            arr1.splice(findNumber1,1,payload);
            commit('getFilterQuestions',arr1);
        },
        deleteQuestion:async({state,commit},payload)=>{
            await deleteQuestion(payload.id);
            const questions=await getFilterQuestions(payload.params);
            commit('getFilterQuestions',questions);
            let arr=[...state.allQuestions]
            const findNumber=arr.findIndex((item)=>item.id==payload.id);
            arr.splice(findNumber,1)
            console.log(11111111111111,arr);
            commit('getAllQuestions',arr);

        }
    }
}
export default questions;