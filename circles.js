const canvas = document.getElementById("bg-circles");
const ctx = canvas.getContext("2d");

let circles = [];
const numCircles = 40;

// Ajustar tamaño del canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Función de interpolación lineal
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Crear círculos iniciales
for (let i = 0; i < numCircles; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 15 + 8,
    dx: (Math.random() - 0.5) * 1.2,
    dy: (Math.random() - 0.5) * 1.2,
    t: Math.random(), // valor entre 0 y 1 para interpolar color
    dir: Math.random() > 0.5 ? 1 : -1, // dirección del cambio
    alpha: Math.random() * 0.3 + 0.2
  });
}

let mouse = { x: null, y: null };
canvas.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let circle of circles) {
    circle.x += circle.dx;
    circle.y += circle.dy;

    // Rebote en bordes
    if (circle.x + circle.r > canvas.width || circle.x - circle.r < 0) circle.dx *= -1;
    if (circle.y + circle.r > canvas.height || circle.y - circle.r < 0) circle.dy *= -1;

    // Oscilar entre morado (285°) y aquamarine (165°)
    circle.t += 0.005 * circle.dir;
    if (circle.t >= 1 || circle.t <= 0) circle.dir *= -1;

    let hue = lerp(285, 165, circle.t); // interpolación entre morado y aqua

    // Interacción con el mouse
    let dist = Math.hypot(mouse.x - circle.x, mouse.y - circle.y);
    if (dist < 100) {
      ctx.beginPath();
      ctx.moveTo(circle.x, circle.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `hsla(${hue}, 100%, 70%, 0.4)`;
      ctx.stroke();
      ctx.closePath();
    }

    // Dibujar círculo
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${circle.alpha})`;
    ctx.fill();
    ctx.closePath();
  }

  requestAnimationFrame(animate);
}
animate();
