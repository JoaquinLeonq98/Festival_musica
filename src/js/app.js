// aplicación para generar una galeria de imagenes de forma dinámica
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
    
})

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body= document.querySelector('body');

    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().top <= 0) {
            barra.classList.add('fijar-header');
            body.classList.add('body-scroll');
        }
        else {
            barra.classList.remove('fijar-header');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value)

            seccion.scrollIntoView({behavior: 'smooth'}); // smooth hace que el scroll sea suave medianamente esta API
        });
    });
}


function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for(let i = 1; i <= 12; i++) {
        const img = document.createElement('picture');
        img.innerHTML = `
        <source srcset="./build/img/thumb/${i}.avif" type="image/avif"/>
                <source srcset="./build/img/thumb${i}.webp" type="image/webp"/>
                <img loading="lazy" width="200" height="300" srcset="./build/img/thumb/${i}.jpg" alt="imagen galeria">
        `
        // creacion de modal al dar click el parametro dtecta a que elemento se le dio click
        img.onclick = function() {
            mostrarimagen(i);
        }
        galeria.appendChild(img);
    }
}

// crea el modal y le asigna una imagen
function mostrarimagen(id) {
    const img = document.createElement('picture');
        img.innerHTML = `
        <source srcset="./build/img/grande/${id}.avif" type="image/avif"/>
                <source srcset="./build/img/grande/${id}.webp" type="image/webp"/>
                <img loading="lazy" width="200" height="300" srcset="./build/img/grande/${id}.jpg" alt="imagen galeria">
        `
        // crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(img);
        overlay.classList.add('overlay');
        overlay.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }

        // Boton para cerrar el modal
        const cerrarModal = document.createElement('p');
        cerrarModal.textContent =  'X';
        cerrarModal.classList.add('btn-cerrar');
        cerrarModal.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }
        overlay.appendChild(cerrarModal);
        // añade la imagen al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
}