<script setup>
import { useRouter,onBeforeRouteUpdate}  from 'vue-router';
import { getAllUsers } from '@/api/User';
import { useStore } from 'vuex';
import {ref,computed} from 'vue';
const router=useRouter();
const store=useStore();
const currentUser=computed(()=>store.state.users.currentUser);
const searchParam=ref('');
const handleClickSearch=()=>{
    if (searchParam.value) {
    router.push({ name: 'subjectUser', query: { search: searchParam.value } });
  } else {
    alert('Vui lòng nhập giá trị tìm kiếm.');
  }
}
const handleLogout=async()=>{
  await store.dispatch('updateAllUser',{...currentUser.value,status:false});
  await store.dispatch('getCurrentUser');
  router.push('/');
}
</script>
<template>
    <header class="header">
      <div class="container">
        <!-- Phần bên trái -->
        <div class="left-section">
          <router-link to="/">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
              alt="Logo"
              class="logo"
            />
          </router-link>
          <p class="brand-name">OnlineTest</p>
        </div>
  
        <!-- Thanh tìm kiếm -->
        <div class="search-section">
          <input
            type="input"
            class="search-input"
            placeholder="Tìm kiếm theo tên môn hoc"
            v-model="searchParam"
          />
          <button class="search-button" @click="handleClickSearch">
            <i class="fa-solid fa-search"></i>
          </button>
        </div>
  
        <!-- Phần bên phải -->
        <div class="right-section">
          <nav class="nav-links">
            <div  class="nav-link">Trang chủ</div>
            <div  class="nav-link">Khóa học</div>
            <div  class="nav-link">Liên hệ</div>
          </nav>
          <div id="loginOut" class="auth-section">
            <div v-if="currentUser" class="user-info">
                <img
                  :src="currentUser.image ?currentUser.image:'https://media.istockphoto.com/id/1196083861/vi/vec-to/b%E1%BB%99-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-%C4%91%C6%A1n-gi%E1%BA%A3n.jpg?s=612x612&w=0&k=20&c=7juGotIovn0c2KFGhZ_DcEqpfiSyYl-zz2ty9XYnYNs='"
                  class="profile-pic"
                />
              <div  class="username">{{ currentUser.name }}</div>
              <div class="user_board">
                <div class="triangle"></div>
                <router-link to="/user/profileUser" class="link" >
                  <div class="user_item">Tài khoản</div>
                </router-link>
                <div class="user_item" @click="handleLogout">Đăng xuất</div>
              </div>
            </div>
            <router-link to="/userLogin" class="nav-link" v-if="!currentUser" >Đăng nhập</router-link>
          </div>
        </div>
      </div>
    </header>
  </template>
<style  scoped>
  /* CSS thông thường */
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
} 
  .header {
    background: linear-gradient(to right, #1e3a8a, #4c51bf);
    color: white;
    padding: 20px;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .left-section {
    display: flex;
    align-items: center;
  }
  .right-section{

  }
  
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .brand-name {
    margin-left: 10px;
    font-size: 24px;
    font-weight: bold;
  }
  
  .search-section {
    position: relative;
    width: 400px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    background-color: white;
    color: #333;
  }
  
  .search-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: gray;
    cursor: pointer;
  }
  
  .search-results {
    position: absolute;
    z-index: 10;
    width: 100%;
    background-color: white;
    color: #333;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
  }
  
  .search-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }
  
  .search-item:hover {
    background-color: #f0f0f0;
  }
  
  .course-title {
    font-weight: bold;
  }
  
  .course-description {
    color: #666;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .right-section {
    display: flex;
    align-items: center;
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .nav-link:hover {
    color: #a3bffa;
  }
  
  .auth-section {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .username {
    color: white;
    text-decoration: none;
  }
  
  .logout-button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .logout-button:hover {
    transform: scale(1.1);
  }
  .right-section{
    display: flex;
    gap:10px;
  }
  .user-info{
    margin-left: 15px;
    display: flex;
    align-items: center;
    gap:10px;
    position:relative
  }
  .user-info .user_board{
    display: none;
    position: absolute;
    z-index: 100001;
    background-color: white;
    border-radius: 5px;
    right:-10px;
    width: 120px;
    top:35px;
    box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
  .user_item{
    color: black;
    height: 30px;
    margin: 10px;
    display: flex;
    align-items: center; 
    border-bottom: 1px solid rgba(0, 0, 0, 0.384);
    cursor: pointer;
  }
  .user_item:hover{
    color:blue;
  }
  .triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid white; 
    top:-8px;
  }
  .link{
    text-decoration: none;
  }
  .user-info:hover .user_board{
    display: block;
  }

  </style>
  