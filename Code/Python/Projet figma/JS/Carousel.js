// Sélection des éléments
const slides = document.querySelector('.slides');
const slides_container = Array.from(slides.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let slideWidth = document.querySelector('.slides img').offsetWidth + 10;
// Configuration initiale
let slideOffsets = Array(slides_container.length).fill(0);
let offset = -slideWidth;
let doubleOffset = -2 * slideWidth;
let interval

window.addEventListener('resize', () => {
  slideWidth = document.querySelector('.slides img').offsetWidth + 10;
  slideOffsets = Array(slides_container.length).fill(0);
  offset = -slideWidth;
  doubleOffset = -2 * slideWidth;
  initializeSlides();
});

function initializeSlides(){
  for (let i = 0; i < slides_container.length; i++) {
    if ( i === 0){
      slideOffsets[i] += doubleOffset
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
    else if ( i < 4) {
      slideOffsets[i] += offset
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
    slideOffsets[i] += -3 * offset;
    slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
  }
  for (let i = 0; i < slides_container.length; i++) {
    moveElementsforRight()
  }

  Timer()
}

function Timer(){
  clearInterval(interval);
  interval = setInterval(updateCarouselLeft, 7000)
}

prevButton.addEventListener('click', () => {
  Timer();
  updateCarouselRight();
});

// Fonction pour mettre à jour le carrousel a droite
function updateCarouselLeft() {
  // Désactiver les boutons pendant l'animation
  prevButton.disabled = true;
  nextButton.disabled = true;

  for (let i = 0; i < slides_container.length; i++) {
    if ( i === 1 || i === 4 ){
      slideOffsets[i] += doubleOffset
      slides_container[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
    else if ( i === 0) {
      slideOffsets[i] += -offset * (slides_container.length + 1)
      slides_container[i].style.transition = 'transform 0s ease-in-out';
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
    else{
      slideOffsets[i] += offset
      slides_container[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
  }
  for (let i = 0; i < slides_container.length + 1; i++) {
    moveElementsforRight()
  }  
  setTimeout(() => {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }, 500)
}



// Fonction de gestion des boutons précédent et suivant
nextButton.addEventListener('click', () => {
  Timer();
  updateCarouselLeft();
});

// Fonction pour mettre à jour le carrousel a gauche
function updateCarouselRight() {
  // Désactiver les boutons pendant l'animation
  prevButton.disabled = true;
  nextButton.disabled = true;

  for (let i = 0; i < slides_container.length; i++) {
    if ( i === 0 || i === 3 ){
      slideOffsets[i] += -doubleOffset
      slides_container[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
    else if ( i === slides_container.length - 1) {
      slideOffsets[i] += offset * (slides_container.length + 1)
      slides_container[i].style.transition = 'transform 0s ease-in-out';
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
    else {
      slideOffsets[i] += -offset
      slides_container[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container[i].style.transform = `translateX(${slideOffsets[i]}px)`;
    }
  }
  for (let i = 1; i < slides_container.length; i++) {
    moveElementsforRight()
  }
  setTimeout(() => {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }, 500)
}

// Fonction pour déplacer les éléments et les décalages
function moveElementsforRight() {
  // Déplacer les éléments du tableau slides_container
  const firstElement = slides_container.shift(); // Enlève le premier élément
  slides_container.push(firstElement); // Ajoute à la fin

  // Déplacer les offsets
  const firstOffset = slideOffsets.shift(); // Enlève le premier offset
  slideOffsets.push(firstOffset); // Ajoute à la fin
}

initializeSlides()