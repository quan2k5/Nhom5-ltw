<script setup>
import { useStore } from 'vuex';
import queryString from 'query-string';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, onBeforeRouteLeave, useRouter } from 'vue-router';
import Question from '@/components/Question.vue';
import Question2 from '@/components/Question2.vue';
import TotalExam from '@/components/TotalExam.vue';
import TotalExam2 from '@/components/TotalExam2.vue';
import { getSearchExams } from '@/api/Exam';
const store = useStore();
const route = useRoute();
const router = useRouter();
const backendQuestions = computed(() => store.state.questions.questions);
const currentUser = computed(() => store.state.users.currentUser);
let currentCourse = reactive({});
const totalQuestions = computed(() => store.state.questions.allQuestions);
const params = reactive({ _page: 1, _limit: 8, examId: route.params.id });
const currentHistory = ref({ id: '', idUser: '', idTest: '',creatAt:'',history: [],endAt:'' });
const backendHistory=computed(()=>store.state.histories.currentHistory);
const currentExam=computed(()=>store.state.exams.currentExam);
const yourAnswerList = reactive([]);
const remainingTime = ref(0);
const interval = ref(0);
const totalPage = ref(0);
const checkUnMounted = ref(false);
onMounted(async () => {
  currentHistory.value.creatAt=new Date();
  if(route.query.idHistory){
    store.dispatch('getCurrentHistory',`id=${route.query.idHistory}`);
  }
  const exam = await getSearchExams(`id=${route.params.id}`);
  store.dispatch('getCurrentExam',route.params.id);
  currentCourse = exam[0];
  currentHistory.value.id = Math.floor(Math.random() * 100001);
  startTimer(currentCourse.duration);
  store.dispatch('getCurrentUser');  
  await store.dispatch('getAllQuestions', `examId=${route.params.id}`);
  totalPage.value = Math.ceil(totalQuestions.value.length / params._limit);
  totalQuestions.value.forEach(question => {
    let obj = { id: Math.floor(Math.random() * 10001), idQuestion: question.id, answer: '',status:false };
    yourAnswerList.push(obj);
  });
  
  store.dispatch('getFilterQuestions', queryString.stringify(params));
});
const startTimer = (durationInMinutes) => {
  if(!route.query.idHistory){
    remainingTime.value = durationInMinutes * 60;
    interval.value = setInterval(() => {
    if (remainingTime.value <= 0) {
      clearInterval(interval.value);
      checkUnMounted.value = true;
      router.push(`/user/detailExam/${route.params.id}?idHistory=${currentHistory.value.id}&comment=true`);
      return;
    }
    remainingTime.value -= 1; 
      }, 1000);
  }
};

const handleHistoryTest = async () => {
  currentHistory.value.idUser = currentUser.value.id;
  currentHistory.value.idTest = route.params.id;
  currentHistory.value.endAt=new Date();
  currentHistory.value.history.push(...yourAnswerList);
  store.dispatch('createHistory1', currentHistory.value);
  store.dispatch('updateExam',{...currentExam.value,testTurn:currentExam.value.testTurn+1});
};

onBeforeRouteLeave(async (to, from, next) => {
  if(!route.query.idHistory){
    if (checkUnMounted.value) {
    await handleHistoryTest();
    next();
    } else {
    if (confirm('Bạn có muốn thoát khỏi trang không?')) {
      await handleHistoryTest();
      next();
    } else {
      next(false);
    }
  }
  }else{
    next();
  }
});

// Answer handling functions
const handleAnswer = (answer) => {
  const findAnswerIndex = yourAnswerList.findIndex((item) => item.id == answer.id);
  yourAnswerList[findAnswerIndex] = answer;
};

const findAnswerList = (id) => {
  return yourAnswerList.find((item) => item.idQuestion == id);
};

// Navigation and formatting
const handleSetPosition = async (id, index) => {
  const element = document.getElementById(`question${id}`);
  if (element) {
    const rect = element.getBoundingClientRect();
    window.scrollTo({ top: rect.top + window.pageYOffset - 50, behavior: 'smooth' });
  } else {
    params._page = Math.floor(index / params._limit) + 1;
    await store.dispatch('getFilterQuestions', queryString.stringify(params));
    handleSetPosition(id, index);
  }
};

const handlePage = (currentPage) => {
  params._page = currentPage;
  window.scrollTo({top:0,behavior:'smooth'})
  store.dispatch('getFilterQuestions', queryString.stringify(params));
};

const handleSubmit = () => {
  router.push(`/user/detailExam/${route.params.id}?idHistory=${currentHistory.value.id}&comment=true`);
};

const formatTime = (remainingTime) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
const findHistory=(id)=>{
  if(backendHistory.value!=undefined){
    if(backendHistory.value.history!=undefined){
      return backendHistory.value.history.find((item)=>item.idQuestion==id);
    }
  }
}
const handleReturn=()=>{ 
  router.push(`/user/detailExam/${route.params.id}?idHistory=${route.query.idHistory}`);
}
</script>
<template>
  <div class="container">
    <div class="main-content">
      <div class="title_Exam">
        <h2>{{ route.query.idHistory?"Đáp án đề thi":"Đề thi"}}</h2>
        <button @click="handleReturn" v-if="route.query.idHistory">Quay lại</button>
      </div>
      <div
        v-for="(question, index) in backendQuestions"
        :key="question.id"
        :id="`question${question.id}`"
        class="question"
      >
        <Question
          v-if="!route.query.idHistory"
          @handleAnswer="handleAnswer"
          :question="question"
          :index="(params._page - 1) * params._limit + index"
          :answer="findAnswerList(question.id)"
        />
        <Question2
          v-if="route.query.idHistory"
          :question="question"
          :index="(params._page - 1) * params._limit + index"
          :answer="findHistory(question.id)"
        >
        </Question2>
      </div>
      <div class="pagination">
        <button v-show="params._page !== 1" @click="handlePage(params._page - 1)">PREV</button>
        <button v-show="params._page < totalPage" @click="handlePage(params._page + 1)">NEXT</button>
      </div>
    </div>
    <TotalExam
      v-if="!route.query.idHistory"
      :totalQuestions="totalQuestions"
      :handleSetPosition="handleSetPosition"
      :yourAnswerList="yourAnswerList"
      :time="formatTime(remainingTime)"
      :handleSubmit="handleSubmit"
    />
    <TotalExam2
    v-if="route.query.idHistory"
    :totalQuestions="totalQuestions"
    :handleSetPosition="handleSetPosition"
    :yourAnswerList="backendHistory"
    >
    </TotalExam2>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  font-family: 'Arial', sans-serif;
}

.main-content {
  width: 1250px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.question {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fafafa;
  border-left: 5px solid #007bff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pagination {
  display: flex;
  margin-top: 20px;
  width: 100%;
  justify-content: space-between;
}
button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.pagination button:first-child{
  margin-left: 10px;
}
.pagination button:last-child{
}
button:hover {
  background-color: #0056b3;
}
.title_Exam{
  display: flex;
  gap:10px;
  justify-content: center;
}
.title_Exam button{
  height: 30px;
  width: 100px;
}
</style>
