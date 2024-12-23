<script setup>
import {onMounted,computed,ref, reactive} from 'vue'
import{useStore} from 'vuex';
import courseForm from './adminCourseForm.vue'
import Swal from 'sweetalert2';
import {getAllSubjects} from '../../api/Subject'
const store=useStore();
const backendCourses=computed(()=>store.state.courses.courses);
const backendSubjects=reactive([]);
const activateFormAdd=ref(false);
const activateFormUpdate=ref(false);
let courseY=reactive({});
onMounted(async()=>{
    store.dispatch('getCourses');
    let courses=await getAllSubjects();
    backendSubjects.push(...courses);
})
const handleOpenAddForm=()=>{
  activateFormAdd.value=true;
}
const filterBackEndSubjects=(id)=>{
  return backendSubjects.filter((item)=>item.idCourse==id).length;
}
const handleDelete=(id)=>{
  let findItem=backendSubjects.find((subject)=>{
    return subject.idCourse==id;
  })
  if(findItem){
    Swal.fire({
      title: 'Không thể xóa!',
      text: 'khóa học này đang có chứa một số môn thi',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    });

  }else{
    Swal.fire({
    text:"Bạn có muốn xóa khóa học này không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "OK"
    }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('deleteCourse',id);
    }
    });
  }
}
const handleCloseAddForm=()=>{
  activateFormAdd.value=false;
}
const handleCloseUpdateForm=()=>{
  activateFormUpdate.value=false;
}
const handleOpenUpdateForm=(course)=>{
  courseY=course;
  activateFormUpdate.value=true;
}
</script>
<template>
<div>
    <courseForm v-if="activateFormAdd" :handleCloseForm="handleCloseAddForm"></courseForm>
    <courseForm v-if="activateFormUpdate" 
      :handleCloseForm="handleCloseUpdateForm" 
      status="update" 
      :course="{...courseY}"
    >
    </courseForm>
    <div class="top_part">
      <button class="add_cart_btn" @click="handleOpenAddForm"><i class='bx bx-plus'></i>
        <span>thêm mới</span>
      </button>
    </div>
    <table>
        <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Mô tả</th>
              <th>Môn thi</th>
              <th>Action</th>
            </tr>
        </thead>
          <tbody>
            <tr v-for="(course, index) in backendCourses" :key="index">
                <td>{{ course.id }}</td>
                <td><img :src="course.image"> {{ course.title }}</td>
                <td>{{course.description}}</td> 
                <td>{{filterBackEndSubjects(course.id)}}</td>
                <td class="action_td">
                    <i class='bx bx-pencil' @click="handleOpenUpdateForm(course)"></i>
                    <i class='bx bxs-eraser' @click="handleDelete(course.id)"></i>
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
  color:white;
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
    width: 270px;
}
td:nth-child(3){
    width: 350px;
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

.status {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #e0e0e0;
  color: #333;
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
</style>