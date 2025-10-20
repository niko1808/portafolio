const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

// Tamaño inicial del canvas
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Letras que caerán (efecto Matrix)
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;

// Arreglo con la posición de caída por columna
const drops = Array.from({ length: columns }).fill(1);

function draw() {
  // Fondo semitransparente para el efecto de estela
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cambia de color según el scroll (verde arriba, blanco abajo)
  const scrollY = window.scrollY;
  const color = scrollY > 600 ? "#ffffff" : "#00ff00";

  ctx.fillStyle = color;
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Controla la “velocidad de caída” de cada letra
    // Cuanto menor el valor, más lenta la animación
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += 0.5; // <--- valor reducido (antes era 1)
  }
}

// Intervalo más lento: 50 ms (antes 35 ms)
setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
