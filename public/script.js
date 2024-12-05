// Obtener el valor de una cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
// Función para obtener el id del reto actual desde la cookie
function getCurrentRetoId() {
  return getCookie("idRetoSeleccionado"); // Obtiene el idReto directamente desde la cookie
}

function mostrarMenu() {
  ocultarDivs();
  document.getElementById("menu").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registroForm").style.display = "none";
  document.getElementById("volverMenu").style.display = "none"; // Ocultar botón "Volver al Menú Principal"
  actualizarMenu();
}

// Limpiar el tablero de juego
function limpiarJuego() {
  document.getElementById("game-board").innerHTML = ''; // document.getElementById("volverMenu").style.display  Limpiar el tablero
  document.getElementById("game-board").style.display = "none"; // Ocultar el tablero
  document.getElementById("seleccionar-dificultad").style.display = "none"; // Ocultar el selector de dificultad
}

function actualizarMenu() {
  const idUsuario = getCookie("idUsuario");

  if (idUsuario) {
    document.getElementById("registro").style.display = "none";
    document.getElementById("iniciar-sesion").style.display = "none";
    document.getElementById("cerrar-sesion").style.display = "inline";
    document.getElementById("ver-estadisticas").style.display = "inline";
    document.getElementById("ver-retos").style.display = "inline";
    document.getElementById("competencias").style.display = "inline";
    document.getElementById("jugar").style.display = "inline";
  } else {
    document.getElementById("registro").style.display = "inline";
    document.getElementById("iniciar-sesion").style.display = "inline";
    document.getElementById("cerrar-sesion").style.display = "none";
    document.getElementById("ver-estadisticas").style.display = "none";
    document.getElementById("ver-retos").style.display = "none";
    document.getElementById("competencias").style.display = "none";
    document.getElementById("jugar").style.display = "inline";
  }

  // Mantén siempre visible la sección de comentarios
  document.getElementById("comentarios-section").style.display = "block";
}
function volverAlMenuPrincipal() {
  mostrarMenu(); // Regresa al menú inicial
}
const ocultarDivs = () => {
  // Eliminar divs específicos que se hayan creado dinámicamente
  const divsAEliminar = [
    document.querySelector('div[id^="estadisticas"]'),
    document.querySelector('div[id^="competencias"]'),
    document.querySelector('div[id^="retos"]'),
    document.querySelector('div[id^="seleccion-retos"]')
  ];
if (divsAEliminar.length > 0) {
  divsAEliminar.forEach(div => {
    if (div) {
      div.classList.add('oculto');
    }
  });
}
limpiarJuego();
}
function volverMenuUsuario() {
  
  ocultarDivs();
  // Eliminar botones de volver que se hayan creado
  const botonesVolver = document.querySelectorAll('button[id="volver-menu-button"]');
  botonesVolver.forEach(boton => boton.hidden = true);

  // Mostrar el menú principal
  const menuDiv = document.getElementById("menu");
  if (menuDiv) {
    menuDiv.style.display = "inline-block";
  }
  // Actualizar el menú
  actualizarMenu();
}
const crearBotonVolver = () => {
  let volverMenuButton = document.getElementById('volver-menu-button');
  // Si no existe, crearlo
  if (!volverMenuButton) {
    volverMenuButton = document.createElement('button');
    volverMenuButton.id = 'volver-menu-button'; // Asigna un id único
    volverMenuButton.innerText = 'Volver al Menú';
    volverMenuButton.onclick = volverMenuUsuario; // Llama a la función volverMenuUsuario
    document.body.appendChild(volverMenuButton);
  } else {
    volverMenuButton.hidden = false; // Asegúrate de que esté visible
  }
}
// Mostrar formulario de inicio de sesión
function mostrarLogin() {
  ocultarDivs();
  limpiarJuego(); // Limpiar el tablero al cerrar sesión
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registroForm").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("volverMenu").style.display = "block"; // Mostrar botón "Volver al Menú Principal"
}

// Mostrar formulario de registro
function mostrarRegistro() {
  ocultarDivs();
  limpiarJuego(); // Limpiar el tablero al cerrar sesión
  document.getElementById("registroForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("menu").style.display = "none";
  document.getElementById("volverMenu").style.display = "block"; // Mostrar botón "Volver al Menú Principal"
}

// Función para iniciar sesión
function iniciarSesion() {
  ocultarDivs();
  const email = document.getElementById("emailLogin").value;
  const contrasena = document.getElementById("contrasenaLogin").value;

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, contrasena }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.cookie = `idUsuario=${data.idUsuario}; path=/;`;
        alert('Inicio de sesión exitoso');
        actualizarMenu();  // Llama a actualizar el menú
        mostrarMenu();  // Asegura que el menú se muestre sin recargar
      } else {
        alert('Credenciales incorrectas');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Registrar usuario
function registrarUsuario() {
  ocultarDivs();
  const nombre = document.getElementById("nombreRegistro").value;
  const apellidos = document.getElementById("apellidosRegistro").value;
  const email = document.getElementById("emailRegistro").value;
  const contrasena = document.getElementById("contrasenaRegistro").value;

  // Verificar que los campos no estén vacíos
  if (!nombre || !apellidos || !email || !contrasena) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  fetch('http://localhost:3000/registrar-usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, apellidos, email, contrasena })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Usuario registrado con éxito');
        mostrarLogin();
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error al registrar usuario:', error));
}

// Cerrar sesión
function cerrarSesion() {
  document.cookie = "idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "idRetoSeleccionado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  ocultarDivs();
  actualizarMenu(); // Actualiza el menú al cerrar sesión
  limpiarJuego(); // Limpiar el tablero al cerrar sesión
  alert('Cerraste sesión exitosamente.');
}

// Actualiza el menú al cargar la página
document.addEventListener("DOMContentLoaded", actualizarMenu);

// Mostrar juego y configurar dificultad
function mostrarJuego() {
  ocultarDivs();
  
  //document.getElementById("modoJuego").style.display = "block";
  document.getElementById("seleccionar-dificultad").style.display = "inline";
  document.getElementById("game-board").innerHTML = ''; // Limpiar el tablero de juego
  document.getElementById("game-board").style.display = "none"; // Ocultar el tablero hasta que se elija dificultad
  document.getElementById("volverMenu").style.display = "inline"; // Mostrar botón "Volver al Menú Principal
}
// Variables globales para medir el tiempo
let tiempoInicio;
let tiempoJuego; // Declaración de la variable aquí
let parejasEncontradas = 0;
let idReto; // Variable para almacenar el idReto seleccionado
let puntuacion;

// Generar las cartas de memoria con emojis
// Generar las cartas de memoria con iconos relacionados con magia y fantasía
function generarCartas(dificultad) {
  const iconos = [
    '💎', '🔮', '✨', '🧙‍♂️', '🧩', 
    '🪄', '🦄', '🪙', '🌟', '🦋', 
    '🐉', '🎩', '⚡', '🦊', '🌙'
  ]; // Lista de iconos mágicos y fantásticos
  let cartas = [];

  let numCartas = 0;
  if (dificultad === 'bajo') {
    numCartas = 2;
    puntuacion = 5;
    idReto = 1; // ID de reto correspondiente en la base de datos
  } else if (dificultad === 'medio') {
    numCartas = 3;
    puntuacion = 10;
    idReto = 2; // ID de reto correspondiente en la base de datos
  } else if (dificultad === 'alto') {
    numCartas = 5;
    puntuacion = 15;
    idReto = 3; // ID de reto correspondiente en la base de datos
  }

  // Crear las cartas con los iconos seleccionados de manera aleatoria
  for (let i = 0; i < numCartas; i++) {
    cartas.push(iconos[i]);
    cartas.push(iconos[i]); // Añadir cada icono dos veces para que coincidan
  }

  // Mezclar las cartas aleatoriamente
  cartas = cartas.sort(() => Math.random() - 0.5);

  const board = document.getElementById("game-board");
  board.innerHTML = '';

  // Crear y añadir las cartas al tablero
  cartas.forEach((icono, index) => {
    const carta = document.createElement('div');
    carta.classList.add('card');
    carta.setAttribute('data-id', index);
    carta.setAttribute('data-icono', icono);
    carta.addEventListener('click', voltearCarta);
    board.appendChild(carta);
  });

  // Inicializar tiempo de inicio y parejas encontradas
  tiempoInicio = Date.now();
  parejasEncontradas = 0;
}

// Voltear carta cuando se hace clic
let cartasVolteadas = [];
function voltearCarta(event) {
  const carta = event.target;
  const icono = carta.getAttribute('data-icono');

  // Evitar voltear más de dos cartas a la vez
  if (cartasVolteadas.length === 2 || carta.classList.contains('flipped')) return;

  carta.textContent = icono;
  carta.classList.add('flipped');
  cartasVolteadas.push(carta);

  // Comprobar si las cartas coinciden
  if (cartasVolteadas.length === 2) {
    setTimeout(comprobarPareja, 1000);
  }
}

// Comprobar si las dos cartas volteadas son iguales
function comprobarPareja() {
  const carta1 = cartasVolteadas[0];
  const carta2 = cartasVolteadas[1];

  if (carta1.getAttribute('data-icono') === carta2.getAttribute('data-icono')) {
    carta1.removeEventListener('click', voltearCarta);
    carta2.removeEventListener('click', voltearCarta);
    parejasEncontradas++;

    // Verificar si se completaron todas las parejas
    const totalParejas = document.querySelectorAll('.card').length / 2;
    if (parejasEncontradas === totalParejas) {
      tiempoJuego = Math.floor((Date.now() - tiempoInicio) / 1000);  // Asignar valor a tiempoJuego
      terminarJuego(tiempoJuego, puntuacion);
    }
  } else {
    carta1.textContent = '';
    carta2.textContent = '';
    carta1.classList.remove('flipped');
    carta2.classList.remove('flipped');
  }

  cartasVolteadas = [];
}

//funcion para terminar el juego
function terminarJuego(tiempoJuego, puntuacion) {
  const idUsuario = getCookie("idUsuario");
  const idReto = getCurrentRetoId();

  if (!idUsuario) {
    alert("Debes estar registrado para guardar tus estadísticas.");
    return;
  }

  // Enviar la información al servidor para guardar las estadísticas
  fetch('http://localhost:3000/guardar-estadisticas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      idReto,
      tiempoJuego,
      puntuacion,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
              // Reiniciar la puntuación
              puntuacion = 0;
              document.cookie = `idRetoSeleccionado=${idReto}; path=/;`;      
        // Verificar puntuación acumulada
        fetch(`http://localhost:3000/verificar-puntuacion-retos/${idUsuario}`)
          .then(response => response.json())
          .then(dataPuntuaciones => {
            let puntuacionTotal;
            switch (parseInt(idReto)) {
              case 1:
                puntuacionTotal = dataPuntuaciones.puntuacionReto1;
                break;
              case 2:
                puntuacionTotal = dataPuntuaciones.puntuacionReto2;
                break;
              case 3:
                puntuacionTotal = dataPuntuaciones.puntuacionReto3;
                break;
            }

            // Define las puntuaciones necesarias para cada reto
            const puntuacionesNecesarias = [10, 20, 30];

            if (puntuacionTotal >= puntuacionesNecesarias[idReto - 1]) {
              // Asignar competencia
              asignarCompetencia(idUsuario, idReto, puntuacionTotal); // Asegúrate de pasar idReto aquí
              alert(`¡Reto completado! Has alcanzado la competencia con ${puntuacionTotal} puntos.`);

              // Marcar el reto como completado
              marcarRetoCompletado(idUsuario, idReto, puntuacionTotal);
            } else {
              alert(`Reto en progreso. Tienes ${puntuacionTotal}/${puntuacionesNecesarias[idReto - 1]} puntos.`);
            }

            // Actualizar la vista de retos
            mostrarRetos();
          });
      } else {
        console.error('Error al guardar las estadísticas');
      }
    })
    .catch(error => {
      console.error('Error al guardar las estadísticas:', error);
    });
}
//Funcion asignar competencia
function asignarCompetencia(idUsuario, idReto, puntuacionTotal) {
  let nombreCompetencia;
  let nivel;

  // Define las competencias basadas en la puntuación
  if (puntuacionTotal >= 30) {
    nombreCompetencia = 'Pro';
    nivel = 3;
  } else if (puntuacionTotal >= 20) {
    nombreCompetencia = 'Experto';
    nivel = 2;
  } else if (puntuacionTotal >= 10) {
    nombreCompetencia = 'Novato';
    nivel = 1;
  } else {
    return; // No se asigna competencia si no se alcanza la puntuación mínima
  }

  // Llamar a la ruta para asignar la competencia
  fetch('http://localhost:3000/asignar-competencia', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario,
      idReto,
      nombreCompetencia,
      nivel,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(data => {
      if (data.message) {
        console.log(data.message);
      }
    })
    .catch(error => {
      console.error('Error al asignar competencia:', error);
    });
}

// Función para marcar reto completado
function marcarRetoCompletado(idUsuario, idReto, puntuacion) {
  const puntuacionRequerida = (idReto === 1) ? 10 : (idReto === 2) ? 20 : 30;

  if (puntuacion >= puntuacionRequerida) {
    fetch(`http://localhost:3000/marcar-reto-completado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
        idReto: idReto,
        fechaCompletado: new Date().toISOString()
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Reto marcado como completado');
        } else {
          console.log('Error al marcar el reto como completado.');
        }
      })
      .catch(error => {
        console.error('Error al marcar reto completado:', error);
      });
  }
}
//funcion desbloqueo siguiente nivel
function desbloquearSiguienteReto(idReto) {
  const siguienteReto = idReto + 1;

  console.log(`Desbloqueando reto siguiente: ${siguienteReto}`);
}
//funcion mostrar retos
// Función mostrar retos
function mostrarRetos() {
  ocultarDivs();
  const retosDisponibles = document.getElementById("retos-disponibles");
  const seleccionRetosDiv = document.getElementById("seleccion-retos");
  seleccionRetosDiv.classList.remove('oculto');

  // Verifica si el elemento existe antes de intentar modificarlo
  if (!retosDisponibles) {
    console.error('El elemento "retos-disponibles" no se encontró en el DOM.');
    return; // Sal de la función si el elemento no existe
  }

  // Muestra el div de selección de retos
  retosDisponibles.innerHTML = ''; // Limpia el contenido del contenedor
  retosDisponibles.classList.remove('oculto');

  const idUsuario = getCookie("idUsuario");
  crearBotonVolver();

  // Verificar estadísticas de puntuación para cada reto
  fetch(`http://localhost:3000/verificar-puntuacion-retos/${idUsuario}`)
    .then(response => response.json())
    .then(dataPuntuaciones => {
      const retos = [
        {
          nombre: "Principiante",
          idReto: 1,
          puntuacionRequerida: 10,
          puntuacionActual: dataPuntuaciones.puntuacionReto1 || 0,
          competencia: "Novato"
        },
        {
          nombre: "Intermedio",
          idReto: 2,
          puntuacionRequerida: 20,
          puntuacionActual: dataPuntuaciones.puntuacionReto2 || 0,
          competencia: "Genio"
        },
        {
          nombre: "Avanzado",
          idReto: 3,
          puntuacionRequerida: 30,
          puntuacionActual: dataPuntuaciones.puntuacionReto3 || 0,
          competencia: "Pro"
        }
      ];

      retos.forEach(reto => {
        const botonReto = document.createElement("button");
        botonReto.innerHTML = `${reto.nombre} (${reto.puntuacionActual}/${reto.puntuacionRequerida})`;

        // Habilitar reto si el anterior está completado o es el primero
        const puedeJugar = reto.idReto === 1 ||
          (retos[reto.idReto - 2].puntuacionActual >= retos[reto.idReto - 2].puntuacionRequerida);

        // Verificar si el reto actual ya ha sido completado
        const retoCompletado = dataPuntuaciones[`puntuacionReto${reto.idReto}`] >= reto.puntuacionRequerida;

        if (retoCompletado) {
          botonReto.disabled = true; // Deshabilita el botón si el reto ya ha sido completado
          botonReto.title = "Reto completado. No puedes volver a jugar.";
        } else {
          botonReto.disabled = !puedeJugar; // Deshabilitar si no se puede jugar
          if (!puedeJugar) {
            botonReto.title = "Completa el reto anterior primero";
          }
        }

        // Si ya se alcanzó la puntuación requerida, mostrar competencia
        if (reto.puntuacionActual >= reto.puntuacionRequerida) {
          botonReto.innerHTML += ` ✅ ${reto.competencia}`;
        }

        botonReto.addEventListener("click", () => {
          // Guardar el reto seleccionado en una cookie
          document.cookie = `idRetoSeleccionado=${reto.idReto}; path=/;`;

          // Mostrar el juego con la dificultad correspondiente
          mostrarJuego();
          const dificultad = reto.idReto === 1 ? "bajo" :
            reto.idReto === 2 ? "medio" : "alto";
          seleccionarDificultad(dificultad);
        });

        retosDisponibles.appendChild(botonReto);
      });
    })
    .catch(error => {
      console.error('Error al verificar puntuaciones de retos:', error);
    });
}     

// Función para seleccionar un reto
function seleccionarReto(idReto) {
  const idUsuario = getCookie("idUsuario");

  if (!idUsuario) {
    alert('Debes estar registrado para seleccionar un reto.');
    return;
  }

  // Verificar si el reto anterior fue completado
  fetch(`http://localhost:3000/verificar-reto-completado/${idUsuario}/${idReto - 1}`)
    .then(response => response.json())
    .then(data => {
      if (data.success && !data.retoCompletado) {
        alert('Debes completar el reto anterior antes de poder seleccionar este.');
      } else {
        alert('Reto seleccionado correctamente.');
      }
    })
    .catch(error => console.error('Error al verificar el reto:', error));
}

// Función para iniciar el reto (cuando el jugador haga clic en "Comenzar Reto")
function iniciarReto() {
  document.getElementById("seleccion-retos").style.display = "none";

  const retoSeleccionado = parseInt(getCookie("idRetoSeleccionado"));
  console.log('Reto seleccionado:', retoSeleccionado);

  if (!retoSeleccionado) {
    console.log('No se ha seleccionado un reto válido');
    return;
  }

  let dificultad = '';
  switch (retoSeleccionado) {
    case 1:
      dificultad = 'bajo';
      break;
    case 2:
      dificultad = 'medio';
      break;
    case 3:
      dificultad = 'alto';
      break;
    default:
      console.log('Reto no válido');
      return;
  }

  console.log('Generando cartas con dificultad:', dificultad);
  generarCartas(dificultad);
  const gameBoard = document.getElementById("game-board");
  gameBoard.style.display = "flex";
}

// Seleccionar la dificultad
function seleccionarDificultad(dificultad) {
  generarCartas(dificultad); // Genera las cartas según la dificultad seleccionada
  document.getElementById("seleccionar-dificultad").style.display = "none"; // Oculta el selector de dificultad
  document.getElementById("game-board").style.display = "block"; // Muestra el tablero de juego (asegúrate de que el valor sea 'block' o el adecuado)
}

// Función para registrar la competencia
function registrarCompetencia(idReto, puntosObtenidos) {
  const idUsuario = getCookie("idUsuario");

  let nombreCompetencia = '';
  let nivelCompetencia = '';

  if (puntosObtenidos >= 10) {
    nombreCompetencia = 'NOVATO';
    nivelCompetencia = 'Bajo';
  }
  if (puntosObtenidos >= 20) {
    nombreCompetencia = 'GENIO';
    nivelCompetencia = 'Medio';
  }
  if (puntosObtenidos >= 30) {
    nombreCompetencia = 'PRO';
    nivelCompetencia = 'Avanzado';
  }

  // Registrar la competencia
  fetch('http://localhost:3000/competencias/registrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idUsuario: idUsuario,
      idReto: idReto,
      nombreCompetencia: nombreCompetencia,
      nivel: nivelCompetencia,
      fechaActualizacion: new Date().toISOString()
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Competencia registrada con éxito!');
      } else {
        alert('Error al registrar la competencia.');
      }
    })
    .catch(error => {
      console.error('Error al registrar competencia:', error);
    });
}

function mostrarEstadisticas() {
  ocultarDivs();
  console.log('Mostrando estadísticas');
  const idUsuario = getCookie("idUsuario");

  if (!idUsuario) {
    alert('Debes iniciar sesión para ver las estadísticas');
    return;
  }
  let estadisticasDiv = document.getElementById('estadisticas-div');
 // Cambiar const a let
 if (estadisticasDiv) {
   estadisticasDiv.innerHTML = ''; // Limpia el contenido
  estadisticasDiv.classList.remove('oculto');
 } else {
   // Si no existe, créalo
   estadisticasDiv = document.createElement('div');
   estadisticasDiv.id = 'estadisticas-div'; // Asigna un id único
   document.body.appendChild(estadisticasDiv); // Agrega el div al body
 }

  crearBotonVolver();
  fetch(`http://localhost:3000/estadisticas/${idUsuario}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos recibidos del servidor:', data); // Agregar esta línea para depuración
      if (data.success) {
        if (!Array.isArray(data.estadisticas)) {
          console.error('Las estadísticas no son un arreglo:', data.estadisticas);
          return;
        }

        estadisticasDiv.innerHTML = `
                <h2>Estadísticas de Usuario</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Puntuación</th>
                            <th>Tiempo (segundos)</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${data.estadisticas.length > 0 ? data.estadisticas.map(est => `
                        <tr>
                            <td>${new Date(est.fecha).toLocaleDateString()}</td>
                            <td>${est.puntuacion}</td>
                            <td>${est.tiempoJuego}</td>
                        </tr>
                    `).join('') : '<tr><td colspan="3">No hay estadísticas disponibles.</td></tr>'}
                    </tbody>
                </table>
            `;

        document.body.appendChild(estadisticasDiv); // Agrega las estadísticas al body


      } else {
        console.error('Error al obtener estadísticas:', data.message);
      }
    })
    .catch(error => {
      console.error('Error al obtener estadísticas:', error);
    });
}
//funcion mostrar competencias
function mostrarCompetencias() {
  ocultarDivs();
  const idUsuario = getCookie("idUsuario");

  if (!idUsuario) {
    alert('Debes iniciar sesión para ver tus competencias');
    return;
  }
  // Limpiar el contenido anterior de competencias
  let competenciasDiv = document.getElementById('competencias-div'); // Cambiar const a let
  if (competenciasDiv) {
    competenciasDiv.innerHTML = ''; // Limpia el contenido
    competenciasDiv.classList.remove('oculto');
  } else {
    // Si no existe, créalo
    competenciasDiv = document.createElement('div');
    competenciasDiv.id = 'competencias-div'; // Asigna un id único
    document.body.appendChild(competenciasDiv); // Agrega el div al body
  }
  crearBotonVolver();
  fetch(`http://localhost:3000/competencias/${idUsuario}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        competenciasDiv.innerHTML = `
                    <h2>Competencias de Usuario</h2>
                    <ul>
                        ${data.competencias.map(competencia =>
          `<li>${competencia.nombreCompetencia} - Nivel: ${competencia.nivel}</li>`
        ).join('')}
                    </ul>
                `;


      } else {
        alert('Error al obtener competencias: ' + data.message);
      }
    })
    .catch(error => console.error('Error al obtener competencias:', error));
}
// Agregar comentario
function agregarComentario() {
  const idUsuario = getCookie("idUsuario") || null; // Establece null si el usuario no está registrado
  const comentario = document.getElementById("comentarioTexto").value;

  if (!comentario) {
    alert("Por favor, escribe un comentario.");
    return;
  }

  fetch('http://localhost:3000/comentarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comentario, idUsuario })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Comentario agregado con éxito');
        document.getElementById("comentarioTexto").value = ""; // Limpia el campo de texto
      } else {
        alert('Error al agregar el comentario');
      }
    })
    .catch(error => console.error('Error:', error));
}
// Función para mostrar los comentarios
function mostrarComentarios() {
  ocultarDivs(); // Oculta otros divs

  const comentariosLista = document.getElementById('comentarios-lista');
  comentariosLista.classList.remove('oculto'); // Muestra la sección de comentarios

  // Limpiar la lista de comentarios
  const listaComentarios = document.getElementById('lista-comentarios');
  listaComentarios.innerHTML = ''; // Limpia la lista

  // Obtener todos los comentarios desde el servidor
  fetch(`http://localhost:3000/comentarios`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la respuesta del servidor: ' + response.status);
          }
          return response.json();
      })
      .then(data => {
          if (data.success) {
              data.comentarios.forEach(comentario => {
                  const li = document.createElement('li');
                  li.textContent = `${comentario.fecha}: ${comentario.comentario}`;
                  listaComentarios.appendChild(li);
              });
          } else {
              alert('Error al obtener los comentarios: ' + data.message);
          }
      })
      .catch(error => console.error('Error al obtener comentarios:', error));
}

// Función para cerrar la lista de comentarios
function cerrarComentarios() {
const comentariosLista = document.getElementById('comentarios-lista');
comentariosLista.classList.add('oculto'); // Oculta la sección de comentarios
}
//función mostrar la guía
function mostrarGuia() {
let guiaDiv = document.getElementById('guia-rapida');
if (guiaDiv) {
  guiaDiv.classList.remove('oculto');
}
}
//funcion cierre de guía
function cerrarGuia() {
let guiaDiv = document.getElementById('guia-rapida');
if (guiaDiv) {
  guiaDiv.classList.add('oculto');
}
}
// Llamar a la función de actualización del menú cuando se carga la página
window.onload = mostrarMenu;