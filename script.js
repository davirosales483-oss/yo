document.addEventListener("DOMContentLoaded", () => {
  // Configurar textos e imágenes desde config.js
  document.getElementById("badge-text").textContent = CONFIG.tituloInicial;
  document.getElementById("title-text").textContent = CONFIG.mensajeInicial;
  document.getElementById("subtitle-text").textContent = CONFIG.submensajeInicial;
  document.getElementById("floating-character").src = CONFIG.personajeUrl;

  const music = document.getElementById("bg-music");
  if (CONFIG.musicaUrl) {
    music.src = CONFIG.musicaUrl;
  }
});

document.getElementById("push-btn").addEventListener("click", function() {
  const music = document.getElementById("bg-music");

  // Intentar reproducir el audio de forma segura sin bloquear la animación
  if (music) {
    music.play().catch(err => console.log("Info sobre audio:", err));
  }

  // 1. Ocultar pantalla inicial
  document.getElementById("start-screen").classList.add("hidden");

  // 2. Mostrar la escena principal de las flores
  const flowerScene = document.getElementById("flower-scene");
  flowerScene.classList.remove("hidden");

  // 3. Iniciar animaciones de luces y mensajes
  createSparkles();
  startMessageRotation();
});

// Rotación de mensajes
let currentMessageIndex = 0;
function startMessageRotation() {
  const messageElement = document.getElementById("dynamic-message");

  function showNextMessage() {
    messageElement.classList.remove("visible");

    setTimeout(() => {
      messageElement.textContent = CONFIG.mensajes[currentMessageIndex];
      messageElement.classList.add("visible");
      currentMessageIndex = (currentMessageIndex + 1) % CONFIG.mensajes.length;
    }, 800);
  }

  showNextMessage();
  setInterval(showNextMessage, CONFIG.tiempoMensaje);
}

// Generador de brillos/luces de fondo
function createSparkles() {
  const container = document.getElementById("sparkles-container");
  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.position = "absolute";
    sparkle.style.width = Math.random() * 5 + 2 + "px";
    sparkle.style.height = sparkle.style.width;
    sparkle.style.background = "#ffe600";
    sparkle.style.borderRadius = "50%";
    sparkle.style.boxShadow = "0 0 10px #ffe600";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.opacity = Math.random();
    sparkle.style.transition = "all 2s ease";

    setInterval(() => {
      sparkle.style.transform = `translateY(${Math.random() * -30}px)`;
      sparkle.style.opacity = Math.random();
    }, Math.random() * 2000 + 1000);

    container.appendChild(sparkle);
  }
}