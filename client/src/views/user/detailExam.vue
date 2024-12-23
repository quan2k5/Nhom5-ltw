<script setup>
import { computed, onMounted, reactive,watch,ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import queryString from 'query-string';
import Comment from './Comment.vue';
import Swal from 'sweetalert2';
const store=useStore();
const route=useRoute();
const currentExam=computed(()=>store.state.exams.currentExam);
let commentY=reactive({});
import { useRouter } from 'vue-router';
const router=useRouter();
const currentAllQuestions=computed(()=>store.state.questions.allQuestions);
const currentUser=computed(()=>store.state.users.currentUser);
const currentHistory=computed(()=>store.state.histories.currentHistory);
const backEndComments=computed(()=>store.state.comments.comments);
const params=reactive({id:route.query.idHistory,idUser:-1});
const isModal=ref(false);
const isModal1=ref(false);
onMounted(async()=>{
  if(route.query.comment){
    isModal.value=true;
  }
  await store.dispatch('getCurrentExam',route.params.id);
  await store.dispatch('getCurrentUser');
  params.idUser = currentUser.value.id; 
  store.dispatch('getCurrentHistory',queryString.stringify(params));
  store.dispatch('getAllQuestions',`examId=${route.params.id}`);
  store.dispatch('getFilterComments',`idUser=${currentUser.value.id}&idExam=${route.params.id}`)
})
const handleClick = () => {
  if (currentUser.value) {
    router.push(`/testExam/${route.params.id}`);
  } else {
    Swal.fire({
      title: 'Bạn có muốn đăng nhập không?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/userLogin?redirect=${route.fullPath}`);
      }
    });
  }
};

const handleViewPercent=()=>{
  if(currentHistory.value!=undefined){
    if(currentHistory.value.history!=undefined){
      let filterHistory=currentHistory.value.history.filter((item)=>item.status==true);
      return  Math.ceil(100/currentHistory.value.history.length*filterHistory.length)
    }
    return 0;
  }
  return 0;
}
const findOption=(option,answer)=>{
  const  findAnswerIndex=option.findIndex((item)=>item==answer);
  if(findAnswerIndex==0){
    return `A`
  }else if(findAnswerIndex==1){
    return 'B'
  }else if(findAnswerIndex==2){
    return 'C'
  }else if(findAnswerIndex==3){
    return 'D';
  }else{
    return '';
  }
}
const handleCorrectAnswer=()=>{
  if(currentHistory.value!=undefined){
    if(currentHistory.value.history!=undefined){
      const answers=currentHistory.value.history.filter((item)=>item.status==true);
      return answers.length;
    }
    return 0;
  }
  return 0;
}
const handleInCorrectAnswer=()=>{
  if(currentHistory.value!=undefined){
    if(currentHistory.value.history!=undefined){
      const answers=currentHistory.value.history.filter((item)=>item.status==false && item.answer!='');
      return answers.length;
    }
    return 0;
  }
  return 0;
}
const handleDontAnswer=()=>{
  if(currentHistory.value!=undefined){
    if(currentHistory.value.history!=undefined){
      const answers=currentHistory.value.history.filter((item)=>item.status==false && item.answer=='');
      return answers.length;
    }
    return 0;
  }
  return 0;
}
const findYourAnswer=(question)=>{
  if(currentHistory.value!=undefined){
    if(currentHistory.value.history!=undefined){
    const findHistory=currentHistory.value.history.find((item)=>{
    return item.idQuestion==question.id;
  });
  if(findHistory){
    let k=findOption(question.options,findHistory.answer);
    if(k){
      return k;
    }else{
      return 'chưa trả lời'
    }
  }
  return '';
  }
  return '';
  }
  return '';
}
const findLength=()=>{
  if(currentHistory.value!=undefined){
    if(currentHistory.value.history!=undefined){
      return currentHistory.value.history.length;
    }
    return 0;
  }
  return 0;
}
const handleModal=()=>{
  isModal.value=false;
}
const handleUpdateComment=(comment)=>{
  isModal1.value=true;
  commentY={...comment}
}
const handleModal1=()=>{
  isModal1.value=false;
}
const handleDeleteComment=(comment)=>{
  store.dispatch('deleteComment',comment.id)
}
</script>
<template>
    <div class="container">
      <header class="header">
        <h1>{{ currentExam.title }}</h1>
        <div class="test-info">
            <p>{{ currentExam.description }}</p>
            <p>
            Thời gian làm bài: {{ currentExam.duration}} phút | {{ currentAllQuestions.length }} câu hỏi
            </p>
            <p>{{ currentExam.testTurn }} lượt luyện tập đề thi này</p>
        </div>
      </header>
       <div class="do_exam" v-if="!route.query.idHistory">
        <button @click="handleClick">Làm bài</button>
      </div>
      <div v-if="route.query.idHistory" class="action_result">
        <router-link :to="`/testExam/${route.params.id}?idHistory=${route.query.idHistory}`">
          <button class="watch">Xem chi tiết</button>
        </router-link>
        <router-link :to="`/user/detailExam/${route.params.id}`" class="return" >
          <button>Quay lại</button>
        </router-link>
      </div>
      <div v-if="route.query.idHistory">
        <h3>Tổng quan:</h3>
      <div class="overall_result_part">
        <div class="overall_test">
          <div class="test_item">
            <label for="">Kết quả làm bài:</label>
            <h4 >{{handleCorrectAnswer()}}/{{findLength()}}</h4>
          </div>
          <div class="test_item">
            <label for="">Độ chính xác(%):</label>
            <h4>{{handleViewPercent()}}%</h4>
          </div>
          
        </div>
     <div class="result-summary">
          <div class="result-item">
            <i class='bx bxs-check-circle'></i>
            <h3>Trả lời đúng</h3>
            <h2>{{ handleCorrectAnswer() }}</h2>
            <p>câu hỏi</p>
          </div>
          <div class="result-item">
            <ion-icon class="close_icon" name="close-circle"></ion-icon>
            <h3>Trả lời sai</h3>
            <h2>{{ handleInCorrectAnswer() }}</h2>
            <p>câu hỏi</p>
          </div>
          <div class="result-item">
            <i class='bx bxs-minus-circle'></i>
            <h3>Bỏ qua</h3>
            <h2>{{ handleDontAnswer() }}</h2>
            <p>câu hỏi</p>
          </div>
        </div>
      </div>
      </div>
      <div class="results" v-if="route.query.idHistory">
        <h2>Kết quả làm bài của bạn: </h2>
        <div class="question_list">
        <div class="question_item" v-for="question,index in currentAllQuestions" :key="question.id">
          <div class="index_question">{{index+1}}</div>
          <div class="left_part">
            <div class="answer_question">{{findOption(question.options,question.answer)}}:</div>
            <div class="your_answer">
              <span>{{ findYourAnswer(question) }}</span>
              <i class='bx bx-check' v-if="findOption(question.options,question.answer)==findYourAnswer(question)"></i>
              <ion-icon class="close" name="close-outline"  v-if="findOption(question.options,question.answer)!=findYourAnswer(question)"></ion-icon>
            </div>
          </div>
        </div>   
      </div>
      </div>
      <Comment 
        v-if="isModal"
        :handleModal="handleModal"
        :idUser="currentUser.id"
        :idExam="route.params.id"
      >
      </Comment>
      <Comment
      v-if="isModal1"
      :handleModal="handleModal1"
      :idUser="currentUser.id"
      :idExam="route.params.id"
      :comment="commentY"
      update="update"
      >
      </Comment>
      <div class="comment_part">
        <h3>Đánh giá đề thi :</h3>
        <div class="comment_list" v-for="comment in backEndComments" :key="comment.id">
          <div class="top_part">
            <h4>Bình luận:</h4>
            <ul>
               <li v-for="starIndex in 5" :key="starIndex" >
                   <i :class="['bx', starIndex <= comment.star ? 'bxs-star' : 'bx-star']"></i>
               </li>
           </ul>
          <div>{{ comment.text}}</div>
          </div>
          <div class="bottom_part">
            <button @click="handleUpdateComment(comment)">Sửa</button>
            <button @click="handleDeleteComment(comment)">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-ser    if;
  }
  
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header h1 {
    font-size: 24px;
    color: #333;
  }
  
  .test-info p {
    margin: 5px 0;
    color: #666;
  }
  
  .results {
    margin-top: 20px;
  }
  
  .results h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 15px;
  }
  
  .result-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .result-table th, .result-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  .result-table th {
    background-color: #f9f9f9;
  }
  
  .result-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .result-table tr:hover {
    background-color: #e9e9e9;
  }
  .do_exam{
  }
  .do_exam button{
    background-color: #35509A;
    color: white;
    width: 110px;
    height: 38px;
    border: none;
    font-size: large;
    cursor: pointer;
    border-radius: 5px;
  }
  .question_list{
    display: flex;
    gap:15px 160px;
    width: 100%;
    flex-wrap: wrap;
  }
  .question_item{
    display: flex;
    align-items: center;
    gap:10px;
    width: 180px;
  }
  .index_question{
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    color: #35509A;
    font-size: large;
    font-weight: 600;
    background-color: #E8F2FF; 
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left_part{
    display: flex;
    align-items: center;
    
  }
  .answer_question{
    color: #35509A;
  }
  .your_answer{
    display: flex;
    gap:5px;
    align-items: center;
  }
  .your_answer i{
    font-size: large;
    color: green;
  }
  .close{
    font-size: large;
    color: red;
  }
  .overall_result_part{
    display: flex;
    justify-content: space-between;
    margin-top:20px ;
  }
  .result-summary{
    display: flex;
    gap:20px;
  }
  .result-item{
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #efefef;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
  }
  .result-item i{
    color: rgba(0, 128, 0, 0.822);
    font-size: larger;
  }
  .result-item h3{
    color: rgba(0, 128, 0, 0.774);
  }
  .result-item:nth-child(2) .close_icon{
    color: rgba(255, 0, 0, 0.781);
    font-size: larger;
  }
  .result-item:nth-child(2) h3{
    color: rgba(255, 0, 0, 0.815);
  }
  .result-item:last-child i{
    color: #71869D;
    font-size: larger;
  }
  .result-item:last-child h3{
    color: #71869D;
  }
  .overall_test{
    padding: 1.5rem 1rem;
    background-color: #f8f9fa;
    border: 1px solid #efefef;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .05);
    display: flex;
    flex-direction: column;
    gap:10px;
  }
  .test_item{
    display: flex;
    width: 250px;
    justify-content: space-between;
  }
  .test_item label{
    font-size: large;
  }
  .action_result{
    padding:20px 0px ;
    display: flex;
    gap:10px;
  }
  .action_result button{
    background-color: #35509A;
    color: white;
    width: 100px;
    height: 31px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  .action_result .return button{
    background-color: #E8F2FF;
    color: black;
  }
  .comment_part{
    margin:20px 0px;
  }
  .comment_part h3{
    color: rgba(0, 0, 0, 0.774);
  }
.comment_part {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
}

.comment_part h3 {
  font-size: 1.25rem;
  margin-bottom: 15px;
  color: #333;
}
.comment_list {
  padding: 15px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.top_part {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
}
.top_part ul{
  list-style: none;
  display: flex;
}
.bxs-star{
  color: yellow;
}
.bottom_part{
  margin-top: 5px;
  display: flex;
  gap:5px;
}
.bottom_part button{
  height: 25px;
  border: none;
  background: #35509A;
  color: white;
  width: 50px;
  cursor: pointer;
}
</style>