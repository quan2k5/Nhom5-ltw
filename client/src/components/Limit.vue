<template>
  <div>
    <select 
      v-model="selectedLimit" 
      class="paginationproduct_select">
      <option value="5">5 bản ghi/trang</option>
      <option value="10">10 bản ghi/trang</option>
      <option value="15">15 bản ghi/trang</option>
    </select>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits(['updateLimit']);
const selectedLimit = ref('5'); 
watch(selectedLimit, (newLimit) => {
  emit('updateLimit', newLimit);
});
</script>
<style>
select{
    height: 30px;
}
</style>
