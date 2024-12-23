<script setup>
import { computed, onBeforeMount,reactive,ref } from 'vue';
import {useStore } from 'vuex';
import { useRoute,useRouter } from 'vue-router';
import queryString from 'query-string';
import { getAllSubjects } from '@/api/Subject';
import { getAllQuestionsInUser } from '@/api/Question';
const route=useRoute();
const router=useRouter();
const store=useStore();
const backEndExams=computed(()=>store.state.exams.exams);
const selectedSubject=ref('');
const params=reactive({idSubject:route.params.id,title_like:''});
const inputSearch=ref('');
const backendQuestions=reactive([]);
onBeforeMount(async()=>{
    const subjects=await getAllSubjects();
    let findSubject= subjects.find((item)=>item.id==route.params.id);
    const questions=await getAllQuestionsInUser();
    backendQuestions.push(...questions);
    selectedSubject.value=findSubject.title;
    store.dispatch("searchExams",queryString.stringify(params));
})
const findLengthQuestion=(id)=>{
    const filterQuestions=backendQuestions.filter((item)=>{
        return item.examId==id;
    })
    return filterQuestions.length
}
const handleSearch=()=>{
    params._page=1;
    params.title_like=inputSearch.value;
    store.dispatch("searchExams",queryString.stringify(params));
}
const handleClick=(id)=>{
    router.push(`/user/detailExam/${id}`);
}
</script>
<template>
    <div>
        <div class="container">
    <div class="title_box">
      <h4>Danh sách các đề thi trong môn thi {{ selectedSubject }}</h4>
      <div class="box_search">
        <input type="text" placeholder="tìm kiếm đề thi trong môn thi" v-model="inputSearch">
        <i class='bx bx-search' @click="handleSearch"></i>
      </div>
    </div>
    <div class="main_content">
      <div @click="handleClick(exam.id)"
        v-for="exam in backEndExams"
        :key="exam.id"
        class="subject-card"
      >
        <img :src="exam.image" alt="">
        <div class="detail_subject">
          <h3>{{exam.title }}</h3>
          <div><span>Mô tả</span>: {{ exam.description }}</div>
          <div><span>Số câu hỏi</span>:{{ findLengthQuestion(exam.id) }}</div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>
<style scoped>
.container {
  width: 1200px;
  margin: auto;
}

.title_box {
  padding: 10px;
  margin-top:20px;
  display: flex;
  gap: 15px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.main_content {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  padding: 0px 50px;
  gap: 20px; 
}

.subject-card {
  padding: 8px;
  border: 1px solid #e6e6e6;
  width: 250px;
  background-color: #fff; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: transform 0.2s ease;
  cursor: pointer;
}

.subject-card:hover {
  transform: translateY(-5px); /* Khi hover, thẻ sẽ di chuyển lên trên một chút */
}

.subject-card img {
  width: 100%; /* Đảm bảo hình ảnh rộng bằng với chiều rộng của thẻ chứa */
  height: 240px; /* Chiều cao cố định */
  object-fit: cover; /* Đảm bảo hình ảnh giữ tỉ lệ và bao phủ toàn bộ khung */
  border-radius: 8px; /* Thêm bo góc cho hình ảnh để giao diện đẹp hơn */
}

.detail_subject {
  padding-top: 10px;
}

.detail_subject h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.detail_subject div {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
span{
    font-weight: 700;
}
.box_search{
    position: relative;

}
.box_search input{
    width: 350px;
    height: 35px;
    border-radius:20px ;
    border:1px solid rgba(0, 0, 0, 0.486);
    padding-left: 10px;
}
.box_search i{
    position: absolute;
    top:20%;
    right: 10px;
    cursor: pointer;
}
.bottom_page{
    margin-top:10px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>


