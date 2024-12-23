import { getSearchExams,getAllExams,createExam, updateExam,deleteExam} from "../../api/Exam";
const exams={
    state:{
       exams:[],
       currentExam:{},
    },
    mutations:{
        setExams:(state,payload)=>{
            state.exams=[];
            state.exams=payload;
        } ,
        setCurrentExam:(state,payload)=>{
            state.currentExam=payload;
        }
    },
    actions:{
        getExams:async({commit})=>{    
            const exams=await getAllExams(); 
            commit('setExams',exams);
        },
        createExam:async({commit},payload)=>{
            await createExam(payload);
            const exams=await getAllExams(); 
            commit('setExams',exams);
        },
        updateExam:async({commit,state},payload)=>{
            let arr=[...state.exams]
            await updateExam(payload);
            const findNumber=arr.findIndex((item)=>item.id==payload.id);
            arr.splice(findNumber,1,payload);
            commit('setExams',arr);
        },
        searchExams:async({commit},payload)=>{
            const exams=await getSearchExams(payload);
            commit('setExams',exams);
        },
        deleteExam:async({commit,state},payload)=>{
            let arr=[...state.exams]
            await deleteExam(payload);
            const findNumber=arr.findIndex((item)=>item.id==payload);
            arr.splice(findNumber,1);
            commit('setExams',arr);
        },
        getCurrentExam:async({commit,state},payload)=>{
            const exams=await getAllExams(); 
            const findExam=exams.find((item)=>item.id==payload);
            if(findExam){
                commit('setCurrentExam',findExam);
            }
        }
    }
}
export default exams;