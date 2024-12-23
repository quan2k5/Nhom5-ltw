<template>
  <div class="wrapper">
    <h2>Đăng ký</h2>
    <form>
      <div class="input-group">
        <label>Email</label>
        <input
          type="text"
          v-model="currentUser.email"
        />
        <div class="message_error">{{ errorUser.email }}</div>
      </div>
      <div class="input-group">
        <label>Tên tài khoản</label>
        <input
          type="name"
          v-model="currentUser.name"
        />
        <div class="message_error">{{ errorUser.name }}</div>
      </div>
      <div class="input-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          v-model="currentUser.password"
        />
        <div class="message_error">{{ errorUser.password }}</div>
      </div>
      <div class="input-group">
        <label>Xác nhận mật khẩu</label>
        <input
          type="password"
          v-model="currentUser.confirmPassword"
        />
        <div class="message_error">{{ errorUser.confirmPassword}}</div>
      </div>
    </form>
    <button @click="handleSubmit">Đăng ký</button>
    <p class="or">----- tiếp tục với -----</p>
    <div class="icons">
      <i class="fab fa-google"></i>
      <i class="fab fa-github"></i>
      <i class="fab fa-facebook"></i>
    </div>
    <div class="not-member">
      Bạn là thành viên? <router-link to="/userLogin">Đăng nhập ngay</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const router=useRouter();
const store=useStore();
const backendUsers=computed(()=>store.state.users.allUsers);
const currentUser=reactive({id:Math.floor(Math.random()*1000001),name:'',titleName:'',password:'',confirmPassword:'',email:'',status:false,block:true});
const errorUser=reactive({name:'',email:'',password:'',confirmPassword:''});
onMounted(()=>{
  store.dispatch('getAllUsers','');
})
const checkValidateEmail=(email)=>{
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
const checkSimilarEmail=(email)=>{
  const findEmail=backendUsers.value.find((item)=>item.email==email);
  if(findEmail){
    return false;
  }
  return true;
}
const resetError=()=>{
  errorUser.name="";
  errorUser.email="";
  errorUser.password="";
  errorUser.confirmPassword="";
}
const validateUser=()=>{
  if(currentUser.name==""){
    errorUser.name="Tên tài khoản không được trống"
  }else if(currentUser.name.length<7){
    errorUser.name="Tên tài khoản quá ngắn"
  }
  if(currentUser.email==""){
    errorUser.email="Email không được trống"
  }else if(!checkValidateEmail(currentUser.email)){
    errorUser.email="Email không hợp lệ"
  }else if(!checkSimilarEmail(currentUser.email)){
    errorUser.email="Email này đã được sử dụng"
  }
  if(currentUser.password==""){
    errorUser.password="Mật khẩu không được trống";
  }else if(currentUser.password.length<7){
    errorUser.password="Mật khẩu quá ngắn"
  }
  if(currentUser.confirmPassword==""){
    errorUser.confirmPassword="Xác nhận mật khẩu không được trống"
  }else if(currentUser.confirmPassword!=currentUser.password){
    errorUser.confirmPassword="Xác nhận mật khẩu bị sai"
  }
}
const handleSubmit=async()=>{
  console.log('submit');
  
  resetError();
  validateUser();
  if(errorUser.name=="" &&errorUser.email==""&&errorUser.password==""&&errorUser.confirmPassword==""){
    currentUser.titleName=currentUser.name.split(" ").filter(word => word !== "").pop();
    store.dispatch('createUser',currentUser);
    await Swal.fire({
    title: 'Đăng ký thành công!',
    icon: 'success',
    showConfirmButton: false, 
    timer: 1000, 
    timerProgressBar: true,
  });
    router.push(`/userLogin?email=${currentUser.email}&password=${currentUser.password}`);
  }
}
</script>
<style scoped>
h2{
  margin-bottom: 15px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.wrapper {
  width: 380px;
  padding: 2rem 0 1rem 0;
  margin: 50px auto;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

h1 {
  font-size: 2rem;
  color: #07001f;
  margin-bottom: 0.5rem;
}

p {
  margin-bottom: 1.7rem;
  color: #333;
}

form {
  text-align: left;
}

.input-group {
  margin-bottom: 1.5rem;
  text-align: center; /* Center the input fields */
}

form label {
  display: block;
  margin-bottom: 0.3rem;
  padding-left: 23px;
  text-align: start;
  color: #555;
}

form input {
  width: 90%;
  outline: none;
  border: none;
  background: #dfe9f5;
  padding: 12px 14px;
  border-radius: 10px;
  transition: background 0.3s ease;
}

form input:focus {
  background: #cfd9f4;
}

button {
  font-size: 1.1rem;
  margin-top: 1rem;
  padding: 10px 0;
  border-radius: 5px;
  outline: none;
  border: none;
  width: 90%;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: rgba(0, 123, 255, 0.8);
}

.or {
  font-size: 0.8rem;
  margin-top: 1.5rem;
  color: #777;
}

.icons i {
  color: #07001f;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  margin-left: 0.9rem;
  font-size: 1.5rem;
  cursor: pointer;
  border: 2px solid #dfe9f5;
  transition: all 0.3s ease;
}

.icons i:hover {
  color: #fff !important;
  background: #07001f;
}

.icons i:first-child {
  color: green;
}

.icons i:last-child {
  color: blue;
}

.not-member {
  font-size: 0.8rem;
  margin-top: 1.4rem;
}

.not-member a {
  color: tomato;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}

.message_error {
  color: red;
  width: 91%;
  padding-left: 30px;
  font-size: small;
  text-align: left;
  margin:5px auto;
  padding-left: 10px;
}

.special_error {
  background-color: rgba(255, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>
