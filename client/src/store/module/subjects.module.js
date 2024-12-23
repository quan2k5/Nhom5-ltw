import { getAllSubjects,createSubject,updateSubject,deleteSubject, getFilterSubjects } from "@/api/Subject";
const subjects={
    state:{
       subjects:[],
       allsubject:[],
    },
    mutations:{
       setSubjects:(state,payload)=>{
        state.subjects=[];
        state.subjects=payload;
       },
       setAllSubjects:(state,payload)=>{
         state.allsubject=payload;
       }
    },
    actions:{
      getAllSubjects:async({commit})=>{
        const subjects=await getAllSubjects();
        commit('setSubjects',subjects);
      },
      addSubject:async({commit},payload)=>{
         await createSubject(payload);
         const subjects=await getAllSubjects();
         commit('setSubjects',subjects);
      },
      updateSubject:async({commit},payload)=>{
         await updateSubject(payload);
         const subjects=await getAllSubjects();
         commit('setSubjects',subjects);
      },
      deleteSubject:async({commit},payload)=>{
         await deleteSubject(payload);
         const subjects=await getAllSubjects();
         commit('setSubjects',subjects);
      },
      getFilterSubjects:async({commit},payload)=>{
         const subjects=await getFilterSubjects(payload);
         commit('setSubjects',subjects);
      },
      getAllSubjectsInUser:async({commit},payload)=>{
         const subjects=await getFilterSubjects(payload);
         commit('setAllSubjects',subjects);
      }

    }
}
export default subjects;