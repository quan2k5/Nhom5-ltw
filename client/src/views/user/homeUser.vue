<template>
    <div class="container">
        <main class="main-content">
            <section class="carousel-container">
                <div class="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item">
                            <img :src="carouselItems[0].imgSrc" :alt="'Slide 1'" />
                            <div class="carousel-caption">
                                <h1>{{ carouselItems[0].captionTitle }}</h1>
                                <p>{{ carouselItems[0].captionText }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="banner">
                <div class="banner-content">
                    <h1>Công cụ ôn thi</h1>
                    <p>Trắc nghiệm hiệu quả</p>
                    <p>
                        Thông qua các bài thi trắc nghiệm, công cụ sẽ giúp bạn học tập, ôn thi
                        hiệu quả hơn, đạt điểm cao hơn.
                    </p>
                    <div class="banner-stats">
                        <div>
                            <p>10M+</p>
                            <p>Lượt truy cập</p>
                        </div>
                        <div>
                            <p>10K+</p>
                            <p>Đề thi</p>
                        </div>
                        <div>
                            <p>100M+</p>
                            <p>Lượt thi</p>
                        </div>
                    </div>
                </div>
            </div>
            <section class="courses">
                <h1 class="courses-title">Các khóa luyện thi</h1>
                <CourseItem></CourseItem>
            </section>
        </main>
    </div>
</template>

<script setup>
import CourseItem from '@/components/CourseItem.vue';
import { ref } from 'vue'

const carouselItems = ref([
    {
        imgSrc: "https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2022/10/24/14bd_-E1-BA-A2nh-banner-website-03.jpg",
        captionTitle: "Khóa luyện thi THPT",
        captionText: "Khóa luyện thi dành cho học sinh lớp 10,11,12,13",
    }
]);
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f3f3f3;
}

.main-content {
    flex: 1;
}

/* Carousel */
.carousel-container {
    position: relative;
}

.carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-item {
    min-width: 100%;
    position: relative; /* Set position relative to contain caption */
}

.carousel-item img {
    width: 100%; /* Ensures the image covers the full width */
    height: 450px; /* Set fixed height for the image */
    object-fit: cover; /* Ensures the image covers the area without distortion */
}

.carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 15px;
}

/* Banner */
.banner {
    background-color: #1a1a1a;
    color: white;
    padding: 40px 20px;
    text-align: center;
    margin-bottom: 40px;
}

.banner-content {
    max-width: 800px;
    margin: 0 auto;
}

.banner-button {
    background-color: #007bff;
    color: white;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.banner-button:hover {
    background-color: #0056b3;
}

.banner-stats {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
}

.banner-stats div {
    text-align: center;
}

.banner-stats p:first-child {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 5px;
}

.courses {
    padding: 40px 20px;
}

.courses-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 20px;
}
</style>
