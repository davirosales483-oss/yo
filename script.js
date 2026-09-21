document.getElementById("push-btn").addEventListener("click", function() {
  const music = document.getElementById("bg-music");

  if (music) {
    // Si la URL estaba en config, aseguramos sincronización
    if (!music.src || music.src === "") {
      music.src = CONFIG.musicaUrl;
    }
    
    music.load(); // Carga el buffer del audio en móviles
    
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay impedido:", error);
      });
    }
  }

  // Ocultar pantalla inicial
  document.getElementById("start-screen").classList.add("hidden");

  // Mostrar escena principal
  const flowerScene = document.getElementById("flower-scene");
  flowerScene.classList.remove("hidden");

  // Iniciar efectos
  createSparkles();
  startMessageRotation();
});