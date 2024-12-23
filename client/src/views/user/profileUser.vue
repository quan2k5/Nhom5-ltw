<script setup>
import { computed, onMounted,ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import profileForm from './profileForm.vue'
const router = useRouter();
const store = useStore();
const backendHistory = computed(() => store.state.histories.histories);
const currentUser = computed(() => store.state.users.currentUser);
const backendExams = computed(() => store.state.exams.exams);
const activateModal=ref(false);
const handleOpenModal=()=>{
  activateModal.value=true;
}
const handleClose=()=>{
  activateModal.value=false;
}
onMounted(async () => {
  await store.dispatch('getExams');
  await store.dispatch('getCurrentUser');
  await store.dispatch('getHistories', `idUser=${currentUser.value.id}`);
});
const findExam = (idTest) => {
  const exam = backendExams.value.find((item) => item.id == idTest);
  return exam ? exam.title : 'Không tìm thấy đề thi';
};
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
};

const handleCorrectAnswer = (currentHistory) => {
  const answers = currentHistory.history.filter((item) => item.status === true);
  return answers.length;
};

const handleViewHistory = (idTest, idHistory) => {
  router.push(`/user/detailExam/${idTest}?idHistory=${idHistory}`);
};
</script>
<template>
  <div class="body">
    <div class="container">
      <profileForm 
        :currentUser="{...currentUser}" 
        v-if="activateModal"
        :handleClose="handleClose"
      >
      </profileForm>
      <div class="infor_user_part">
        <h3>Giới thiệu:</h3>
        <div class="infor_item">
          <p>Ảnh đại diện</p>
          <img :src="currentUser.image || 'https://media.istockphoto.com/id/1298261537/vi/vec-to/ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-h%E1%BB%93-s%C6%A1-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-tr%E1%BB%91ng.jpg?s=612x612&w=0&k=20&c=Rbi2tNjNA4z86gzSPBhGOefKI-XTKqlqGy-kiPoUvRA='" alt="">
        </div>
        <div class="infor_item">
          <p>Tên tài khoản</p>
          <div>: {{ currentUser.name }}</div>      
        </div>
        <div class="infor_item">
          <p>Email</p>
          <div>: {{ currentUser.email }}</div>      
        </div>
        <div class="infor_item">
          <button @click="handleOpenModal">Chỉnh sửa thông tin cá nhân</button>     
        </div>
      </div>

      <div class="history_part">
        <h3>Lịch sử đề thi:</h3>
        <div class="history_list">
          <div
            class="history_item"
            v-for="history in backendHistory"
            :key="history.id"
          >
            <div class="top_part">
              <div><span>Tên đề thi:</span> {{ findExam(history.idTest) }}</div>
              <div><span>Thời gian thi:</span> {{ formatDate(history.creatAt) }}</div>
            </div>
            <div class="bottom_part">
              <div><span>Kết quả thi:</span> {{ handleCorrectAnswer(history) }}/{{ history.history.length }}</div>
            </div>
            <button @click="handleViewHistory(history.idTest, history.id)">
              <ion-icon class="bx" name="eye-outline"></ion-icon>
              <span>Xem chi tiết</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  background-color: rgba(128, 128, 128, 0.096);
}
.container {
  width: 1200px;
  margin: auto;
  padding: 15px;
  padding-top: 50px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
.history_part {
  background: white;
  border-radius: 5px;
  width: 700px;
  padding: 10px;
}
.history_part h3 {
  margin-bottom: 10px;
}
.history_item {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.top_part {
  display: flex;
  gap: 10px;
}
.top_part div:first-child {
  width: 350px;
}
.history_item span {
  font-weight: 600;
}
.bottom_part {
  display: flex;
  gap: 10px;
}
.bottom_part div:first-child {
  width: 350px;
}
.history_item button {
  
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  width: 120px;
  height: 25px;
  cursor: pointer;
  color: white;
  background-color: rgba(128, 0, 128, 0.281);
  border: 1px dashed purple;
}
.infor_user_part {
  background: white;
  border-radius: 5px;
  padding: 10px;
  width: 40%;
}
.infor_item {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.infor_item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.infor_item p {
  width: 100px;
  font-weight: 600;
}
.infor_item button {
  background-color: #35509A;
  color: white;
  height: 31px;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
