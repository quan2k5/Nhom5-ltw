<script setup>
const props = defineProps(['totalQuestions', 'handleSetPosition', 'yourAnswerList','time','handleSubmit']);
const emits=defineEmits(['handleAnswer']);
const checkStatusButton = (id) => {
  const findItem = props.yourAnswerList.find((item) => {
    return item.idQuestion === id;
  });
  return findItem && findItem.answer !== '';
};
</script>
<template>
  <div class="sidebar">
    <div class="timeDo">Thời gian làm bài:</div>
    <div class="actualTime">{{time}}</div>
    <button class="submitTest" @click="handleSubmit()">Nộp bài</button>
    <h3>Questions</h3>
    <div class="numbers">
      <button
        :class="{ active: checkStatusButton(question.id) }"
        v-for="(question, index) in totalQuestions" 
        :key="question.id" 
        @click="handleSetPosition(question.id,index)"
        >
        {{ index + 1 }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.sidebar {
  width: 230px;
  position: fixed;
  right: 0;
  top: 0; 
  bottom: 0;
  margin-left: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 1px solid #ddd;
  overflow-y: auto; 
}
.sidebar .timeDo{
    color: #1A1A1A;
    font:16px Roboto,Arial,sans-serif;
    margin-bottom: 10px;
    font-size: large;
    font-weight: 500;
}
.sidebar .actualTime{
    color: #1A1A1A;
    font:16px Roboto,Arial,sans-serif;
    font-size: larger;
    font-weight: 700;
    margin-bottom: 10px;
}
.sidebar .submitTest{
    color: #35509A;
    width: 100%;
    padding: 10px 12px;
    margin: 16px 0;
    border-radius: 5px;
    font-size: larger;
    font-weight: 500;
    background-color: white;
    border: 1px solid blue;
}
.sidebar .submitTest:hover{
    background-color: rgba(0, 0, 255, 0.63);
    color: white;
    cursor: pointer;
    border:transparent;
}
.sidebar h3 {
  margin-top: 0;
}
.numbers {
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 10px;
}
.numbers button {
  width: 30px;
  height: 30px;
  background-color: white;
  color: #1A1A1A;
  border: 1px solid #1A1A1A;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.numbers button.active {
  background-color: #007bff;
  color: white;
  border: 1px solid transparent;
}
</style>
