// Datos de los miembros del carrusel
const members = [
    { name: "André Breton", role: "Fundador y Teórico", img: "img/breton.png" },
    { name: "Salvador Dalí", role: "Pintor y Escultor", img: "img/dali.png" },
    { name: "Max Ernst", role: "Pintor y Escultor", img: "img/ernst.png" },
    { name: "René Magritte", role: "Pintor", img: "img/magritte.png" },
    { name: "Joan Miró", role: "Pintor y Escultor", img: "img/miro.png" },
    { name: "Remedios Varo", role: "Pintora", img: "img/varo.png" }
];

// Funcionalidad del carrusel
const carouselTrack = document.querySelector('.carousel-track');
const dotsContainer = document.querySelector('.dots');
const memberName = document.querySelector('.member-name');
const memberRole = document.querySelector('.member-role');
const leftArrow = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;

function updateCarousel(index) {
    currentIndex = index;

    const totalMembers = members.length;
    const currentMember = members[index];

    if (memberName) { // Check if element exists before accessing textContent
        memberName.textContent = currentMember.name;
    }
    if (memberRole) { // Check if element exists before accessing textContent
        memberRole.textContent = currentMember.role;
    }

    document.querySelectorAll('.dots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    cards.forEach((card, i) => {
        const pos = (i - currentIndex + totalMembers) % totalMembers;
        card.classList.remove('center', 'left-1', 'left-2', 'right-1', 'right-2', 'hidden');
        switch (pos) {
            case 0:
                card.classList.add('center');
                break;
            case 1:
                card.classList.add('right-1');
                break;
            case 2:
                card.classList.add('right-2');
                break;
            case totalMembers - 1:
                card.classList.add('left-1');
                break;
            case totalMembers - 2:
                card.classList.add('left-2');
                break;
            default:
                card.classList.add('hidden');
                break;
        }
    });
}

function moveToIndex(index) {
    if (index < 0) {
        index = members.length - 1;
    } else if (index >= members.length) {
        index = 0;
    }
    updateCarousel(index);
}

if (carouselTrack) {
    // Crear puntos
    members.forEach((member, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = index;
        if (index === 0) {
            dot.classList.add('active');
        }
        if (dotsContainer) { // Check if dotsContainer exists
            dotsContainer.appendChild(dot);
        }
    });

    // Event Listeners para los puntos
    document.querySelectorAll('.dots .dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            moveToIndex(index);
        });
    });

    // Event Listeners para las flechas
    if (leftArrow) { // Check if leftArrow exists
        leftArrow.addEventListener('click', () => {
            moveToIndex(currentIndex - 1);
        });
    }
    if (rightArrow) { // Check if rightArrow exists
        rightArrow.addEventListener('click', () => {
            moveToIndex(currentIndex + 1);
        });
    }

    // Iniciar con el primer miembro
    updateCarousel(0);
}

// Hiding header on scroll (keep this as it's a general site functionality)
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header) { // Check if header exists
        if (scrollTop > lastScrollTop) {
            // Downscroll
            header.classList.add("header-hidden");
        } else {
            // Upscroll
            header.classList.remove("header-hidden");
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);

// Unirse page animation
const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const userForms = document.getElementById('user_options-forms');

if (signupButton) {
    signupButton.addEventListener('click', () => {
        userForms.classList.remove('bounceRight');
        userForms.classList.add('bounceLeft');
    }, false);
}

if (loginButton) {
    loginButton.addEventListener('click', () => {
        userForms.classList.remove('bounceLeft');
        userForms.classList.add('bounceRight');
    }, false);
}

// Timeline functionality for artist pages
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.input-flex-container .input');
    const paras = document.querySelectorAll('.description-flex-container p');

    inputs.forEach((input, index) => {
        input.addEventListener('click', function() {
            // Remove 'active' from all inputs and paragraphs
            inputs.forEach(item => item.classList.remove('active'));
            paras.forEach(item => item.classList.remove('active'));

            // Add 'active' to the clicked input and corresponding paragraph
            this.classList.add('active');
            if (paras[index]) { // Check if paragraph exists
                paras[index].classList.add('active');
            }
        });
    });

    // Set the first item as active by default
    if (inputs.length > 0 && paras.length > 0) {
        inputs[0].classList.add('active');
        paras[0].classList.add('active');
    }
});

// Modal functionality
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

if (modal && modalImg && captionText) { // Only run if modal elements exist
    document.querySelectorAll('.gallery__item a').forEach(link => {
        link.onclick = function(event){
            event.preventDefault(); // Prevent default link behavior
            modal.style.display = "flex";
            modalImg.src = this.dataset.image;
            captionText.innerHTML = this.dataset.description;
        }
    });

    const span = document.getElementsByClassName("close")[0];

    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
