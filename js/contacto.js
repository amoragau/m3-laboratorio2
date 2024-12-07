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

//Colas: Crea una cola para simular el orden de llegada de los pacientes en la página de contacto.
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
