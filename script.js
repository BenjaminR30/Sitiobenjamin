// Animación de scroll
const elements = document.querySelectorAll('.animate');
function handleScroll() {
    const windowBottom = window.innerHeight;
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowBottom - 50) { el.classList.add('visible'); }
    });
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Efecto 3D en tarjetas
const tarjetas = document.querySelectorAll('.tarjeta');
tarjetas.forEach(tarjeta => {
    tarjeta.addEventListener('mousemove', (e) => {
        const rect = tarjeta.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width/2; const centerY = rect.height/2;
        const rotateX = ((y-centerY)/centerY)*10; const rotateY = ((x-centerX)/centerX)*10;
        tarjeta.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    tarjeta.addEventListener('mouseleave',()=>{ tarjeta.style.transform='rotateX(0deg) rotateY(0deg) scale(1)'; });
});

// Toggle modo oscuro con localStorage
const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;
if (localStorage.getItem('theme')==='dark'){ body.classList.add('dark-mode'); toggleBtn.textContent='☀️ Modo claro'; }
toggleBtn.addEventListener('click',()=>{
    body.classList.toggle('dark-mode');
    const darkModeOn=body.classList.contains('dark-mode');
    toggleBtn.textContent=darkModeOn?'☀️ Modo claro':'🌙 Modo oscuro';
    localStorage.setItem('theme',darkModeOn?'dark':'light');
});
