<script setup>
import { computed, onMounted, reactive,ref} from 'vue';
import { useStore } from 'vuex';
import ImageInput from '@/components/ImageInput.vue';
const props=defineProps(['course','status','handleCloseForm']);
const currentCourse=ref({id:-1,title:'',description:'',totalQuestions:0,image:""});
const errorCourse=ref({title:'',description:'',image:""});
const allCourses=computed(()=>store.state.courses.courses);
const store=useStore();
const handleImage=(link)=>{
    currentCourse.value.image=link;
}
const resetError=()=>{
    errorCourse.value.title='';
    errorCourse.value.description='';
    errorCourse.value.image='';
}
onMounted(()=>{
    console.log(props.course);
    if(props.status=='update'){
        currentCourse.value.title=props.course.title;
        currentCourse.value.id=props.course.id;
        currentCourse.value.totalQuestions=props.course.totalQuestions;
        currentCourse.value.description=props.course.description;
        currentCourse.value.image=props.course.image;
    }
})
const validateTitle=()=>{
    let courses=[...allCourses.value];
    if(props.status=='update'){
        courses=courses.filter((item)=>{
            return item.id!=currentCourse.id;
        })
    }
    const findNumber=courses.findIndex((item)=>{
        return item.title==currentCourse.value.title;
    })
    if(findNumber==-1){
        return false;   
    }
    return true;
}
const validateCourse=()=>{
    if(currentCourse.value.title==''){
        errorCourse.value.title='Tên khóa học không đc để trống';
    }else if(validateTitle()){
        errorCourse.value.title='Tên khóa học không đc trùng';
    }
    if(currentCourse.value.description==''){
        errorCourse.value.description='Mô tả khóa học không đc để trống'
    }
    if(currentCourse.value.image==''){
        errorCourse.value.image="Hình ảnh khóa học không đc để trống"
    }
}
const handleSubmit=()=>{
    resetError();
    validateCourse();
    if(errorCourse.value.title==''&&errorCourse.value.description==''&&errorCourse.value.image==''){
        if(props.status=='update'){
            store.dispatch('updateCourse',{...currentCourse.value});
        }else{
            currentCourse.value.id=Math.floor(Math.random()*1000001);
            store.dispatch('addCourse',{...currentCourse.value});
        }
        props.handleCloseForm();
    }
}
</script>
<template>
    <div class="modal">
        <form @submit.prevent="handleSubmit">
            <div class="close_form" @click="handleCloseForm()">
                <ion-icon name="close-outline"></ion-icon>
            </div>
            <div class="form_item">
                <h3>{{ status!='update'?'thêm':'cập nhật' }} khóa học</h3>
            </div>
            <div class="form_item">
                <label for="">Tên khóa học</label>
                <br>
                <input type="text" v-model="currentCourse.title">
                <div class="message_error">{{ errorCourse.title }}</div>
            </div>
            <div class="form_item">
                <label for="">Mô tả khóa học</label>
                <br>
                <input type="text" v-model="currentCourse.description">
                <div class="message_error">{{ errorCourse.description }}</div>
            </div>  
            <ImageInput
                :image="currentCourse.image"
                @handleImange="handleImage"
                :error="errorCourse.image"
            ></ImageInput>  
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

</style>


