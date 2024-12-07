# Laboratorio 2

Este proyecto implementa funcionalidades avanzadas en JavaScript para mejorar la gestión de datos en el sitio web de un hospital. A continuación, se detallan las principales características y componentes del proyecto.


## Página de inicio 📋

```
index.html
```

## Desarrollo evaluación:

## 1. Programación Funcional en JavaScript

  ### a) Se implementa una funcion currying y función flecha en el archivo `js/servicios.js`:
  ```javascript
  const calcularCostoTotal = () => {
    return (pacientes) => {
      return (idPaciente) => {
        const paciente = pacientes.find(p => p.id === idPaciente);
        if (!paciente) return "Paciente no encontrado";
        return paciente.consultas.reduce((total, consulta) => total + consulta.valor, 0);
      };
    };
  };
  // ... resto del código
  ```
  Esta función curried se compone de tres niveles de funciones anidadas:

    calcularCostoTotal(): La función exterior que no toma argumentos.
    (pacientes) => {...}: La función intermedia que toma un array de pacientes.
    (idPaciente) => {...}: La función interna que toma el ID del paciente.

  El currying permite llamar a esta función de manera escalonada:

  ```javascript
  const calcular = calcularCostoTotal();
  const calcularParaPacientes = calcular(listaDePacientes);
  const costoTotalPaciente = calcularParaPacientes(idPacienteEspecifico);
  ```

  ### b) Se implementa la recursión en el archivo `js/servicios.js`;
  ```javascript
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
  // ... resto del código
  ```
  La función `calcularHorasPorSemana` es una implementación recursiva que calcula las horas de consulta por semana para cada médico, basándose en los datos de los pacientes y sus consultas. 

  La función utiliza dos niveles de recursión:

    Recursión principal para recorrer la lista de pacientes.
    Recursión interna para procesar las consultas de cada paciente.
  ### Funcionamiento

  #### Condición de parada

  La función detiene su ejecución cuando:
  - El índice (`index`) es mayor o igual a la longitud del array `pacientes`.
  - En este caso, la función retorna el `resultado` final.

  #### Función interna: `calcularConsultas`
  Esta función se encarga de procesar recursivamente las consultas de un paciente:
  1. **Recorrido**: Itera sobre cada consulta del paciente.
  2. **Procesamiento de datos**:
  - Obtiene el número de semana a partir de la fecha de la consulta.
  - Extrae el médico y la duración en horas.
  3. **Actualización de resultados**: 
  - Organiza la información en el objeto `resultado`, agrupando por semana y por médico.

  #### Procesamiento de consultas
  Para cada paciente, se llama a `calcularConsultas` pasando las consultas correspondientes al paciente actual.

  #### Recursión principal
  - La función se llama a sí misma con el índice incrementado (`index + 1`) y el objeto `resultado` actualizado.

  ### c) Composición de funciones
  ```javascript
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
  // ... resto del código
  ```

  ### Funciones individuales

  #### `calcularCostoTotalSinDescuento`
  Calcula la suma de los valores de todas las consultas de un paciente.

  #### `aplicarDescuento`
  Aplica un descuento basado en la cantidad de consultas.

  #### `calcularCostoTotalConDescuento`
  Combina las dos funciones anteriores para calcular el costo total con descuento para un paciente.

  #### Composición en `calcularCostosTotales`

  La función `calcularCostosTotales` demuestra el uso de composición de funciones mediante los siguientes pasos:

  1. Iteración sobre pacientes:
  - Utiliza `Array.map()` para recorrer cada elemento del array de pacientes.

  2. Operaciones aplicadas a cada paciente:
   - Calcula el costo total sin descuento usando `calcularCostoTotalSinDescuento`.
   - Calcula el costo total con descuento usando `calcularCostoTotalConDescuento`.
   - Extrae el costo con descuento y el porcentaje de descuento.

  3. **Construcción del resultado**:
   - Genera un nuevo objeto para cada paciente con los resultados de las operaciones anteriores.

## 2. Programación Orientada a Eventos y Programación Asíncrona

### a) Eventos en página `contacto`: 

**Se implementa un listener y se muestra un mensaje de confirmación.**

```javascript
const alertPlaceholder  = document.getElementById('liveAlertPlaceholder');
const btnEnviar         = document.getElementById('btnEnviar');
btnEnviar.addEventListener('click', function() {
  const rNombre   = document.getElementById('rNombre').value;
  const rEmail    = document.getElementById('rEmail').value;
  const rTelefono = document.getElementById('rTelefono').value;
  const rMensaje  = document.getElementById('rMensaje').value;
  const wrapper   = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-success alert-dismissible" role="alert">`,
    `   <div>Mensaje enviado con éxito: ${rNombre}, ${rEmail}, ${rTelefono}, ${rMensaje}.</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  alertPlaceholder.append(wrapper);
});
// ... resto del código
```

Evento de clic en el botón (listener):
```javascript
btnEnviar.addEventListener('click', function() {
  // ... código dentro del evento ...
});
// ... resto del código
```
Mensaje de confirmación:
Se crea un nuevo elemento div y se le asigna como contenido HTML una alerta de Bootstrap. La alerta incluye los datos del formulario y un botón para cerrarla.
```javascript
const wrapper = document.createElement('div');
wrapper.innerHTML = [
  `<div class="alert alert-success alert-dismissible" role="alert">`,
  `   <div>Mensaje enviado con éxito: ${rNombre}, ${rEmail}, ${rTelefono}, ${rMensaje}.</div>`,
  '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
  '</div>'
].join('')
// ... resto del código
```
**Evento que simula la llegada de un paciente y muestra una notificación.**
```javascript
const colaPacientes = (pacientes, paciente) =>{
  pacientes.push(paciente);
  console.log(`Paciente agregado: ${paciente}`);
};
const btnRegistrarLlegada = document.getElementById('btnRegistrarLlegada');
btnRegistrarLlegada.addEventListener('click', function() {
  const alertRegistroPacientes  = document.getElementById('alertRegistroPacientes');
  const rNombre                 = document.getElementById('rNombrePaciente').value;
  const pacientes               = [];
  colaPacientes(pacientes, rNombre);
  const wrapper     = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-warning alert-dismissible" role="alert">`,
    `   <div>El próximo paciente es: ${pacientes.shift()}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  alertRegistroPacientes.append(wrapper);
});
// ... resto del código
```

El evento para mostrar la notificación se dispara al ingresar un paciente en la cola:

```javascript
const btnRegistrarLlegada = document.getElementById('btnRegistrarLlegada');
btnRegistrarLlegada.addEventListener('click', function() {
  // ... código dentro del evento ...
});
// ... resto del código
```

Se crea una alerta para mostrar el próximo paciente:
```javascript
const wrapper = document.createElement('div');
wrapper.innerHTML = [
  `<div class="alert alert-warning alert-dismissible" role="alert">`,
  `   <div>El próximo paciente es: ${pacientes.shift()}</div>`,
  '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
  '</div>'
].join('')
// ... resto del código
```

### b) Se implementa una función async/await para simular una llamada a una API REST que obtenga los datos de los doctores. Usa Promise para manejar los casos de éxito o fallo.

```javascript
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
// ... resto del código
```

#### Función `obtenerDoctores()`
La función `obtenerDoctores()` es una función asíncrona que realiza una petición HTTP a una API para obtener los datos de los doctores.

#### Funcionalidad
1. Utiliza `await fetch()` para hacer una llamada a `https://api.ejemplo.com/doctores/`.
2. Verifica si la respuesta es exitosa con `response.ok`. Si no lo es, lanza un error.
3. Convierte la respuesta a formato JSON usando `await response.json()`.
4. Retorna los datos de los doctores o lanza un error si ocurre algún problema.

#### Manejo de errores
La función maneja errores usando un bloque `try-catch`:
- Si ocurre un error durante la petición o el procesamiento, se captura en el bloque `catch`.
- El error se registra en la consola y se vuelve a lanzar para ser manejado por el código que llama a la función.

#### Uso de la función

1. Llama a `obtenerDoctores()`, que devuelve una `Promise`.
2. Usa `.then()` para procesar los datos recibidos:
   - Itera sobre cada doctor y muestra su nombre y especialidad en la consola.
3. Usa `.catch()` para manejar cualquier error que pueda ocurrir durante el proceso.


## 3. Programación Orientada a Objetos en JavaScript

Se implementa la clase en el archivo `js/cDoctor.js`´.

### Clases y Herencia

### Clase base `Doctor`
La clase `Doctor` define propiedades y métodos comunes para todos los doctores. Incluye métodos como:

- `mostrarInformacion()`: Muestra información básica del doctor.
- `calcularTotalPacientes()`: Calcula el número total de pacientes atendidos.
- `atenderPaciente()`: Registra la atención de un paciente.

### Clase derivada `Cirujano`
La clase `Cirujano` hereda de `Doctor` utilizando la palabra clave `extends`. Esta clase añade propiedades y métodos específicos:

- Propiedad `operacionesRealizadas`: Registra el número de operaciones realizadas por el cirujano.
- Método `realizarOperacion()`: Permite al cirujano realizar una operación.

La **herencia** permite que la clase `Cirujano` herede todas las propiedades y métodos de la clase `Doctor`, extendiendo su funcionalidad.

### Encapsulación

La **encapsulación** se demuestra en la clase `Doctor`:

- El atributo `_yearsExperiencia` es privado (por convención, el guion bajo indica privacidad).
- Se utilizan **getters** y **setters** para acceder y modificar el atributo `yearsExperiencia`:

```javascript
get yearsExperiencia() { ... }
set yearsExperiencia(year) { ... }
```

- El **setter** para el atributo `yearsExperiencia` incluye validación para asegurar que los años de experiencia no sean negativos.
- Esta validación garantiza que los datos relacionados con la experiencia del doctor se mantengan consistentes y correctos.

La encapsulación permite un control más preciso sobre cómo se accede y modifica la información del doctor, asegurando que los datos no se alteren de forma inesperada.

### Polimorfismo

El **polimorfismo** se evidencia en la clase `Cirujano`, que sobrescribe métodos de la clase base `Doctor` para extender su funcionalidad.

### Sobrescritura de métodos:

- `mostrarInformacion()`: La clase `Cirujano` proporciona su propia implementación, extendiendo la funcionalidad de la clase base `Doctor`.
- `calcularTotalPacientes()`: En la clase `Cirujano`, este método retorna `operacionesRealizadas` en lugar de `pacientesAtendidos`, adaptándose a las necesidades específicas del cirujano.

### Uso de `super`:

- En el método `mostrarInformacion()`, se utiliza `super.mostrarInformacion()` para llamar al método de la clase base y luego extenderlo en la clase derivada `Cirujano`. Esto permite reutilizar la funcionalidad de la clase base y agregar comportamientos adicionales.


## Recursos ✒️

* [unDraw](https://undraw.co)
* [DALL-E](https://openai.com/index/dall-e-3/)


  
## Autor
Desarrollado Ana Moraga.


