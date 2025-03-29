// Sélection des éléments
const slides2 = document.querySelector('.slides_2');
const slides_container2 = Array.from(slides2.children);
const prevButton2 = document.querySelector('.prev_2');
const nextButton2 = document.querySelector('.next_2');
const slideWidth2 = document.querySelector('.slides_2 img').offsetWidth + 10;

// Configuration initiale
const slideOffsets2 = Array(slides_container2.length).fill(0);
const offset2 = -slideWidth2;
const doubleOffset2 = -2 * slideWidth2;
let interval2;

for (let i = 0; i < slides_container2.length; i++) {
  if (i === 0) {
    slideOffsets2[i] += doubleOffset2;
    slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
  } else if (i < 4) {
    slideOffsets2[i] += offset2;
    slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
  }
  slideOffsets2[i] += -offset2;
  slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
}
for (let i = 0; i < slides_container2.length; i++) {
  moveElementsforRight2();
}

Timer2();

function Timer2() {
  clearInterval(interval2);
  interval2 = setInterval(updateCarouselRight2, 7000);
}

prevButton2.addEventListener('click', () => {
  Timer2();
  updateCarouselLeft2();
});

// Fonction pour mettre à jour le carrousel à droite
function updateCarouselLeft2() {
  // Désactiver les boutons pendant l'animation
  prevButton2.disabled = true;
  nextButton2.disabled = true;

  for (let i = 0; i < slides_container2.length; i++) {
    if (i === 1 || i === 4) {
      slideOffsets2[i] += doubleOffset2;
      slides_container2[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
    } else if (i === 0) {
      slideOffsets2[i] += -offset2 * (slides_container2.length + 1);
      slides_container2[i].style.transition = 'transform 0s ease-in-out';
      slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
    } else {
      slideOffsets2[i] += offset2;
      slides_container2[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
    }
  }
  for (let i = 0; i < slides_container2.length + 1; i++) {
    moveElementsforRight2();
  }
  setTimeout(() => {
    prevButton2.disabled = false;
    nextButton2.disabled = false;
  }, 500);
}

// Fonction de gestion des boutons précédent et suivant
nextButton2.addEventListener('click', () => {
  Timer2();
  updateCarouselRight2();
});

// Fonction pour mettre à jour le carrousel à gauche
function updateCarouselRight2() {
  // Désactiver les boutons pendant l'animation
  prevButton2.disabled = true;
  nextButton2.disabled = true;

  for (let i = 0; i < slides_container2.length; i++) {
    if (i === 0 || i === 3) {
      slideOffsets2[i] += -doubleOffset2;
      slides_container2[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
    } else if (i === slides_container2.length - 1) {
      slideOffsets2[i] += offset2 * (slides_container2.length + 1);
      slides_container2[i].style.transition = 'transform 0s ease-in-out';
      slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
    } else {
      slideOffsets2[i] += -offset2;
      slides_container2[i].style.transition = 'transform 0.5s ease-in-out';
      slides_container2[i].style.transform = `translateX(${slideOffsets2[i]}px)`;
    }
  }
  for (let i = 1; i < slides_container2.length; i++) {
    moveElementsforRight2();
  }
  setTimeout(() => {
    prevButton2.disabled = false;
    nextButton2.disabled = false;
  }, 500);
}

// Fonction pour déplacer les éléments et les décalages
function moveElementsforRight2() {
  // Déplacer les éléments du tableau slides_container2
  const firstElement2 = slides_container2.shift(); // Enlève le premier élément
  slides_container2.push(firstElement2); // Ajoute à la fin

  // Déplacer les offsets
  const firstOffset2 = slideOffsets2.shift(); // Enlève le premier offset
  slideOffsets2.push(firstOffset2); // Ajoute à la fin
}
