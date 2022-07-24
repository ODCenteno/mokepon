
let seleccionarAtaque;
let ataqueEnemigo;


function iniciarJuego(){
    let botonMascotaJugador = document.getElementById("boton-mascota")
    let botonAgua = document.getElementById("boton-agua")
    let botonFuego = document.getElementById("boton-fuego")
    let botonTierra = document.getElementById("boton-tierra")

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonAgua.addEventListener('click', ataqueAgua)
    botonFuego.addEventListener('click', ataqueFuego)
    botonTierra.addEventListener('click', ataqueTierra)

}

function seleccionarMascotaJugador() {
    let inputHipodoge = document.getElementById("Hipodoge")
    let inputCapipepo = document.getElementById("Capipepo")
    let inputRatigueya = document.getElementById("Ratigueya")
    let spanMascotaJugador = document.getElementById('mascota-jugador')


    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = "Ratigueya"
    } else {
        console.log("Selecciona tu Mokepon para iniciar")
    }

    seleccionarEnemigo()

}

function seleccionarEnemigo(){
    let enemigoAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (enemigoAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    } else if (enemigoAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = "Capipepo"
    } else if (enemigoAleatorio == 3) {
        spanMascotaEnemigo.innerHTML = "Ratigueya"
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
    let spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')
    spanAtaqueSeleccionado.innerHTML = "Agua"
    obtenerAtaqueEnemigo()
}

function ataqueFuego() {
    let spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')
    spanAtaqueSeleccionado.innerHTML = "Fuego"
    obtenerAtaqueEnemigo()
}

function ataqueTierra() {
    let spanAtaqueSeleccionado = document.getElementById('ataque-seleccionado')
    spanAtaqueSeleccionado.innerHTML = "Tierra"
    obtenerAtaqueEnemigo()
}


window.addEventListener("load", iniciarJuego)