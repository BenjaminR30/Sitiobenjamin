// =======================
// Animación de scroll
// =======================
const elements = document.querySelectorAll('.animate');
function handleScroll() {
  const windowBottom = window.innerHeight;
  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowBottom - 50) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// =======================
// Efecto 3D en tarjetas
// =======================
const tarjetas = document.querySelectorAll('.tarjeta');
tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener('mousemove', (e) => {
    const rect = tarjeta.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    tarjeta.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  tarjeta.addEventListener('mouseleave', () => {
    tarjeta.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// =======================
// Toggle modo oscuro
// =======================
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️';
} else {
  toggleBtn.textContent = '🌙';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const darkModeOn = body.classList.contains('dark-mode');
  toggleBtn.textContent = darkModeOn ? '☀️' : '🌙';
  localStorage.setItem('theme', darkModeOn ? 'dark' : 'light');
});

// =======================
// Sidebar toggle (móviles)
// =======================
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('expanded');
});

// =======================
// Carrusel automático
// =======================
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let autoSlide = setInterval(nextSlide, 5000);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  let newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}
function prevSlide() {
  let newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});
prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAutoSlide();
  });
});

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}