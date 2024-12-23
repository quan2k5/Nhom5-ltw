import { getAllCourses,deleteCourse,createCourse, updateCourse } from "@/api/Course";
const course={
    state:{
       courses:[],
    },
    mutations:{
        setCourse:(state,payload)=>{
            state.courses=[];
            state.courses=payload;
        }
    },
    actions:{
        getCourses:async({commit},payload)=>{
            const courses=await getAllCourses(payload);
            commit('setCourse',courses);
        },
        deleteCourse:async({commit},payload)=>{
            await deleteCourse(payload);

            // Xóa cource theo id dựa vào state

            
            const courses=await getAllCourses();
            commit('setCourse',courses);
        },
        addCourse:async({commit},payload)=>{
            await createCourse(payload);
            const courses=await getAllCourses();
            commit('setCourse',courses);
        },
        updateCourse:async({commit},payload)=>{
            await updateCourse(payload);
            const courses=await getAllCourses();
            commit('setCourse',courses);
        }
    }
}
export default course;
