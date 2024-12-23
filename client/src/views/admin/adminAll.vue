<script setup>
import { useStore } from 'vuex';
import { computed, onMounted,ref } from 'vue';
import { toFixed } from 'ant-design-vue/es/input-number/src/utils/MiniDecimal';
const store=useStore();
const backEndExams=computed(()=>store.state.exams.exams);
const backEndComments=computed(()=>store.state.comments.comments);
const turnExam=ref({});
const bestExam=ref({});
const badExam=ref({})
const caculateMark=(id)=>{
    const comments=backEndComments.value.filter((item)=>item.idExam==id&&item.star>0);
    if(comments){
        let sum=0;
        comments.forEach(element=>{
            sum+=element.star;  
        });
        return sum/comments.length;

    }
    return 0;
}
onMounted(async()=>{
    await store.dispatch('getExams');
    await store.dispatch('getFilterComments','');
    turnExam.value=backEndExams.value.reduce((storeItem,currentItem)=>{
        return currentItem.testTurn >storeItem.testTurn?currentItem:storeItem
    })
    bestExam.value=backEndExams.value.reduce((storeItem,currentItem)=>{
        const currentMark = caculateMark(currentItem.id);
        if (!storeItem ||currentMark >storeItem.star) {
            return { ...currentItem, star: currentMark };
        }
        return storeItem;
    },null)
    badExam.value = backEndExams.value.reduce((storeItem, currentItem) => {
        const currentMark = caculateMark(currentItem.id);
        if (!storeItem ||currentMark <= storeItem.star) {
            return { ...currentItem, star: currentMark };
        }
        return storeItem;
    }, null);

})
</script>
<template>
    <section class="dashboard-summary">
        <div class="widget">
            <i class='bx bx-book-open icon'></i>
            <p class="widget-value">{{ turnExam.title }}</p>
            <p class="widget-value-number">{{ turnExam.testTurn }}</p>
            <p class="widget-label">Đề thi nhiều lượt thi nhất</p>
        </div>
        <div class="widget">
            <i class='bx bxs-message-rounded-dots icon icon1'></i>
            <p class="widget-value">{{ bestExam.title }}</p>
            <p class="widget-value-number">{{ bestExam.star?bestExam.star.toFixed(3):0 }}</p>
            <p class="widget-label">Đề thi đánh giá tốt nhất</p>
        </div>
        <div class="widget">
            <i class='bx bxs-comment-x icon icon2' ></i>
            <p class="widget-value">{{ badExam.title }}</p>
            <p class="widget-value-number">{{ badExam.star?badExam.star.toFixed(3):0}}</p>
            <p class="widget-label">Đề thi đánh giá kém nhất</p>
        </div>
    </section>
</template>

<style scoped>
.dashboard-summary {
    display: flex;
    justify-content: space-between;
    margin: 20px 10px;
    gap: 20px; /* Khoảng cách giữa các widget */
}

.widget {
    flex: 1; /* Tự động chia đều không gian */
    padding: 20px;
    background-color: #f9f9f9; /* Màu nền nhẹ nhàng */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    border-radius: 10px;
    transition: transform 0.3s, box-shadow 0.3s; /* Hiệu ứng chuyển động */
}

.widget:hover {
    transform: translateY(-5px); /* Di chuyển lên khi hover */
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); /* Đổ bóng sâu hơn */
}

.icon {
    font-size: 48px; /* Kích thước biểu tượng lớn */
    color: #4caf50; /* Màu xanh lá cây cho biểu tượng */
    margin-bottom: 15px; /* Khoảng cách dưới biểu tượng */
}
.icon1{
  color:cornflowerblue;
}
.icon2{
  color: rgba(255, 0, 0, 0.63);
}

.widget-value {
    font-size: 20px; /* Kích thước chữ nhỏ hơn một chút */
    font-weight: bold;
    color: #333; /* Màu chữ tối hơn */
}

.widget-value-number {
    font-size: 32px; /* Kích thước chữ lớn hơn cho số */
    font-weight: 700; /* Đậm hơn để nổi bật */
    color: #4caf50; /* Màu xanh lá cây cho số */
}

.widget-label {
    color: #888; /* Màu nhạt hơn cho nhãn */
    margin-top: 10px;
    font-size: 14px; /* Kích thước chữ nhỏ hơn cho nhãn */
}
</style>
