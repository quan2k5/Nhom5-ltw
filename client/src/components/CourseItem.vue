<template>
    <div class="courses-carousel-container">
      <div class="courses-carousel">
        <div class="courses-inner" :style="{ transform: `translateX(-${activeSlide * slideWidth}px)` }">
          <div
            v-for="course in backEndCourses"
            :key="course.id"
            class="course-card"
            @click="handleClick(course.id)"
          >
            <img :src="course.image" />
            <div class="course-details">
              <h3>{{ course.title }}</h3>
              <p>{{ course.description }}</p>
              <p>Số câu hỏi: {{ course.totalQuestions }}</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" @click="prevSlide" :disabled="isFirstSlide">Previous</button>
        <button class="carousel-control-next" @click="nextSlide" :disabled="isLastSlide">Next</button>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router=useRouter();
const store = useStore();
const backEndCourses = computed(() => store.state.courses.courses);
const activeSlide = ref(0);
const slideWidth = 356; // Adjust based on your card width
const visibleSlides = computed(()=>backEndCourses.value.length-4); // Number of slides visible at once
onMounted(() => {
  store.dispatch('getCourses');
});
  // Computed properties to determine if we are at the first or last slide
const isFirstSlide = computed(() => activeSlide.value === 0);
const isLastSlide = computed(() => activeSlide.value >=visibleSlides.value); 
const nextSlide = () => {
  if (!isLastSlide.value) {
    activeSlide.value++;
  }
}; 
const prevSlide = () => {
  if(!isFirstSlide.value) {
    activeSlide.value--;
  }
};
  
const handleClick =(id)=>{
    router.push({name:'subjectUser',query:{idCourse:id}}); 
};
  </script>
  <style scoped>
  .courses-carousel-container {
    position: relative;
    overflow: hidden;
  }
  
  .courses-carousel {
    display: flex;
    align-items: center;
  }
  
  .courses-inner {
    display: flex;
    transition: transform 0.3s ease-in-out;
  }
  
  .course-card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    flex-shrink: 0; /* Prevent shrinking */
    width: 350px; /* Set fixed width for cards */
    margin: 0 10px; /* Add margin between cards */
  }
  
  .course-card img {
    width: 100%;
    height: 150px; /* Maintain aspect ratio */
  }
  
  .course-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .course-details {
    padding: 20px;
    text-align: center;
  }
  
  .course-details h3 {
    font-size: 22px;
    color: #d9534f;
    margin-bottom: 10px;
  }
  
  .course-details p {
    color: #666;
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #333;
    color: white;
    padding: 10px;
    cursor: pointer;
    border: none;
  }
  
  .carousel-control-prev {
    left: 10px; /* Adjust positioning */
  }
  
  .carousel-control-next {
    right: 10px; /* Adjust positioning */
  }
  
  /* Disable button styling */
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>
  