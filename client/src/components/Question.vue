<script setup>
import {defineProps, reactive,ref,defineEmits, watch,onUpdated, onMounted} from 'vue'
const props=defineProps(['question','index','answer']);
const yourAnswer=reactive({...props.answer});
const emits=defineEmits(['handleAnswer']);
watch(()=>yourAnswer.answer,()=>{
  if(yourAnswer.answer==props.question.answer){
    yourAnswer.status=true;
  }else{
    yourAnswer.status=false;
  }
  console.log(yourAnswer);
  emits('handleAnswer',yourAnswer);
})
</script> 
<template>
  <div class="question-item">
    <p>{{ index + 1 }}. {{ question.name }}</p>
    <div v-for="(option, id) in question.options" :key="id" class="option">
      <input v-model="yourAnswer.answer" type="radio"  :value="option" />
      <label >{{ option }}</label>
    </div>
  </div>
</template>
<style scoped>
.question-item {
  margin-bottom: 15px;
}
.option {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
input[type="radio"] {
  margin-right: 10px;
}
label {
  font-size: 16px;
  color: #333;
}
input[type="radio"]:checked + label {
  color: #007bff; 
}
</style>