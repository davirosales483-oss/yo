document.addEventListener("DOMContentLoaded", () => {
  // Configurar textos iniciales desde config.js
  document.getElementById("badge-text").textContent = CONFIG.tituloInicial;
  document.getElementById("title-text").textContent = CONFIG.mensajeInicial;
  document.getElementById("subtitle-text").textContent = CONFIG.submensajeInicial;
  
  // Asignar personaje y música
  document.getElementById("floating-character").src = CONFIG.personajeUrl;
  const music = document.getElementById("bg-music");
  music.src = CONFIG.musicaUrl;
});

document.getElementById("push-btn").addEventListener("click", () => {
  // 1. Ocultar pantalla inicial
  document.getElementById("start-screen").classList.add("hidden");

  // 2. Mostrar la escena principal
  const flowerScene = document.getElementById("flower-scene");
  flowerScene.classList.remove("hidden");

  // 3. Reproducir música
  const music = document.getElementById("bg-music");
  music.play().catch(e => console.log("Audio play error:", e));

  // 4. Iniciar efectos
  createSparkles();
  startMessageRotation();
});

// Cambiar frases dinámicamente
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

// Generador de luces flotantes
function createSparkles() {
  const container = document.getElementById("sparkles-container");
  for (let i = 0; i < 30; i++) {
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