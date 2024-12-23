<template>
    <footer class="footer">
      <div class="container">
        <div class="info-section">
          <div class="brand">
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/182/690/original/thi-letter-logo-design-with-polygon-shape-thi-polygon-and-cube-shape-logo-design-thi-hexagon-logo-template-white-and-black-colors-thi-monogram-business-and-real-estate-logo-vector.jpg"
              alt="Logo"
              class="logo"
            />
            <h1 class="title">OnlineTest - Luyện thi miễn phí</h1>
          </div>
          <p class="description">
            OnlineTest là một hệ thống thi trắc nghiệm trực tuyến linh hoạt. Người dùng có thể tạo và tham gia các bài kiểm tra đa dạng với tính năng tùy chỉnh.
          </p>
          <div class="social-icons">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-github"></i>
            <i class="fa-brands fa-instagram"></i>
          </div>
        </div>
  
        <div class="links-section">
          <div>
            <h3 class="link-title">Về OnlineTest</h3>
            <ul class="links">
              <li>Group 3</li>
              <li>Tuyển dụng</li>
              <li>Group 3 Mall</li>
            </ul>
          </div>
          <div>
            <h3 class="link-title">Hỗ trợ</h3>
            <ul class="links">
              <li>Điều khoản</li>
              <li>Bảo mật</li>
              <li>Dịch vụ</li>
            </ul>
          </div>
          <div>
            <h3 class="link-title">Thông tin khác</h3>
            <ul class="links">
              <li>Group 3 Blog</li>
              <li>Thông tin đề thi</li>
              <li>Cam kết</li>
            </ul>
          </div>
        </div>
      </div>
  
      <hr class="divider" />
  
      <div class="footer-bottom">
        <div>
          <span>&copy; 2024 OnlineTest. Created with </span>
          <i class="fa-solid fa-heart text-red"></i>
          <span> by Group 3</span>
        </div>
        <div>
          <span>Trao tri thức - Nhận niềm tin!</span>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #1a202c;
    color: #a0aec0;
    padding: 40px 0;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .info-section {
    flex: 1;
    margin-bottom: 20px;
  }
  
  .brand {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .logo {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid #4a5568;
    margin-right: 16px;
  }
  
  .title {
    font-size: 1.5rem;
    color: #fff;
  }
  
  .description {
    color: #cbd5e0;
    max-width: 400px;
    line-height: 1.75;
    margin-bottom: 16px;
  }
  
  .social-icons {
    display: flex;
    gap: 12px;
    font-size: 1.5rem;
  }
  
  .social-icons i {
    color: #cbd5e0;
  }
  
  .links-section {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .link-title {
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 8px;
  }
  
  .links {
    list-style: none;
    padding: 0;
    color: #a0aec0;
  }
  
  .links li {
    margin-bottom: 8px;
  }
  
  .divider {
    margin: 24px 0;
    border: 0;
    border-top: 1px solid #2d3748;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #a0aec0;
  }
  
  .footer-bottom i {
    color: #e53e3e;
  }
  </style>
  