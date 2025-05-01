document.addEventListener("DOMContentLoaded", function () {

    // Status buka/tutup klinik
    function updateSignStatus() {
      const hour = new Date().getHours();
      const sign = document.getElementById("signboard");
      const text = document.getElementById("statusText");
  
      if (hour >= 9 && hour < 21) {
        text.innerText = "BUKA";
        sign.classList.remove("tutup");
      } else {
        text.innerText = "TUTUP";
        sign.classList.add("tutup");
      }
    }
  
    updateSignStatus();
    setInterval(updateSignStatus, 60000); // Perbarui setiap 1 menit
  
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
    const articleLinks = document.querySelectorAll('.article-link');

    articleLinks.forEach(link => {
        link.addEventListener('click', function (event) {
        const articleId = event.target.closest('a').getAttribute('data-id');
        window.location.href = `/artikel/detail.html?id=${articleId}`;
        });
    });
    
    // Menampilkan detail artikel berdasarkan ID
    const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        // Mengambil data artikel dari file JSON
        fetch('/artikel/artikel.json')
            .then(response => response.json())
            .then(articles => {
                // Menampilkan artikel berdasarkan ID
                if (articleId && articles[articleId]) {
                    document.getElementById('articleTitle').textContent = articles[articleId].title;
                    document.getElementById('articleDate').textContent = "Diterbitkan pada: " + articles[articleId].date;
                    document.getElementById('articleContent').textContent = articles[articleId].content;
                    document.getElementById('articleImage').src = articles[articleId].image;

                    const symptomsList = document.getElementById('articleSymptoms');
                    articles[articleId].symptoms.forEach(symptom => {
                        const li = document.createElement('li');
                        li.textContent = symptom;
                        symptomsList.appendChild(li);
                    });
                } else {
                    document.getElementById('articleTitle').textContent = "Artikel Tidak Ditemukan";
                    document.getElementById('articleDate').textContent = "";
                    document.getElementById('articleContent').textContent = "Artikel yang Anda cari tidak tersedia.";
                    document.getElementById('articleImage').style.display = 'none'; 
                }
            })
            .catch(error => {
                console.error("Error fetching article data:", error);
            });
  
  });
  