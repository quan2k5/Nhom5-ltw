<script setup>
import {defineProps, reactive,ref,defineEmits, watch,onUpdated, onMounted} from 'vue'
const props=defineProps(['question','index','answer']);
const yourAnswer=reactive({...props.answer});
const handleIdentifyAnswer=(option,answer)=>{
    if(option==answer){
        return 'active';
    }else if(option==yourAnswer.answer){
        return 'inactive';
    }
    return '';
}
</script> 
<template>
  <div class="question-item">
    <p>{{ index + 1 }}. {{ question.name }}</p>
    <div v-for="(option, id) in question.options" :key="id" class="option">
      <input disabled v-model="yourAnswer.answer" type="radio"  :value="option" />
      <label >{{ option }}</label>
      <ion-icon class="close_icon" name="close" v-if="handleIdentifyAnswer(option,question.answer)=='inactive'" ></ion-icon>
      <i class='bx bx-check check_icon' v-if="handleIdentifyAnswer(option,question.answer)=='active'"></i>
    </div>
  </div>
</template>
<style scoped>
.check_icon{
    font-size: larger;
    color: green;
}
.close_icon{
    font-size: larger;
    color: red;
    
}
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