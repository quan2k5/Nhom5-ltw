 <script setup>
import { computed, reactive,onMounted } from 'vue';
import ImageInput from '@/components/ImageInput.vue';
import {useStore} from 'vuex';
const props=defineProps(['courses','status','subject','handleCloseForm']);
const currentSubject=reactive({id:-1,title:'',description:'',idCourse:'',image:'',testNumbers:0});
const error=reactive({title:'',description:'',idCourse:'',image:''});
const store=useStore();
const allSubjects=computed(()=>store.state.subjects.subjects);

const resetError=()=>{
    error.title='';
    error.description='';
    error.image='';
    error.idCourse='';
}
const handleImage=(link)=>{
    currentSubject.image=link;
}
onMounted(()=>{
    if(props.status=='update'){
        currentSubject.title=props.subject.title;
        currentSubject.id=props.subject.id;
        currentSubject.idCourse=props.subject.idCourse;
        currentSubject.testNumbers=props.subject.testNumbers;
        currentSubject.description=props.subject.description;
        currentSubject.image=props.subject.image;
    }
})
const checkNameSubject=(name)=>{
    let subjects=[...allSubjects.value];
    if(currentSubject.idCourse!=''){
        subjects=subjects.filter((item)=>item.idCourse==currentSubject.idCourse);
    }
    if(props.status=='update'){
        subjects=subjects.filter((item)=>{
            return item.id!=currentSubject.id;
        })
    }  
    let find=subjects.find((item)=>item.title==name)
    if(find){
        return false;
    }
    return true;

}
const validateSubject=()=>{
    if(currentSubject.title==''){
        error.title='Tên môn học đang trống';
    }else if(!checkNameSubject(currentSubject.title)){
        error.title='Tên môn học đang bị trùng'
    }
    if(currentSubject.description==''){
        error.description='Mô tả môn học đang trống'
    }
    if(currentSubject.idCourse==''){
        error.idCourse='Khóa học đang thiếu'
    }
    if(currentSubject.image==''){
        error.image='Hình ảnh đang trống'
    }
}
const handleSubmit=()=>{
    resetError();
    validateSubject();
    if(error.title==''&&error.description==''&&error.idCourse==''&&error.image==''){
        if(props.status=='update'){
            store.dispatch('updateSubject',currentSubject);
        }else{
            currentSubject.id=Math.floor(Math.random()*100001);
            store.dispatch('addSubject',currentSubject);
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
                <h3>thêm môn học</h3>
            </div>
            <div class="form_item">
                <label for="">Tên môn học</label>
                <br>
                <input type="text" v-model="currentSubject.title">
                <div class="message_error">{{ error.title }}</div>
            </div>
            <div class="form_item">
                <label for="">Mô tả</label>
                <br>
                <input type="text" v-model="currentSubject.description" >
                <div class="message_error">{{ error.description }}</div>
            </div> 
            <div class="form_item">
                <label for="">Khóa học</label>
                <br>
                <select v-model="currentSubject.idCourse">
                    <option disabled value="">Please select one</option>
                    <option :key="item.id" v-for="item in courses" :value="item.id">{{ item.title }}</option>
                </select>
                <div class="message_error">{{ error.idCourse }}</div>
            </div>  
            <ImageInput :image="currentSubject.image" :error="error.image" @handleImange="handleImage"></ImageInput>  
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

</style>


