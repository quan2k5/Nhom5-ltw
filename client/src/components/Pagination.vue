<script setup>
import { computed } from 'vue';

const emits = defineEmits(['handlePreviousPage', 'handleNextPage', 'handleNumberPage']);
const props = defineProps({
  currentPage: Number,
  totalItem: Number,
  itemInPage: {
    type: Number,
    default: 8,
  }
});

const totalPage = computed(() => Math.ceil(props.totalItem / props.itemInPage));
const checkPrevious = computed(() => props.currentPage > 1);
const checkNext = computed(() => props.currentPage < totalPage.value);
</script>

<template>
  <div class="right_part_pagination">
    <button
      v-show="checkPrevious"
      class="paginationproduct_btn text_btn"
      @click="$emit('handlePreviousPage', props.currentPage - 1)"
    >
      Prev
    </button>
    <ul class="pagination_btnlist">
      <li
        v-for="index in totalPage"
        :key="index"
        @click="$emit('handleNumberPage', index)"
        :class="{ active: index === props.currentPage }"
        class="paginationproduct_btn"
      >
        {{ index }}
      </li>
    </ul>
    <button
      v-show="checkNext"
      class="paginationproduct_btn text_btn"
      @click="$emit('handleNextPage', props.currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.right_part_pagination {
  display: flex;
  align-items: center;
}

.pagination_btnlist {
  padding-left: 0;
  display: flex;
  list-style: none;
}

.paginationproduct_btn {
  width: 30px;
  cursor: pointer;
  height: 30px;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.253);
  text-align: center;
  line-height: 30px;
  margin-left: 5px;
}
.paginationproduct_btn.text_btn{
    width: 50px;
}
.paginationproduct_btn.active {
  background-color: #007bff; /* Màu nền cho nút đang hoạt động */
  color: white; /* Màu chữ cho nút đang hoạt động */
}

.paginationproduct_select {
  height: 38px;
  margin: 0;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.295);
}
</style>
