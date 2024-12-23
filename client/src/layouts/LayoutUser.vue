<script setup>
import headerUser from './headerUser.vue';
import footerUser from './footerUser.vue';
import { useStore } from 'vuex';
import { useRouter,useRoute } from 'vue-router';
import { getAllUsers } from '@/api/User';
import { computed, onBeforeMount, reactive } from 'vue';
import Swal from 'sweetalert2';
const store=useStore();
onBeforeMount(async () => {
    const users = await getAllUsers();  
    let findUsers = users.find((user) => user.status == true);

    if (findUsers) {
        if (findUsers.block == false) {
            Swal.fire({
                icon: 'error',
                title: 'Thông báo',
                text: 'Bạn đã bị chặn!',
                confirmButtonText: 'OK'
            });
            if (findUsers && findUsers.id) {
                store.dispatch('updateUsers', { id:findUsers.id, block:findUsers.block,status:false});
            }
            store.commit('setCurrentUser', undefined);
        } else {
            store.commit('setCurrentUser', findUsers);
        }
    } else {
        store.commit('setCurrentUser', undefined);
    }
});
</script>
<template>
    <div>
        <headerUser></headerUser>
        <router-view></router-view>
        <footerUser></footerUser>
    </div>
</template>
<style scoped>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
} 
</style>