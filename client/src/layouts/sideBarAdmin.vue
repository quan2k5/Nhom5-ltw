<template>
  <div>
    <nav>
      <ul>
        <li>
          <span class="logo">
            <span class="nav-item">OnlineTest</span>
          </span>
        </li>
        
        <router-link to="/admin" exact-active-class="active-link">
          <li>
            <span class="menu-item">
              <i class='fas bx bx-menu'></i>
              <span class="nav-item">Tổng hợp</span>
            </span>
          </li> 
        </router-link>   
        <router-link to="/admin/users" exact-active-class="active-link">
          <li>
            <span class="menu-item">
              <i class='fas bx bxs-user'></i>
              <span class="nav-item">Người dùng</span>
            </span>
          </li>
        </router-link>
        
        <router-link to="/admin/courses" exact-active-class="active-link">
          <li>
            <span class="menu-item">
              <i class='fas bx bx-book-open'></i>
              <span class="nav-item">Khóa học</span>
            </span>
          </li>
        </router-link>
        
        <router-link to="/admin/subjects" exact-active-class="active-link">
          <li>
            <span class="menu-item">
              <i class='fas bx bxs-book'></i>
              <span class="nav-item">Môn học</span>
            </span>
          </li>
        </router-link>
        
        <router-link to="/admin/exams" exact-active-class="active-link">
          <li>
            <span class="menu-item">
              <i class='fas bx bx-question-mark'></i>
              <span class="nav-item">Đề thi</span>
            </span>
          </li>
        </router-link>
        
        <li>
          <span class="menu-item">
            <i class='fas bx bxs-message-rounded-dots'></i>
            <span class="nav-item">Bình luận</span>
          </span>
        </li>
        
        <li>
          <span class="logout" @click="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span class="nav-item">Đăng xuất</span>
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const router = useRouter();
const store = useStore();
const handleLogout = () => {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn đăng xuất?',
    text: "Bạn sẽ phải đăng nhập lại sau khi đăng xuất!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('updateActiveAdmin', false);
      router.push('/loginAdmin');
    }
  });
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  text-decoration: none;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background-color: #f8f9fa; /* Màu nền sáng nhẹ cho trang */
}

nav {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  left: 0;
  width: 250px;
  background: linear-gradient(135deg, #4a90e2, #00509e); /* Gradient xanh dương đậm */
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1); /* Đổ bóng cho cảm giác nổi bật */
  transition: all 0.3s ease-in-out;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.logo span {
  font-weight: bold;
  color: white;
  font-size: 20px;
  margin-left: 15px;
  text-transform: uppercase;
}

ul {
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  font-size: 16px;
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
}

.menu-item i {
  font-size: 22px;
  margin-right: 15px;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Hiệu ứng màu trắng nhẹ khi hover */
  transform: translateX(10px); /* Hiệu ứng trượt khi hover */
}

.menu-item:hover i,
.menu-item:hover .nav-item {
  color: #ffeb3b; /* Màu vàng tươi khi hover */
}

.nav-item {
  flex-grow: 1;
}

.logout {
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  color: white;
  transition: background 0.3s, transform 0.3s;
  cursor: pointer;
}

.logout:hover {
  background-color: #e74c3c;
}

.logout i {
  margin-right: 10px;
}

/* CSS khi link đang active */
.active-link .menu-item {
  background-color:orangered; /* Đổi màu nền khi link đang active */
  color: white; /* Màu chữ khi active */
  transform: translateX(0); /* Xóa hiệu ứng trượt */
}

.active-link i {
  color: white/* Đổi màu icon khi link active */
}
</style>
