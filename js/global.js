const reserve = () => {
  let name        = '';
  let mail        = '';
  let phoneNumber = '';
  while (name.trim() === ''){
    name = prompt('Ingresa tu nombre completo:');
  }
  while (mail.trim() === ''){
    mail = prompt('Ingresa tu email:');
  }
  while (phoneNumber.trim() === ''){
    phoneNumber = prompt('Ingresa tu número de teléfono:');
  }
  debugger;
  const patientData = { name, mail, phoneNumber};
  console.log(`Los datos inbgresados para la reserva: ${JSON.stringify(patientData)}`);
  alert(`Nombre: ${patientData.name}, email: ${patientData.mail}, número teléfonico ${patientData.phoneNumber}.`);
};
const btnReservarCita = document.getElementById('btnReservarCita');
btnReservarCita.addEventListener('click', reserve);
