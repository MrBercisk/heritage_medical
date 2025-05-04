document.addEventListener("DOMContentLoaded", function () {
  // Status buka/tutup klinik
  function updateSignStatus() {
      const sign = document.getElementById("signboard");
      const text = document.getElementById("statusText");
      
      if (sign && text) {
          const hour = new Date().getHours();
          if (hour >= 9 && hour < 21) {
              text.innerText = "BUKA";
              sign.classList.remove("tutup");
          } else {
              text.innerText = "TUTUP";
              sign.classList.add("tutup");
          }
      }
  }
  
  if (document.getElementById("signboard")) {
      updateSignStatus();
      setInterval(updateSignStatus, 60000); // Perbarui setiap 1 menit
  }
  
  // Aktifkan menu navbar
  const currentPath = window.location.pathname.replace(/\/$/, "");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  
  navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname.replace(/\/$/, "");
      if (linkPath === currentPath || (currentPath === "/index.html" && linkPath === "/")) {
          link.classList.add("active");
      } else {
          link.classList.remove("active");
      }
  });
  
  // Modifikasi kode artikel untuk menghilangkan .html dari URL
  const articleLinks = document.querySelectorAll('.article-link');
  articleLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault(); // Mencegah perilaku default dari link
          const articleId = this.getAttribute('data-id');
          
          // Menggunakan history.pushState untuk mengubah URL tanpa .html
          const cleanUrl = `/artikel/detail?id=${articleId}`;
          history.pushState({id: articleId}, "", cleanUrl);
          
          // Redirect ke halaman detail
          window.location.href = cleanUrl;
      });
  });
  
  // Mengecek jika halaman adalah halaman detail artikel
  if (window.location.pathname.includes('/artikel/detail')) {
      // Mengambil ID artikel dari URL
      const urlParams = new URLSearchParams(window.location.search);
      const articleId = urlParams.get('id');
      
      if (articleId) {
          // Memuat artikel berdasarkan ID
          loadArticleById(articleId);
      }
  }
  
  // Fungsi untuk memuat artikel berdasarkan ID
  function loadArticleById(id) {
      fetch('/artikel/artikel.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(articles => {
              console.log("Loaded articles:", articles);
              console.log("Looking for article ID:", id);
              
              if (id && articles[id]) {
                  const article = articles[id];
                  console.log("Found article:", article);
                  
                  // Mengisi data artikel ke elemen HTML
                  const titleElement = document.getElementById('articleTitle');
                  const dateElement = document.getElementById('articleDate');
                  const contentElement = document.getElementById('articleContent');
                  const imageElement = document.getElementById('articleImage');
                  const symptomsList = document.getElementById('articleSymptoms');
                  
                  if (titleElement) titleElement.textContent = article.title;
                  if (dateElement) dateElement.textContent = "Diterbitkan pada: " + article.date;
                  if (contentElement) contentElement.textContent = article.content;
                  if (imageElement) {
                      imageElement.src = article.image;
                      imageElement.alt = article.title;
                  }
                  
                  // Menangani symptoms jika ada
                  if (symptomsList && article.symptoms && Array.isArray(article.symptoms)) {
                      symptomsList.innerHTML = ''; // Clear existing symptoms
                      article.symptoms.forEach(symptom => {
                          const li = document.createElement('li');
                          li.className = "mb-2";
                          li.innerHTML = `<i class="fas fa-check-circle text-danger me-2"></i>${symptom}`;
                          symptomsList.appendChild(li);
                      });
                  } else if (symptomsList && !article.symptoms) {
                      // Sembunyikan daftar gejala jika tidak ada
                      symptomsList.style.display = 'none';
                  }
              } else {
                  console.error("Article not found with ID:", id);
                  document.getElementById('articleTitle').textContent = "Artikel Tidak Ditemukan";
                  document.getElementById('articleDate').textContent = "";
                  document.getElementById('articleContent').textContent = "Artikel yang Anda cari tidak tersedia.";
                  
                  const imageElement = document.getElementById('articleImage');
                  if (imageElement) imageElement.style.display = 'none';
                  
                  const symptomsList = document.getElementById('articleSymptoms');
                  if (symptomsList) symptomsList.style.display = 'none';
              }
          })
          .catch(error => {
              console.error("Error fetching article data:", error);
              document.getElementById('articleTitle').textContent = "Error Loading Article";
              document.getElementById('articleContent').textContent = "Terjadi kesalahan saat memuat artikel. Silakan coba lagi nanti.";
          });
  }
});