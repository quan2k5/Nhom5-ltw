<script setup>
import { getAllCourses } from '@/api/Course';
import { computed, onMounted, reactive,onBeforeMount ,ref} from 'vue';
import { useRoute, onBeforeRouteUpdate,useRouter } from 'vue-router';
import { useStore } from 'vuex';
import queryString from 'query-string';
import Pagination from '@/components/Pagination.vue';
const store = useStore();
const route = useRoute();
const router=useRouter();
const backendSubjects = computed(() => store.state.subjects.subjects);
const allSubjects=computed(()=>store.state.subjects.allsubject);
const backEndCourses = reactive([]);
const backEndExams = computed(() => store.state.exams.exams);
const params=reactive({title_like:'',idCourse:'',_page:1,_limit:3});
const inputSearch=ref('');
onBeforeMount(async () => {
  let courses = await getAllCourses();
  backEndCourses.push(...courses);
  store.dispatch("getAllSubjects");
  if (route.query.search!=undefined) {
    params.title_like=route.query.search;
    const{idCourse,...restParams}=params;
    const {_page,_limit,...restParam1}=restParams;
    store.dispatch("getFilterSubjects",queryString.stringify(restParams));
    store.dispatch("getAllSubjectsInUser",queryString.stringify(restParam1));
  } else {
    params.idCourse=route.query.idCourse;
    params.title_like='';
    const{_page,_limit,...restParams}=params;
    store.dispatch("getAllSubjectsInUser",queryString.stringify(restParams));
    store.dispatch("getFilterSubjects",queryString.stringify(params));
  }
});
onBeforeRouteUpdate((to) => {
    params._page=1;
    params.title_like=to.query.search;
    params.idCourse=''
    const{idCourse,...restParams}=params;
    const {_page,_limit,...restParam1}=restParams;
    store.dispatch("getFilterSubjects",queryString.stringify(restParams));
    store.dispatch("getAllSubjectsInUser",queryString.stringify(restParam1));
});
const findCourse = (id) => {
  let find = backEndCourses.find((item) => item.id == id);
  return find ? find.title : "";
};

const findLengthExam = (id) => {
  let filterExams = backEndExams.value.filter((item) => item.idSubject == id);
  return filterExams ? filterExams.length : 0;
};
const handleSearch=()=>{
    params._page=1;
    params.title_like=inputSearch.value;
    const{_page,_limit,...restParams}=params;
    store.dispatch("getAllSubjectsInUser",queryString.stringify(restParams));
    store.dispatch("getFilterSubjects",queryString.stringify(params))
}
const handlePage=(page)=>{
    params._page=page;
    if(route.query.search!=undefined){
        const{idCourse,...restParams}=params;
        store.dispatch("getFilterSubjects",queryString.stringify(restParams));
    }else{
        store.dispatch("getFilterSubjects",queryString.stringify(params));
    }
}
const handlExam=(id)=>{
    router.push(`/user/examUser/${id}`);
}
</script>

<template>
  <div class="container">
    <div class="title_box">
      <h4>Danh sách các môn thi {{ route.query.search ? ` theo từ khóa "${route.query.search}"` : `theo  ${findCourse(route.query.idCourse)}` }}</h4>
      <div class="box_search" v-if="route.query.idCourse">
        <input type="text" placeholder="tìm kiếm môn thi trong khóa học" v-model="inputSearch">
        <i class='bx bx-search' @click="handleSearch"></i>
      </div>
    </div>
    <div class="main_content" >
      <div
        v-for="subject in backendSubjects"
        :key="subject.id"
        class="subject-card"
        @click="handlExam(subject.id)"
      >
        <img :src="subject.image" alt="">
        <div class="detail_subject">
          <h3>{{ subject.title }}</h3>
          <div><span>Khóa thi</span>: {{ findCourse(subject.idCourse) }}</div>
          <div><span>Mô tả</span>: {{ subject.description }}</div>
          <div><span>Số đề</span>: {{ findLengthExam(subject.id) }}</div>
        </div>
      </div>
    </div>
    <div class="bottom_page">
        <Pagination 
            :currentPage="params._page"
            :totalItem="allSubjects.length"
            @handlePreviousPage="handlePage"
            @handleNextPage="handlePage"
            @handleNumberPage="handlePage"
            :itemInPage="params._limit"
        >
        </Pagination>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1200px;
  margin: auto;
}

.title_box {
  padding: 10px;
  margin-top:20px;
  display: flex;
  gap: 15px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.main_content {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  padding: 0px 50px;
  gap: 20px; 
}

.subject-card {
  padding: 8px;
  border: 1px solid #e6e6e6;
  width: 250px;
  background-color: #fff; /* Màu nền trắng để hình ảnh nổi bật hơn */
  border-radius: 10px; /* Bo góc cho thẻ */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Thêm đổ bóng để tạo hiệu ứng chiều sâu */
  transition: transform 0.2s ease; /* Hiệu ứng khi hover */
  cursor: pointer;
}

.subject-card:hover {
  transform: translateY(-5px); /* Khi hover, thẻ sẽ di chuyển lên trên một chút */
}

.subject-card img {
  width: 100%; /* Đảm bảo hình ảnh rộng bằng với chiều rộng của thẻ chứa */
  height: 240px; /* Chiều cao cố định */
  object-fit: cover; /* Đảm bảo hình ảnh giữ tỉ lệ và bao phủ toàn bộ khung */
  border-radius: 8px; /* Thêm bo góc cho hình ảnh để giao diện đẹp hơn */
}

.detail_subject {
  padding-top: 10px;
}

.detail_subject h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.detail_subject div {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
span{
    font-weight: 700;
}
.box_search{
    position: relative;

}
.box_search input{
    width: 350px;
    height: 35px;
    border-radius:20px ;
    border:1px solid rgba(0, 0, 0, 0.486);
    padding-left: 10px;
}
.box_search i{
    position: absolute;
    top:20%;
    right: 10px;
    cursor: pointer;
}
.bottom_page{
    margin-top:10px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
</style>
