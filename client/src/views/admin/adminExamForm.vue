<script setup>
import { useStore } from 'vuex';
import {computed, onMounted, reactive} from 'vue';
import ImageInput from '@/components/ImageInput.vue';
const props=defineProps(['exam','status','subjectList','handleClose']);
const store=useStore();
const currentExam=reactive({id:-1,title:'',description:'',idSubject:'',questionNumbers:'',duration:'',image:'',status:true,testTurn:0});
const error=reactive({title:'',description:'',idSubject:'',duration:'',image:'',});
const allExams=computed(()=>store.state.exams.exams);
const resetError=()=>{
    error.title='';
    error.description='';
    error.idSubject='';
    error.duration='';
    error.image='';
}
const handleImage=(link)=>{
    currentExam.image=link;
}
onMounted(()=>{
    if(props.status=='update'){
        currentExam.id=props.exam.id;
        currentExam.title=props.exam.title;
        currentExam.description=props.exam.description;
        currentExam.idSubject=props.exam.idSubject;
        currentExam.questionNumbers=props.exam.questionNumbers;
        currentExam.duration=props.exam.duration;
        currentExam.image=props.exam.image;
        currentExam.status=props.exam.status;
        currentExam.testTurn=props.exam.testTurn;
    }
})
const checkTitle=()=>{
    let exams=[...allExams.value];
    if(currentExam.idSubject!=''){
        exams=exams.filter((item)=>item.idSubject==currentExam.idSubject);
    }
    if(props.status=='update'){
        exams=exams.filter((item)=>{
            return item.id!=currentExam.id;
        })
    }
    let find=exams.find((item)=>item.title==currentExam.title);
    if(find){
        return false;
    }
    return true;
}
const validateExam=()=>{
    if(currentExam.title==''){
        error.title='Tên đề thi đang để trống'
    }else if(!checkTitle()){
        error.title='Tên đề thi đang bị trùng'
    }
    if(currentExam.description==''){
        error.description='Mô tả đề thi đang trống'
    }
    if(currentExam.idSubject==''){
        error.idSubject='Môn học của đề thi đang trống'
    }
    if(currentExam.duration==''){
        error.duration='Thời gian đề thi đang trống'
    }else if(currentExam.duration<=10){
        error.duration='Thời gian đề thi quá ngắn'
    }
    if(currentExam.image==''){
        error.image='Anh đề thi đang trống'
    }
}
const handleSubmit=()=>{
    resetError();
    validateExam();
    if(error.title=='' && error.description==''&&error.idSubject==''&&error.duration==''&&error.image==''){
        if(props.status=='update'){   
            store.dispatch('updateExam',currentExam);      
        }else{
            currentExam.id=Math.floor(Math.random()*10001);
            store.dispatch('createExam',currentExam);
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
                <h3>Thêm đề thi</h3>
            </div>
            <div class="form_item">
                <label for="">Tên đề thi</label>
                <br>
                <input type="text" v-model="currentExam.title" >
                <div class="message_error">{{error.title}}</div>
            </div>
            <div class="form_item">
                <label for="">Mô tả đề thi</label>
                <br>
                <input type="text" v-model="currentExam.description">
                <div class="message_error">{{error.description}}</div>
            </div> 
            <div class="form_item other">
                <div class="left_part">
                    <label for="">Môn học</label>
                <br>
                <select v-model="currentExam.idSubject">
                    <option disabled value="">Please select one</option>
                    <option :value="subject.id"  v-for="subject in subjectList" :key="subject.id">{{ subject.title }}</option>
                </select>
                <div class="message_error">{{error.idSubject}}</div>
                </div>
                <div class="right_part">
                    <label for="">Thời gian</label>
                    <input type="number" v-model="currentExam.duration">
                    <div class="message_error">{{ error.duration }}</div>
                </div>
                <div class="message_error"></div>
            </div>
            <ImageInput :image="currentExam.image" :error="error.image" @handleImange="handleImage"></ImageInput>    
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
    width: 500px;
    background-color: white;
    padding: 30px;
    height: 530px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position:relative
}
.form_item{
    margin-bottom: 15px;
}

.form_item input,select{
    margin-top:5px;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.397);
    padding-left: 10px;;
}
select{
    width: 50%;
    padding-left: 5px;
}
button{
    margin-top: 10px;
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
.other{
    display: flex;
    gap:10px
}
.left_part select{
    width: 200px;
}
.right_part input{
    width: 240px;
    height: 25px;
    
}

</style>