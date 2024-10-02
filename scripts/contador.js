// Obtener el valor actual del contador del localStorage
let visits = localStorage.getItem('visitCount');


// Si no hay visitas registradas, inicializar a 0
if (!visits) {
    visits = 0;
}


// Incrementar las visitas
visits++;


// Guardar el nuevo valor en localStorage
localStorage.setItem('visitCount', visits);


// Mostrar el contador actualizado
document.getElementById('counter').textContent = visits;








