<script setup>
import { onMounted, reactive,ref } from 'vue';
import { getAdmin } from '@/api/Admin';
import { useStore } from 'vuex';
import { useRouter,useRoute} from 'vue-router';
const router=useRouter();
const store=useStore();
const currentAdmin=reactive({email:'',password:'',total:''});
const backendAdmin=ref({});
onMounted(async()=>{
  const admin=await getAdmin();
  backendAdmin.value=admin;
})
const error=reactive({email:'',password:'',total:''});
const resetAdmin=()=>{
  error.email="";
  error.password="";
  error.total="";
}
const validateAdmin=()=>{
  if(currentAdmin.email==""){
    error.email="Email không được để trống"
  }
  if(currentAdmin.password==""){
    error.password="Mật khẩu không được để trống"
  }
}
const checkAvailableAdmin=()=>{
  if(currentAdmin.email!=backendAdmin.value.email || currentAdmin.password!=backendAdmin.value.password){
    error.total="Email hoặc mật khẩu không đúng";
  }
}
const handleSubmit=()=>{
  resetAdmin();
  validateAdmin();
  if(error.email=="" && error.password==""){
    checkAvailableAdmin();
    if(error.total==""){
      store.dispatch('updateActiveAdmin',true);
      router.push('/admin');
    }
  }
}
</script>
<template>
  <div class="login-form">
    <div class="form-container">
      <!-- Title -->
      <h2 class="form-title">Login</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <!-- Email Input -->
        <div class="input-group">
          <label for="email" class="input-label">Email</label>
          <input
            type="text"
            id="email"
            v-model="currentAdmin.email"
            class="input-field"
            placeholder="Enter your email"
          />
          <div class="message_error">{{ error.email }}</div>
        </div>

        <!-- Password Input -->
        <div class="input-group">
          <label for="password" class="input-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="currentAdmin.password"
            class="input-field"
            placeholder="Enter your password"
          />
          <div class="message_error">{{ error.password }}</div>
        </div>
        <div class="big_message" v-if="error.total!=''">
          {{ error.total }}
        </div>
        <div>
          <button type="submit" class="submit-button">Log In</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap");

body {
  background: linear-gradient(to right, #667eea, #764ba2);
  font-family: "Space Grotesk", sans-serif;
}

.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc; /* equivalent to bg-gray-50 */
}

.form-container {
  width: 100%;
  max-width: 400px; /* equivalent to max-w-md */
  background: white;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem; /* equivalent to rounded-xl */
  padding: 2.5rem; /* equivalent to p-10 */
}

.form-title {
  font-size: 1.875rem; /* equivalent to text-3xl */
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem; /* equivalent to mb-8 */
  color: #4a5568; /* equivalent to text-gray-800 */
}

.input-group {
  margin-bottom: 1.5rem; /* equivalent to mb-6 */
}

.input-label {
  display: block;
  font-size: 0.875rem; /* equivalent to text-sm */
  color: #4a5568; /* equivalent to text-gray-600 */
  margin-bottom: 0.5rem; /* equivalent to mb-2 */
}

.input-field {
  width: 100%;
  padding: 0.75rem; /* equivalent to py-3 */
  border: 1px solid #e2e8f0; /* equivalent to border-gray-200 */
  border-radius: 0.375rem; /* equivalent to rounded-lg */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.input-field:focus {
  outline: none;
}

.options {
  display: flex;
  justify-content:flex-end;
  align-items: center;
  margin: 10px 0; /* Space between input fields and options */
}

.remember-me {
  display: flex;
  align-items: center;
  font-size: 0.875rem; /* equivalent to text-sm */
  color: #4a5568; /* equivalent to text-gray-600 */
}

.checkbox {
  height: 1rem; /* equivalent to h-4 */
  width: 1rem; /* equivalent to w-4 */
  color: #38b2ac; /* equivalent to text-teal-600 */
  border: 1px solid #cbd5e0; /* equivalent to border-gray-300 */
  border-radius: 0.25rem; /* equivalent to rounded */
  margin-right: 0.5rem; /* Space between checkbox and label */
}

.forgot-password {
  font-size: 0.875rem; /* equivalent to text-sm */
  color: #38b2ac; /* equivalent to text-teal-600 */
  text-decoration: underline;
  margin-left: 1rem; /* Space between checkbox and forgot password link */
}

.submit-button {
  width: 100%;
  padding: 0.75rem; /* equivalent to py-3 */
  background-color: cornflowerblue; /* equivalent to bg-teal-600 */
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.125rem; /* equivalent to text-lg */
  border-radius: 0.5rem; /* equivalent to rounded-lg */
  transition: background-color 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background-color: cornflowerblue /* equivalent to hover:bg-teal-700 */
}
.message_error{
  margin: 5px 0;
  font-size: small;
  color: red;
}
.big_message{
  margin: 0px 0px 20px 0px;
  background-color:cornflowerblue;
  height: 30px;
  padding-left: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: red;

}
</style>
