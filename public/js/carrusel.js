let slideIndex = 1; //Establece el slide inicial
showSlides(slideIndex)

// Controles de anterior y siguiente
function plusSlides(number) {
    showSlides(slideIndex += number)
}

// Controles de imagen en miniatura
function currentSlide (number) {
    showSlides(slideIndex = number)
}

function showSlides (number) {
    let i;
    let slides = document.querySelectorAll(".slides"); 
    let dots = document.querySelectorAll(".dot");
    if (number > slides.length) {
        slideIndex = 1
    }

    if (number < 1 ) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" dot-active", "");
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " dot-active";
}

/* EXTRAAAA */

setInterval(() => {
    currentSlide(slideIndex + 1)
}, 7000); 