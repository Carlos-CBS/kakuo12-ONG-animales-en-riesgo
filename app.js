let personas = [
    { dni: '12345678A', nombre: 'Juan Pérez', imagen: 'adoptado.avif', motivacion: 'Amante de los animales, busca un compañero leal.' },
    { dni: '87654321B', nombre: 'María López', imagen: 'adoptado.avif', motivacion: 'Desea dar un hogar a un animal necesitado.' },
    { dni: '11223344C', nombre: 'Carlos García', imagen: 'adoptado.avif', motivacion: 'Quiere un amigo peludo para sus paseos.' },
    { dni: '44556677D', nombre: 'Laura Martínez', imagen: 'adoptado.avif', motivacion: 'Le gustaría adoptar un gato cariñoso.' },
    { dni: '99887766E', nombre: 'José Fernández', imagen: 'adoptado.avif', motivacion: 'Está buscando un compañero de aventuras.' },
    { dni: '22334455F', nombre: 'Ana Torres', imagen: 'adoptado.avif', motivacion: 'Desea adoptar un perro para jugar con sus hijos.' },
    { dni: '66778899G', nombre: 'Luis Ramírez', imagen: 'adoptado.avif', motivacion: 'Ama a los animales y quiere brindarles amor.' },
    { dni: '33221100H', nombre: 'Sofía González', imagen: 'adoptado.avif', motivacion: 'Buscando un compañero fiel para pasear.' },
    { dni: '55664433I', nombre: 'David Herrera', imagen: 'adoptado.avif', motivacion: 'Está listo para darle una segunda oportunidad a un animal.' },
    { dni: '88990011J', nombre: 'Isabel Castillo', imagen: 'adoptado.avif', motivacion: 'Le encantan los gatos y quiere adoptar uno.' }
];

let animales = [
    { nombre: 'Paco', raza: 'Perro', foto: 'https://abrazoanimal.org/wp-content/uploads/2023/10/WEB-PORTADA-28.png', descripcion: 'Paco es un perro juguetón y cariñoso que busca un hogar lleno de amor.' },
    { nombre: 'Mishu', raza: 'Gato', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKZfEHBba1TsPz-PEcQsCRhPql6mZWPzErw&s', descripcion: 'Mishu es un gato dulce y curioso que adora explorar su entorno.' },
    { nombre: 'Luna', raza: 'Perro', foto: 'https://via.placeholder.com/100x100?text=Luna', descripcion: 'Luna es una perra tranquila que ama los paseos largos.' },
    { nombre: 'Gato', raza: 'Gato', foto: 'https://via.placeholder.com/100x100?text=Gato', descripcion: 'Gato es un aventurero, siempre en busca de nuevos lugares.' },
    { nombre: 'Rex', raza: 'Perro', foto: 'https://via.placeholder.com/100x100?text=Rex', descripcion: 'Rex es un perro guardián leal y protector.' },
    { nombre: 'Nala', raza: 'Gato', foto: 'https://via.placeholder.com/100x100?text=Nala', descripcion: 'Nala es una gata juguetona y llena de energía.' },
    { nombre: 'Bruno', raza: 'Perro', foto: 'https://via.placeholder.com/100x100?text=Bruno', descripcion: 'Bruno es un perro amigable que se lleva bien con todos.' },
    { nombre: 'Cleo', raza: 'Gato', foto: 'https://via.placeholder.com/100x100?text=Cleo', descripcion: 'Cleo es una gata elegante y tranquila, perfecta para cualquier hogar.' },
    { nombre: 'Toby', raza: 'Perro', foto: 'https://via.placeholder.com/100x100?text=Toby', descripcion: 'Toby es un perro muy activo que ama jugar al aire libre.' },
    { nombre: 'Mimi', raza: 'Gato', foto: 'https://via.placeholder.com/100x100?text=Mimi', descripcion: 'Mimi es una gata dulce que ama acurrucarse en el sofá.' }
];

let adopciones = [];

function permitirDragSobre(ev) {
    ev.preventDefault();
}

function gestionarIniciDrag(ev) {
    ev.dataTransfer.setData("animalNombre", ev.target.id);
}

function gestionarDrop(ev) {
    ev.preventDefault();
    const animalNombre = ev.dataTransfer.getData("animalNombre");
    const animalImg = document.getElementById(animalNombre);

    const adopcionExistente = adopciones.find(adopcion => adopcion.nombreAnimal === animalNombre.replace("img-", ""));
    
    if (adopcionExistente) {
        alert(`El animal ${adopcionExistente.nombreAnimal} ya ha sido adoptado y no puede ser adoptado nuevamente.`);
    } else {
        if (animalImg) {
            const clonedAnimalImg = animalImg.cloneNode(true);
            clonedAnimalImg.style.width = '70px';
            clonedAnimalImg.style.height = '70px';


            clonedAnimalImg.id = `${this.id}-${animalNombre.replace("img-", "")}`;

            clonedAnimalImg.addEventListener('click', function() {
                eliminarAdopcion(this.parentElement.id, animalNombre.replace("img-", ""));
            });

            this.appendChild(clonedAnimalImg);
            registrarAdopcion(this.id, animalNombre.replace("img-", ""));
        }
    }
}

function mostrarAnimales() {
    const animalContainer = document.getElementById('animals');

    animales.forEach(animal => {
        const animalDiv = document.createElement('div');
        animalDiv.classList.add('animal-item');
        animalDiv.id = animal.nombre;

        const animalImg = document.createElement('img');
        animalImg.src = animal.foto;
        animalImg.draggable = true;
        animalImg.id = `img-${animal.nombre}`;

        const animalInfo = document.createElement('div');
        animalInfo.classList.add('animal-info');
        animalInfo.innerHTML = `
            <p><strong>Nombre:</strong> ${animal.nombre}</p>
            <p><strong>Raza:</strong> ${animal.raza}</p>
            <p>${animal.descripcion}</p>
        `;

        animalImg.addEventListener('dragstart', gestionarIniciDrag);
        animalDiv.appendChild(animalImg);
        animalDiv.appendChild(animalInfo);
        animalContainer.appendChild(animalDiv);
    });
}

function mostrarPersonas() {
    const listaPersonas = document.getElementById('personas');

    personas.forEach(persona => {
        const personaLi = document.createElement('li');
        personaLi.classList.add('persona-item');
        personaLi.id = persona.nombre;

        let adopcionExistente = adopciones.find(adopcion => adopcion.nombrePersona === persona.nombre);
        let imagenSrc = adopcionExistente ? 'adoptado.avif' : 'coordinacion-adopcion.png';

        personaLi.innerHTML = `
            <img src="${imagenSrc}" alt="${persona.nombre}">
            <p><strong>${persona.nombre}</strong></p>
            <p><strong>DNI:</strong> ${persona.dni}</p>
            <p>${persona.motivacion}</p>
        `;

        personaLi.addEventListener('dragover', permitirDragSobre);
        personaLi.addEventListener('drop', gestionarDrop);

        listaPersonas.appendChild(personaLi);
    });
}

function registrarAdopcion(nombrePersona, nombreAnimal) {
    let adopcionExistente = adopciones.find(adopcion => adopcion.nombrePersona === nombrePersona && adopcion.nombreAnimal === nombreAnimal);

    if (!adopcionExistente) {
        adopciones.push({ nombrePersona: nombrePersona, nombreAnimal: nombreAnimal });
        console.log(`Adopción registrada: ${nombrePersona} adoptó a ${nombreAnimal}`);
        mostrarAdopciones();
    }
}
function eliminarAdopcion(nombrePersona, nombreAnimal) {
    adopciones.forEach(function (adopcion, index) {
        if (adopcion.nombrePersona === nombrePersona && adopcion.nombreAnimal === nombreAnimal) {
            adopciones.splice(index, 1);
            alert(`La adopción de ${nombreAnimal} por ${nombrePersona} ha sido eliminada.`);

            let imagenClonada = document.getElementById(`${nombrePersona}-${nombreAnimal}`);
            if (imagenClonada) {
                imagenClonada.remove();
            }

            mostrarAdopciones();
        }
    });
}


function mostrarAdopciones() {
    let adopcionesList = document.getElementById('adopcionesList');
    adopcionesList.innerHTML = '';

    if (adopciones.length === 0) {
        adopcionesList.innerHTML = '<p>No hay adopciones registradas aún.</p>';
    } else {
        adopciones.forEach(adopcion => {
            const adopcionDiv = document.createElement('div');
            adopcionDiv.innerHTML =
            `<p><strong>${adopcion.nombrePersona}</strong> adoptó a <strong>${adopcion.nombreAnimal}</strong></p>`;
            adopcionesList.appendChild(adopcionDiv);
        });
    }
}



window.onload = function() {
    mostrarAnimales();
    mostrarPersonas();
    mostrarAdopciones();
};
