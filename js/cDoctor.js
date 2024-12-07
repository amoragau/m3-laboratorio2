class Doctor {
  constructor(nombre, especialidad, yearsExperiencia) {
    this.nombre             = nombre;
    this.especialidad       = especialidad;
    this._yearsExperiencia  = yearsExperiencia;
    this.pacientesAtendidos = 0;
  }
  // Getter y Setter para años de experiencia (encapsulamiento)
  get yearsExperiencia() {
    return this._yearsExperiencia;
  }
  set yearsExperiencia(year) {
    if (year >= 0) {
      this._yearExperiencia = year;
    } else {
      console.log("Los años de experiencia no pueden ser negativos.");
    }
  }
  // Método para mostrar información
  mostrarInformacion() {
    return `Dr. ${this.nombre}, ${this.especialidad}, ${this.yearsExperiencia} años de experiencia`;
  }
  // Método para calcular total de pacientes atendidos
  calcularTotalPacientes() {
    return this.pacientesAtendidos;
  }
  // Método para atender a un paciente
  atenderPaciente() {
    this.pacientesAtendidos++;
  }
}
class Cirujano extends Doctor {
  constructor(nombre, especialidad, yearsExperiencia) {
    super(nombre, especialidad, yearsExperiencia);
    this.operacionesRealizadas = 0;
  }
  // Sobrescritura del método mostrarInformacion (polimorfismo)
  mostrarInformacion() {
    return `${super.mostrarInformacion()}, Cirujano`;
  }
  // Sobrescritura del método calcularTotalPacientes (polimorfismo)
  calcularTotalPacientes() {
    return this.operacionesRealizadas;
  }
  // Nuevo método específico para Cirujano
  realizarOperacion() {
    this.operacionesRealizadas++;
    this.atenderPaciente(); // También incrementa pacientesAtendidos
  }
}

const doctorGeneral = new Doctor("Juan Pérez", "Medicina General", 10);
doctorGeneral.atenderPaciente();
doctorGeneral.atenderPaciente();
console.log(doctorGeneral.mostrarInformacion());
console.log("Pacientes atendidos:", doctorGeneral.calcularTotalPacientes());

const cirujano = new Cirujano("María López", "Cirugía Cardíaca", 15);
cirujano.realizarOperacion();
cirujano.realizarOperacion();
cirujano.realizarOperacion();
console.log(cirujano.mostrarInformacion());
console.log("Operaciones realizadas:", cirujano.calcularTotalPacientes());