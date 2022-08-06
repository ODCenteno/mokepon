const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const seccionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonAgua = document.getElementById("boton-agua")
const botonFuego = document.getElementById("boton-fuego")
const botonTierra = document.getElementById("boton-tierra")
const botonReiniciar = document.getElementById("boton-reiniciar")

const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipodoge = document.getElementById("Hipodoge")
const inputCapipepo = document.getElementById("Capipepo")
const inputRatigueya = document.getElementById("Ratigueya")
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const combatResult = document.getElementById('resultado-combate')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')

const seccionAtaques = document.getElementById('seccion-ataques')


let mascotaJugador;
let mascotaEnemigo;
let ataqueJugador;
let ataqueEnemigo;
let triunfosJugador;
let perdidasJugador;
let resultadoCombate;
let vidasJugador = 3;
let vidasEnemigo = 3;


function iniciarJuego(){
    seccionSeleccionarAtaque.style.display = 'none'
    seccionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonAgua.addEventListener('click', ataqueAgua)
    botonFuego.addEventListener('click', ataqueFuego)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {

    seccionSeleccionarMascota.style.display = 'none'
    seccionSeleccionarAtaque.style.display = 'flex'

    if (inputHipodoge.checked){
        mascotaJugador = "Hipodoge"
        spanMascotaJugador.innerHTML = mascotaJugador
    } else if (inputCapipepo.checked){
        mascotaJugador = "Capipepo"
        spanMascotaJugador.innerHTML = mascotaJugador
    } else if (inputRatigueya.checked){
        mascotaJugador = "Ratigueya"
        spanMascotaJugador.innerHTML = mascotaJugador
    } else {
        console.log("Selecciona tu Mokepon para iniciar")
    }

    seleccionarEnemigo()
}

function seleccionarEnemigo(){
    let enemigoAleatorio = aleatorio(1,3)

    if (enemigoAleatorio == 1) {
        mascotaEnemigo = "Hipodoge"
        spanMascotaEnemigo.innerHTML = mascotaEnemigo
    } else if (enemigoAleatorio == 2) {
        mascotaEnemigo = "Capipepo"
        spanMascotaEnemigo.innerHTML = mascotaEnemigo
    } else if (enemigoAleatorio == 3) {
        mascotaEnemigo = "Ratigueya"
        spanMascotaEnemigo.innerHTML = mascotaEnemigo
    }
}

function obtenerAtaqueEnemigo() {
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = "Agua"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Fuego"
    } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = "Tierra"
    }
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueAgua() {
    spanAtaqueSeleccionado.innerHTML = "Agua"
    ataqueJugador = "Agua"
    obtenerAtaqueEnemigo()
    combate(ataqueJugador, ataqueEnemigo)
}

function ataqueFuego() {
    spanAtaqueSeleccionado.innerHTML = "Fuego"
    ataqueJugador = "Fuego"
    obtenerAtaqueEnemigo()
    combate(ataqueJugador, ataqueEnemigo)
}

function ataqueTierra() {
    spanAtaqueSeleccionado.innerHTML = "Tierra"
    ataqueJugador = "Tierra"
    obtenerAtaqueEnemigo()
    combate(ataqueJugador, ataqueEnemigo)
}

function combate(ataqueJugador, ataqueEnemigo){
    
    if (ataqueJugador == ataqueEnemigo){
        resultadoCombate = "¡Empate!"
    }   else if (ataqueJugador ==  "Agua" && ataqueEnemigo == "Fuego"){
        vidasEnemigo = vidasEnemigo - 1
        resultadoCombate = "¡Ganaste esta ronda!"
    } else if (ataqueJugador == "Tierra" && ataqueEnemigo ==  "Agua"){
        vidasEnemigo = vidasEnemigo - 1
        resultadoCombate = "¡Ganaste esta ronda!"
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra"){
        vidasEnemigo = vidasEnemigo - 1
        resultadoCombate = "¡Ganaste esta ronda!"
    } else {
        vidasJugador--
        resultadoCombate = "¡Perdiste esta ronda!"
    }
    spanVidasJugador.innerHTML = vidasJugador
    spanVidasEnemigo.innerHTML = vidasEnemigo

    if (vidasJugador == 0 || vidasEnemigo == 0) {
        updateLife(vidasJugador, vidasEnemigo)
    } else {
        displayAttackMessage(resultadoCombate)
    }
}

function displayAttackMessage(resultadoCombate) {

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    combatResult.innerHTML = resultadoCombate
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    // let crearParrafo = document.createElement('p')
    // crearParrafo.innerHTML = `Elegiste atacar con ${ataqueJugador}. El enemigo atacó con ${ataqueEnemigo}. ${resultadoCombate}`

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function displayGameMsg(winner) {
    seccionReiniciar.style.display = 'flex'
    seccionAtaques.style.display = "none"

    combatResult.style.color = "olivedrab"
    combatResult.innerHTML = `${winner}`
 
    botonAgua.disabled = true
    botonFuego.disabled = true
    botonTierra.disabled = true
}

function updateLife(vidasJugador) {
    if (vidasJugador == 0) {
        displayGameMsg("¡Perdiste el juego!")
    } else if (vidasEnemigo == 0) {
        displayGameMsg("¡Ganaste el juego!")
    }
}

function reiniciarJuego() {
    location.reload()
}

window.addEventListener("load", iniciarJuego)