<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const store=useStore();
const backendAdmin=computed(()=>store.state.users.admin);
onMounted(()=>{
    store.dispatch('getAdmin');
})
</script>
<template>
    <header class="container">
        <img src="https://png.pngtree.com/png-vector/20220618/ourmid/pngtree-default-photo-placeholder-account-anonymous-png-image_5130486.png" alt="">
        <h4>{{ backendAdmin.name }}</h4> 
    </header>
</template>
<style  scoped>
.container {
    margin-bottom: 30px;
    min-height: 60px;
    width: 1290px;
    position: fixed;
    left: 250px;
    gap:10px;
    padding: 0 40px;
    align-items: center;
    background-color: white;
    display: flex;
    justify-content: flex-end;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2); /* Đổ bóng chỉ phía dưới */
}
img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border:none;
}
</style>