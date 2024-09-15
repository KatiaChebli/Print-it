const slides = [
    {
        "image": "slide1.jpg",
        "tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
    },
    {
        "image": "slide2.jpg",
        "tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
    },
    {
        "image": "slide3.jpg",
        "tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
    },
    {
        "image": "slide4.png",
        "tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
    },
];

/* ETAPE2*/
// Sélectionner les flèches gauche et droite
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

    // Ajouter un event listener sur la flèche gauche
    leftArrow.addEventListener('click', function() {
        console.log('Flèche gauche cliquée');
    });

    // Ajouter un event listener sur la flèche droite
    rightArrow.addEventListener('click', function() {
        console.log('Flèche droite cliquée');
    });


let currentIndex = 0; // Index de l'image actuelle
let dots = [];


/*ETAPE3*/
// Sélectionner le conteneur des images et des points
const imagesContainer = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const dotsContainer = document.querySelector('.dots');
const titleElement = document.querySelector("#banner p"); // Sélectionner l'élément p pour afficher le titre

// Initialiser les bullet points
function initBullets() {
    slides.forEach(
		function (el, index) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
        dots.push(dot);

       
    });
}
initBullets();


/*Etape4*/

function createImageElement () {
	const img = document.createElement('img');
	img.src = `assets/images/slideshow/${slides[0].image}`;
	img.alt ='Image du carrousel'
	imagesContainer.appendChild(img)
	console.log(slides[0].image)
}
createImageElement ();


//trouver l'index courant de la dot actuellement active (img visible)
function getCurrentDotIndex(dots) {
    for (let i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('active')) {
            return i;
        }
    }
    return -1; // Si aucune dot n'est active, ce qui ne devrait pas arriver normalement
}

//calculer prochain index droite 
function getNextIndex(currentIndex, slides) {
    return (currentIndex + 1) % slides.length; 
}

//calculer précédent index gauche
function getPreviousIndex(currentIndex, slides) {
    return (currentIndex - 1 + slides.length) % slides.length;
}

// Fonction pour mettre à jour l'image et le titre
function updateImage(index) {
    const img = imagesContainer.querySelector('img'); // Sélection de l'image dans le conteneur
    const titleElement = document.querySelector("#banner p"); // Sélection de l'élément p pour afficher le titre
    
    if (img && titleElement) {
        // Mise à jour de l'attribut src de l'image
        img.src = `assets/images/slideshow/${slides[index].image}`;
        img.alt = slides[index].tagLine; // Mise à jour de l'attribut alt de l'image
        
        // Mise à jour du contenu du titre
        titleElement.innerHTML = slides[index].tagLine;

        console.log(`Image mise à jour: ${slides[index].image}, Titre: ${slides[index].tagLine}`);
    } else {
        console.error("Erreur: Impossible de trouver l'image ou l'élément de titre.");
    }

    // Mise à jour des bullets (dots)
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}


// Gestion du clic sur la flèche droite
rightArrow.addEventListener('click', function () {
    currentIndex = getNextIndex(currentIndex, slides);/*on apl la fonction getNextIndex*/
    updateImage(currentIndex);
});

// Gestion du clic sur la flèche gauche
leftArrow.addEventListener('click', function () {
    currentIndex = getPreviousIndex(currentIndex, slides);/*on apl la fonction getPreviousIndex*/
    updateImage(currentIndex);
});



//ETAPE5

//flèche droite
rightArrow.addEventListener('click', function () {
    // Si on est à la dernière image, revenir à la première
    if (currentIndex === slides.length - 1) {
        currentIndex = 0; // Revenir à la première image
    } else {
        currentIndex = getNextIndex(currentIndex, slides); // Sinon, aller à l'image suivante
    }
    updateImage(currentIndex); // Mettre à jour l'image, le texte, et le point
});

//flèche gauche
leftArrow.addEventListener('click', function () {
    // Si on est à la première image, revenir à la dernière
    if (currentIndex === 0) {
        currentIndex = slides.length - 1; // Revenir à la dernière image
    } else {
        currentIndex = getPreviousIndex(currentIndex, slides); // Sinon, aller à l'image précédente
    }
    updateImage(currentIndex); // Mettre à jour l'image, le texte, et le point
});
