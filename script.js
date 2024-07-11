document.addEventListener('DOMContentLoaded', () => {
    const animalCards = document.querySelectorAll('.animal-card');
    const imageViewer = document.getElementById('image-viewer');
    const viewerImage = document.getElementById('viewer-image');
    const closeButton = document.querySelector('.close');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let currentSound = null;

    // Mapeo de los datos de los animales
    const animals = Array.from(animalCards).map(card => ({
        imgSrc: card.querySelector('img').src,
        soundSrc: card.getAttribute('data-sound'),
        altText: card.querySelector('img').alt
    }));

    // Función para reproducir sonido
    const playSound = (soundSrc) => {
        // Detener y reiniciar el sonido actual si existe
        if (currentSound) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        currentSound = new Audio(soundSrc);
        currentSound.play();
    };

    // Función para mostrar el visor de imágenes
    const showImageViewer = (index) => {
        currentIndex = index;
        const animal = animals[currentIndex];
        viewerImage.src = animal.imgSrc;
        viewerImage.alt = animal.altText;
        imageViewer.style.display = 'flex';
        playSound(animal.soundSrc);
    };

    // Función para ocultar el visor de imágenes
    const hideImageViewer = () => {
        imageViewer.style.display = 'none';
        if (currentSound) {
            currentSound.pause();
        }
    };

    // Función para mostrar la imagen anterior en el visor
    const showPrevImage = () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : animals.length - 1;
        showImageViewer(currentIndex);
    };

    // Función para mostrar la siguiente imagen en el visor
    const showNextImage = () => {
        currentIndex = (currentIndex < animals.length - 1) ? currentIndex + 1 : 0;
        showImageViewer(currentIndex);
    };

    // Agregar eventos de clic a cada tarjeta de animal
    animalCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showImageViewer(index);
        });
    });

    // Agregar eventos de clic a los botones del visor de imágenes
    closeButton.addEventListener('click', hideImageViewer);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Reproducir sonido al hacer clic en la imagen del visor
    viewerImage.addEventListener('click', () => {
        const animal = animals[currentIndex];
        playSound(animal.soundSrc);
    });
});
