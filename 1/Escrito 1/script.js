document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', function() {
        // Quitar activo de todos
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('activo'));
        // Poner activo al actual
        this.classList.add('activo');
        
        console.log("Cambiando a pestaña " + this.dataset.tab);
        // Aquí podrías cambiar el texto e imagen del feature-content
    });
});

// 1. Datos de los apartados
const featureData = {
    "1": {
        title: "Bookmark in one click",
        desc: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
        img: "img/illustration-features-tab-1.svg"
    },
    "2": {
        title: "Intelligent search",
        desc: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.",
        img: "img/illustration-features-tab-2.svg"
    },
    "3": {
        title: "Share your bookmarks",
        desc: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.",
        img: "img/illustration-features-tab-3.svg"
    }
};

// 2. Función para cambiar el contenido
function updateTabContent(tabId) {
    const contentArea = document.getElementById('feature-content');
    const data = featureData[tabId];

    // Usamos una pequeña animación de desvanecimiento
    contentArea.style.opacity = 0;

    setTimeout(() => {
        contentArea.innerHTML = `
            <div class="col-lg-6 feature-img-container">
                <img src="${data.img}" alt="${data.title}" class="img-fluid">
            </div>
            <div class="col-lg-6 text-center text-lg-start mt-5 mt-lg-0">
                <h3 class="h2">${data.title}</h3>
                <p class="text-muted texto-limitado mx-auto mx-lg-0">${data.desc}</p>
                <button class="btn btn-azul mt-3">More Info</button>
            </div>
        `;
        contentArea.style.opacity = 1;
    }, 200);
}

// 3. Escuchar los clics en las pestañas
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', function() {
        // Cambiar clase activa visualmente
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('activo'));
        this.classList.add('activo');

        // Actualizar el contenido según el data-tab
        const tabId = this.getAttribute('data-tab');
        updateTabContent(tabId);
    });
});

// Cargar la primera pestaña por defecto al iniciar
updateTabContent("1");

const form = document.getElementById('contactForm');
const emailInput = document.getElementById('emailInput');
const errorContainer = emailInput.parentElement; // El div que envuelve al input

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email

    if (!emailPattern.test(emailValue)) {
        // Si el email es inválido, mostramos el error
        errorContainer.classList.add('input-error');
    } else {
        // Si es válido, lo quitamos y podrías enviar los datos
        errorContainer.classList.remove('input-error');
        alert('¡Gracias por suscribirte!');
        emailInput.value = ''; // Limpiamos el campo
    }
});

// Opcional: Quitar el error mientras el usuario vuelve a escribir
emailInput.addEventListener('input', () => {
    errorContainer.classList.remove('input-error');
});