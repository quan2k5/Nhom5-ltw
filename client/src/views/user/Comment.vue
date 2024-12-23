<template>
    <div class="modal">
       <form >
           <h3>Đánh giá đề thi</h3>
           <ul>
               <li v-for="starIndex in 5" :key="starIndex" @click="setStar(starIndex)">
                   <i :class="['bx', starIndex <= currentComment.star ? 'bxs-star' : 'bx-star']"></i>
               </li>
           </ul>
           <div class="input_item" >
               <input type="text" placeholder="Nhập đánh giá của bạn" v-model="currentComment.text">
           </div>
            <div v-if="error!=''" class="error">{{ error }}</div>
           <div class="button_item">
               <button type="button" class="submit-button" @click.prevent="handleSubmit">Đánh giá</button>
               <button type="button" class="cancel-button" @click.prevent="handleModal">Hủy</button>
           </div>
       </form>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, reactive,ref } from 'vue';
const store = useStore();
const route = useRoute();
const props = defineProps(['idExam', 'idUser','handleModal','comment','update']);
const currentComment = reactive({
    id: Math.floor(Math.random() * 100001),
    idUser: props.idUser,
    idExam: props.idExam,
    text: '',
    star: 0,
});
const error=ref('');
onMounted(()=>{
    if(props.update=='update'){
        currentComment.id=props.comment.id;
        currentComment.text=props.comment.text;
        currentComment.star=props.comment.star;
    }
})
function setStar(star) {
    currentComment.star = star;
}
const handleSubmit=()=>{
    error.value='';
    if(currentComment.text==''&&currentComment.star==-1){
        error.value="Phần đánh giá của bạn đang trống"
    }else{
        if(props.update=='update'){
            store.dispatch('updateComment',{...currentComment})
        }else{
            store.dispatch('createComment',{...currentComment});
        }
        props.handleModal();
    }
}
</script>
<style scoped>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

.modal {
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.6);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 10000000000000000000001;
}

form {
   width: 400px;
   background-color: #fff;
   padding: 30px;
   border-radius: 12px;
   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
   position: relative;
   text-align: center;
}

h3 {
   font-size: 1.5rem;
   color: #333;
   margin-bottom: 15px;
}

ul {
   list-style: none;
   display: flex;
   justify-content: center;
   gap: 5px;
   margin-top: 10px;
}

ul li i {
   font-size: 24px;
   color: #ddd;
   cursor: pointer;
   transition: color 0.3s ease;
}

ul li i.bxs-star {
   color: #ffcc00;
}

ul li i:hover {
   color: #ff9900;
}

.input_item {
   margin-top: 20px;
}

.input_item input {
   padding: 10px;
   border: 1px solid #ddd;
   border-radius: 6px;
   width: 100%;
   font-size: 1rem;
   outline: none;
   transition: border-color 0.3s ease;
}

.input_item input:focus {
   border-color: #007bff;
}

.button_item {
   display: flex;
   gap: 10px;
   margin-top: 20px;
}

button {
   flex: 1;
   height: 40px;
   border: none;
   border-radius: 6px;
   font-size: 1rem;
   cursor: pointer;
   transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-button {
   background-color: #007bff;
   color: #fff;
}

.submit-button:hover {
   background-color: #0056b3;
}

.cancel-button {
   background-color: #e63946;
   color: #fff;
}

.cancel-button:hover {
   background-color: #d62828;
}

button:active {
   transform: scale(0.98);
}
.error {
   width: 100%;
   color: white;
   font-size: small;
   padding: 10px;
   margin-top: 10px;
   background-color: rgba(255, 0, 0, 0.562);
   border-radius: 6px;
   text-align: start;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
