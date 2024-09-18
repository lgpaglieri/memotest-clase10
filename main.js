let minutos = 0;
let segundos = 0;

function actualizarCronometro() {

    segundos++;
    minutos=Math.trunc(segundos/60);
    segundos%=60;

  const minutosFormateados = minutos.toString().padStart(2, "0");
  const segundosFormateados = segundos.toString().padStart(2, "0");

  document.querySelector("#minutos").textContent = minutosFormateados;
  document.querySelector("#segundos").textContent = segundosFormateados;
}

function iniciarCronometro(cronometro) {
  cronometro = setInterval(actualizarCronometro, 1000);
}

function detenerCronometro(cronometro) {
  clearInterval(cronometro);
}

function manejarTurno(cartaElegida) {
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

let memoriaNombres = [];
let memoriaTagCartas = [];

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
  bloquearClick();
  setTimeout(ocultarCartas, 1000);
  setTimeout(habilitarClick, 1000);
}

document.querySelector("#comenzar-juego").onclick = function () {
  comenzarJuego();
};

function ocultarBotonComenzar() {
  const $botonComenzarJuego = document.querySelector("#comenzar-juego");
  $botonComenzarJuego.classList.add("invisible");
}

function comenzarJuego() {
  desordenarDivs(); // Desordenar las cartas antes de comenzar
  iniciarCronometro();
  habilitarClick();
  ocultarBotonComenzar();
}

function bloquearClick() {
  const imagenes = document.querySelectorAll("img");
  imagenes.forEach(function (imagen) {
    imagen.onclick = function () {};
  });
}

function habilitarClick() {
  const divScaloni1 = document.querySelector("#div-scaloni-1");
  divScaloni1.onclick = function () {
    const imagen = document.querySelector("#div-scaloni-1 > img");
    console.log(imagen);
    manejarTurno(imagen);
  };

  const divScaloni2 = document.querySelector("#div-scaloni-2");
  divScaloni2.onclick = function () {
    const imagen = document.querySelector("#div-scaloni-2 > img");
    manejarTurno(imagen);
  };

  const divDimaria1 = document.querySelector("#div-dimaria-1");
  divDimaria1.onclick = function () {
    const imagen = document.querySelector("#div-dimaria-1 > img");
    manejarTurno(imagen);
  };

  const divDimaria2 = document.querySelector("#div-dimaria-2");
  divDimaria2.onclick = function () {
    const imagen = document.querySelector("#div-dimaria-2 > img");
    manejarTurno(imagen);
  };

  const divMessi1 = document.querySelector("#div-messi-1");
  divMessi1.onclick = function () {
    const imagen = document.querySelector("#div-messi-1 > img");
    manejarTurno(imagen);
  };

  const divMessi2 = document.querySelector("#div-messi-2");
  divMessi2.onclick = function () {
    const imagen = document.querySelector("#div-messi-2 > img");
    manejarTurno(imagen);
  };
  const divOtamendi1 = document.querySelector("#div-otamendi-1");
  divOtamendi1.onclick = function () {
    const imagen = document.querySelector("#div-otamendi-1 > img");
    manejarTurno(imagen);
  };

  const divOtamendi2 = document.querySelector("#div-otamendi-2");
  divOtamendi2.onclick = function () {
    const imagen = document.querySelector("#div-otamendi-2 > img");
    manejarTurno(imagen);
  };
  const divAlvarez1 = document.querySelector("#div-alvarez-1");
  divAlvarez1.onclick = function () {
    const imagen = document.querySelector("#div-alvarez-1 > img");
    manejarTurno(imagen);
  };

  const divAlvarez2 = document.querySelector("#div-alvarez-2");
  divAlvarez2.onclick = function () {
    const imagen = document.querySelector("#div-alvarez-2 > img");
    manejarTurno(imagen);
  };

  const divDibu1 = document.querySelector("#div-dibu-1");
  divDibu1.onclick = function () {
    const imagen = document.querySelector("#div-dibu-1 > img");
    manejarTurno(imagen);
  };

  const divDibu2 = document.querySelector("#div-dibu-2");
  divDibu2.onclick = function () {
    const imagen = document.querySelector("#div-dibu-2 > img");
    manejarTurno(imagen);
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
  horas = 0;
  minutos = 0;
  segundos = 0;
  document.querySelector("#horas").textContent = "00";
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

  habilitarClick();

  const $botonComenzarJuego = document.querySelector("#comenzar-juego");
  $botonComenzarJuego.classList.remove("invisible");
}

document.querySelector(".btn-warning").onclick = function () {
  reiniciarJuego();
};
