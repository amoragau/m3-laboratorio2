const especialidades = document.getElementById('div_detalle_especialidades');
especialidades.style.display = 'none';

const loadJson = (opt) =>{
  fetch('../json/especialidades.json')
  .then((response) => response.json())
  .then(data => {
    if (opt === 2) {
      try {
        const datos = {
          especialidades_medicas: Object.fromEntries(
            Object.entries(data.especialidades_medicas).map(([key, esp]) => [
              key,
              {
                nombre: esp.nombre,
                subespecialidades: esp.subespecialidades.filter(
                    sub => sub.horas_disponibles
                )
              }
            ])
          )
        };
        showData(datos);
      } catch (error) {
        console.log('Error: archivo json con formato incorrecto.');
      }
    } else {
      showData(data);
    }
  })
  .catch(error => console.error('Error:', error));
}
const showData = (data) =>{
  console.log(data);
  try{
    const lista = document.createElement('ul');
    Object.entries(data.especialidades_medicas).forEach(([key, especialidad]) => {
      debugger;
      const itemPrincipal     = document.createElement('li');
      itemPrincipal.innerHTML = `<strong>${especialidad.nombre}</strong>`;
      const subLista          = document.createElement('ul');
      especialidad.subespecialidades.forEach(subespecialidad => {
        const subItem       = document.createElement('li');
        subItem.textContent = subespecialidad.nombre;
        subLista.appendChild(subItem);
      });
      itemPrincipal.appendChild(subLista);
      lista.appendChild(itemPrincipal);
    });
    especialidades.innerHTML = '';
    especialidades.appendChild(lista);
    especialidades.style.display = 'block';
  } catch (error) {
    console.log('Error: archivo json con formato incorrecto.');
  }

}
const showSpecialties = (opt) =>{
  loadJson(opt);
}
const btnVerEspecialidades = document.getElementById('btnVerEspecialidades');
const btnVerEspecialidadesDisp = document.getElementById('btnVerEspecialidadesDisp');
btnVerEspecialidades.addEventListener('click', function() {
  console.log(`Click boton espacialidades`);
  if (this.textContent === 'Ver todas') {
    this.textContent = 'Cerrar';
    btnVerEspecialidadesDisp.textContent = 'Solo con horas disponibles';
    showSpecialties(1);
  } else {
    this.textContent = 'Ver todas';
    especialidades.style.display = 'none';
  }
});
btnVerEspecialidadesDisp.addEventListener('click', function() {
  console.log(`Click boton espacialidades con horas disponibles`);
  if (this.textContent === 'Solo con horas disponibles') {
    this.textContent = 'Cerrar';
    btnVerEspecialidades.textContent = 'Ver todas';
    showSpecialties(2);
  } else {
    this.textContent = 'Solo con horas disponibles';
    especialidades.style.display = 'none';
  }
});