<script setup>
import { computed, onMounted, reactive ,ref} from 'vue';
import { useStore } from 'vuex';
import { getAllCourses } from '@/api/Course';
import adminSubjectForm from './adminSubjectForm.vue';
import Swal from 'sweetalert2';
import { getAllExams } from '@/api/Exam';
const addForm=ref(false);
const updateForm=ref(false);
const store = useStore();
const backendCourses=reactive([]);
const backendSubjects = computed(() => store.state.subjects.subjects);
const backendExams=reactive([]);
let subjectY=reactive({});
const handleCloseAddForm=()=>{
    addForm.value=false;
}
const handleOpenAddForm=()=>{
    addForm.value=true;
}
const handleCloseUpdateForm=()=>{
  updateForm.value=false;
}
const handleOpenUpdateForm=(subject)=>{
  subjectY=subject
  updateForm.value=true;
}
const handleDelete=(id)=>{
  let find=backendExams.find((item)=>item.idSubject==id);
  if(find){
    Swal.fire({
      title: 'Không thể xóa!',
      text: 'Môn học này đang chứa 1 số đề thi',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    });
  }else{
    Swal.fire({
    text:"Bạn có muốn xóa môn học này không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK"
    }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deleteSubject',id);
    }
    });
  }
}
const findCourse=(id)=>{
    let findItem=backendCourses.find((item)=>item.id==id);
    if(findItem){        
        return findItem.title;
    }
    return '';
}
const filterBackendExams=(id)=>{
  return backendExams.filter((item)=>item.idSubject==id).length;
}
onMounted(async() => {
    const courses=await getAllCourses();
    const exams=await getAllExams();
    backendExams.push(...exams);
    backendCourses.push(...courses);
    store.dispatch('getAllSubjects');
});
</script>
<template>
  <div>
    <adminSubjectForm v-if="addForm"
        :courses="backendCourses"
        :handleCloseForm="handleCloseAddForm"
    ></adminSubjectForm>
    <adminSubjectForm 
      v-if="updateForm"  
      :courses="backendCourses" 
      :handleCloseForm="handleCloseUpdateForm"
      :subject="subjectY"
      status="update"
    >
    </adminSubjectForm>
    <div class="top_part">
      <button class="add_cart_btn" @click="handleOpenAddForm"><i class='bx bx-plus'></i>
        <span>thêm mới</span>
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Tên môn học</th>
          <th>Thuộc khóa học</th>
          <th>Mô tả</th>
          <th>Đề thi</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject, index) in backendSubjects" :key="index">
          <td>{{ subject.id }}</td>
          <td><img :src="subject.image" /> {{ subject.title }}</td>
          <td>{{findCourse(subject.idCourse)}}</td>
          <td>{{ subject.description }}</td>
          <td>{{ filterBackendExams(subject.id)}}</td>
          <td class="action_td">
                <i class='bx bx-pencil' @click="handleOpenUpdateForm(subject)"></i>
                <i class='bx bxs-eraser' @click="handleDelete(subject.id)"></i>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

table th {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  text-align: left;
  padding: 15px;
  font-size: 16px;
}

table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
td:nth-child(2){
    width: 250px;
}
td:nth-child(3){
    width: 150px;
}
td:nth-child(4){
    width: 250px;
}

table td img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

table tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s;
}

table th,
table td {
  text-align: left;
}

table a {
  color: #007bff;
  text-decoration: none;
}

table a:hover {
  text-decoration: underline;
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
.action_td i{
  margin-right: 10px;
  font-size: larger;
  cursor: pointer;
}
.action_td i:first-child{
  color:green
}
.action_td i:last-child{
  color: red;
}
</style>
