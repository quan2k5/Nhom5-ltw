
<template>
  <div class="container">
    <Navbar></Navbar>
    <headerAdmin></headerAdmin>
    <main class="main-content">
        <router-view></router-view>
    </main>  
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import Navbar from './sideBarAdmin.vue'
import headerAdmin from './headerAdmin.vue';
import UserTable from '../views/admin/adminUser.vue'
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background-color: #f4f6f9;
}
.container {
  display: flex; 
}
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #242939;
  color: #fff;
}

.sidebar-header {
  padding: 20px;
  font-size: 24px;
  text-align: center;
}

.nav-list {
  list-style: none;
  padding: 0;
}

.nav-list li {
  margin-bottom: 15px;
}

.nav-list li a {
  display: block;
  padding: 15px;
  color: #bfc0c3;
  text-decoration: none;
  transition: background 0.3s ease;
}

.nav-list li a:hover,
.nav-list li a.active {
  background-color: #2d3345;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
  margin-top:70px ;
}

.main-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}

.search-bar {
  width: 250px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.dashboard-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.widget {
  width: 23%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 5px;
}

.widget-value {
  font-size: 24px;
  font-weight: bold;
}

.widget-label {
  color: #666;
  margin-top: 10px;
}


</style>
