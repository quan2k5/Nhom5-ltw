<template>
  <div class="wrapper">
    <h1>Hello Again!</h1>
    <p>QL education always<br />welcomes you</p>
    <form>
      <input
        type="text"
        placeholder="Enter email"
        v-model="currentUser.email"
      />
      <div class="message_error">{{ error.email }}</div>
      <input
        type="password"
        placeholder="Password"
        v-model="currentUser.password"
      />
      <div class="message_error">{{ error.password }}</div>
    </form>
    <div v-if="error.checkUser!=''" class="message_error special_error">{{ error.checkUser }}</div>
    <button @click="handleSubmit">Log in</button>
    <p class="or">
      ----- or continue with -----
    </p>
    <div class="icons">
      <i class="fab fa-google"></i>
      <i class="fab fa-github"></i>
      <i class="fab fa-facebook"></i>
    </div>
    <div class="not-member">
      Not a member? <router-link to="/userRegister">Register Now</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { getAllUsers } from '@/api/User';
import { useRouter,useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const store = useStore();
const currentUser = reactive({ email: '', password: '' });
const error = reactive({ email: '', password: '', checkUser: '' });
const backendUsers = reactive([]);
const route=useRoute();

onMounted(async () => {
  const users = await getAllUsers();
  backendUsers.push(...users);
  if(route.query.email!=undefined & route.query.password!=undefined){
    currentUser.email=route.query.email;
    currentUser.password=route.query.password;
  }
});

const validateUser = () => {
  const checkUser = backendUsers.find(
    (item) =>
      item.email === currentUser.email && item.password === currentUser.password
  );
  return checkUser;
};

const checkInput = () => {
  if (currentUser.email === '') {
    error.email = 'Email của bạn đang trống';
  }
  if (currentUser.password === '') {
    error.password = 'Mật khẩu của bạn đang trống';
  }
};

const handleSubmit = () => {
  error.password = '';
  error.email = '';
  error.checkUser = '';
  checkInput();
  if (error.email === '' && error.password === '') {
    const obj = validateUser();
    if (obj) {
      obj.status = true;
      store.dispatch('updateAllUser', obj);
      const redirect=route.query.redirect||'/';
      router.push(redirect);
    } else {
      error.checkUser = 'Email hoặc mật khẩu không đúng';
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.wrapper {
  width: 330px;
  padding: 2rem 0 1rem 0;
  margin: 50px auto;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #07001f;
}

p {
  margin-bottom: 1.7rem;
}

form input {
  width: 85%;
  outline: none;
  border: none;
  background: #dfe9f5;
  padding: 12px 14px;
  margin-bottom: 10px;
  border-radius: 10px;
}

button {
  font-size: 1.1rem;
  margin-top: 1rem;
  padding: 8px 0;
  border-radius: 5px;
  outline: none;
  border: none;
  width: 85%;
  background: blue;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background: rgba(0, 0, 255, 0.582);
}

.or {
  font-size: 0.8rem;
  margin-top: 1.5rem;
}

.icons i {
  color: #07001f;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  margin-left: 0.9rem;
  font-size: 1.5rem;
  cursor: pointer;
  border: 2px solid #dfe9f5;
}

.icons i:hover {
  color: #fff !important;
  background: #07001f;
  transition: 1s;
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
}

a:hover {
  text-decoration: underline;
}

.message_error {
  color: red;
  width: 85%;
  font-size: small;
  margin: 0 auto;
  text-align: left;
  margin-bottom:10px ;
  padding-left: 10px;
}
.special_error{
  background-color: rgba(0, 0, 255, 0.288);
  border:none ;
  border-radius: 5px;
  height: 30px;
  display: flex;
  align-items: center;
}
</style>
