let minutos = 0;
let segundos = 0;
let cronometro;

function actualizarCronometro() {

    segundos++;
    minutos=Math.trunc(segundos/60);
    segundos%=60;

  const minutosFormateados = minutos.toString().padStart(2, "0");
  const segundosFormateados = segundos.toString().padStart(2, "0");

  document.querySelector("#minutos").textContent = minutosFormateados;
  document.querySelector("#segundos").textContent = segundosFormateados;
}

function iniciarCronometro() {
  cronometro = setInterval(actualizarCronometro, 1000);
}

function detenerCronometro() {
  clearInterval(cronometro);
}

let memoriaNombres = [];
let memoriaTagCartas = [];

function manejarTurno(cartaElegida) {
  if (memoriaTagCartas.includes(cartaElegida)) {
    return;
  }

  if (memoriaNombres.length === 0) {
    console.log("ejecutando paso 1");
    console.log(cartaElegida);
    ejecutarPasoUno(cartaElegida);
  } else {
    if (memoriaNombres.length === 1) {
      console.log("ejecutando paso 2");
      console.log(cartaElegida);
      ejecutarPasoDos(cartaElegida);
    }
  }
  validarProgreso();
}

function seleccionarCarta($cartaElegida) {
  nombreCarta = $cartaElegida.name;
  memoriaNombres.push(nombreCarta);
  memoriaTagCartas.push($cartaElegida);
}

function mostrarCarta($cartaElegida) {
  $cartaElegida.classList.add("visible");
  $cartaElegida.classList.remove("invisible");
}

function ocultarCartas() {
  memoriaTagCartas[0].classList.add("invisible");
  memoriaTagCartas[0].classList.remove("visible");
  memoriaTagCartas[1].classList.add("invisible");
  memoriaTagCartas[1].classList.remove("visible");
  memoriaNombres = [];
  memoriaTagCartas = [];
}

function ejecutarPasoUno(cartaElegida) {
  seleccionarCarta(cartaElegida);
  mostrarCarta(cartaElegida);
  bloquearClickImagen(cartaElegida);
}

function ejecutarPasoDos(cartaElegida) {
  seleccionarCarta(cartaElegida);
  mostrarCarta(cartaElegida);
  if (memoriaNombres[0] === memoriaNombres[1]) {
    avanzarPasoCorrecto();
  } else {
    avanzarPasoIncorrecto();
  }
}

let cartasAdivinadas = 0;

function validarProgreso() {

  const $mensajeGanador = document.querySelector("#mensaje-ganador");
  
  if (cartasAdivinadas === 6) {
    $mensajeGanador.classList.remove("invisible");
    $mensajeGanador.classList.add("visible");
    detenerCronometro(cronometro);
  }
}

function avanzarPasoCorrecto() {
  memoriaNombres = [];
  memoriaTagCartas = [];
  cartasAdivinadas++;
}

let erroresCometidos = 0;
function avanzarPasoIncorrecto() {
  erroresCometidos++;
  document.querySelector(
    "#errores-cometidos"
  ).innerText = `Errores cometidos: ${erroresCometidos}`;
  bloquearClickCuadro();
  setTimeout(ocultarCartas, 1000);
  setTimeout(habilitarClickCuadro, 1000);
}

document.querySelector("#comenzar-juego").onclick = function () {
  comenzarJuego();
};

function ocultarBotonComenzar() {
  const $botonComenzarJuego = document.querySelector("#comenzar-juego");
  $botonComenzarJuego.classList.add("invisible");
}

function comenzarJuego() {
  desordenarDivs();
  iniciarCronometro();
  habilitarClickCuadro();
  ocultarBotonComenzar();
}

function bloquearClickImagen(imagen){
  imagen.onclick=function(){}
}

function bloquearClickCuadro() {
  const imagenes = document.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.onclick = function () {};
  });
}

function habilitarClickCuadro() {
  const $tablero = document.querySelector('#cuadro-juego');
  $tablero.onclick = function(e) {
    let $elemento = e.target;

    if ($elemento.tagName === 'IMG') {
      manejarTurno($elemento);
    } else {
      const $imagen = $elemento.querySelector('img');
      if ($imagen) {
        manejarTurno($imagen);
      }
    }
  };
}

function arrayAleatorio(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function desordenarDivs() {
  const $cuadroJuego = document.querySelector("#cuadro-juego");
  const divs = Array.from($cuadroJuego.querySelectorAll(".col-sm-2"));
  const divsAleatorios = arrayAleatorio(divs);

  // Vaciar el contenedor
  $cuadroJuego.innerHTML = "";

  // Crear filas de nuevo y añadir los divs desordenados
  const row1 = document.createElement("div");
  row1.classList.add("row");
  const row2 = document.createElement("div");
  row2.classList.add("row");

  // Insertar las primeras 6 cartas en la primera fila
  divsAleatorios.slice(0, 6).forEach((div) => row1.appendChild(div));

  // Insertar las últimas 6 cartas en la segunda fila
  divsAleatorios.slice(6).forEach((div) => row2.appendChild(div));

  // Agregar las filas al contenedor del juego
  $cuadroJuego.appendChild(row1);
  $cuadroJuego.appendChild(row2);
}

function reiniciarJuego() {
  detenerCronometro(cronometro);
  minutos = 0;
  segundos = 0;
  document.querySelector("#minutos").textContent = "00";
  document.querySelector("#segundos").textContent = "00";

  erroresCometidos = 0;
  document.querySelector("#errores-cometidos").innerText = "";

  const imagenes = document.querySelectorAll("img");
  imagenes.forEach(function (img) {
    img.classList.add("invisible");
    img.classList.remove("visible");
  });

  cartasAdivinadas = 0;

  const $mensajeGanador = document.querySelector("#mensaje-ganador");
  $mensajeGanador.classList.remove("visible");
  $mensajeGanador.classList.add("invisible");

  desordenarDivs();

  const $botonComenzarJuego = document.querySelector("#comenzar-juego");
  $botonComenzarJuego.classList.remove("invisible");
}

document.querySelector(".btn-warning").onclick = function () {
  reiniciarJuego();
};