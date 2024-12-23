<script setup>
import { computed, onMounted, reactive,ref,watch } from 'vue';
import { getAllSubjects } from '@/api/Subject';
import queryString from 'query-string';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router';
import adminExamForm from './adminExamForm.vue';
import { getQuestionInAdminExam } from '@/api/Question';
import Swal from 'sweetalert2';
const store=useStore();
const router=useRouter();
const searchParam=ref('');
const backendQuestions=reactive([]);
const backendExams=computed(()=>store.state.exams.exams);
let examY=reactive({});
const backendSubject=reactive([]);
const activeAddForm=ref(false);
const activateUpdateForm=ref(false);
const handleOpenUpdateForm=(exam)=>{
    activateUpdateForm.value=true;
    examY=exam;
}
const handleViews=(id)=>{
    router.push(`/admin/questions/${id}`)
}
const handleCloseUpdateForm=()=>{
    activateUpdateForm.value=false;
}
onMounted(async()=>{
    const subjects=await getAllSubjects();
    const questions=await getQuestionInAdminExam();
    backendQuestions.push(...questions);
    backendSubject.push(...subjects);
    store.dispatch('getExams');
})
const findSubject=(id)=>{
    const find=backendSubject.find((item)=>{
        return item.id==id;
    })
    if(find){
        return find.title;
    }
    return '';
}
const filterQuestions=(id)=>{
    let exams=backendQuestions.filter((item)=>item.examId==id);
    return exams.length;

}
const handleOpenAddForm=()=>{
    searchParam.value='';
    activeAddForm.value=true;
}
const handleCloseAddForm=()=>{
    activeAddForm.value=false;
}
watch(searchParam,async(newValue)=>{
  await store.dispatch('searchExams',`title_like=${newValue}`);
});
const handleDelete=(id)=>{
    let findItem=backendQuestions.find((question)=>{
    return question.examId==id;
    })
    if(findItem){
        Swal.fire({
        title: 'Không thể xóa!',
        text: 'Đề thi này đang có chứa một số câu hỏi',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        });
    }else{
        Swal.fire({
        title:"Bạn có muốn xóa đề thi này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK"
        }).then((result) => {
        if (result.isConfirmed) {
            searchParam.value='';
            store.dispatch('deleteExam',id);
        }
        });
    }
}
const handleBlock=(exam,status,string)=>{
    Swal.fire({
    text:`Bạn có muốn ${string} trạng thái của đề thi này không?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK"
    }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('updateExam',{...exam,status:status});
    }
    });
}
</script>
<template>
    <div class="">
        <div class="title_exams">
            <h4>Danh sách đề thi</h4>
        </div>  
        <adminExamForm v-if="activeAddForm" :subjectList="backendSubject" :handleClose="handleCloseAddForm"></adminExamForm>
        <adminExamForm
            v-if="activateUpdateForm"
            :subjectList="backendSubject"
            :handleClose="handleCloseUpdateForm"
            :exam="examY"
            status="update"
        >
        </adminExamForm>
        <div class="top_part">
            <button class="add_cart_btn" @click="handleOpenAddForm"><i class='bx bx-plus'></i>
                <span>thêm mới</span>
            </button>
            <input class="search_input" type="text" v-model="searchParam" placeholder="tìm kiếm đề thi">
        </div>
        <div class="course_list">
            <div class="course_item" v-for="exam in backendExams" :key="exam.id">
                <div class="left_part">
                    <div class="top_part">
                    <h4>id:{{ exam.id }}</h4>
                    <div class="name_exam">
                        <h4 class="">Tên đề thi :</h4>
                        <span>{{ exam.title}}</span>
                    </div>
                    <div class="subject_exam">
                        <h4>Thuộc môn thi :</h4>
                        <span>{{findSubject(exam.idSubject)}}</span>
                    </div>
                </div>
                <div class="under_part">
                    <img :src="exam.image" alt="">
                    <div class="right_part">
                        <div class="description_part">
                            <h4>Mô tả:</h4>
                            <span class="detail">
                                {{ exam.description }}
                            </span>
                        </div>
                        <div class="other_part">
                            <div class="item_part">
                                <h5>Thời gian làm bài :</h5>
                                <span>{{ exam.duration }} phút</span>
                            </div>
                            <div class="item_part">
                                <h5>Số lượng câu hỏi :</h5>
                                <span>{{ filterQuestions(exam.id) }}</span>
                            </div>
                            <div class="item_part">
                                <h5>Số lượt thi :</h5>
                                <span class="status">{{ exam.testTurn }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
                <div class="right_part">
                    <h4>Hành động:</h4>
                    <div class="icon_list">
                        <button class="icon_button" @click="handleViews(exam.id)">
                            <ion-icon cass="bx" name="eye-outline"></ion-icon>
                            <span>Xem chi tiết</span>
                        </button>
                        <button class="icon_button" @click="handleOpenUpdateForm(exam)">
                            <i class='bx bxs-edit-alt'></i>
                            <span>Cập nhật</span>
                        </button>
                        <!-- <button class="icon_button" v-if="exam.status" @click="handleBlock(exam,false,'tắt')">
                            <i class='bx bxs-lock-open-alt'></i>
                            <span>Mở khóa</span>
                        </button>
                        <button class="icon_button" v-if="!exam.status" @click="handleBlock(exam,true,'bật')">
                            <i class='bx bxs-lock-alt' ></i>
                            <span>Khóa</span>
                        </button> -->
                        <button class="icon_button" @click="handleDelete(exam.id)">
                            <i class='bx bxs-eraser'></i>
                            <span>Xóa</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title_exams{
    width: 99.2%;
    background-color:#2196F3;
    height: 50px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    border-radius:10px ;
    margin-bottom: 20px;
}
.title_exams h4{
    color: white;
}
.course_list{
    width: 1200px;
}
.course_item{
    width: 100%;
    border-radius:10px;
    border: 1px dashed #BBDEFB;
    padding: 10px;
    margin-bottom: 15px;
    display: flex;
    gap:5px;
}
.top_part{
    display: flex;
    gap:15px;
}
h4,h5{
    margin: 0;
}
.under_part{
    display: flex;
    gap:10px;
    margin-top: 10px;
}
.under_part img{
    width: 100px;
    height: 100px;
    border-radius: 50%;

}
.right_part{
    width: 100%;
}
.name_exam{
    display: flex;
}
.description_part{
    width: 600px;
}
.description_part .detail{
    font-size: small;

}
.other_part{
    margin-top: 10px;
}
.item_part{
    display: flex;
    align-items: center;
    margin-bottom:3px ;
}
.item_part span{
    font-size: small;
}
.subject_exam{
    display: flex;
}
.status{
    color: green;
}
.icon_list{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}
.icon_list button{
    display: flex;
    align-items: center;
    gap:10px;
    justify-items: center;
    border: 1px dashed ;
    border-radius:5px;
    width: 100px;
    height: 25px;
    cursor: pointer;
    color: white;
}
.icon_button:first-child{
    background-color: rgba(128, 0, 128, 0.281);
    border: 1px dashed purple;
}
.icon_button:nth-child(2){
    background-color: rgba(0, 128, 0, 0.281);
    border: 1px dashed green;
}
.icon_button:nth-child(4){
    background-color: rgba(255, 0, 0, 0.295);
    border: 1px dashed red;
}
.icon_button:nth-child(3){
    background-color:rgba(255, 68, 0, 0.479);
    border: 1px dashed orangered;
}
.top_part{
  margin-bottom: 20px;
}
.add_cart_btn{
  color: white;
  border: none;
  cursor: pointer;
  background-color: #2563eb;;
  width: 150px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search_input{
    width:300px;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.514);
}
</style>
