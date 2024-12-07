const loadJsonMedicos = () => {
  fetch('../json/medicos.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      showMedicos(data);
    })
    .catch(error => console.error('Error al cargar los médicos:', error));
}

const showMedicos = (medicosAll) => {
  const medicosOri    = [...medicosAll]; //clonacion
  const medicos       = medicosOri.filter(medico => !medico.destacado); //busqueda
  const listaMedicos  = document.getElementById('medicos');
  const rowElement    = document.createElement('div');
  rowElement.classList.add('row');
  rowElement.classList.add('section__list');
  rowElement.classList.add('medicos__list');
  listaMedicos.appendChild(rowElement);
  medicos.sort((a, b) => b.añosExperiencia - a.añosExperiencia);  //ordenamiendo
  medicos.forEach(medico => {
    const { nombre, especialidad, añosExperiencia, disponibilidad, id} = medico;
    console.log(showInfoMedico(medico));
    const medicoElement = document.createElement('div');
    medicoElement.classList.add('col');
    medicoElement.classList.add('section__item');
    //medicoElement.classList.add('card');
    medicoElement.classList.add('medicos__item');
    medicoElement.innerHTML  = `
      <div class="card-body">
        <h5 class="card-title">${nombre}- ${especialidad}</h5>
        <p><strong>Años de Experiencia:</strong> ${añosExperiencia}</p>
      </div>`;
      rowElement.appendChild(medicoElement);
  });
}
const showInfoMedico = (medico) =>{
  const { nombre, especialidad, añosExperiencia} = medico;
  return (`${nombre}, especialidad: ${especialidad}, ${añosExperiencia} años de experiencia`);
};

const medicos = [
  {
    "id": 1,
    "nombre": "Dr. Juan Pérez",
    "especialidad": "Cardiología",
    "añosExperiencia": 15,
    "disponibilidad": {
      "lunes": ["09:00-13:00", "15:00-18:00"],
      "miércoles": ["09:00-13:00", "15:00-18:00"],
      "viernes": ["09:00-13:00"]
    },
    "destacado": true
  },
  {
    "id": 2,
    "nombre": "Dra. María González",
    "especialidad": "Dermatología",
    "añosExperiencia": 10,
    "disponibilidad": {
      "martes": ["08:00-14:00"],
      "jueves": ["08:00-14:00"],
      "sábado": ["10:00-13:00"]
    },
    "destacado": true
  },
  {
    "id": 3,
    "nombre": "Dr. Carlos Rodríguez",
    "especialidad": "Cirugía General",
    "añosExperiencia": 20,
    "disponibilidad": {
      "lunes": ["14:00-20:00"],
      "miércoles": ["14:00-20:00"],
      "viernes": ["14:00-20:00"]
    },
    "destacado": false
  }  
];
const especialidades = [
  {
    "id": 1,
    "nombre": "Cardiología",
    "descripcion": "Especialidad que se ocupa de las enfermedades del corazón y del aparato circulatorio.",
    "subespecialidades": [
      "Cardiología intervencionista",
      "Electrofisiología cardíaca",
      "Ecocardiografía"
    ]
  },
  {
    "id": 2,
    "nombre": "Neurología",
    "descripcion": "Especialidad médica que trata los trastornos del sistema nervioso.",
    "subespecialidades": [
      "Neurología vascular",
      "Neurología pediátrica",
      "Neurofisiología clínica"
    ]
  },
  {
    "id": 3,
    "nombre": "Pediatría",
    "descripcion": "Especialidad médica que estudia al niño y sus enfermedades.",
    "subespecialidades": [
      "Neonatología",
      "Pediatría del desarrollo",
      "Gastroenterología pediátrica"
    ]
  },
  {
    "id": 4,
    "nombre": "Cirugía General",
    "descripcion": "Especialidad que abarca operaciones del aparato digestivo, sistema endocrino y otras áreas.",
    "subespecialidades": [
      "Cirugía laparoscópica",
      "Cirugía oncológica",
      "Cirugía de trauma"
    ]
  },
  {
    "id": 5,
    "nombre": "Dermatología",
    "descripcion": "Especialidad médica encargada del estudio de la piel, su estructura, función y enfermedades.",
    "subespecialidades": [
      "Dermatología",
      "Dermatología oncológica",
      "Cirugía dermatológica"
    ]
  }
];


//Merge: medicos y especialidades
const mergeJson = () =>{
  // Crear un objeto para almacenar las especialidades con sus médicos
  const mergedJSON = especialidades.reduce((acc, especialidad) => {
    acc[especialidad.nombre] = { ...especialidad, medicos: [] };
    return acc;
  }, {});
  
  // Agregar los médicos a sus especialidades correspondientes
  medicos.forEach(medico => {
    if (mergedJSON[medico.especialidad]) {
      mergedJSON[medico.especialidad].medicos.push(medico);
    }
  });
  
  // Convertir el objeto combinado de vuelta a un array
  const resultArray = Object.values(mergedJSON);
  console.log(JSON.stringify(resultArray, null, 2));
}
loadJsonMedicos();
mergeJson();


// Agregar, eliminar y buscar
const newMedico = {
  "id": 4,
  "nombre": "Dr. Juan Lopez",
  "especialidad": "Neurologo",
  "añosExperiencia": 5,
  "disponibilidad": {
    "martes": ["09:00-13:00", "15:00-18:00"]
  },
  "destacado": false
};

const addMedicos = (listMedicos, newMedico) =>{
  listMedicos.push(newMedico);
  console.log(`Se agrego: ${showInfoMedico(newMedico)}`)
};
const filMedicos = (listMedicos, id) =>{
  const medicosFilter = listMedicos.filter(item => item.id === id)
  console.log(`El médico con id ${id} es:\n ${JSON.stringify(medicosFilter)}`)
};
const delMedicos = (listMedicos) =>{
  listMedicos.pop()
  console.log(`Se elimino el último médico.`)
};
addMedicos(medicos, newMedico);
filMedicos(medicos, 2);
delMedicos(medicos);


// Pilas: Implementa una pila para gestionar las citas de los pacientes (última cita agendada, próxima cita a atender, etc.).
const citasPacientes = [];
const addCita = (citasPacientes, cita) =>{
  citasPacientes.push(cita);
  console.log(`La última cita agendada es: ${cita}`);
};

const nextCita = (citasPacientes) =>{
  console.log(`La próxima cita a atender es ${citasPacientes.pop()}`);
}

addCita(citasPacientes, 'Cita 1');
addCita(citasPacientes, 'Cita 2');
addCita(citasPacientes, 'Cita 3');
nextCita(citasPacientes);


async function getDoctores() {
  try {
    const respuesta = await fetch("https://api.d.cl/doctores/");
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const doctores = await respuesta.json();
    return doctores;
  } catch (error) {
    console.error("Error al obtener doctores:", error.message);
    throw error;
  }
}
// Uso de la función
getDoctores()
  .then(doctores => {
    doctores.forEach(doctor => {
      console.log(`${doctor.nombre} - ${doctor.especialidad}`);
    });
  })
  .catch(error => {
    console.error("Error:", error.message);
  });