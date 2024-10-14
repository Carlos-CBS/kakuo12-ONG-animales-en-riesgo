let personas = [
    {
        dni: '12345678A',
        nombre: 'Juan Pérez',
        custodias: 2
    },
    {
        dni: '87654321B',
        nombre: 'María López',
        custodias: 1
    },
    {
        dni: '11223344C',
        nombre: 'Carlos García',
        custodias: 0
    }
];

let animales = [
    {
        id: '212221D',
        edad: 2,
        nombre: 'Paco',
        raza: 'Perro',
        adoptado: true,
        foto: 'https://abrazoanimal.org/wp-content/uploads/2023/10/WEB-PORTADA-28.png'
    },
    {
        id: '212341T',
        edad: 1,
        nombre: 'Mishu',
        raza: 'Gato',
        adoptado: false,
        foto: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Mishu'
    },
    {
        id: '212555G',
        edad: 3,
        nombre: 'Rex',
        raza: 'Perro',
        adoptado: false,
        foto: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=Rex'
    }
];

let vinculados = [
    {
        id:'212221D',
        dni: '12345678A'
    }
];

function mostrarAnimales() {
    let animalHTML = document.getElementById('animals');
    animalHTML.innerHTML = ''; // Limpiar contenido previo

    animales.forEach((animal) => {
        const div = document.createElement('div');
        div.classList.add('animal-item');
        div.innerHTML = `
            <img src="${animal.foto}" alt="${animal.id}">
            <div class="animal-info">
                <p><strong>ID:</strong> ${animal.id}</p>
                <p><strong>Nombre:</strong> ${animal.nombre}</p>
                <p><strong>Adoptado:</strong> ${animal.adoptado ? "Sí" : "No"}</p>
            </div>
        `;
        
        animalHTML.appendChild(div);
    });
}

function mostrarPersonas() {
    const listaPersonas = document.getElementById('personas');

    personas.forEach(persona => {
        const section = document.createElement('section'); 
        section.classList.add('persona-item');

        section.innerHTML = `
            <img src="${persona.custodias > 0 ? 'adoptado.avif' : 'coordinacion-adopcion.png'}" alt="${persona.dni}">
            <ul>
                <li><strong>DNI:</strong> ${persona.dni}</li>
                <li><strong>Nombre:</strong> ${persona.nombre}</li>
                <li><strong>Custodias:</strong> ${persona.custodias}</li>
                <p>---------------------------------------<p>
            </ul>
        `;
        
        listaPersonas.appendChild(section);
    });
}

function vincular(animalID, personaDNI){
    const animal = animales.find(animal => animal.id === animalID);
    if (animal) {
        animal.adoptado = true;
    }else console.error(`Error: El animal con ID ${animalID} ya está adoptado.`);

    const persona = personas.find(persona => persona.dni === personaDNI);
    if (persona) {
        persona.custodias += 1;
    }

    const nuevoVinculo = {
        id: animalID,
        dni: personaDNI
    };
    
    
    vinculados.push(nuevoVinculo);
    
    
    console.log(vinculados);
    console.log(animal);
    console.log(persona);


}


window.onload = function() {
    mostrarPersonas();
    mostrarAnimales();
    vincular('212341T','12345678A');
};
