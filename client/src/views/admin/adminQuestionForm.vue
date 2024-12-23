<script setup>
import { useStore } from 'vuex';
import { onMounted, reactive } from 'vue';
const props=defineProps(['currentExam','status','question','questionList','page','handleClose']);
const store=useStore();
const currentQuestion=reactive({id:'',name:'',options:['','','',''],answer:'',examId:props.currentExam.id});
const error=reactive({name:'',option1:'',option2:'',option3:'',option4:'',answer:''});
const resetError=()=>{
    error.name='';
    error.option1='';
    error.option2='';
    error.option3='';
    error.option4='';
    error.answer='';
}
const checkOptions=()=>{
    let find=currentQuestion.options.find((item)=>{
        return item=='';
    })
    if(find==undefined){
        return true;
    }
    return false;
}
onMounted(()=>{
    if(props.status=='update'){
        currentQuestion.id=props.question.id;
        currentQuestion.name=props.question.name;
        currentQuestion.options=props.question.options;
        currentQuestion.answer=props.question.answer;
        currentQuestion.examId=props.question.examId
    }
})
const checkNameQuestion=()=>{
    let questions=[...props.questionList];
    if(props.status=='update'){
        questions=questions.filter((item)=>item.id!=props.question.id);
    }
    let find=questions.find((item)=>item.name==currentQuestion.name);
    if(find){
        return false;
    }
    return true;
}
const checkOptions2=()=>{
    const find=currentQuestion.options.find((item)=>item==currentQuestion.answer);
    console.log(find);
    
    return find ?true:false;
}
const validateQuestion=()=>{
    if(currentQuestion.name==''){
        error.name='Cau hoi khong duoc de trong'
    }else if(!checkNameQuestion()){
        error.name='Cau hoi khong duoc trung';
    }
    if(currentQuestion.options[0]==""){
        error.option1="Dap an A dang trong"
    }
    if(currentQuestion.options[1]==""){
        error.option2="Dap an B dang trong"
    }
    if(currentQuestion.options[2]==""){
        error.option3="Dap an C dang trong"
    }
    if(currentQuestion.options[3]==""){
        error.option4="Dap an D dang trong"
    }
    if(currentQuestion.answer=="" || !checkOptions2()){
        error.answer="Cau tra loi dang trong"
    }
}
const handleSubmit=()=>{
    resetError();
    validateQuestion();
    if(error.name==''&&error.answer==""&&error.option1==""&&error.option2==""&&error.option3==""&&error.option4==""){
        if(props.status=="update"){
            store.dispatch('updateQuestion',currentQuestion);
        }else{
            currentQuestion.id=Math.floor(Math.random()*100001);
            store.dispatch('createQuestion',{page:props.page,question:currentQuestion});
        }
        props.handleClose();
    }
}
</script>
<template>
     <div class="modal">
        <form @submit.prevent="handleSubmit">
            <div class="close_form" @click="handleClose()">
                <ion-icon name="close-outline"></ion-icon>
            </div>
            <div class="form_item">
                <h3>Thêm câu hỏi</h3>
            </div>
            <div class="form_item">
                <label for="">Tên câu hỏi</label>
                <br>
                <input type="text"  v-model="currentQuestion.name">
                <div class="message_error">{{ error.name }}</div>
            </div>
            <div class="form_item option_list">
                <div class="left_part">
                    <label for="">Đáp án A</label>
                    <br>
                    <input type="text" v-model="currentQuestion.options[0]" >
                    <div class="message_error">{{ error.option1 }}</div>
                </div>
                <div class="right_part">
                    <label for="">Đáp án B</label>
                    <br>
                    <input type="text" v-model="currentQuestion.options[1]" >
                    <div class="message_error">{{ error.option2 }}</div>
                </div>
            </div>  
            <div class="form_item option_list">
                <div class="left_part">
                    <label for="">Đáp án C</label>
                    <br>
                    <input type="text" v-model="currentQuestion.options[2]" >
                    <div class="message_error">{{ error.option3 }}</div>
                </div>
                <div class="right_part">
                    <label for="">Đáp án D</label>
                    <br>
                    <input type="text"  v-model="currentQuestion.options[3]">
                    <div class="message_error">{{ error.option4 }}</div>
                </div>
            </div> 
            <div class="form_item" v-if="checkOptions()">
                <select  name="" id=""  v-model="currentQuestion.answer">
                    <option disabled value="">chọn câu trả lời</option>
                    <option v-for="item in currentQuestion.options" :key="item">{{ item }}</option>
                </select> 
                <div class="message_error">{{ error.answer }}</div>
            </div>
            <div class="form_item">
                <button>Submit</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.modal {
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}
form {
    width: 400px;
    background-color: white;
    padding: 30px;
    height: 450px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position:relative
}
.form_item{
    margin-bottom: 15px;
}
.form_item input{
    margin-top:5px;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.397);
    padding-left: 10px;;
}
select{
    height: 35px;
    width: 50%;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.397);
}
button{
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 255, 0.733);
    color: white;
    border: none;
    border-radius:10px;
    cursor: pointer;
}
.message_error{
    color: red;
    font-size: small;
    margin-top: 5px;
}
.close_form{
    position: absolute;
    top:0;
    cursor: pointer;
    right:0;
   width: 40px;
   height:40px;
   background-color:rgba(255, 0, 0, 0.932);
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: larger;
   color: white;
   border-top-right-radius: 12px;
   border-bottom-left-radius:12px ;
}
.option_list{
    display: flex;
    justify-content: space-between;
}
.left_part,.right_part{
    width: 45%;
}
</style>