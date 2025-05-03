document.addEventListener("DOMContentLoaded", function () {
    // Form submit ke WhatsApp
    document.getElementById("wa-form").addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const doctor = document.getElementById("doctor").value;
      const date = document.getElementById("dateInput").value;
      const time = document.getElementById("timeInput").value;
      const problem = document.getElementById("problem").value;

      const message =
        `👋 Halo Klinik, saya ingin membuat janji dengan rincian berikut:\n\n` +
        `👤 Nama: ${name}\n` +
        `📧 Email: ${email}\n` +
        `📱 No HP: ${mobile}\n` +
        `💊 Dokter: ${doctor}\n` +
        `📅 Tanggal: ${date}\n` +
        `⏰ Waktu: ${time}\n` +
        `📝 Keluhan: ${problem}`;

      const phone = "6281334485889"; // Nomor WhatsApp klinik
      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank");
    });

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
    const slider = document.getElementById('scrollArticles');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
  
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
  
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
  
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      slider.scrollLeft = scrollLeft - walk;
    });
  
    // Touch support (for mobile)
    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
  
    slider.addEventListener('touchend', () => {
      isDown = false;
    });
  
    slider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
    const modalPreview = document.getElementById('modalPreview');
    modalPreview.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const imgSrc = button.getAttribute('data-img');
      const imgElement = modalPreview.querySelector('#previewImage');
      imgElement.src = imgSrc;
    });
 
  });