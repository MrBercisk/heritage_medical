document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    const articles = {
      "gonorea-atau-kencing-nanah": {
        title: "Gonorea atau Kencing Nanah",
        date: "1 Mei 2025",
        content: "Gonorea adalah penyakit menular seksual yang disebabkan oleh bakteri...",
        image: "assets/img/gonorea.jpg"
      },
      // tambahkan artikel lainnya di sini
    };

    const article = articles[slug];

    if (article) {
      document.getElementById("articleTitle").innerText = article.title;
      document.getElementById("articleDate").innerText = article.date;
      document.getElementById("articleContent").innerText = article.content;
      document.getElementById("articleImage").src = article.image;
    } else {
      document.getElementById("articleTitle").innerText = "Artikel tidak ditemukan";
      document.getElementById("articleContent").innerText = "Silakan kembali ke halaman utama.";
    }
  });