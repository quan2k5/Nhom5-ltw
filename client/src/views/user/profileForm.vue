<template>
  <div class="modal">
    <div class="modal-content">
      <button class="close-button" aria-label="Đóng" @click="handleClose">✖</button>
      <h2>Thay đổi thông tin cá nhân</h2>
      <ImageInput :image="backEndUser.image" @handleImange="handleImange" title="người dùng"></ImageInput>
      <div class="form-group">
        <label for="email">Email:</label>
        <input disabled type="email" id="email" placeholder="" v-model="backEndUser.email"/>
      </div>
      <div class="form-group">
        <label for="name">Tên:</label>
        <input type="text" id="name" placeholder="" v-model="backEndUser.name"/>
        <div class="message_error">{{ error.name }}</div>
      </div>
      <div class="form-group-checkbox">
        <input type="checkbox" id="changePassword" v-model="checkInput" />
        <label for="changePassword">Thay đổi mật khẩu</label>
      </div>
      <transition name="fade">
        <div class="password-fields" v-if="checkInput">
          <div class="form-group">
            <label for="currentPassword">Mật khẩu cũ:</label>
            <input type="password" id="currentPassword" placeholder="" v-model="passwords.oldPassword"/>
            <div class="message_error">{{ error.oldPassword }}</div>
          </div>
          <div class="form-group">
            <label for="newPassword">Mật khẩu mới:</label>
            <input type="password" id="newPassword" placeholder="" v-model="passwords.newPassword" />
            <div class="message_error">{{ error.newPassword }}</div>
          </div>
          <div class="form-group">
            <label for="confirmNewPassword">Xác nhận mật khẩu mới:</label>
            <input type="password" id="confirmNewPassword" placeholder="" v-model="passwords.checkPassword"/>
            <div class="message_error">{{ error.checkPassword }}</div>
          </div>
        </div>
      </transition>
      <!-- Submit Button -->
      <button class="submit-button" @click.prevent="handleSubmit">Cập nhật</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import ImageInput from '@/components/ImageInput.vue';

const store = useStore();
const props = defineProps(['currentUser', 'handleClose']);

const backEndUser = reactive({
  id: '',
  image:'',
  email: '',
  name: '',
  password: '',
  status: '',
  block: '',
  titleName:'',
});

const passwords = reactive({
  oldPassword: '',
  newPassword: '',
  checkPassword: ''
});

const error = reactive({
  name: '',
  oldPassword: '',
  newPassword: '',
  checkPassword: ''
});

const checkInput = ref(false);

onMounted(() => {
  backEndUser.image=props.currentUser.image;
  backEndUser.id = props.currentUser.id;
  backEndUser.name = props.currentUser.name;
  backEndUser.email = props.currentUser.email;
  backEndUser.password = props.currentUser.password;
  backEndUser.status = props.currentUser.status;
  backEndUser.block = props.currentUser.block;
});

const clearError = () => {
  error.name = "";
  error.oldPassword = "";
  error.newPassword = "";
  error.checkPassword = "";
};
const handleImange=(link)=>{
  backEndUser.image=link;
}

const validateUser = () => {
  if (backEndUser.name == '') {
    error.name = 'Tên tài khoản đang trống';
  } else if (backEndUser.name.length < 5) {
    error.name = "Tên tài khoản quá ngắn";
  }
  if (checkInput.value == true) {
    if (passwords.oldPassword == "") {
      error.oldPassword = "Mật khẩu đang trống";
    } else if (passwords.oldPassword != backEndUser.password) {
      error.oldPassword = "Mật khẩu cũ không đúng";
    }
    if (passwords.newPassword == '') {
      error.newPassword = "Mật khẩu mới đang trống";
    } else if (passwords.newPassword.length < 7) {
      error.newPassword = "Mật khẩu mới quá ngắn";
    }
    if (passwords.checkPassword == "") {
      error.checkPassword = "Mật khẩu xác nhận đang trống";
    } else if (passwords.checkPassword != passwords.newPassword) {
      error.checkPassword = "Mật khẩu xác nhận không đúng";
    }
  }
};

const handleSubmit = () => {
  clearError();
  validateUser();
  if (checkInput.value == false) {
    backEndUser.titleName=backEndUser.name.split(" ").filter(word => word !== "").pop();
    if (error.name == "") {
      store.dispatch('updateAllUser', { ...backEndUser });
      props.handleClose();
    }
  } else {
    if (error.name == "" && error.oldPassword == "" && error.newPassword == "" && error.checkPassword == "") {
      backEndUser.password = passwords.newPassword;
      store.dispatch('updateAllUser', { ...backEndUser });
      props.handleClose();
    }
  }
};
</script>

<style scoped>
/* Fade effect for password fields */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Modal layout */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.modal-content {
  width: 100%;
  max-width: 450px;
  z-index: 10000000000000000000000000000000000000000000000000000000000000000000000000001;
  max-height: 90vh; /* Chiều cao tối đa của modal */
  background-color: #fff;
  border-radius: 10px;
  padding: 25px 20px;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  overflow-y: auto; /* Thêm thanh cuộn dọc khi vượt quá chiều cao tối đa */
}

.close-button {
  position: absolute;
  top: 0;
  cursor: pointer;
  right: 0;
  width: 40px;
  height: 40px;
  border: none;
  background-color: rgba(255, 0, 0, 0.932);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  color: white;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

h2 {
  color: #333;
  font-size: 22px;
  margin-bottom: 20px;
}

.form-group, .form-group-checkbox {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
  color: #333;
  display: block;
  text-align: left;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #3b82f6;
}

.form-group-checkbox {
  display: flex;
  align-items: center;
}

.form-group-checkbox input[type="checkbox"] {
  margin-right: 10px;
  transform: scale(1.2);
  cursor: pointer;
}

.password-fields {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.submit-button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2563eb;
}

.message_error {
  margin: 5px 0;
  text-align: start;
  font-size: small;
  color: red;
}
</style>
