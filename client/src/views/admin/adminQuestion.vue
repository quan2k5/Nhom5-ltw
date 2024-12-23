<script setup>
import { computed, onMounted, reactive,ref, watch } from 'vue';
import {useRoute} from 'vue-router';
import { useStore } from 'vuex';
import queryString from 'query-string';
import { getAllExams } from '@/api/Exam';
import Pagination from '@/components/Pagination.vue';
import adminQuestionForm from './adminQuestionForm.vue';
import Limit from '../../components/Limit.vue'
import Swal from 'sweetalert2';
const searchParam=ref('');
const store=useStore();
const route=useRoute();
const params=reactive({ _page:1, _limit:5,examId:route.params.id,name_like:''});
const activateAddform=ref(false);
const activateUpdateform=ref(false);
let currentExam=reactive({});
const backendQuestions=computed(()=>store.state.questions.questions);
const allQuestions=computed(()=>store.state.questions.allQuestions);
let questionY=reactive({});
onMounted(async()=>{
    const exams=await(getAllExams());
    currentExam=exams.find((exam)=>exam.id==route.params.id);
    const { _page, _limit, ...restParams } = params;
    store.dispatch('getFilterQuestions',queryString.stringify(params));
    store.dispatch('getAllQuestions',queryString.stringify(restParams));
})
const handlePage=(page)=>{
    params._page=page;
    store.dispatch('getFilterQuestions', queryString.stringify(params)); 
}
const handleLimit=(limit)=>{
    params._page=1;
    params._limit=limit;
    store.dispatch('getFilterQuestions', queryString.stringify(params)); 
}
const checkPage=computed(()=>{
  const limitPage=Math.ceil(allQuestions.value.length/params._limit);
  if(allQuestions.value.length==0){
    return true;
  }
  return limitPage==params._page;
})
const handleOpenAddForm=()=>{
  searchParam.value='';
  params._page=1;
  params.name_like='';
  activateAddform.value=true;
}
const handleCloseAddForm=()=>{
  activateAddform.value=false;
}
const handleOPenUpdateForm=(question)=>{
  activateUpdateform.value=true;
  questionY=question;
}
const handleCloseUpdateForm=()=>{
  activateUpdateform.value=false;
}
const handleDelete=async(id)=>{
  searchParam.value='';
  params._page=1;
  params.name_like='';
  Swal.fire({
    title:"Bạn có muốn xóa câu hỏi này không?",
    text:"Nếu xóa thì tất cả dữ liệu của người dùng về câu hỏi sẽ mất",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK"
    }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deleteQuestion',{id:id,params:queryString.stringify(params)});     
    }
    });
}
watch(searchParam,async(newValue)=>{
  params._page=1;
  params.name_like=newValue
  const { _page, _limit, ...restParams } = params;
  store.dispatch('getFilterQuestions',queryString.stringify(params));
   store.dispatch('getAllQuestions',queryString.stringify(restParams));
});
</script>
<template>
    <div>
      <div class="title_exams">
            <h5>Danh sách câu hỏi của đề thi {{ currentExam.title }}</h5>
        </div>  
        <adminQuestionForm 
            v-if="activateAddform" 
            :currentExam="currentExam" 
            :questionList="allQuestions" 
            :page="checkPage"
            :handleClose="handleCloseAddForm"
        >
        </adminQuestionForm>
        <adminQuestionForm 
            v-if="activateUpdateform" 
            :currentExam="currentExam" 
            :questionList="allQuestions" 
            :page="checkPage"
            status="update"
            :handleClose="handleCloseUpdateForm"
            :question="questionY"
        >
        </adminQuestionForm>
        <div class="top_part">
            <button class="add_cart_btn" @click="handleOpenAddForm"><i class='bx bx-plus'></i>
              <span>thêm mới</span>
            </button>
            <input class="search_input" type="text" v-model="searchParam" placeholder="tìm kiếm câu hỏi">
        </div>
        <table>
        <thead>
            <tr>
              <th>Id</th>
              <th>Tên câu hỏi</th>
              <th>Các đáp án</th>
              <th>Đáp án đúng</th>
              <th>Hành động</th>
            </tr>
        </thead>
          <tbody>
            <tr v-for="question in backendQuestions" :key="question.id">
                <td>{{ question.id }}</td>
                <td>{{ question.name }}</td>
                <td>
                    <div class="list_options">
                        <div v-for="(option,index) in question.options" :key="option">Đáp án {{index+1}}:{{ option }}</div>   
                    </div>
                </td> 
                <td>{{ question.answer }}</td>
                <td class="action_td">
                    <i class='bx bx-pencil' @click="handleOPenUpdateForm(question)"></i>
                    <i class='bx bxs-eraser' @click="handleDelete(question.id)"></i>
                </td>
            </tr>
          </tbody>
        </table>
        <div class="bottom_page">
          <Limit @updateLimit="handleLimit"></Limit>
          <Pagination
              :currentPage="params._page"
              :totalItem="allQuestions.length"
              :itemInPage="params._limit"
              @handlePreviousPage="handlePage"
              @handleNextPage="handlePage"
              @handleNumberPage="handlePage"
        />
        </div>
    </div>
</template>

<style scoped>
/* Table general styles */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #3b82f6; /* Blue border */
}

/* Table header styles */
table th {
  background-color: #3b82f6; /* Deep blue color */
  color: white;
  font-weight: bold;
  text-align: left;
  padding: 15px;
  font-size: 16px;
  text-transform: uppercase; /* Uppercase for modern style */
}

/* Table row and cell styles */
table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #333;
  border-left: 1px solid #3b82f6; /* Blue vertical border */
  border-right: 1px solid #3b82f6;
}

td:nth-child(2) {
  width: 270px;
}

td:nth-child(3) {
  width: 250px;
}

/* Row hover effect */
table tr:hover {
  background-color: #eff6ff; /* Light blue on hover */
  transition: background-color 0.3s;
}

/* Icon actions */
.action_td i {
  cursor: pointer;
  font-size: 18px;
  color: #6b7280; /* Gray color for icons */
  margin-right: 10px;
}

.action_td i:hover {
  color:green; /* Darker blue on hover */
  transform: scale(1.1); /* Scale effect on hover */
  transition: color 0.3s, transform 0.3s;
}
.action_td i:nth-child(2){
    color: red;
}

/* Optional image styling if needed */
table td img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.bottom_page {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
.top_part{
  margin-bottom: 20px;
  display: flex;
  gap:10px;
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
.title_exams{
    width: 99.2%;
    background-color:#2196F3;
    height: 50px;
    padding-left: 10px;
    display: flex;
    color: white;
    align-items: center;
    border-radius:10px ;
    margin-bottom: 20px;
}
</style>
