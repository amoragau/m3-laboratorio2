const pacientes  = [
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "edad": 35,
    "consultas": [
      {
        "fecha": "2024-11-15",
        "minutos_duracion": 14,
        "tipo": "Consulta general",
        "medico": "Dr. Juan Ulloa",
        "minutos_espera": 30,
        "valor": 16740
      },
      {
        "fecha": "2024-11-12",
        "minutos_duracion": 17,
        "tipo": "Consulta general",
        "medico": "Dr. Juan Ulloa",
        "minutos_espera": 16,
        "valor": 16740
      },
      {
        "fecha": "2024-11-17",
        "minutos_duracion": 22,
        "tipo": "Consulta especializada - Neurologia",
        "medico": "Dr. Roberto Fernández",
        "valor": 28400
      }
    ]
  },
  {
    "id": 2,
    "nombre": "María González",
    "edad": 28,
    "consultas": [
      {
        "fecha": "2024-11-11",
        "minutos_duracion": 18,
        "tipo": "Consulta especializada - Pediatria",
        "medico": "Dr. Álvaro Falcón",
        "minutos_espera": 38,
        "valor": 28400
      },
      {
        "fecha": "2024-11-15",
        "minutos_duracion": 12,
        "tipo": "Consulta especializada - Pediatria",
        "medico": "Dr. Álvaro Falcón",
        "minutos_espera": 123,
        "valor": 40.00
      }
    ]
  },
  {
    "id": 3,
    "nombre": "Carlos Rodríguez",
    "edad": 42,
    "consultas": [
      {
        "fecha": "2024-11-01",
        "minutos_duracion": 94,
        "tipo": "Urgencia",
        "medico": "Dra. Elena Gómez",
        "minutos_espera": 11,
        "valor": 100000
      },
      {
        "fecha": "2024-12-01",
        "minutos_duracion": 12,
        "tipo": "Consulta general",
        "medico": "Dr. Juan Ulloa",
        "minutos_espera": 18,
        "valor": 16740
      }
    ]
  }
];

// Función para calcular el costo total de las consultas de un paciente
const calcularCostoTotal = () => {
  return (pacientes) => {
    return (idPaciente) => {
      const paciente = pacientes.find(p => p.id === idPaciente);
      if (!paciente) return "Paciente no encontrado";
      return paciente.consultas.reduce((total, consulta) => total + consulta.valor, 0);
    };
  };
};

// Función para obtener los IDs de los pacientes
const obtenerIdsPacientes = () => {
  return (pacientes) => {
    return [...new Set(pacientes.map(paciente => paciente.id))];
  };
};

// Función para recorrer los IDs y calcular los costos
const calcularCostosPorPaciente = () => {
  return (pacientes) => {
    const obtenerIds = obtenerIdsPacientes();
    const calcularCosto = calcularCostoTotal()(pacientes);
    const ids = obtenerIds(pacientes);
    return ids.map(id => ({
      id: id,
      nombre: pacientes.find(p => p.id === id).nombre,
      costoTotal: calcularCosto(id)
    }));
  };
};

const costosPorPaciente = calcularCostosPorPaciente()(pacientes);
console.log(costosPorPaciente);


// Función para calcular el tiempo de espera promedio de los pacientes
const calcularTiempoPromedioEspera = (pacientes) => {
  const totalMinutos = pacientes.flatMap(paciente => 
    paciente.consultas.map(consulta => consulta.minutos_espera || 0)
  ).reduce((sum, minutos) => sum + minutos, 0);
  const totalConsultas = pacientes.reduce((sum, paciente) => 
    sum + paciente.consultas.length, 0
  );
  return totalConsultas > 0 ? Math.round(totalMinutos / totalConsultas) : 0;
};
const tiempoPromedio = calcularTiempoPromedioEspera(pacientes);
console.log(`El tiempo de espera promedio de los pacientes es de: ${tiempoPromedio} minutos.`); 


const calcularHorasPorSemana = (pacientes, index = 0, resultado = {}) => {
  if (index >= pacientes.length) {
    return resultado;
  }
  const calcularConsultas = (consultas, consultaIndex = 0) => {
    if (consultaIndex >= consultas.length) {
      return;
    }
    const consulta  = consultas[consultaIndex];
    const semana    = getWeekNumber(consulta.fecha);
    const medico    = consulta.medico;
    const horas     = consulta.minutos_duracion / 60;
    if (!resultado[semana]) {
      resultado[semana] = {};
    }
    if (!resultado[semana][medico]) {
      resultado[semana][medico] = 0;
    }
    resultado[semana][medico] = Number((resultado[semana][medico] + horas).toFixed(2));
    calcularConsultas(consultas, consultaIndex + 1);
  };
  calcularConsultas(pacientes[index].consultas);
  return calcularHorasPorSemana(pacientes, index + 1, resultado);
};

// Función para obtener el número de semana
function getWeekNumber(dateString) {
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const firstDay = new Date(date.getFullYear(), 0, 4);
  firstDay.setDate(firstDay.getDate() + 3 - (firstDay.getDay() + 6) % 7);
  const weekNumber = 1 + Math.round(((date - firstDay) / 86400000 - 3 + (firstDay.getDay() + 6) % 7) / 7);
  return `${date.getFullYear()}-W${String(weekNumber).padStart(2, '0')}`;
}
const resultado = calcularHorasPorSemana(pacientes);
console.log(resultado);


// Función para calcular el costo total sin descuento
const calcularCostoTotalSinDescuento = (consultas) => {
  return consultas.reduce((total, consulta) => total + consulta.valor, 0);
};
// Función para aplicar descuentos
const aplicarDescuento = (costoTotal, cantidadConsultas) => {
  if (cantidadConsultas > 3) return {costo: Math.round(costoTotal * 0.90 * 100) / 100, descuento: 10};
  if (cantidadConsultas > 1) return {costo: Math.round(costoTotal * 0.95 * 100) / 100, descuento: 5};
  return { costo: Math.round(costoTotal * 100) / 100, descuento: 0 };
};

// Función para calcular el costo total con descuento
const calcularCostoTotalConDescuento = paciente => {
  const costoTotal        = calcularCostoTotalSinDescuento(paciente.consultas);
  const cantidadConsultas = paciente.consultas.length;
  return aplicarDescuento(costoTotal, cantidadConsultas);
};

// Función que utiliza composición de funciones
const calcularCostosTotales = pacientes => 
  pacientes.map(paciente => {
    const costoTotalSinDescuento = calcularCostoTotalSinDescuento(paciente.consultas);
    const { costo: costoTotalConDescuento, descuento } = calcularCostoTotalConDescuento(paciente);
    return {
      id: paciente.id,
      nombre: paciente.nombre,
      costoTotalSinDescuento,
      costoTotalConDescuento,
      porcentajeDescuento: descuento
    };
  });
// Uso de la función
const resultados = calcularCostosTotales(pacientes);
console.log(resultados);
