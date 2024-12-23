<script setup>
import queryString from 'query-string';
import { useStore } from 'vuex';
import { computed, onMounted, ref, watch } from 'vue';
import Pagination from '../../components/Pagination.vue';
import Limit from '../../components/Limit.vue';
import Swal from 'sweetalert2';
import debounce from 'lodash.debounce'; 
const store = useStore();
const params = ref({ _page: 1, _limit: 5, name_like: '', email_like: '', _sort: 'titleName', _order: '' });
const backendUser = computed(() => store.state.users.users);
const allUsers = computed(() => store.state.users.allUsers);
const inputSearch = ref('');
const selectValue = ref('name');
const inputOrder = ref('asc');
const fetchData =async () => {
  const { _page, _limit, ...restParams } = params.value;
  await store.dispatch('getAllUsers', queryString.stringify(restParams));
  store.dispatch('getFilterUsers', queryString.stringify(params.value))
};
onMounted(fetchData);
const handleSearch = debounce(async (newValue) => {
  if (selectValue.value === 'name') {
    params.value.email_like = '';
    params.value.name_like = newValue;
  } else if (selectValue.value === 'email') {
    params.value.name_like = '';
    params.value.email_like = newValue;
  }
  params.value._page = 1;  
  fetchData();
}, 300);
watch(inputSearch, handleSearch);
watch(inputOrder, async (newValue) => {
  params.value._order = newValue;
  params.value._page = 1;  
  store.dispatch('getFilterUsers', queryString.stringify(params.value))
});
const handleBlock = (id, block,status) => {
  Swal.fire({
    title: block ? 'Bạn có chắc muốn bỏ chặn người dùng này?' : 'Bạn có chắc muốn chặn người dùng này?',
    text: block ? "Người dùng này sẽ được bỏ chặn!" : "Người dùng này sẽ bị chặn!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: block ? 'Bỏ chặn!' : 'Chặn!',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch('updateUsers', { id, block,status });
      Swal.fire(block ? 'Đã bỏ chặn!' : 'Đã chặn!', block ? 'Người dùng đã được bỏ chặn.' : 'Người dùng đã bị chặn.', 'success');
    }
  });
};
const handlePage = (currentPage) => {
  params.value._page = currentPage;
  fetchData();
};
const handleLimit = (limit) => {
  params.value._limit = limit;
  params.value._page = 1;
  fetchData();
};
</script>
<template>
    <section class="user-table">
      <div class="search_part">
         <input class="input_user" type="text" placeholder="tìm kiếm" v-model="inputSearch">
          <select v-model="selectValue">
            <option value="name">theo tên</option>
            <option value="email">theo email</option>
           </select>
           <select name="" id="" v-model="inputOrder">
            <option value="asc">sắp xếp theo tăng dần</option>
            <option value="desc">sắp xếp theo giảm dần</option>
           </select>
      </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in backendUser" :key="index">
              <td>{{user.id}}</td>
              <td><img :src="user.image || 'https://media.istockphoto.com/id/1298261537/vi/vec-to/ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-h%E1%BB%93-s%C6%A1-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-tr%E1%BB%91ng.jpg?s=612x612&w=0&k=20&c=Rbi2tNjNA4z86gzSPBhGOefKI-XTKqlqGy-kiPoUvRA='" > {{user.name}}</td>
              <td>{{ user.email}}</td>
              <td>
                <div v-if="user.block" class="active">active</div>
                <div v-if="!user.block" class="inactive">inactive</div>
              </td>
              <td>
                <i v-if="user.block" class='bx bxs-lock-open-alt' @click="handleBlock(user.id,false,false)"></i>
                <i v-if="!user.block" class='bx bxs-lock-alt' @click="handleBlock(user.id,true,false)" ></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bottom_page">
          <Limit @updateLimit="handleLimit"></Limit>
          <Pagination
              :currentPage="params._page"
              :totalItem="allUsers.length"
              :itemInPage="params._limit"
              @handlePreviousPage="handlePage"
              @handleNextPage="handlePage"
              @handleNumberPage="handlePage"
        />
        </div>
    </section>
</template>
<style scoped>
.user-table {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

table th {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  text-align: left;
  padding: 15px;
  font-size: 16px;
}

table td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

table td img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

table tr:hover {
  background-color: #f1f1f1;
  transition: background-color 0.3s;
}

table th,
table td {
  text-align: left;
}
table a {
  color: #007bff;
  text-decoration: none;
}
.active{
  color: green;
}
.inactive{
  color: red;
}

table a:hover {
  text-decoration: underline;
}

.search_part {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  gap: 10px;
}

.search_part input {
  width: 250px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.bx{
  font-size: larger;
  cursor: pointer;
}
.bxs-lock-alt{
  color: red;
}
.bxs-lock-open-alt{
  color: green;
}

.bottom_page {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
</style>